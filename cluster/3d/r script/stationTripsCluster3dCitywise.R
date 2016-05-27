library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
library(NbClust)

# read trip data
trip <- read_csv("201508_trip_data.csv")
dfTrip <- tbl_df(trip)
as_data_frame(dfTrip)

#read station data
station <- read_csv("201508_station_data.csv")
dfStation <- tbl_df(station)
as_data_frame(dfStation)

#add day of the week
dfTripFiltered <- dfTrip
dfTripFiltered$day_of_week <- strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%A")

dfTripFiltered$hour <- hour(as.POSIXct(strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%H:%M"), format="%H:%M"))

#trip ending from station
dfTripsCnt <- dfTripFiltered %>%
  group_by(start_station, start_terminal, end_station, end_terminal) %>%
  summarise(trips = n())

#add city column
dfTripsCntWithCity <- merge(dfTripsCnt, dfStation, by.x="start_terminal", by.y="station_id")
dfTripsCntWithCity <- dfTripsCntWithCity %>%
  filter(landmark == "Mountain View")

dfTripsCntWithCity <- dfTripsCntWithCity[c(1:5,10)]

#select only numeric columns
dfTripsCntAltered <- dfTripsCntWithCity[c(1,4,5)]

#determine best number of clusters
nc <- NbClust(dfTripsCntAltered, min.nc=2, max.nc=15, method="kmeans")

#verify suggested cluster number
table(nc$Best.n[1,])

#k-means clustering and provice cluster to form from previous suggestion
set.seed(1234)
fit.km <- kmeans(dfTripsCntAltered, 3, nstart=25) 
fit.km$size
fit.km$centers
fit.km$cluster

#add cluster column to stations
cluster <- fit.km$cluster
dfCluster <- data.frame(fit.km$cluster)
names(dfCluster)
names(dfCluster) <- c("cluster")
dfTripsCntWithCity <- merge(dfTripsCntWithCity, dfCluster, by=0, all=TRUE)
dfTripsCntWithCity <- dfTripsCntWithCity[c(2:8)]

#generate json
json <- toJSON(dfTripsCntWithCity)
write(json, "stationTripCluster3DMountainView.json")


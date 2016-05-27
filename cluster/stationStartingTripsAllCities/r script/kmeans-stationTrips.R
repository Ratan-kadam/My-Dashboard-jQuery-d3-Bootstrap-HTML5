library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
library(NbClust)

#install.packages("NbClust")

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

#trip starting from station
dfTripsCnt <- dfTripFiltered %>%
  group_by(start_station, start_terminal) %>%
  summarise(trips = n())

#select only numeric columns
dfTripsCntAltered <- dfTripsCnt[c(2:3)]

#determine best number of clusters
nc <- NbClust(dfTripsCntAltered, min.nc=2, max.nc=15, method="kmeans")

#verify suggested cluster number
table(nc$Best.n[1,])

#k-means clustering and provice cluster to form from previous suggestion
set.seed(1234)
fit.km <- kmeans(dfTripsCntAltered, 3, nstart=25) 
fit.km$size
fit.km$centers
#aggregate(dfTripsCntAltered, by=list(cluster=fit.km$cluster))

write.csv(fit.km$cluster, "temp.csv")
write.csv(dfTripsCnt, "stationTripCluster.csv")

#manual add cluster numbers from temp.csv to stations then reread csv and convert it to json
data <- read_csv("stationTripCluster.csv")
dfData <- tbl_df(data)
json <- toJSON(data)
write(json, "stationTripCluster.json")
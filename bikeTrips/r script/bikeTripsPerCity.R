library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
#library(RJSONIO)
library(NbClust)

# read trip data
trip <- read_csv("201508_trip_data.csv")
dfTrip <- tbl_df(trip)
as_data_frame(dfTrip)

#read station data
station <- read_csv("201508_station_data.csv")
dfStation <- tbl_df(station)
as_data_frame(dfStation)

#add landmark column and rename it to city based on starting station
dfTripWithCity <- merge(dfTrip, dfStation, by.x="start_terminal", by.y="station_id")

dfTripWithCity <- dfTripWithCity[c(1:9,16)]

names(dfTripWithCity)
names(dfTripWithCity) <- c("start_terminal", "trip_id", "duration", "start_date", "start_station", "end_date", "end_station", "end_terminal", "bike_id", "city")

#calculate total trips in city and total duration based on bike_id
dfTripFiltered <- dfTripWithCity %>%
  group_by(bike_id, city) %>%
  #summarise(trips = n())
  summarise(trips = n(), total_duration = sum(duration))

#filter data citywise
dfTripSanJose <- dfTripFiltered %>%
  filter(city == "San Jose")

dfTripSanJose <- dfTripSanJose[c(1,3,4)]
names(dfTripSanJose) <- c("bike_id", "sanjose_trips", "sanjose_duration")

dfTripPaloAlto <- dfTripFiltered %>%
  filter(city == "Palo Alto")

dfTripPaloAlto <- dfTripPaloAlto[c(1,3,4)]
names(dfTripPaloAlto) <- c("bike_id", "paloalto_trips", "paloalto_duration")

dfTripMountainView <- dfTripFiltered %>%
  filter(city == "Mountain View")

dfTripMountainView <- dfTripMountainView[c(1,3,4)]
names(dfTripMountainView) <- c("bike_id", "mountainview_trips", "mountainview_duration")

dfTripRedwood <- dfTripFiltered %>%
  filter(city == "Redwood City")

dfTripRedwood <- dfTripRedwood[c(1,3,4)]
names(dfTripRedwood) <- c("bike_id", "redwood_trips", "redwood_duration")

dfTripSF <- dfTripFiltered %>%
  filter(city == "San Francisco")

dfTripSF <- dfTripSF[c(1,3,4)]
names(dfTripSF) <- c("bike_id", "sanfrancisco_trips", "sanfrancisco_duration")

#consolidate with full outer join
dfBike <- dfTripSanJose
dfBike <- merge(dfBike, dfTripPaloAlto, by="bike_id", all=TRUE)
dfBike <- merge(dfBike, dfTripMountainView, by="bike_id", all=TRUE)
dfBike <- merge(dfBike, dfTripRedwood, by="bike_id", all=TRUE)
dfBike <- merge(dfBike, dfTripSF, by="bike_id", all=TRUE)

#set NA to zero
dfBike[is.na(dfBike)] <- 0

json <- toJSON(dfBike)
write(json, "bikeTripsPerCity.json")

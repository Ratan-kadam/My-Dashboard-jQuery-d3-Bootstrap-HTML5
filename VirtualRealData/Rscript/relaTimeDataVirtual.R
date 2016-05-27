library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(rjson)

trip <- read_csv("201508_trip_data.csv")
trip$start_date <- strptime(trip$start_date, format='%m/%d/%Y %H:%M')
trip$end_date <- strptime(trip$end_date, format='%m/%d/%Y %H:%M')
#Input date here
trip <- subset(trip,trip$start_date > as.POSIXlt("2015-82-18") & trip$start_date < as.POSIXlt("2015-08-19"))
trip$start_date =as.numeric(trip$start_date) - as.numeric(as.POSIXct('1970-01-01'))
trip$end_date =as.numeric(trip$end_date) - as.numeric(as.POSIXct('1970-01-01'))
dfTrip <- tbl_df(trip)


#read station data
station <- read_csv("201508_station_data.csv")
dfStation <- station
dfStation <- tbl_df(station)
as_data_frame(dfStation)

dfTripsCnt <- dfTrip 

dfTripsCntFinal <- dfTripsCnt
dfTripsCntFinal <- merge(dfTripsCntFinal, dfStation, by.x="start_terminal", by.y="station_id")
dfTripsCntFinal <- merge(dfTripsCntFinal, dfStation, by.x="end_terminal", by.y="station_id")

#Enter city name here to filer data
#dfTripsCntFinal <- subset(dfTripsCntFinal, grepl("San Francisco", landmark.x))

#rename landmark column to city column
names(dfStation)
names(dfStation) <- c("id", "name", "lat", "long", "dockcount", "landmark", "installation")
dfStation =rename(dfStation, lng = long)
names(dfTripsCntFinal)

dfTripsCntFinal = select(dfTripsCntFinal, trip_id, start_terminal,end_terminal,start_date,end_date,lat.x,long.x,lat.y,long.y,duration)
dfTripsCntFinal =rename(dfTripsCntFinal, start_station_id = start_terminal)
dfTripsCntFinal =rename(dfTripsCntFinal, end_station_id = end_terminal)
dfTripsCntFinal =rename(dfTripsCntFinal, start_tick = start_date)
dfTripsCntFinal =rename(dfTripsCntFinal, end_tick = end_date)
dfTripsCntFinal =rename(dfTripsCntFinal, startLat = lat.x)
dfTripsCntFinal =rename(dfTripsCntFinal, startLong = long.x)
dfTripsCntFinal =rename(dfTripsCntFinal, endLat = lat.y)
dfTripsCntFinal =rename(dfTripsCntFinal, endLong = long.y)
dfTripsCntFinal =rename(dfTripsCntFinal, id = trip_id)

jsonData <- toJSON(unname(split(dfStation, 1:nrow(dfStation))))
#cat(jsonData);
write(jsonData, "station.json")
jsonData <- toJSON(unname(split(dfTripsCntFinal, 1:nrow(dfTripsCntFinal))))
write(jsonData, "trips.json")
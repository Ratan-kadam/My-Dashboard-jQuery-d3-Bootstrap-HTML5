library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
setwd('/Users/mambulge/Downloads/babs_open_data_year_1/201408_babs_open_data')
# read trip data
trip <- read_csv("201408_trip_data.csv")
print(trip);
dfTrip <- tbl_df(trip)
as_data_frame(dfTrip)

#read station data
station <- read_csv("201408_station_data.csv")
dfStation <- tbl_df(station)
as_data_frame(dfStation)

#add day of the week
dfTripFiltered <- dfTrip
dfTripFiltered$hour_of_trip <- strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%H")
#hour(dmy(some_date))
#daywise trip count between stations per subscriber type
print(strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%H"))


dfTripsCnthourwise <- dfTripFiltered %>%
  group_by(start_station, start_terminal, end_station, end_terminal, hour_of_trip,subscriber_type) %>%
  summarise(trips = n())





dfTripsCnthourwiseFinal <- dfTripsCnthourwise
dfTripsCnthourwiseFinal <- merge(dfTripsCnthourwise, dfStation, by.x="start_terminal", by.y="station_id")
dfTripsCnthourwiseFinal <- dfTripsCnthourwiseFinal[c(1:7,12)]


names(dfTripsCnthourwiseFinal)
names(dfTripsCnthourwiseFinal) <- c("start_terminal", "start_station", "end_station", "end_terminal", "hour_of_trip","subscriber_type","trips", "city")

#as_data_frame(dfTripsCntTest)

#generate respective json

jsonData <- toJSON(dfTripsCnthourwiseFinal)
write(jsonData, "2014Hourwise.json")

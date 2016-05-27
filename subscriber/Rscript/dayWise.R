library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
setwd('/Users/mambulge/Downloads/babs_open_data_year_1/201402_babs_open_data')
# read trip data
trip <- read_csv("201402_trip_data.csv")
print(trip);
dfTrip <- tbl_df(trip)
as_data_frame(dfTrip)

#read station data
station <- read_csv("201402_station_data.csv")
dfStation <- tbl_df(station)
as_data_frame(dfStation)

#add day of the week
dfTripFiltered <- dfTrip
dfTripFiltered$day_of_trip <- strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%A")
#day(dmy(some_date))
#daywise trip count between stations per subscriber type
print(strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%H"))


dfTripsCntdaywise <- dfTripFiltered %>%
  group_by(start_station, start_terminal, end_station, end_terminal, day_of_trip,subscriber_type) %>%
  summarise(trips = n())





dfTripsCntdaywiseFinal <- dfTripsCntdaywise
dfTripsCntdaywiseFinal <- merge(dfTripsCntdaywise, dfStation, by.x="start_terminal", by.y="station_id")
dfTripsCntdaywiseFinal <- dfTripsCntdaywiseFinal[c(1:7,12)]


names(dfTripsCntdaywiseFinal)
names(dfTripsCntdaywiseFinal) <- c("start_terminal", "start_station", "end_station", "end_terminal", "day_of_trip","subscriber_type","trips", "city")

#as_data_frame(dfTripsCntTest)

#generate respective json

jsonData <- toJSON(dfTripsCntdaywiseFinal)
write(jsonData, "2014Daywise.json")

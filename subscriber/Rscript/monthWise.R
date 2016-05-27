library(magrittr)
library(dplyr)
library(lubridate)
library(readr)
library(jsonlite)
setwd('/Users/mambulge/Downloads/babs_open_data_year_2')
# read trip data
trip <- read_csv("201508_trip_data.csv")
print(trip);
dfTrip <- tbl_df(trip)
as_data_frame(dfTrip)

#read station data
station <- read_csv("201508_station_data.csv")
dfStation <- tbl_df(station)
as_data_frame(dfStation)

#add day of the week
dfTripFiltered <- dfTrip
dfTripFiltered$month_of_trip <- strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%B")
#month(dmy(some_date))
#daywise trip count between stations per subscriber type
print(strftime(mdy_hm(dfTripFiltered$start_date, tz="America/Los_Angeles"), format="%B"))


dfTripsCntMonthwise <- dfTripFiltered %>%
  group_by(start_station, start_terminal, end_station, end_terminal, month_of_trip) %>%
  summarise(trips = n())


dfTripsCntMonthwiseFinal <- dfTripsCntMonthwise
dfTripsCntMonthwiseFinal <- merge(dfTripsCntMonthwise, dfStation, by.x="start_terminal", by.y="station_id")
dfTripsCntMonthwiseFinal <- dfTripsCntMonthwiseFinal[c(1:6,11)]


names(dfTripsCntMonthwiseFinal)
names(dfTripsCntMonthwiseFinal) <- c("start_terminal", "start_station", "end_station", "end_terminal", "month_of_trip","trips", "city")

#as_data_frame(dfTripsCntTest)

#generate respective json

jsonData <- toJSON(dfTripsCntMonthwiseFinal)
write(jsonData, "2015Monthwise.json")

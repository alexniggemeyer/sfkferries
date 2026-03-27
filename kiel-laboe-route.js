// Kiel Bahnhof to Laboe Route Configuration
// Based on the public transport timetable

const kielLaboeRoute = {
    name: "F1",
    description: "Kiel Bahnhof → Laboe",
    InOperation:
    {
        "weekday": true,
        "saturday": true,
        "sunday": true,
        "publicHolidays": true
    },
    stations: [
        {
            id: "kiel-bahnhof",
            name: "Bahnhof",
            isMain: true,
            weekdayDepartures: [8.05, 9.05, 11.05, 11.50, 13.05, 14.20, 16.10, 17.10, 19.10],
            saturdayDepartures: [9.25, 10.10, 11.30, 12.50, 14.15, 15.40, 17.05],
            sundayDepartures: [9.25, 10.10, 11.30, 12.50, 14.15, 15.40, 17.05]
        },
        {
            id: "seegarten",
            name: "Seegarten",
            weekdayDepartures: [8.12, 9.12, 11.12, 11.57, 13.12, 14.27, 16.17, 17.17, 19.17],
            saturdayDepartures: [9.32, 10.17, 11.37, 12.57, 14.22, 15.47, 17.12],
            sundayDepartures: [9.32, 10.17, 11.37, 12.57, 14.22, 15.47, 17.12]
        },
        {
            id: "reventlou",
            name: "Reventlou",
            weekdayDepartures: [8.20, 9.20, 11.20, 12.05, 13.20, 14.35, 16.25, 17.25, 19.25],
            saturdayDepartures: [9.40, 10.25, 11.45, 13.05, 14.30, 15.55, 17.20],
            sundayDepartures: [9.40, 10.25, 11.45, 13.05, 14.30, 15.55, 17.20]
        },
        {
            id: "bellevue",
            name: "Bellevue",
            weekdayDepartures: [8.29, 9.29, 11.29, 12.14, 13.29, 14.44, 16.34, 17.34, 19.34],
            saturdayDepartures: [10.34, 11.54, 13.14, 14.39, 16.04, 17.29],
            sundayDepartures: [10.34, 11.54, 13.14, 14.39, 16.04, 17.29]
        },
        {
            id: "moenkeberg",
            name: "Mönkeberg",
            weekdayDepartures: [8.37, 9.37, 11.37, 12.22, 13.37, 14.52, 16.42, 17.42, 19.42],
            saturdayDepartures: [9.52, 10.42, 12.02, 13.22, 14.47, 16.12, 17.37],
            sundayDepartures: [9.52, 10.42, 12.02, 13.22, 14.47, 16.12, 17.37]
        },
        {
            id: "moeltenort",
            name: "Möltenort",
            weekdayDepartures: [6.46, 8.50, 9.50, 11.50, 12.35, 13.50, 15.05, 16.55, 17.55, 19.55],
            saturdayDepartures: [10.05, 10.55, 12.15, 13.35, 15.00, 16.25, 17.50],
            sundayDepartures: [10.05, 10.55, 12.15, 13.35, 15.00, 16.25, 17.50]
        },
        {
            id: "friedrichsort",
            name: "Friedrichsort",
            weekdayDepartures: [6.02, 6.57, 8.59, 9.59, 11.59, 12.44, 13.59, 15.14, 17.04, 18.04, 20.04],
            saturdayDepartures: [11.04, 12.24, 13.44, 15.09, 16.34, 17.59],
            sundayDepartures: [11.04, 12.24, 13.44, 15.09, 16.34, 17.59]
        },
        {
            id: "laboe",
            name: "Laboe",
            weekdayDepartures: [], // It's only arrivals, but our script falls back to departures? Oh arrivals are needed!
            weekdayArrivals: [6.15, 7.13, 9.15, 10.15, 12.15, 13.00, 14.15, 15.30, 17.20, 18.20, 20.20],
            saturdayDepartures: [],
            saturdayArrivals: [10.19, 11.20, 12.40, 14.00, 15.25, 16.50, 18.15],
            sundayDepartures: [],
            sundayArrivals: [10.19, 11.20, 12.40, 14.00, 15.25, 16.50, 18.15]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 6:02 Uhr | Späteste Ankunft: 20:20 Uhr",
        "Samstag, Sonntag, Feiertag": "Früheste Abfahrt: 9:25 Uhr | Späteste Ankunft: 18:15 Uhr"
    }
};

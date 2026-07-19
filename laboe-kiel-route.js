// Laboe to Kiel Bahnhof Route Configuration
// Based on the public transport timetable, valid 04.05.2026 - 06.09.2026

const laboeKielRoute = {
    name: "F1",
    description: "Laboe → Kiel Bahnhof",
    InOperation: {
        "weekday": true,
        "saturday": true,
        "sunday": true,
        "publicHolidays": true
    },
    stations: [
        {
            id: "laboe",
            name: "Laboe",
            isMain: true,
            weekdayDepartures: [5.42, 6.25, 7.15, 9.35, 11.20, 12.35, 14.20, 14.50, 15.40, 17.30, 19.45, 20.30],
            saturdayDepartures: [10.30, 12.05, 13.10, 13.40, 15.00, 16.50, 17.15, 18.55, 19.50],
            sundayDepartures: [10.30, 12.05, 13.10, 13.40, 15.00, 16.50, 17.15, 18.55, 19.50]
        },
        {
            id: "falkenstein",
            name: "Falckenstein",
            weekdayDepartures: [11.28, 12.43, 14.28, 14.58, 15.48, 17.38, 19.53, 20.38],
            saturdayDepartures: [10.38, 12.13, 13.48, 15.08, 16.58, 19.03],
            sundayDepartures: [10.38, 12.13, 13.48, 15.08, 16.58, 19.03]
        },
        {
            id: "friedrichsort",
            name: "Friedrichsort",
            weekdayDepartures: [6.05, 6.48, 7.38, 9.51, 11.40, 12.55, 14.40, 15.10, 16.00, 17.50, 20.05, 20.50],
            saturdayDepartures: [10.50, 13.26, 14.00, 15.20, 17.10, 19.15],
            sundayDepartures: [10.50, 13.26, 14.00, 15.20, 17.10, 19.15]
        },
        {
            id: "moeltenort",
            name: "Möltenort",
            weekdayDepartures: [5.56, 6.39, 6.57, 7.29, 7.47, 10.00, 11.49, 13.04, 14.49, 15.19, 16.09, 17.59, 20.14, 20.59],
            saturdayDepartures: [10.59, 12.29, 13.35, 14.09, 15.29, 17.19, 17.29, 19.24, 20.04],
            sundayDepartures: [10.59, 12.29, 13.35, 14.09, 15.29, 17.19, 17.29, 19.24, 20.04]
        },
        {
            id: "moenkeberg",
            name: "Mönkeberg",
            weekdayDepartures: [7.10, 8.00, 10.13, 12.02, 13.17, 15.02, 15.32, 16.22, 18.12, 20.27, 21.12],
            saturdayDepartures: [11.12, 12.42, 13.48, 14.22, 15.42, 17.32, 17.42, 19.37, 20.17],
            sundayDepartures: [11.12, 12.42, 13.48, 14.22, 15.42, 17.32, 17.42, 19.37, 20.17]
        },
        {
            id: "reventlou",
            name: "Reventlou",
            weekdayDepartures: [7.22, 8.12, 10.25, 12.14, 13.29, 15.14, 15.44, 16.34, 18.24, 20.39, 21.24],
            saturdayDepartures: [11.24, 12.54, 14.00, 14.34, 15.54, 17.44, 17.54, 19.49, 20.29],
            sundayDepartures: [11.24, 12.54, 14.00, 14.34, 15.54, 17.44, 17.54, 19.49, 20.29]
        },
        {
            id: "seegarten",
            name: "Seegarten",
            weekdayDepartures: [7.30, 8.20, 10.33, 12.22, 13.37, 15.22, 15.52, 16.42, 18.32, 20.47, 21.32],
            saturdayDepartures: [11.32, 13.02, 14.08, 14.42, 16.02, 17.52, 18.02, 19.57, 20.37],
            sundayDepartures: [11.32, 13.02, 14.08, 14.42, 16.02, 17.52, 18.02, 19.57, 20.37]
        },
        {
            id: "kiel-bahnhof",
            name: "Bahnhof",
            weekdayDepartures: [7.37, 8.27, 10.40, 12.29, 13.44, 15.29, 15.59, 16.49, 18.39, 20.54, 21.39],
            saturdayDepartures: [11.39, 13.09, 14.15, 14.49, 16.09, 17.59, 18.09, 20.04, 20.44],
            sundayDepartures: [11.39, 13.09, 14.15, 14.49, 16.09, 17.59, 18.09, 20.04, 20.44]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 5:42 Uhr | Späteste Ankunft: 21:39 Uhr",
        "Samstag, Sonntag, Feiertag": "Früheste Abfahrt: 10:30 Uhr | Späteste Ankunft: 20:44 Uhr"
    },
    validity: {
        from: "04.05.2026",
        to: "06.09.2026"
    }
};

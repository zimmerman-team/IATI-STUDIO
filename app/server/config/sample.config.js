import path from "path"

const env = process.env.NODE_ENV;

import auth from './oauth'

const config = {
    'port': process.env.PORT || 2000,
    "env": env,
    "static_root": path.join(process.cwd(), "public"),

    "oipa_url": "http://localhost:8000",
    "activities_url": "/api/activities/",
    "aggregation_url": "/api/transactions/aggregations/",
    "iati_registry_url": "https://iati-staging.ckan.io/api/",
    "sessionStore": { // TODO: use redis for sessions - 2016-01-25
        "mongodb": {
            "url": "mongodb://localhost:27017/iatistudio-sessions",
        },
        "redis": {
            "host": 'localhost',
            "port": 6379,
            "db": 1
        }
    },
    "database": {
        "url": "mongodb://localhost:27017/iatistudio"
    },
    "test_database": {
        "url": "mongodb://localhost:27017/iatistudio-test"
    },
    "redis": {
        "db": 0
    },

    "visualization": {
        "max": 25,
        "itemFilters": ['recipient_country', 'recipient_region', 'sector', 'reporting_organisation'],
        "contextFilters": ['recipient_country', 'recipient_region', 'sector', 'reporting_organisation', 'document_link_category', 'activity_status', 'collaboration_type', 'default_flow_type', 'default_aid_type', 'default_finance_type', 'default_tied_status']
    },


    /*
     * Authentication
    */

    "auth": auth,

    "loginAttempts": {
        forIp: 50,
        forIpAndUser: 7,
        logExpiration: '20m'
    },

    "mainRoute": "auth",

    "companyName": "Zimmerman & Zimmerman",
    "projectName": "IATI Studio",
    "systemEmail": "",
    "cryptoKey": "CHANGE THIS",
    "requireAccountVerification": true,
    "smtp": {
        from: {
            name: process.env.SMTP_FROM_NAME || '',
            address: process.env.SMTP_FROM_ADDRESS || ''
        },
        credentials: {
            user: process.env.SMTP_USERNAME || '',
            password: process.env.SMTP_PASSWORD || '',
            host: process.env.SMTP_HOST || '',
            ssl: true
        }
    },

    oauth: auth
}

export default config

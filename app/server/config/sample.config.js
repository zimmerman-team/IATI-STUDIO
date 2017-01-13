import path from "path"

const env = process.env.NODE_ENV;

import auth from './oauth'

const config = {
    'port': process.env.PORT || 2000,
    "env": env,
    "static_root": path.join(process.cwd(), "public"),

    "oipa_url": "http://localhost:8000",
    "oipa_post_url": "https://dev-post.oipa.nl",
    "oipa_delete_url": "https://dev.oipa.nl",
    "codelists": "/api/codelists/",

    "activities_url": (pid) => `/api/publishers/${pid}/activities/`,
    "aggregation_url": "/api/transactions/aggregations/",
    "descriptionUrl": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/descriptions/`,
    "date_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/activity_dates/`,
    "status_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/activity_status/`,
    "contact_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/contact_info/`,
    "participatingOrganisationUrl": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/participating_organisations/`,
    "recipientCountryUrl": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/recipientCountries/`,
    "document_link_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/document_links/`,
    "country_budget_items_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/country_budget_items/`,
    "policy_markers_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/policy_markers/`,
    "sectors_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/sectors/`,
    "locations_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/locations/`,
    "recipient_regions_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/recipient_regions/`,
    "recipient_countries_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/recipient_countries/`,
    "capital_spend_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/capital_spend/`,
    "transactions_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/transactions/`,
    "planned_disbursements_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/planned_disbursements/`,
    "budgets_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/budgets/`,
    "comments_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/comments/`,
    "results_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/results/`,
    "conditions_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/conditions/`,
    "related_activities_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/related_activities/`,
    "humanitarian_scopes_url": (pid, activityId) => `/api/publishers/${pid}/activities/${activityId}/humanitarian_scopes/`,



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
        "contextFilters": ['recipient_country', 'recipient_region', 'sector', 'reporting_organisation', 'document_link_category',
            'activity_status', 'collaboration_type', 'default_flow_type', 'default_aid_type', 'default_finance_type', 'default_tied_status']
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

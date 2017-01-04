import { Schema, arrayOf, normalize } from 'normalizr'

export const itemSchema = new Schema('items', {
    idAttribute: "_id",
})

export const contextSchema = new Schema('context', {
    idAttribute: "_id"
})

export const visualizationSchema = new Schema('visualizations', {
    idAttribute: "_id",
})

visualizationSchema.define({
    items: arrayOf(itemSchema),
    context: arrayOf(contextSchema),
})

/*
 * For itemFilters
*/

export const RecipientCountrySchema = new Schema('recipient_country', {
    idAttribute: "id"
})
export const RecipientRegionSchema = new Schema('recipient_region', {
    idAttribute: "id"
})
export const SectorSchema = new Schema('sector', {
    idAttribute: "id"
})
export const ReportingOrganisationSchema = new Schema('reporting_organisation', {
    idAttribute: "id"
})
export const itemFilterSchema = new Schema('itemFilters', {
    // recipient_country: arrayOf(RecipientCountrySchema),
    // recipient_region: arrayOf(RecipientRegionSchema),
    // sector: arrayOf(SectorSchema),
    // reporting_organisation: arrayOf(ReportingOrganisationSchema),
})

/*
  For publisher
*/

export const publisherSchema = new Schema('publisher', {
    idAttribute: "_id",
})

/*
 * for Activity
*/

export const description = new Schema('descriptions', {
    idAttribute: "id",
})

export const date = new Schema('date', {
    idAttribute: "id",
})

export const participatingOrganisation = new Schema('participatingOrganisations', {
    idAttribute: "id",
})

export const recipientCountry = new Schema('recipientCountries', {
    idAttribute: "id",
})

export const activity = new Schema('activity', {
    idAttribute: "id",
    descriptions: arrayOf(description),
    participatingOrganisations: arrayOf(participatingOrganisation),
})


export const Schemas = {
    PUBLISHER: publisherSchema,
    VISUALIZATION: visualizationSchema,
    VISUALIZATION_ARRAY: arrayOf(visualizationSchema),
    ITEM: itemSchema,
    ITEM_ARRAY: arrayOf(itemSchema),
    CONTEXT: contextSchema,
    CONTEXT_ARRAY: arrayOf(contextSchema),
    // ITEM_FILTERS: itemFilterSchema,
    ITEM_FILTERS: {
        recipient_country: arrayOf(RecipientCountrySchema),
        recipient_region: arrayOf(RecipientRegionSchema),
        sector: arrayOf(SectorSchema),
        reporting_organisation: arrayOf(ReportingOrganisationSchema),
    },
}

export default Schemas

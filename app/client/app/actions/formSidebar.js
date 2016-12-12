
const FIELD_BLANK = 'FIELD_BLANK';
const FIELD_VALID = 'FIELD_VALID';
const FIELD_INVALID = 'FIELD_INVALID';
const NAV_VALIDATION_CLASS = 'fa fa-check valid-nav';
const NAV_INVALIDATION_CLASS = 'fa fa-times invalid-nav';

export const navigation = [{
  page: 0,
  navHeading: 'Identification',
  subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
    {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
  link: '/publisher/activity/identification',
},
  {
    page: 1,
    navHeading: 'Basic information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/basic-info',
  },
  {
    page: 2,
    navHeading: 'Participating organisations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: 'fa fa fa-check valid-nav'},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/participating-organisation',
  },
  {
    page: 3,
    navHeading:'Geopolitical information',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/geopolitical-information',
  },
  {
    page: 4,
    navHeading:'Classifications',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/classifications',
  },
  {
    page: 5,
    navHeading: 'Financial',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/financial',
  },
  {
    page: 6,
    navHeading: 'Documents',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/document-link',
  },
  {
    page: 7,
    navHeading: 'Relations',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/relations',
  },
  {
    page: 8,
    navHeading: 'Performance',
    subHeadings: [{field: 'Reporting organisation', status: FIELD_VALID, navValidationClass: NAV_VALIDATION_CLASS},
      {field: 'Organisation identifier', status: FIELD_BLANK, navValidationClass: ''}, {field: 'Name', status: FIELD_INVALID, navValidationClass: NAV_INVALIDATION_CLASS}],
    link: '/publisher/activity/performance',
  }
];

export function setFormValidationData(bool) {
  return {
    type: FIELD_VALID,
    show: FIELD_VALID,
  }
}

export function getBasicInformationData(url, options={}) {

}

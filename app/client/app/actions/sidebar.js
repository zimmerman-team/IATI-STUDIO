export const FIELD_BLANK = 'FIELD_BLANK';
export const FIELD_VALID = 'FIELD_VALID';
export const FIELD_INVALID = 'FIELD_INVALID';
export const NAV_VALIDATION_CLASS = 'fa fa-check valid-nav';
export const NAV_INVALIDATION_CLASS = 'fa fa-times invalid-nav';

export const SIDEBAR_NAVIGATION_REQUEST = 'SIDEBAR_NAVIGATION_REQUEST';
export const SIDEBAR_NAVIGATION_SUCCESS = 'SIDEBAR_NAVIGATION_SUCCESS';
export const SIDEBAR_NAVIGATION_FAILURE = 'SIDEBAR_NAVIGATION_FAILURE';

export const sidebarNav = {page: 0,
  navigation: [
    {
      page: 0,
      form: 'identification',
      navHeading: 'Identification',
      link: '/publisher/activity/identification/identification',
      activeSubForm: 'identification',
      subHeading: [{title: "identification", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/identification'}]
    },
    {
      page: 1,
      form: 'basic-info',
      navHeading: 'Basic information',
      activeSubForm: 'title',
      link: '/publisher/activity/basic-info/basic-info',
      subHeading: [{title: "title", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/title'},
        {title: "description", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/basic-info/description'},
        {title: "status", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/basic-info/status'},
        {title: "date", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/basic-info/date'},
        {title: "contact", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/basic-info/contact'}],
    },
    {
      page: 2,
      navHeading: 'Participating organisations',
      link: '/publisher/activity/participating-organisation/participating-organisation',
      form: 'participating-organisation',
      activeSubForm: 'identification',
      subHeading: [{title: "identification", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/identification'}]
    },
    {
      page: 3,
      navHeading:'Geopolitical information',
      link: '/publisher/activity/geopolitical-information/geopolitical-information',
      form: 'geopolitical-information',
      activeSubForm: 'identification',
      subHeading: [{title: "identification", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/identification'}]
    },
    {
      page: 4,
      navHeading:'Classifications',
      link: '/publisher/activity/classifications/classifications',
      form: 'classifications',
      activeSubForm: 'identification',
      subHeading: [{title: "Identification", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/identification'}]
    },
    {
      page: 5,
      navHeading: 'Financial',
      link: '/publisher/activity/financial/financial',
      form: 'financial',
      activeSubForm: 'identification',
      subHeading: [{title: "budget", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/financial/budget'},
        {title: "planned-disbursement", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/financial/planned-disbursement'},
        {title: "transaction", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/financial/transaction'},
        {title: "capital", navValidationClass: '', status: FIELD_BLANK, isActive: false, canNavigate: false, link: '/publisher/activity/financial/capital'}]
    },
    {
      page: 6,
      navHeading: 'Documents',
      link: '/publisher/activity/document-link/document-link',
      form: 'document-link',
      activeSubForm: 'identification',
      subHeading: [{title: "Document Link", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/document-link/document-link'}]
    },
    {
      page: 7,
      navHeading: 'Relations',
      link: '/publisher/activity/relations/relations',
      form: 'relations',
      activeSubForm: 'relations',
      subHeading: [{title: "relations", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/relations/relations'}]
    },
    {
      page: 8,
      navHeading: 'Performance',
      link: '/publisher/activity/performance/performance',
      form: 'performance',
      activeSubForm: 'identification',
      subHeading: [{title: "Identification", navValidationClass: '', status: FIELD_BLANK, isActive: true, canNavigate: true, link: '/publisher/activity/basic-info/identification'}]
    }
  ]
};

export function getBasicInformationData(reduxForms, mainForm, subForm) {
  const activeNavigation = sidebarNav.navigation.filter(nav => nav.form === mainForm)[0];
  const page = activeNavigation.page;

  const reduxFormTitles = Object.keys(reduxForms);
  //Or on basis on subForm
  const activeReduxFormTitle = reduxFormTitles.filter(reduxFormTitle => reduxFormTitle.indexOf(mainForm) > -1)[0];
  let result = Object.assign({}, activeNavigation);
  const reduxFormData = reduxForms[activeReduxFormTitle];

  const anyTouched = reduxFormData.anyTouched;
  const syncError = reduxFormData.syncErrors;

  let newSubHeadingList = [];
  let activeSubNavigaitonIndex = 100;

  activeNavigation.subHeading.map((subHeading, key) => {
    let newSubHeading = Object.assign({}, subHeading);
    if (subHeading.title === subForm) {
      activeSubNavigaitonIndex = key;
      if (anyTouched) {
        newSubHeading.status = (syncError && syncError.type) ? FIELD_INVALID : FIELD_VALID;
        newSubHeading.navValidationClass = (syncError && syncError.type) ? NAV_INVALIDATION_CLASS : NAV_VALIDATION_CLASS;
      }
      newSubHeading.isActive = true;
      newSubHeading.canNavigate = true;
    } else {
      newSubHeading.navValidationClass = '';
      newSubHeading.isActive = false;
      newSubHeading.canNavigate = (activeSubNavigaitonIndex > key);
    }
    newSubHeadingList.push(newSubHeading);

  });
  result.subHeading = newSubHeadingList;

  return {
    type: SIDEBAR_NAVIGATION_SUCCESS,
    navigation: result,
    page: page,
  };
}
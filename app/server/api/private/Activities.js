"use strict"

import _ from 'lodash'

import config from '../../config/config'
import { oipaGet } from '../../config/request'

import { getItemFilterOptions, getContextFilterOptions } from '../../oipa/meta'

import { print, printTrace } from '../../utils/dev'

import Visualization from '../../models/Visualization'

var ActivitiesMetaAPI = {
  publishActivity: function(activity) {
    console.log(activity)
  }
}

module.exports = ActivitiesMetaAPI




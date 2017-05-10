"use strict"

import { oipaGetXml } from '../config/request'


export const getXmlFile = function(datasetName){

  const req_options = { url: '/api/export/activities/?format=xml&xml_source_ref='+datasetName }
  return oipaGetXml(req_options)
}

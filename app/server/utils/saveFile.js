"use strict"

import fsp from 'fs-promise'


export const saveXmlFile = function(datasetName, content){

  const fileLocation = "public/iati-xml/" + datasetName + ".xml"
  return fsp.writeFile(fileLocation, content)
    .then(() => (fileLocation))
}

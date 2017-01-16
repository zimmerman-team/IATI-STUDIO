/*
 * Basic default request objects for using with the OIPA API
*/

// import request from 'request'
import request from 'request-promise'
import config from './config'

export const oipaBase = request.defaults({
    baseUrl: config.oipa_url,
    json: true,
    headers: [
        {
           name: 'Content-type',
           value: 'application/json'
        }
    ]
})


export const oipaXmlBase = request.defaults({
    baseUrl: config.oipa_url,
    headers: [
        {
           name: 'Content-type',
           value: 'application/xml'
        }
    ]
})


export const oipaExport = oipaXmlBase.defaults({
    method: 'GET',
})

export const oipaGet = oipaBase.defaults({
    method: 'GET',
})

export const oipaPost = oipaBase.defaults({
    method: 'POST',
})

export const oipaUpdate = oipaBase.defaults({
    method: 'PUT',
})

export const oipaDelete = oipaBase.defaults({
    method: 'DELETE',
})

export const oipaGetXml = request.defaults({
    baseUrl: config.oipa_url,
    method: 'GET',
})

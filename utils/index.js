import axios from 'axios'

const baseId = process.env.AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY

export const getParamBuilder = (params) => {
  let paramUrlBuild = ''

  for (const thisParamType in params) {
    const paramTitle = params[thisParamType].param
    const paramVals = params[thisParamType].value

    for (const thisParam in paramVals) {
      const paramVal = paramVals[thisParam]
      paramUrlBuild = paramUrlBuild + '&' + encodeURIComponent(paramTitle) + '=' + encodeURIComponent(paramVal)
    }
  }

  return paramUrlBuild
}

export const getRequest = (tabName, params, offset, mergedResponse) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async function (resolve, reject) {
    try {
      const options = {
        method: 'get',
        contentType: 'application/json',
        muteHttpExceptions: false
      }

      const apiHost = 'https://api.airtable.com/v0/' + baseId + '/' + tabName + '/'
      let apiURL = apiHost + '?api_key=' + apiKey + params

      if (offset != null) {
        apiURL = apiURL + '&offset=' + offset
      }

      const response = await axios.get(apiURL, options)

      if (mergedResponse == null) {
        mergedResponse = { records: [] }
      }

      const mergedResponseArray = mergedResponse.records.concat(response.data.records)
      mergedResponse.records = mergedResponseArray

      while (response.data.offset) {
        mergedResponse = getRequest(tabName, params, JSON.parse(response).offset, mergedResponse)
      }

      console.log('response', mergedResponse)
      resolve(mergedResponse)
    } catch (err) {
      reject(err)
    }
  })
}

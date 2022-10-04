const axios = require('axios')

exports.handler = async (event, context) => {
  const formId = 'Tklz9tEC'
  const apiKey = process.env.TYPEFORM_API_KEY
  let phoneNumber = event.queryStringParameters['phone-number']

  if (!apiKey) {
    return errorMsg('Api key was not set')
  }

  if (!phoneNumber) {
    return errorMsg('phone-number parameter is required', 400)
  }

  phoneNumber = phoneNumber.replace('+', '').trim()

  try {
    const options = {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    }

    const response = await axios.get(`https://api.typeform.com/forms/${formId}/responses?query=${phoneNumber}`, options)

    const answers = []

    response.data.items.forEach(item => {
      const obj = {}

      item.answers.forEach(answer => {
        const question = answer.field.type === 'short_text' ? 'name' : 'phone_number'
        const value = answer.text || answer.phone_number

        obj[question] = value
      })

      if (obj.phone_number.replace('+', '') === phoneNumber) answers.push(obj)
    });

    return { statusCode: 200, body: JSON.stringify({ answers: process.env }) }
  } catch (error) {
    console.error(error)

    // If Typeform rejects the given API key
    if (error.response.status === 401) {
      return errorMsg('Could not connect to Typeform because the API key was invalid')
    }

    return errorMsg('An error occurred, please try again')
  }
}

const errorMsg = (str, statusCode = 500) => {
  return {
    statusCode,
    body: JSON.stringify({ msg: str })
  }
}
const axios = require('axios')

exports.handler = async (event, context) => {
  const formId = 'qJe8D1BW'
  let phoneNumber = event.queryStringParameters['phone-number']

  if (!phoneNumber) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'phone-number parameter is required'
      })
    }
  }

  phoneNumber = phoneNumber.replace('+', '')

  try {
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`
        }
    }

    const response = await axios.get(`https://api.typeform.com/forms/${formId}/responses?query=${phoneNumber}`, options)

    const answers = response.data.items.map(item => item.answers);

    return { statusCode: 200, body: JSON.stringify({ answers }) }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500
    }
  }
}

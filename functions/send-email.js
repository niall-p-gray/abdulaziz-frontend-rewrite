const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: 'Method not Implemented' })
    }
  }

  const { subject = null, body = null } = JSON.parse(event.body)

  await send(subject, body)

  return {
    statusCode: 200,
    body: ''
  }
}

const send = async (subject, body) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  })

  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: 'thomasbovio@gmail.com',
    subject,
    html: body
  })

  console.log('Message sent: %s', info.messageId)
}

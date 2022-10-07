exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 501,
            body: JSON.stringify({ message: 'Method not Implemented' })
        }
    }
    
    const { password = null } = JSON.parse(event.body)
    
    return {
        statusCode: isValid(password) ? 200 : 401,
        body: ''
    }
}

const isValid = (pw) => {
    const adminPassword = process.env.ADMIN_PASSWORD || 'howdyhowdy'

    return pw === adminPassword
}
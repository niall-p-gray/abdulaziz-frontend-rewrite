import Airtable from 'airtable'

const baseId = process.env.AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY

// eslint-disable-next-line object-shorthand
const base = new Airtable({ apiKey: apiKey }).base(baseId)

export default base

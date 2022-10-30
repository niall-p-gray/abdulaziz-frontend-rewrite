const { GoogleSpreadsheet } = require('google-spreadsheet')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: 'Method not Implemented' })
    }
  }

  const { dates = null, orders = null } = JSON.parse(event.body)

  if (!dates || !orders) {
    return {
      statusCode: 400,
      body: '[dates] & [orders] are required'
    }
  }

  await updateSheet(dates, orders)

  return {
    statusCode: 200,
    body: ''
  }
}

const updateSheet = async (dates, orders) => {
  const { sheet, rows } = await getSheet()

  // We’ll transform the dates array into a string of 
  // comma separated dates to drop them into a single cell
  sheet.getCellByA1('A1').value = dates.join(', ')

  for (let index = 0; index < orders.length; index++) {
    const product = orders[index]

    const row = findTargetProductRow(product.productName, rows, sheet)

    if (!row) continue

    const qtyCell = sheet.getCellByA1('B' + row.rowIndex)

    qtyCell.value = product.qty
}

  await sheet.saveUpdatedCells()
}

const getSheet = async () => {
  const doc = new GoogleSpreadsheet(
    process.env.PRODUCTION_PLANNER_SPREADSHEET_ID
  )

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n")
  })

  await doc.loadInfo() // load document properties and sheets

  const sheet = doc.sheetsByTitle['Demand'] // target sheet
  await sheet.loadCells();
  await sheet.loadHeaderRow(2) // Specify which row is the header
  const rows = await sheet.getRows()

  return {
    sheet,
    rows,
    doc
  }
}

// Finds the row of a given product name
const findTargetProductRow = (name, rows, sheet) => {
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index]
    const productNameCell = sheet.getCellByA1('A' + row.rowIndex)
    // We’ll first try to match against the value of the cell.
    // If no match found, we’ll try checking against its note value
    if (productNameCell.value && productNameCell.value.trim() === name.trim())
      return row
    if (productNameCell.note && productNameCell.note.trim() === name.trim())
      return row
  }
}

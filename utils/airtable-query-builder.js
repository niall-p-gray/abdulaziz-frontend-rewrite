export default () => {
  const filters = []

  return {
    get () {
      if (!filters.length) {
        return ''
      }

      const str = filters.join(', ')

      return `AND(${str})`
    },
    where (column, value) {
      filters.push(`{${column}}="${value}"`)
      return this
    },
    before (column, value) {
      filters.push(`IS_BEFORE({${column}}, "${value}")`)
      return this
    },
    after (column, value) {
      filters.push(`IS_AFTER({${column}}, "${value}")`)
      return this
    },
    not (column, value) {
      filters.push(`NOT({${column}}="${value}")`)
      return this
    },
    whereIn (column, values) {
      const re = values.join('|')
      filters.push(`REGEX_MATCH({${column}}, "${re}")`)
      return this
    }
  }
}

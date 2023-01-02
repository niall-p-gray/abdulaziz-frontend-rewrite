import moment from 'moment'

export const TEST_CLIENT_IDS = [
  'recQ3nAfYJ41yUrj5'
]

export const weekDayNames = () => {
  return Array.apply(null, Array(7)).map((_, index) => {
    return moment(index, 'e').startOf('week').isoWeekday(index + 1).format('dddd')
  })
}

export const getWeekDayNumByName = (name) => {
  const weekDays = weekDayNames()

  for (let index = 0; index < weekDays.length; index++) {
    const day = weekDays[index]

    if (day.toLowerCase() === name.toLowerCase()) {
      return index + 1
    }
  }
}

export const breakUpArrayIntoChunks = (array, size) => {
  const chunks = []

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size))
  }

  return chunks
}

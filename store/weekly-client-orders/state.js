import moment from 'moment'

const currentWeek = moment().startOf('isoWeek').format('DD-MM-YYYY')

export default () => ({
  selectedWeek: currentWeek, // Initial week,
  selectedDay: currentWeek, // Start of initial week
  selectedClientId: null,
  stagedProductQtyUpdates: {}
})

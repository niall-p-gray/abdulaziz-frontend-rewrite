import moment from 'moment'

const currentWeek = moment().startOf('isoWeek').format('DD-MM-YYYY')

export default () => ({
  selectedWeek: currentWeek, // Initial week,
  selectedClientId: null,
  stagedProductQtyUpdates: {}
})

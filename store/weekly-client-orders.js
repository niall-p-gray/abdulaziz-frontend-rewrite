import moment from 'moment'

const currentWeek = moment().startOf('isoWeek').format('DD-MM-YYYY')

export const state = () => ({
  selectedWeek: currentWeek // Initial week
})

export const mutations = {
  SET_SELECTED_WEEK (state, week) {
    state.selectedWeek = week
  }
}

export const actions = {
  updateSelectedWeek ({ commit }, week) {
    if (!/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(week)) {
      console.error('Given date must be in DD-MM-YYYY format')
      return
    }

    commit('SET_SELECTED_WEEK', week)
  }
}

export const getters = {
  selectedWeek (state) {
    return state.selectedWeek
  }
}

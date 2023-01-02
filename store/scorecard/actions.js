import base from '@/airtable'
import { TEST_CLIENT_IDS } from '@/utils'

export default {
  async getClients ({ commit }) {
    const records = await base('Clients').select().all()

    commit('setClients', records)
  },
  async getOrders ({ commit }, data = {}) {

    if (data.dateRange === undefined) {
      throw new Error('orderDate is required')
    } else {
      console.log('@@@');
      console.log(data.dateRange);
      console.log(data.customStartDate);
      console.log(data.customEndDate);
      console.log('@@@');
    }
    
    var startDate;
    var endDate;
    if (data.dateRange.indexOf('past') > -1) {
      
      console.log('PAST');
      var daysMinus = data.dateRange.replace('past', '');
      console.log(daysMinus);

      startDate = this.$moment().subtract(daysMinus, 'days').format('YYYY-MM-DD')
      console.log(startDate);
      endDate = this.$moment().format('YYYY-MM-DD')
      console.log(endDate);

    } else if (data.dateRange.indexOf('future') > -1) {

      console.log('FUTURE');
      var daysPlus = data.dateRange.replace('future', '');
      console.log(daysPlus);

      startDate = this.$moment().format('YYYY-MM-DD')
      console.log(startDate);
      endDate = this.$moment().add(daysPlus, 'days').format('YYYY-MM-DD')
      console.log(endDate);

    } else if (data.dateRange == 'custom' && data.customStartDate != null && data.customEndDate != null) {

      startDate = data.customStartDate
      console.log(startDate);
      endDate = data.customEndDate
      console.log(endDate);

    }

    const exludeTestClients = TEST_CLIENT_IDS.map(id => `NOT({Client Rec ID}='${id}')`).join(',')

    const query = {
      filterByFormula: `AND(IS_AFTER({Date},'${startDate}'), IS_BEFORE({Date},'${endDate}'), OR(${exludeTestClients}))`
    }

    const records = await base('Order')
      .select(query)
      .all()

    console.log(records);

    commit('setOrders', records)
  }
}

<template>
    <div>
      <portal to="page-title">Scorecard</portal>
      <scorecardDateRangeSelector @dateRange="buildTableUsingDateRange"
      :dateRangeInputs = getDateRangeInputs
      @changestartdate="changeCustomStartRange"
      @changeenddate="changeCustomEndRange"
      />
      <main v-if="!loading && !error">
        <ScorecardBlock v-if="pushOrdersByClientType.clientOrders.length"
        :ordersGroupedByClientType = pushOrdersByClientType
        />
      <div v-else>
        <p>&nbsp;</p>
        <div class="flex justify-center text-center w-full">
          <h1 class="">
            No results found.
          </h1>
        </div>
      </div>
      </main>
      <div v-else>
        <p>&nbsp;</p>
        <div class="flex justify-center text-center w-full">
          <h1 class="">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  //import ClientTypeOrders from '@/components/delivery/summary/ClientTypeOrders'
  //import DeliverySummaryDateSelector from '@/components/delivery/summary/DeliverySummaryDateSelector '
  //import ClientTypeFilter from '@/components/filters/ClientTypeFilter'
  import scorecardDateRangeSelector from '@/components/scorecard/scorecardDateRangeSelector'
  import ScorecardBlock from '@/components/scorecard/ScorecardBlock'
  
  export default {
    layout: 'dashboard',
    components: {
      //ClientTypeOrders,
      //ClientTypeFilter,
      //DeliverySummaryDateSelector,
      scorecardDateRangeSelector,
      ScorecardBlock
    },
    data () {
      return {
        selectedClientTypes: [],
        loading: false,
        error: false,
        initialDate: this.$moment(),
        customStartDate: null,
        customEndDate: null,
        dateRange: 'past7'
      }
    },
    mounted () {
      this.buildOrderData('past7') // Initially load day’s orders
    },
    computed: {
      ...mapGetters({
        clients: 'scorecard/clients',
        orders: 'scorecard/orders', 
        //products: 'delivery-summary/products',
        //ordersPerClient: 'delivery-summary/ordersPerClient',
        ordersByClientType: 'scorecard/getOrdersByClientType'
      }),
      getDateRangeInputs () {

        console.log('111')

        var dateRangeInputs = [
          {'title':'Past Orders', 'inputs':[{'id':'past7', 'title':'Past 7'}, {'id':'past14', 'title':'Past 14'}, {'id':'past28', 'title':'Past 28'}]},
          {'title':'Future Orders', 'inputs':[{'id':'future7', 'title':'Future 7'}, {'id':'future14', 'title':'Future 14'}, {'id':'future28', 'title':'Future 28'}]},
        ];

        console.log(dateRangeInputs)
        console.log('222');

        return dateRangeInputs;

      },
      pushOrdersByClientType () {
        const ordersByClientType = this.ordersByClientType
        return ordersByClientType
      }
    },
    methods: {
      ...mapActions({
        getClients: 'scorecard/getClients',
        getOrders: 'scorecard/getOrders'
      }),
      chooseDateRange (date) {
        console.log(this)
        //this.load(date)
      },
      changeCustomStartRange (date) {
        console.log('???');
        this.customStartDate = date
        this.buildOrderData ('custom')
      },
      changeCustomEndRange (date) {
        console.log('¿¿¿');
        this.customEndDate = date
        this.buildOrderData ('custom')
      },
      buildTableUsingDateRange (range) {
        console.log('+++');
        console.log(range);
        console.log('+++');
        this.buildOrderData (range)
      },
      async buildOrderData (dateRange) {
        
        console.log('entering order builder')

        this.dateRange = dateRange;

        this.loading = true
        this.error = false
        
        console.log(dateRange);
        var customStartDate = this.customStartDate;
        var customEndDate = this.customEndDate;
        //var dateStart = '2022-09-01';
        //var dateEnd = '2022-09-30';
      
        try {
          await this.getOrders( {dateRange, customStartDate, customEndDate} );
          await this.getClients();
        } catch (error) {
          console.error(error)
          this.error = true
        }
  
        this.loading = false
      }
    }
  }
  </script>
  
  <style scoped>
  main {
    @apply flex flex-col;
  }
  
  .orders-container {
    @apply order-2 lg:order-1;
  }
  
  .print-all-orders{
    @apply flex justify-center mt-16 lg:mt-6 order-1 lg:order-2 lg:mt-10;
  }
  
  .btn {
    @apply flex items-center;
  }
  </style>
  
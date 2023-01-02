export default {
    clients (state) {
      return state.clients
    },
    orders (state) {
      return state.orders
    },
    getOrdersByClientType (state) {
  
      const { orders, clients } = state
      
      var editedOrders = [];
      var uniqueClientTypes = [];

      for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {

        const order = orders[orderIndex];
        
        var clientType;
        if (order.fields['Client Rec ID']) {
          var clientRecord = clients.find(cl => cl.id === order.fields['Client Rec ID'][0]);
          if (clientRecord.fields['Client Type']) {
            clientType = clientRecord.fields['Client Type'].toString();
          } else {
            clientType = '-';
          }
        } else {
          clientType = '-';
        }

        if (uniqueClientTypes.indexOf(clientType) == -1) {
          uniqueClientTypes.push(clientType);
        }

        if (order.fields['Summed Orders'] && (+order.fields['Summed Orders'] > 0)) {
          editedOrders.push({'summedOrders':order.fields['Summed Orders'], 'clientType':clientType});
        }

      }

      uniqueClientTypes = uniqueClientTypes.sort((a, b) => a > b );

      var clientTypeOrderTotals = [];
      var orderSumsTotal = 0;
      var orderCountstotal = 0;

      for (var thisClientType of uniqueClientTypes) {
        
        var clientTypeFilteredOrders = editedOrders.filter((order, index) => order.clientType === thisClientType);

        var orderItemsTotalByClientType = clientTypeFilteredOrders.reduce((sum, order) => {
          return sum += +order.summedOrders;
        }, 0);
        
        orderSumsTotal = orderSumsTotal + orderItemsTotalByClientType;
        orderCountstotal = orderCountstotal + clientTypeFilteredOrders.length;
        clientTypeOrderTotals.push({'clientType': thisClientType.replace(/(\d+)\.(\s+)/g, ""), 'orderSums':orderItemsTotalByClientType, 'orderCounts':clientTypeFilteredOrders.length});

      }

      return {orderSums:orderSumsTotal, orderCounts:orderCountstotal, clientOrders:clientTypeOrderTotals};
      
      //started filtering by date, which wasn't needed - might be able to reuse though

      /*const ordersGroupedByDate = editedOrders.reduce((acc, order) => {
        const date = order.date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(order)
        return acc
      }, {})

      console.log(ordersGroupedByDate);

      return ordersGroupedByDate;*/
      
    }
  }
  
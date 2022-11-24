<template>
  <div class="order">
    <div @click="expanded = !expanded" class="main-content lg:cursor-pointer">
      <div class="flex flex-wrap">
        <div v-if="order.date" class="cell date">
          <div class="title">Date</div>
          <div class="value">
            {{ order.date }}
          </div>
        </div>
        <div class="cell time">
          <div class="title">Ready time</div>
          <div class="value">
            {{ order.readyTime ? order.readyTime : '---' }}
          </div>
        </div>
        <div class="cell time">
          <div class="title">Delivery time</div>
          <div class="value">
            {{ order.deliveryTime ? order.deliveryTime : '---' }}
          </div>
        </div>
        <div class="cell qty">
          <div class="title">#</div>
          <div class="value">{{ order.qty }}</div>
        </div>
        <div class="cell delivery">
          <div class="title">Delivery</div>
          <div class="value">
            <div v-if="order.deliveryType">
              <div v-if="order.deliveryType.toLowerCase() === 'delivery'">
                <img src="~/assets/icons/truck.svg" />
                <div v-if="order.deliveryDriver" class="text-xs">
                  {{ order.deliveryDriver }}
                </div>
              </div>
              <img
                v-if="order.deliveryType.toLowerCase() === 'pickup'"
                src="~/assets/icons/user-check.svg"
              />
            </div>
            <div v-else>---</div>
          </div>
        </div>
        <div class="cell client">
          <div class="title">Client</div>
          <div class="value">
            <div class="flex justify-between items-center">
              <div>
                <p>{{ order.clientName }}</p>
                <p v-if="order.clientDetails" class="text-sm font-normal">
                  {{ order.clientDetails }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="order.notes" class="special-notes">
        <strong>Special Notes: </strong>{{ order.notes }}
      </div>
    </div>
    <div :class="{ expanded: expanded }" class="expandable-content">
      <div class="details order-2 md:order-1">
        <div class="detail">
          <span class="title">Address</span>
          <span class="value">{{ order.address ? order.address : '---' }}</span>
        </div>
        <div class="detail">
          <span class="title">Contact name</span>
          <span class="value">
            {{ order.contactName ? order.contactName : '---' }}
          </span>
        </div>
        <div class="detail">
          <span class="title">Contact phone number</span>
          <span class="value">
            {{ order.phoneNumber ? order.phoneNumber : '---' }}
          </span>
        </div>
        <div class="detail">
          <span class="title">Delivery note</span>
          <span class="value">
            {{ order.deliveryNotes ? order.deliveryNotes : '---' }}
          </span>
        </div>
      </div>
      <OrderProducts :order="order" class="order-1 md:order-2" />
    </div>
    <div class="actions">
      <a :href="`/orders/${order.id}`" target="_blank">
        <font-awesome-icon :icon="['fas', 'pencil']" class="text-xs" />
      </a>
      <font-awesome-icon
        :icon="['fas', `chevron-${expanded ? 'up' : 'down'}`]"
        class="text-s ml-4"
      />
    </div>
  </div>
</template>

<script>
import OrderProducts from '@/components/orders/order-details-card/OrderProducts'

export default {
  components: {
    OrderProducts
  },
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>

<style lang="scss" scoped>
$bgColor: #fbfbf9;

.order {
  margin-top: 16px;
  position: relative;

  &:first-child .title {
    display: block !important;
  }

  .actions {
    color: #00b373;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    margin: 5px 15px;
  }

  .main-content {
    background: $bgColor;

    .special-notes {
      @apply text-sm text-gray-700;
      padding: 0px 20px;
      padding-bottom: 13px;
    }
  }

  .expandable-content {
    max-height: 0;
    opacity: 0;
    padding: 0;
    overflow: hidden;
    transition: all 0.25s ease-in-out;

    &.expanded {
      max-height: 2000px !important;
      padding: 13px 20px;
      opacity: 1;
    }

    .details {
      display: flex;

      .detail {
        margin-right: 40px;
        max-width: 35%;
        display: flex;
        flex-direction: column;

        .title {
          color: #c4c4c4;
          @apply font-bold text-sm;
        }
      }
    }
  }

  .cell {
    overflow: hidden;
    width: 11%;

    &.date {
      width: 17%;
    }

    &.qty {
      .title,
      .value {
        text-align: center;
      }
    }

    &.client {
      flex: 1;
    }

    .title {
      color: #c4c4c4;
      @apply text-xs block lg:hidden;
    }

    .value {
      background: $bgColor;
      color: #212322;
      border-radius: 8px;
      height: 100%;
      font-weight: bold;
      @apply text-sm;
    }

    .title,
    .value {
      padding: 13px 0;
    }

    &:first-child {
      .title,
      .value {
        padding-left: 20px;
      }
    }

    &:last-child {
      .value {
        padding-right: 20px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    background: $bgColor;
    padding: 13px 20px;

    .actions {
      margin: 0px 7px !important;
    }

    .details {
      flex-direction: column;
      margin-top: 15px;

      .detail {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
      }
    }

    .expandable-content {
      display: flex;
      flex-direction: column;

      &.expanded {
        padding: 13px 0px !important;
      }
    }

    .cell {
      width: 50% !important;
      margin-top: 10px;

      &.qty {
        .value,
        .title {
          text-align: left !important;
        }
      }

      &:last-child {
        width: 100% !important;
        flex: auto;
      }

      .title,
      .value {
        padding: 0 !important;
      }
    }

    .special-notes {
      padding: 0px 0px;
      padding-bottom: 13px;

      strong {
        color: #c4c4c4;
        @apply text-xs block mb-1 mt-3;
      }
    }
  }
}
</style>

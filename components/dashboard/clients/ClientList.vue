<template>
  <div>
    <GroupedClientTypeCard
    v-for="(group, index) in groupedClientTypes"
    :key="index"
    :title="group.name"
    :clients="group.clients"
    :class="{'mt-6': index > 0}" />
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GroupedClientTypeCard from '@/components/dashboard/clients/GroupedClientTypeCard'

export default {
  components: {
    GroupedClientTypeCard
  },
  computed: {
    ...mapGetters({
      clients: 'entities/clients/clients'
    }),
    groupedClientTypes () {
      const groups = []
      const clientTypesToInclude = ['storefront', 'coffee shop', 'bar']

      for (let index = 0; index < this.clients.length; index++) {
        const client = this.clients[index]
        const clientType = client.fields['Client Type'].replace(/^[0-9]\./, '').trim()
        const displayOrder = client.fields['Client Type'].match(/[0-9]*/)[0]

        if (!clientTypesToInclude.includes(clientType.toLowerCase())) {
          continue
        }

        if (client.fields['Show on TOC?'] === 0) {
          continue
        }

        if (typeof client.fields.Active === 'undefined' || !client.fields.Active) {
          continue
        }

        let group = groups.find(g => g.name === clientType)

        if (!group) {
          group = {
            name: clientType,
            clients: [],
            displayOrder
          }

          groups.push(group)
        }

        group.clients.push(client)

        const groupIndex = groups.findIndex(g => g.name === clientType)
        groups.splice(groupIndex, 1, group)
      }

      return groups.sort((a, b) => a.displayOrder - b.displayOrder)
    }
  }
}
</script>

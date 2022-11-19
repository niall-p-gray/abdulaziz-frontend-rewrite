<template>
  <div>
    <div class="form-group">
      <label for="">Client Name</label>
      <select v-model="selectedClient" @change="onClientChange">
        <option :value="null">Select a client</option>
        <option
          v-for="client in sortedClients"
          :key="client.id"
          :value="client"
        >
          {{ client.fields.Name }}
        </option>
      </select>
      <span class="note">
        Can't find the client?
        <a href="https://airtable.com/shr4fVIpHTkkoldPu">Add Client</a>
      </span>
    </div>
    <div class="form-group">
      <label>Client Details</label>
      <input v-model="details" @change="onChange" type="text" placeholder="Client Details" />
      <span class="note">
       For example, if the main client is an intermediary (samples, ezCater,
       etc) - Please use this field to enter the actual client.
      </span>
    </div>
    <div class="lg:flex items-center justify-between mt-2">
      <div class="form-group">
        <label>Contact name</label>
        <input v-model="contactName" @change="onChange" type="text" placeholder="Name" />
      </div>
      <div class="form-group lg:ml-2">
        <label>Phone Number</label>
        <input v-model="phoneNumber" @change="onChange" type="text" placeholder="Phone number" />
      </div>
    </div>
    <p>
      If the contact is different from the details provided for the client please include their details here.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      selectedClient: null,
      details: null,
      contactName: null,
      phoneNumber: null
    }
  },
  computed: {
    ...mapGetters({
      clients: 'entities/clients/clients',
      fields: 'order-form/fields'
    }),
    sortedClients () {
      return [...this.clients].sort((a, b) =>
        a.fields.Name.localeCompare(b.fields.Name)
      )
    }
  },
  methods: {
    ...mapActions({
      updateFields: 'order-form/updateFields'
    }),
    onClientChange () {
      if (this.selectedClient) {
        if (this.selectedClient.fields['Primary Contact']) {
          this.contactName = this.selectedClient.fields['Primary Contact']
        }
        if (this.selectedClient.fields.Phone) {
          this.phoneNumber = this.selectedClient.fields.Phone
        }
      }

      this.onChange()
    },
    onChange () {
      this.updateFields({
        client: {
          id: this.selectedClient ? this.selectedClient.id : null,
          details: this.details,
          contactName: this.contactName,
          phoneNumber: this.phoneNumber,
          address: this.selectedClient ? this.selectedClient.fields.Address : null
        }
      })
    }
  },
  mounted () {
    if (this.fields.client) {
      const client = this.fields.client

      this.selectedClient = this.clients.find(c => c.id === client.id)
      this.details = client.details
      this.contactName = client.contactName
      this.phoneNumber = client.phoneNumber
      this.address = { ...client.address }
    }
  }
}
</script>

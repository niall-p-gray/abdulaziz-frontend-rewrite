<template>
  <div class="main">
    <div class="container">
      <h1 class="text-3xl title-text">
        Howdy Kolache Links
      </h1>
      <div v-if="!loading && !error" class="grid grid-cols-5 gap-4 justify-center mt-8">
        <div class="col-span-2">
          <LinksCard
          v-for="(group, index) in groupedLinks"
          :key="index"
          :title="group.title"
          :links="group.links"
          :class="{'mt-6': index > 0}"
          />
          <LinksCard
          :title="rewrittenLinks.title"
          :links="rewrittenLinks.links"
          class="mt-6"
          />
        </div>
        <div class="col-span-3">
          <ClientList />
        </div>
      </div>
      <div v-else class="flex justify-center items-center h-screen">
        <span v-if="error" class="text-red-500">Oops, an error occurred. Please try reloading this page</span>
        <span v-else>Loading...</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LinksCard from '@/components/dashboard/LinksCard'
import ClientList from '@/components/dashboard/clients/ClientList'

export default {
  name: 'IndexPage',
  components: {
    ClientList,
    LinksCard
  },
  data () {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    ...mapGetters({
      pageLinks: 'home/getPageLinks'
    }),
    rewrittenLinks () {
      const rewrittenLinks = {
        title: 'Rewritten Links',
        links: []
      }

      rewrittenLinks.links = this.links.filter(link => !link.external)

      rewrittenLinks.links.push({
        name: 'Client Order Page/Form',
        url: 'clients/recQ3nAfYJ41yUrj5',
        section: 'Rewritten Links',
        external: false
      })

      rewrittenLinks.links.push({
        name: 'Rewards Lookup',
        url: 'rewards/lookup',
        section: 'Rewritten Links',
        external: false
      })

      rewrittenLinks.links.push({
        name: 'Upcoming Orders',
        url: '/upcoming-orders',
        section: 'Rewritten Links',
        external: false
      })

      rewrittenLinks.links.push({
        name: 'Create Order',
        url: '/create-order',
        section: 'Rewritten Links',
        external: false
      })

      return rewrittenLinks
    },
    links () {
      const links = []

      for (let index = 0; index < this.pageLinks.length; index++) {
        const pageLink = this.pageLinks[index]
        const link = {
          name: pageLink.fields.Name,
          section: pageLink.fields.Section,
          url: pageLink.fields.URL,
          external: true
        }

        if (link.name.toLowerCase() === 'production planner (app)') {
          link.external = false
          link.url = '/production/planner'
        }

        if (link.name.toLowerCase() === 'delivery summary') {
          link.external = false
          link.url = '/delivery/summary'
        }

        if (link.name.toLowerCase() === 'upcoming orders') {
          link.external = false
          link.url = '/upcoming-orders'
        }

        if (link.name.toLowerCase().includes('create order')) {
          link.external = false
          link.url = '/create-order'
        }

        links.push(link)
      }

      return links
    },
    groupedLinks () {
      const groups = []

      for (let index = 0; index < this.links.length; index++) {
        const link = this.links[index]

        if (!link.section) {
          continue
        }

        let group = groups.find(g => g.title === link.section)

        if (!group) {
          group = {
            title: link.section,
            links: []
          }

          groups.push(group)
        }

        group.links.push(link)

        const groupIndex = groups.findIndex(g => g.title === link.section)
        groups.splice(groupIndex, 1, group)
      }

      return groups
    }
  },
  async mounted () {
    this.loading = true

    try {
      await this.getPageLinks()
      await this.getClients()
    } catch (error) {
      console.error(error)
      this.error = true
    }

    this.loading = false
  },
  methods: {
    ...mapActions('home', [
      'getPageLinks',
      'getClients'
    ])
  }
}
</script>

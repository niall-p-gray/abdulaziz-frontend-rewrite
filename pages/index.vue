<template>
  <div class="main">
    <div class="container">
      <h1 class="text-3xl title-text">
        Howdy Kolache Links
      </h1>
      <div class="grid grid-cols-5 gap-4 justify-center mt-8">
        <div class="col-span-2">
          <LinksCard
          v-for="(group, index) in groupedLinks"
          :key="index"
          :title="group.title"
          :links="group.links"
          :class="{'mt-6': index > 0}"
          />
        </div>
        <div class="col-span-3">
          <coffee-shop-card :coffee-shops="coffeeShops" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LinksCard from '@/components/dashboard/LinksCard'

export default {
  name: 'IndexPage',
  components: {
    CoffeeShopCard: () => import('@/components/dashboard/CoffeeShopCard'),
    LinksCard
  },
  computed: {
    ...mapGetters({
      pageLinks: 'home/getPageLinks',
      coffeeShops: 'home/getCoffeeShops'
    }),
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
    console.log('env', process.env)
    try {
      await this.getPageLinks()
      this.getCoffeeShops()
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    ...mapActions('home', [
      'getPageLinks',
      'getCoffeeShops'
    ])
  }
}
</script>

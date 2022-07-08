<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-white border-b-2 border-gray-200 ">
        <tr class="text-light">
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200 text-center">
            ITEM
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            MON
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            TUE
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            WED
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            THU
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            FRI
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            SAT
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            SUN
          </th>
          <th scope="col" class="px-6 py-3 border-x-2 border-gray-200">
            TOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="bg-white border-b">
          <td scope="row" class="px-4 py-2 border-x-2 border-gray-200 whitespace-nowrap">
            <p class="font-semibold text-black">
              {{ item.name }}
            </p>
            <div class="font-light">
              <span v-for="(ingredient, inIndex) in item.ingredients" :key="`ing-${inIndex}`">
                {{ ingredient }},
              </span>
            </div>
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
          <td class="px-4 py-2 border-x-2 border-gray-200 text-center">
            <input type="text" class="border-2 border-gray-300 rounded-sm w-8 h-6">
          </td>
        </tr>
        <tr class="bg-white border-b">
          <td class=" px-4 py-2" colspan="7">
            <span class="text-gray-400 font-light">
              Last Edited: 7/7 12:17
            </span>
          </td>
          <td class=" px-4 py-2 text-center">
            <span class="text-gray-700 font-light text-lg">
              Totals:
            </span>
          </td>
          <td class=" px-4 py-2 text-center">
            <span class="text-gray-900 font-semibold">
              38
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'OrderTable',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>

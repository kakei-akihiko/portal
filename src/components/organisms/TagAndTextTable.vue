<template>
  <table class="table table-sm">
    <tbody>
      <tr v-for="record in compactTable" :key="record.tag">
        <th>{{ record.tag }}</th>
        <td class="v-interval">
          <a :href="article.url" v-for="article in record.articles" :key="article.id">
            {{ article.title }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('articles', [
      'compactTable'
    ])
  },
}
</script>

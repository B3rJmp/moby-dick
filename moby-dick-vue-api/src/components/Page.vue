<template>
  <div class="w-full">
    <h1 class="text-2rem font-bold">Top 100 words in Moby Dick</h1>
    <div class="words p-10px w-full">
      <template v-if="loading">
        <p>Loading, please wait...</p>
      </template>
      <template v-else-if="!loading && sortedList.length > 0">
        <div v-for="(w, index) in sortedList" :key="index" class="word flex flex-col justify-start items-start mb-10px">
          <p>{{index + 1}}. {{w.word}}</p>
          <div class="bar py-5px text-center bg-orange-400 text-white" :style="`width: ${((w.count/topWordCount) * 100).toFixed(1)}%;`">{{w.count}}</div>
        </div>
      </template>
      <template v-else-if="error || sortedList.length <= 0">
        <h2 class="text-red-500">Something went wrong, please test your configuration, and try again</h2>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counted: {},
      loading: false,
      error: false,
      apiUrl: 'http://localhost:8000/api/get-words'
    }
  },
  computed: {
    sortedList() {
      var sorted = []

      for(let c in this.counted) {
        sorted.push({word: c, count: this.counted[c]})
      }

      sorted.sort((a,b) => {
        return b.count - a.count
      })

      return sorted.slice(0,100)
    },
    topWordCount() {
      return this.sortedList.length > 0 ? this.sortedList[0].count : 0
    }
  },
  methods: {
    getData() {
      this.loading = true
      this.error = false
      this.axios.get(this.apiUrl).then(res => {
        this.counted = res.data
        this.loading = false
      })
      .catch(err => {
        console.error(err)
        this.loading = false
        this.error = true
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<template>
  <div class="container">
    <h1 class="text-2rem font-bold">Top 100 words in Moby Dick</h1>
    <div class="words p-10px">
      <template v-if="!loading && sortedList.length > 0">
        <div v-for="(w, index) in sortedList" :key="index" class="word flex flex-col justify-start items-start mb-10px">
          <p>{{index + 1}}. {{w.word}}</p>
          <div class="bar py-5px text-center bg-orange-400 text-white" :style="`width: ${((w.count/topWordCount) * 100).toFixed(1)}%;`">{{w.count}}</div>
        </div>
      </template>
      <template v-else-if="loading">
        <p>Loading, please wait...</p>
      </template>
      <template v-else-if="!loading && sortedList.length <= 0">
        <p>Click load to begin</p>
      </template>
    </div>
  </div>
</template>

<script>
import mobyDick from '!raw-loader!../assets/moby-dick.txt'
import stopWordFile from '!raw-loader!../assets/stop-words.txt'
export default {
  data() {
    return {
      counted: {},
      loading: false,
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
    render() {
      this.loading = true
      this.counted = {}

      this.countWords().then(() => {
        this.loading = false
      })
    },
    countWords() {
      return new Promise((resolve, reject) => {
        var lines = mobyDick.split(/\r?\n/)
        var stopWords = stopWordFile.split(/\r?\n/)
        for(let line of lines) {
          let wordsInLine = line.split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
          for(let w of wordsInLine) {
            if(w && w !== '' && !stopWords.includes(w)) {
              if(this.counted[w]) {
                this.counted[w]++
              }else{
                this.counted[w] = 1
              }
            }
          }
        }
        resolve()
      })
    }
  },
  mounted() {
    this.render()
  }
}
</script>
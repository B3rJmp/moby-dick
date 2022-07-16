<template>
  <div class="container">
    <button @click="render" class="py-10px px-20px text-white bg-blue-500 rounded-4px">Load</button>
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
      words: [],
      counted: [],
      loading: false,
    }
  },
  computed: {
    sortedList() {
      let copy = [...this.counted]
      if(copy.length > 0) {
        copy.sort((a,b) => {
          return a.count > b.count ? -1 : a.count < b.count ? 1 : 0
        })

        if(copy.length > 100) {
          return copy.slice(0,100)
        }else{
          return copy
        }
      }else{
        return copy
      }
    },
    topWordCount() {
      return this.sortedList.length > 0 ? this.sortedList[0].count : 0
    }
  },
  methods: {
    render() {
      this.loading = true

      this.countWords().then(() => {
        this.loading = false
      })
    },
    countWords() {
      return new Promise((resolve, reject) => {
        var lines = mobyDick.split(/\r?\n/)
        var stopWords = stopWordFile.split(/\r?\n/)
        for(let i = 0; i < lines.length; i++) {
          let wordsInLine = lines[i].split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
          for(let ii = 0; ii < wordsInLine.length; ii++) {
            if(wordsInLine[ii] && wordsInLine[ii] !== '' && !stopWords.includes(wordsInLine[ii])) {
              let index = this.counted.findIndex(c => c.word === wordsInLine[ii])
              if(index != -1) {
                this.counted[index].count++
              }else{
                let newWord = {
                  word: wordsInLine[ii],
                  count: 1
                }
                this.counted.push(newWord)
              }
            }
          }
        }
        resolve()
      })
    }
  }
}
</script>
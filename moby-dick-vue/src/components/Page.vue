<template>
  <h1 @click="render" class="font-bold cursor-pointer">Load</h1>
</template>

<script>
import mobyDick from '!raw-loader!../assets/moby-dick.txt'
import stopWordFile from '!raw-loader!../assets/stop-words.txt'
export default {
  data() {
    return {
      words: [],
      counted: []
    }
  },
  computed: {
    sortedList() {
      let copy = [...this.counted]
      copy.sort((a,b) => {
        return a.count > b.count ? -1 : a.count < b.count ? 1 : 0
      })
      return this.copy.slice(0,99)
    },
    topWordCount() {
      return this.sortedList[0].count
    }
  },
  methods: {
    render() {
      var lines = mobyDick.split(/\r?\n/)
      var stopWords = stopWordFile.split(/\r?\n/)
      
      lines.forEach(line => {
        let wordsInLine = line.split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
        wordsInLine.forEach(w => {
          if(w && w !== '' && !stopWords.includes(w)) {
            let index = this.counted.findIndex(c => c.word === w)
            if(index != -1) {
              this.counted[index].count++
              console.log('updated count')
            }else{
              let newWord = {
                word: w,
                count: 1
              }
              this.counted.push(newWord)
              console.log('new word')
            }
          }
        })
      })
    }
  }
}
</script>
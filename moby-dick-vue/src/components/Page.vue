<template>
  <div class="container">
    <h1 @click="render" class="font-bold cursor-pointer">Load</h1>
    <div class="words p-10px">
      <div v-for="(w, index) in sample" :key="index" class="word flex flex-col justify-start items-start mb-10px">
        <p>{{index + 1}}. {{w.word}}</p>
        <div class="bar py-5px text-center bg-orange-400 text-white" :style="`width: ${((w.count/topWordCount) * 100).toFixed(1)}%;`">{{w.count}}</div>
      </div>
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
      sample: [
        {
          word: 'whales',
          count: 966
        },
        {
          word: 'achab',
          count: 754
        }
      ]
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
      return this.sample[0].count
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
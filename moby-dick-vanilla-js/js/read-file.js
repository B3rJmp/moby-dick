const {promises: fsPromises} = require('fs');

function createBar(word) {
  const target = document.getElementById('words')
  const width = (word.count/topWordCount).toFixed(1)
  console.log(27,width)
}

async function readFile() {
  try {
    const contents = await fsPromises.readFile('text-files/moby-dick.txt', 'utf-8');
    const stopWordFile = await fsPromises.readFile('text-files/stop-words.txt', 'utf-8');

    const lines = contents.split(/\r?\n/);
    const stopWords = stopWordFile.split(/\r?\n/);

    var words = []
    var counted = []

    for(line of lines) {
      let wordsInLine = line.split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
      wordsInLine.forEach(w => {
        if(w && w !== '' && !stopWords.includes(w)) {
          words.push(w)
        }
      })
    }

    words.forEach(w => {
      if(counted.find(c => c.word === w)) {
        counted[counted.findIndex(c => c.word === w)].count++
      }else{
        let newWord = {
          word: w,
          count: 1
        }
        counted.push(newWord)
      }
    })

    counted.sort((a,b) => {
      return a.count > b.count ? -1 : a.count < b.count ? 1 : 0
    })

    // if (counted.length > 100) {
    //   console.log(counted.slice(0,100))
    //   return counted.slice(0,100)
    // } else {
    //   console.log(counted)
    //   return counted
    // }
  } catch (err) {
    console.error(err);
  }

}

export const words = readFile()
  .then(res => res)
  .catch(err => err)
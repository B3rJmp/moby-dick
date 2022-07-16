const {promises: fsPromises} = require('fs');

async function readFile() {
  try {
    const contents = await fsPromises.readFile('../text-files/moby-dick.txt', 'utf-8');
    const stopWordFile = await fsPromises.readFile('../text-files/stop-words.txt', 'utf-8');

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

    if (counted.length > 100) {
      return console.log(counted.slice(0,99))
    } else {
      return console.log(counted)
    }
  } catch (err) {
    console.log(err);
  }

}

readFile();
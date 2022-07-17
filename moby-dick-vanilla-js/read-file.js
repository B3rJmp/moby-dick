const {promises: fsPromises} = require('fs');

async function readFile() {
  try {
    const contents = await fsPromises.readFile('./text-files/moby-dick.txt', 'utf-8');
    const stopWordFile = await fsPromises.readFile('./text-files/stop-words.txt', 'utf-8');

    const lines = contents.split(/\r?\n/);
    const stopWords = stopWordFile.split(/\r?\n/);

    var counted = {}

    for(let line of lines) {
      let wordsInLine = line.split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
      for(let w of wordsInLine) {
        if(w && w !== '' && !stopWords.includes(w)) {
          if(counted[w]) {
            counted[w]++
          }else{
            counted[w] = 1
          }
        }
      }
    }

    var sorted = []

    for(let c in counted) {
      sorted.push({word: c, count: counted[c]})
    }

    sorted.sort((a,b) => {
      return b.count - a.count
    })

    return sorted.slice(0,100)

  } catch (err) {
    console.error(err);
  }

}

readFile()
  .then(res => console.log(res))
  .catch(err => err)
const {promises: fsPromises} = require('fs');

async function readFile() {
  try {
    const contents = await fsPromises.readFile('./text-files/moby-dick.txt', 'utf-8');
    const stopWordFile = await fsPromises.readFile('./text-files/stop-words.txt', 'utf-8');

    const lines = contents.split(/\r?\n/);
    const stopWords = stopWordFile.split(/\r?\n/);

    var words = []
    var counted = []

    for(let line of lines) {
      let wordsInLine = line.split(' ').map(l => l.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase())
      for(let w of wordsInLine) {
        if(w && w !== '' && !stopWords.includes(w)) {
          let index = counted.findIndex(c => c.word === w)
          if(index != -1) {
            counted[index].count++
          }else{
            let newWord = {
              word: w,
              count: 1
            }
            counted.push(newWord)
          }
        }
      }
    }

    counted.sort((a,b) => {
      return a.count > b.count ? -1 : a.count < b.count ? 1 : 0
    })

    return counted.slice(0,100)

  } catch (err) {
    console.error(err);
  }

}

readFile()
  .then(res => console.log(res))
  .catch(err => err)
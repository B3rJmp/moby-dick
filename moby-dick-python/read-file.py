import re
def count():
  stopwords = []
  with open('./moby-dick-python/text-files/stop-words.txt') as swf:
    stop_word_file = swf.readlines()

  for line in stop_word_file:
    stopwords.append(line.strip())

  counted = {}
  sortedWords = {}
  with open('./moby-dick-python/text-files/moby-dick.txt', errors='ignore') as mbf:
    moby_dick = mbf.readlines()
  for line in moby_dick:
    wordsInLine = line.split()
    for w in wordsInLine:
      word = re.sub(r"[^a-zA-Z0-9]","",w.lower())
      if word not in stopwords:
        if word not in counted:
          counted[word] = 1
        else:
          counted[word] = counted[word] + 1

  sort_words = sorted(counted.items(), key=lambda x: x[1], reverse=True)

  iterator = 0
  for i in sort_words:
    if iterator > 99:
      break
    sortedWords[i[0]] = i[1]
    iterator += 1
  
  return sortedWords

def main():
  words = count()
  topCount = list(words.values())[0]
  for key, val in words.items():
    perc = round((val/topCount)*50)
    meter = '|'
    i = 0
    while i <= 50:
      if i < perc:
        meter += '-'
      elif i == perc:
        meter += '>'
      else:
        meter += ' '
      i += 1
    meter += '| ' + str(val)
    print(key)
    print(meter)

if __name__ == '__main__':
  main()
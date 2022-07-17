import os, re
def main():
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
  # print(counted)

  sort_words = sorted(counted.items(), key=lambda x: x[1], reverse=True)

  iterator = 0
  for i in sort_words:
    if iterator > 99:
      break
    sortedWords[i[0]] = i[1]
    iterator += 1
  
  print(sortedWords)

if __name__ == '__main__':
  main()
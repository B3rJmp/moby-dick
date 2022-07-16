import os, re
def main():
  with open('./moby-dick-python/text-files/moby-dick.txt') as f:
    moby_dick = f.readlines()
  # moby_dick = open('./moby-dick-python/text-files/moby-dick.txt', encoding='UTF-8')
  # stop_words_file = open('./text-files/stop-words.txt')
  for line in moby_dick:

    print(line)

if __name__ == '__main__':
  main()
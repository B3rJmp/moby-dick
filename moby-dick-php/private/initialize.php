<?php 


$words = array();
$stop_words = [];

$stop_words_file = fopen('../private/text-files/stop-words.txt','r');

while($line = fgets($stop_words_file)) {
  array_push($stop_words, rtrim(trim($line)));
}

fclose($stop_words_file);

$moby_dick = fopen('../private/text-files/moby-dick.txt','r');

while ($line = fgets($moby_dick)) {
  $newArray = explode(' ', $line);
  foreach($newArray as $word) {
    $formatted = strtolower(preg_replace('/[^A-Za-z0-9\-]/', '', $word));
    if(array_search($formatted, $stop_words) === false && $formatted != '') {
      if(isset($words[$formatted])) {
        $words[$formatted]++;
      }else{
        $words[$formatted] = 1;
      }
    }
  }
}

arsort($words);

$topWordCount = reset($words);

fclose($moby_dick);
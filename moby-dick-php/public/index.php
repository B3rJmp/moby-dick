<?php 
  require_once('../private/initialize.php');
  $iterator = 0;
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moby Dick (PHP)</title>
    <link rel="stylesheet" href="css/index.css">
  </head>
  <body>
    <div class="container">
      <h1>Top 100 words in Moby Dick</h1>
      <div id="words">
        <?php foreach($words as $word => $count) { ?>
          <?php if($iterator > 99) break; ?>
          <div class="word">
            <p><?= $iterator+1 . '. ' . $word ?></p>
            <div class="bar" style="width: <?= round((($count/$topWordCount) * 100),1) ?>%"><p><?= $count ?></p></div>
          </div>
          <?php $iterator++ ?>
        <?php } ?>
      </div>
    </div>
  </body>
  <script type="module">
    import words from './js/read-file.js'
  </script>
</html>
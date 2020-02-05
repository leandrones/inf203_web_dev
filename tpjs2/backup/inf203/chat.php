<?php
$chaine = gethostbyname($_SERVER['REMOTE_ADDR']) ;
$chaine .=  " - " . $_GET['phrase'] . "\n";
$fp = fopen("chatlog.txt","a");
if ($fp == false) {
  echo "Permission error on chatlog.txt: do 'chmod a+w chatlog.txt'";
} else {
  if($_GET['phrase'] != ''){
    fwrite($fp, $chaine);
  }
  fclose($fp);
  $file_content = file_get_contents('chatlog.txt');
  echo $file_content;
}
?>
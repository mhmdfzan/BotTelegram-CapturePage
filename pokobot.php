<?php

set_time_limit(800);
$response = exec('casperjs pokocasper.js');

if ($response) {
  $x = 1;
  $y = 3;
  while($x < 7) {
    $chat_id    = ""; //isi chatid user1 atau grup1
    $chat_id2   = ""; //isi chatid user1 atau grup2
    $bot_url    = "";
    $url        = $bot_url . "sendPhoto?chat_id=" . $chat_id ;
    $url2        = $bot_url . "sendPhoto?chat_id=" . $chat_id2 ;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type:multipart/form-data"
    ));

    if ($x < 4){
      $post_fields = array(
        'chat_id'   => $chat_id,
        // 'caption' => "",
        'photo'     => new CURLFile(realpath("img/screenshot$x.png"))
      );
      curl_setopt($ch, CURLOPT_URL, $url);
    }else {
      $post_fields = array(
        'chat_id'   => $chat_id2,
        // 'caption' => "",
        'photo'     => new CURLFile(realpath("img/screenshot$y.png"))
      );
      curl_setopt($ch, CURLOPT_URL, $url2);
      $y++;
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    $output = curl_exec($ch);
    $x++;
  }

  echo "Success!";
}

?>
<!-- creditby -> MUHAMMAD FAUZAN RAHMAN/telkomuniversity ig:@mhmdfzan -->

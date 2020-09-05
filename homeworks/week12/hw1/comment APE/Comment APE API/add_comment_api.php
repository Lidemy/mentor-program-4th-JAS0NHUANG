<?php
  require_once('./conn.php');
  header("Access-Control-Allow-Origin: *");
  header('Content-type:application/json;charset=utf-8');

  function giveResponse($status, $message) {
    $json = array( 
      "status" => $status,
      "message" => $message
    );
    $response = json_encode($json);
    echo $response;
    if ($status !== 2) {
      die();
    }
  }

  if (empty($_POST['site_name'])) {
    giveResponse(4, "Please provide a site name.");
  } else if (empty($_POST['content'])) {
    giveResponse(4, "Please input your comment.");
  }

  $site_name = htmlspecialchars($_POST['site_name']);
  $content = $_POST['content'];
  
  if (empty($_POST['nickname'])) {
    $nickname = "Anonymous";
  } else {
    $nickname = mb_substr($_POST['nickname'], 0, 20);
  }

  $sqlQuery = 
    "INSERT INTO JAS0NHUANG_comment_ape(site_name, nickname, content) VALUES(?, ?, ?);";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('sss', $site_name, $nickname, $content);
  $result = $stmt->execute();

  if(!$result) {
    giveResponse(4, "Insert error.");
  } else {
    giveResponse(2, "Success.");
  }

?>

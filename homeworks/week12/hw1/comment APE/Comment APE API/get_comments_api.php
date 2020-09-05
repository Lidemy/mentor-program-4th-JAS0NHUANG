<?php
  require_once('./conn.php');

  header("Access-Control-Allow-Origin: *");
  header('Content-type:application/json;charset=utf-8');

  if (empty($_GET['site_name'])) {
    $json = array( 
      "status" => 4,
      "message" => "Please provide site name."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  // get total comments count
  $site_name = $_GET['site_name'];
  $sqlQuery = "SELECT comment_id FROM JAS0NHUANG_comment_ape WHERE site_name=? ORDER BY comment_id DESC;";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('s', $_GET['site_name']);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $total_comments = $stmt->affected_rows;
  $last_comment_id = $row['comment_id'] + 1;

  if (empty($_GET['before'])) {
    $before = $last_comment_id;
  } else {
    $before = $_GET['before'];
  }

  $site_name = $_GET['site_name'];
  $sqlQuery = 
    "SELECT * FROM JAS0NHUANG_comment_ape ".
    "WHERE site_name=? AND comment_id<? ".
    "ORDER BY comment_id DESC LIMIT 5;";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('si', $_GET['site_name'], $before);
  $result = $stmt->execute();
  $result = $stmt->get_result();

  if ($stmt->error) {
    $json = array( 
      "status" => 4,
      "message" => "ERROR."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  
  $last_get = $stmt->affected_rows;

  $comments = array();
  while ($row = $result->fetch_assoc()) {
    $new_before = $row['comment_id'];
    array_push($comments, array(
        "comment_id" => $row['comment_id'],
        "nickname" => $row['nickname'],
        "content" => $row['content'],
        "created_at" => $row['created_at']
      )
    );
  }

  $cursor_info = array();
  array_push($cursor_info, array(
      "before" => $before,
      "total_comments" => $total_comments,
      "new_before" => $new_before,
      "last_get" => $last_get
    )
  );

  $json = array(
    "comments" => $comments,
    "cursor_info" => $cursor_info
  );

  $response = json_encode($json);
  echo $response;
?>

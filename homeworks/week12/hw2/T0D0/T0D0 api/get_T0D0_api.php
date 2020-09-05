<?php
  require_once('./conn.php');

  header("Access-Control-Allow-Origin: *");
  header('Content-type:application/json;charset=utf-8');

  if (empty($_GET['list_id'])) {
    $json = array( 
      "status" => 4,
      "message" => "Please provide a list ID."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $sqlQuery = "SELECT * FROM JAS0NHUANG_T0D0_list WHERE list_id=?;";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('i', $_GET['list_id']);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($stmt->error) {
    $json = array( 
      "status" => 4,
      "message" => "List ID not existed."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $todos = array(
    "list_id" => $row['list_id'],
    "list_content" => $row['list_content'],
    "selected_tab" => $row['selected_tab']
  );

  $json = array(
    "todos" => $todos
  );

  $response = json_encode($json);
  echo $response;
?>

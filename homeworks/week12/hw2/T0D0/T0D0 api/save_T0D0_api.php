<?php
  require_once('./conn.php');
  header("Access-Control-Allow-Origin: *");

  if (empty($_POST['list_content'])) {
    $json = array( 
      "status" => 4,
      "message" => "No content to save."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  if (empty($_POST['list_id'])) {
    $sqlQuery = "INSERT INTO JAS0NHUANG_T0D0_list(list_content, selected_tab) VALUES(?, ?);";
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('ss', $_POST['list_content'], $_POST['selected_tab']);
    $result = $stmt->execute();

    if (!$stmt->error) {
      $sqlQuery = "SELECT list_id FROM JAS0NHUANG_T0D0_list ORDER BY list_id DESC;";
      $stmt = $conn->prepare($sqlQuery);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      echo $row['list_id'];
    }
  } else {
    $sqlQuery = "UPDATE JAS0NHUANG_T0D0_list SET list_content=?, selected_tab=? WHERE list_id=?";
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('ssi', $_POST['list_content'], $_POST['selected_tab'], $_POST['list_id']);
    $result = $stmt->execute();
    if (!$stmt->error) {
      echo $_POST['list_id'];
    }
  }
?>

<?php
  require_once('./conn.php');
  header("Access-Control-Allow-Origin: *");

  if ($_POST['list_content'] === "[]") {
    $json = array( 
      "status" => 4,
      "message" => "No content to save."
    );
    $response = json_encode($json);
    die($response);
  }

  // 存入資料庫時不對資料做任何處理，直接將前端來的資料存入。
  if (empty($_POST['list_id'])) {
    // 沒有接到 list_id 時自動生成一組
    $list_id = "";
    for ($i = 0; $i < 9; $i++) {
      $list_id .= chr(rand(65, 90));
    }
    $sqlQuery = "INSERT INTO JAS0NHUANG_T0D0_list(list_id, list_content, selected_tab) VALUES(?, ?, ?);";
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('sss', $list_id, $_POST['list_content'], $_POST['selected_tab']);
    $result = $stmt->execute();
    $json = array( 
      "status" => 2,
      "message" => $list_id 
    );
    $response = json_encode($json);
    echo $response;

  } else {
    $sqlQuery = "UPDATE JAS0NHUANG_T0D0_list SET list_content=?, selected_tab=? WHERE list_id=?";
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('sss', $_POST['list_content'], $_POST['selected_tab'], $_POST['list_id']);
    $result = $stmt->execute();
    if ($stmt->affected_rows === 0) {
      $json = array( 
        "status" => 4,
        "message" => "Error or no changes."
      );
      $response = json_encode($json);
      die($response);
    }
    $json = array( 
      "status" => 2,
      "message" => $_POST['list_id'] 
    );
    $response = json_encode($json);
    echo $response;
  }
?>

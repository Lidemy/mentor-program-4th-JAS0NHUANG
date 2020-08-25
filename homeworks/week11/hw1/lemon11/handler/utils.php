<?php
  require_once('conn.php');
  // get user information given the user_id
  function getUserInfo($user_id) {
    global $conn;
    $sqlQuery = 
      'SELECT * FROM JAS0NHUANG_users WHERE user_id=?;';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('d', $user_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    if (!result) {
      session_destroy();
      header('Location: ../index.php');
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES);    
  }
?>

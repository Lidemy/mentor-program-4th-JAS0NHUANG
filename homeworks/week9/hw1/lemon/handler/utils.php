<?php
  require_once('conn.php');
  // get user information given the user_id
  function getUserInfo($user_id) {
    global $conn;
    $sqlQuery = sprintf(
      'SELECT * FROM JAS0NHUANG_users WHERE user_id = %d;',
      $user_id
    );

    $result = $conn->query($sqlQuery);
    $row = $result->fetch_assoc();
    return $row;
  }
?>

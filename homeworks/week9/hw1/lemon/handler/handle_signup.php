<?php
  require_once('conn.php');

  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = $_POST['password'];

  $sqlQuery = sprintf(
    "INSERT INTO JAS0NHUANG_users(username, nickname, password) VALUES('%s', '%s', '%s');",
    $username,
    $nickname,
    $password
    );

  $result = $conn->query($sqlQuery);

  // Check for error, especially for duplicate entry.
  if($conn->error) {
    header('Location: ../index.php?errorCode=' . $conn->errno);
    exit();
  }
  
  header('Location: ../index.php');
?>

<?php
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sqlQuery =
    "INSERT INTO JAS0NHUANG_users(username, nickname, password, group_id) VALUES(?, ?, ?, 0);";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $result = $stmt->execute();
  // Check for error, especially for duplicate entry.
  if($stmt->error) {
    header('Location: ../index.php?errorCode=' . $stmt->errno);
    exit();
  }
  
  $sqlQuery =
    "SELECT * FROM JAS0NHUANG_users WHERE username=?;";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  session_start();
  $_SESSION['username'] = $username;
  $_SESSION['user_id'] = $row['user_id'];
  $_SESSION['lemon'] = true;

  header('Location: ../index.php');
?>

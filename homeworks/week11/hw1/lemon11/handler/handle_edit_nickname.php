<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  if (empty($_SESSION['user_id'])) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }
  $user_id = $_SESSION['user_id'];  

  if (empty($_SESSION['lemon'])) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  $nickname = $_POST['nickname'];

  $sqlQuery =
    "UPDATE JAS0NHUANG_users SET nickname=? WHERE user_id=?;";
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('si', $nickname, $user_id);
  $result = $stmt->execute();

  // Check for error, especially for duplicate entry.
  if($stmt->error) {
    header('Location: ../index.php?errorCode=' . $stmt->errno);
    exit();
  }
  
  header('Location: ../index.php');
?>

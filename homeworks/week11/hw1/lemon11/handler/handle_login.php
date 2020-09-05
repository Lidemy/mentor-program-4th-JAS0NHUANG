<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sqlQuery = 
    'SELECT * FROM JAS0NHUANG_users where username=?;';
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die($conn->error);
  }

  if ($result->num_rows === 0){
    header('Location: ../index.php?errorCode=0');
    exit();
  }

  $row = $result->fetch_assoc();
  if (!password_verify($password, $row['password'])) {
    header('Location: ../index.php?errorCode=0');
    exit();
  }

  $user_id = $row['user_id'];
  $_SESSION['username'] = $username;
  $_SESSION['user_id'] = $user_id;
  $_SESSION['lemon'] = true;
  if (intval($row['group_id']) === 1) {
    $_SESSION['admin'] = true;
  }

  header('Location: ../index.php');
?>


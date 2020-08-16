<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sqlQuery = sprintf(
    'SELECT * FROM JAS0NHUANG_users where username="%s" AND password="%s";',
    $username,
    $password
  );
  $result = $conn->query($sqlQuery);
  if ($result->num_rows === 0){
    header('Location: ../index.php?errorCode=0');
    exit();
  }
  $row = $result->fetch_assoc();
  $user_id = $row['user_id'];
  
  $_SESSION['username'] = $username;
  $_SESSION['user_id'] = $user_id;

  header('Location: ../index.php');
?>


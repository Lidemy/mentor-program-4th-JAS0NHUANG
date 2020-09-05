<?php
  session_start();
  require_once('./conn.php');

  if (empty($_POST['username']) || empty($_POST['password'])) {
    die('Please enter username and password.');
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sqlQuery = 'SELECT * FROM JAS0NHUANG_blog_admin WHERE admin_username=?';
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if (!result) {
    header('Location: ../index.php');
    exit();
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['admin_password'])) {
    $_SESSION['admin'] = true;
    $_SESSION['username'] = $username;
    header('Location: ../index.php');
  } else {
    header('Location: ../index.php');
    exit();
  }
?>

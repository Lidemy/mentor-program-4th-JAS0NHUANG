<?php
  session_start();
  require_once('./conn.php');

  $admin = $_SESSION['admin'];
  if(!$admin) {
  header('Location: ../index.php');
    exit();
  }

  $lemon_user = $_SESSION['lemon'];
  if (!$lemon_user) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  if (empty($_POST['user_id'])) {
    die('Not enough information.');
  }
  $group_id = $_POST['group_id'];
  $user_id = $_POST['user_id']; 

  $sqlQuery =
    'UPDATE JAS0NHUANG_users SET group_id=? WHERE user_id=?;';
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('ii',
    $group_id,
    $user_id
  );
  
  $result = $stmt->execute();
  if (!$result) {
    die($stmt->error);
  }

  header('Location: ../admin.php');
?>

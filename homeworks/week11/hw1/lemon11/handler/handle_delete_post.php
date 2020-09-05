<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  // check for user_id
  $user_id = $_SESSION['user_id'];
  if(!$user_id) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  // get user info
  $user_info = getUserInfo($user_id);

  // check for lemon user
  $lemon_user = $_SESSION['lemon'];
  if (!$lemon_user) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  // check for admin right.
  if (intval($user_info['group_id']) === 1) {
    $sqlQuery = 
      'UPDATE JAS0NHUANG_posts SET is_deleted=1 WHERE post_id=?;';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('d', $_POST['post_id']);
  } else {
    $sqlQuery = 
      'UPDATE JAS0NHUANG_posts SET is_deleted=1 WHERE post_id=? AND user_id=?;';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('dd', $_POST['post_id'], $user_id);
  }
  $result = $stmt->execute();

  if (!$result) {
    header('Location: ../index.php?errorCode=3');
    exit();
  }

  header('Location: ../index.php');
?>

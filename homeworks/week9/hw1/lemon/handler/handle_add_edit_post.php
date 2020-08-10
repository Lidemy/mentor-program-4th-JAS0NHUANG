<?php
  session_start();
  require_once('./conn.php');

  $user_id = $_SESSION['user_id'];
  if(!$user_id) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  if (empty($_POST['content'])) {
    die('Please enter message.');
  }
  $post_content = htmlspecialchars($_POST['content']);
  
  if ($_POST['post_id']) {
    $post_id = $_POST['post_id'];
    $sqlQuery = sprintf(
      'UPDATE JAS0NHUANG_posts SET post_content = "%s" WHERE post_id = %d;',
      $post_content,
      $post_id
    );
  } else {
    $sqlQuery = sprintf(
      'INSERT INTO JAS0NHUANG_posts(user_id, post_content) VALUES(%d, "%s");',
      $user_id,
      $post_content
    );
  }

  $result = $conn->query($sqlQuery);
  if (!$result) {
    die($conn->error);
  }

  header('Location: ../index.php');
?>

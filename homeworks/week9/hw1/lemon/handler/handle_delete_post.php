<?php
  session_start();
  require_once('./conn.php');

  $user_id = $_SESSION['user_id'];
  if(!$user_id) {
    header('Location: ../index.php?errorCode=1');
    exit();
  }

  $sqlQuery = sprintf(
    'DELETE FROM JAS0NHUANG_posts WHERE post_id = %d;',
    $_POST['post_id']
  );
  
  $result = $conn->query($sqlQuery);

  header('Location: ../index.php');

?>

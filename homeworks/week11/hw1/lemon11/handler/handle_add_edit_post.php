<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  // Check for user_id in session
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

  // check for content 
  if (empty($_POST['content'])) {
    die('Please enter message.');
  }
  $post_content = $_POST['content'];
  
  // if post_id exist
  if ($_POST['post_id']) {
    $post_id = $_POST['post_id'];

    if (intval($user_info['group_id']) === 1) {
      $sqlQuery = 
        'UPDATE JAS0NHUANG_posts SET post_content=? WHERE post_id=?;';
      $stmt = $conn->prepare($sqlQuery);
      $stmt->bind_param('sd',
        $post_content,
        $post_id
      );
    } else {
      $sqlQuery = 
        'UPDATE JAS0NHUANG_posts SET post_content=? WHERE post_id=? AND user_id=?;';
      $stmt = $conn->prepare($sqlQuery);
      $stmt->bind_param('sdd',
        $post_content,
        $post_id,
        $user_id
      );
    }
  } else {
    if (intval($user_info['group_id'] === 99)) {
      header('Location: ../index.php?errorCode=99');
      exit();
    }
    $sqlQuery = 
      'INSERT INTO JAS0NHUANG_posts(user_id, post_content) VALUES(?, ?);';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('ds',
      $user_id,
      $post_content
    );
  }

  $result = $stmt->execute();
  if (!$result) {
    die($stmt->error);
  }

  header('Location: ../index.php');
?>

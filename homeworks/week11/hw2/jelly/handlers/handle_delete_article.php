<?php
  session_start();
  require_once('./conn.php');
  
  if (!$_SESSION['admin']) {
    die('Administrator Only!');
  }

  if (empty($_POST['article_id'])) {
    die('No article id.');
  }

  $sqlQuery = 'DELETE FROM JAS0NHUANG_blog_articles WHERE article_id=?;';
  $stmt = $conn->prepare($sqlQuery);
  $stmt->bind_param('d', $_POST['article_id']);
  $result = $stmt->execute();

  if (!$result) {
    header('Location: ../admin.php');
    exit();
  }

  header('Location: ../admin.php');
?>

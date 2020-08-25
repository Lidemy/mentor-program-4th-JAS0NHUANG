<?php
  require_once('./conn.php');

  if (
    empty($_POST['title']) ||
    empty($_POST['content']) ||
    empty($_POST['category_id'])
  ) {
    header('Location: ../editor.php?errorCode=0');
    exit();
  }

  if (!empty($_POST['article_id'])) {
    $sqlQuery = 
      'UPDATE JAS0NHUANG_blog_articles SET category_id=?,title=?,content=? WHERE article_id=?;';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param(
      'issi', 
      $_POST['category_id'], $_POST['title'], $_POST['content'], $_POST['article_id']
    );
  } else {  
    $sqlQuery = 
      'INSERT INTO JAS0NHUANG_blog_articles(category_id, title, content) VALUES(?, ?, ?);';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param(
      'iss',
      $_POST['category_id'], $_POST['title'], $_POST['content']
    );
  }

  $result = $stmt->execute();
  if (!$result) {
    header('Location: ./editor.php?errorCode=1');
    exit();
  }

  header('Location: ../admin.php');
?>

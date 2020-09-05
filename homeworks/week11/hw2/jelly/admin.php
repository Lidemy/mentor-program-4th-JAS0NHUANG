<?php
  session_start();
  require_once('./handlers/conn.php');
  require_once('./handlers/utils.php');
?>

<!DOCTYPE html>
<html lang="en">

  <?php require_once('./partial/head.php'); ?>

  <body>

    <?php require_once('./partial/header.php'); ?>
    <?php require_once('./partial/banner.php'); ?>

    <main class="main">
      <?php if (!$_SESSION['admin']) { ?>
      <h1>Administrators Only!</h1>
      <?php } ?>
      <?php if ($_SESSION['admin']) { ?>
        <div class="article_list">
          <?php
            $sqlQuery = 'SELECT * FROM JAS0NHUANG_blog_articles ORDER BY article_id DESC;';
            $stmt = $conn->prepare($sqlQuery);
            $result = $stmt->execute();
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()) {
              echo generateArticleTitle (
                $row['article_id'], 
                $row['title'], 
                $row['content']
              );
            }
          ?>
        </div>
      <?php } ?>
    </main>

  <?php require_once('./partial/footer.php') ?>
  <?php require_once('./partial/login_page.php'); ?>

  <script src="./javascript/login.js"></script>

  </body>
</html>

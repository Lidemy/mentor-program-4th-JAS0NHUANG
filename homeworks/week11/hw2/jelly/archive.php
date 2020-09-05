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
      <div class="article_list">
        <h2 class="archive">ARCHIVE</h2>

        <?php
          $sqlQuery = 
            'SELECT * FROM JAS0NHUANG_blog_articles LEFT JOIN JAS0NHUANG_blog_categories '.
            'ON JAS0NHUANG_blog_articles.category_id = JAS0NHUANG_blog_categories.category_id '.
            'ORDER BY article_id DESC;';
          $stmt = $conn->prepare($sqlQuery);
          $result = $stmt->execute();
          $result = $stmt->get_result();
          while ($row = $result->fetch_assoc()) {
            echo generateArticle (
              $row['article_id'], 
              $row['category_name'], 
              $row['title'], 
              $row['content'], 
              $row['created_at']
            );
          }
        ?>

      </div>
    </main>

    <?php require_once('./partial/footer.php'); ?>
    <?php require_once('./partial/login_page.php'); ?>

    <script src="./javascript/login.js"></script>

  </body>
</html>

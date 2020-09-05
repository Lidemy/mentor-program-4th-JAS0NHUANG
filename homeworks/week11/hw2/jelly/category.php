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
        <h2 class="archive">CATEGORY</h2>

        <?php
          $sqlQuery = 
            'SELECT * FROM JAS0NHUANG_blog_categories;';
          $stmt = $conn->prepare($sqlQuery);
          $result = $stmt->execute();
          $result = $stmt->get_result();
          $categories_array = array();
          while ($row = $result->fetch_assoc()) {
            array_push($categories_array, $row['category_name']);
          }

          foreach ($categories_array as $category_name) {
            echo '<h3 class="category_name">'. $category_name . '</h3>';
            $sqlQuery =
              'SELECT * FROM JAS0NHUANG_blog_articles LEFT JOIN JAS0NHUANG_blog_categories '.
              'ON JAS0NHUANG_blog_articles.category_id = JAS0NHUANG_blog_categories.category_id '.
              'WHERE category_name = ? '.
              'ORDER BY article_id DESC;';
            $stmt = $conn->prepare($sqlQuery);
            $stmt->bind_param('s', $category_name);
            $result = $stmt->execute();
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
              echo generateArticleTitle (
                $row['article_id'],
                $row['title'],
                $row['content']
              );
            }
          }
        ?>

      </div>
    </main>

    <?php require_once('./partial/footer.php'); ?>
    <?php require_once('./partial/login_page.php'); ?>

    <script src="./javascript/login.js"></script>

  </body>
</html>

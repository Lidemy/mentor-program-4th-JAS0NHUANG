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
      <div class="article_wrapper">

        <?php
          $limit = 5;
          if (empty($_GET['offset'])) {
            $offset = 0;
          } else {
            $offset = $_GET['offset'];
          } 
          $sqlQuery = 
            'SELECT * FROM JAS0NHUANG_blog_articles LEFT JOIN JAS0NHUANG_blog_categories '.
            'ON JAS0NHUANG_blog_articles.category_id = JAS0NHUANG_blog_categories.category_id '.
            'WHERE is_deleted IS NULL '.
            'ORDER BY article_id DESC '.
            'limit ? offset ?;';
          $stmt = $conn->prepare($sqlQuery);
          $stmt->bind_param('ii', $limit, $offset);
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

    <?php
      $sqlQuery =
        'SELECT COUNT(article_id) AS count FROM JAS0NHUANG_blog_articles WHERE is_deleted IS NULL;';
      $stmt = $conn->prepare($sqlQuery);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      if (!$result) {
        die($conn - error);
      }
      $row = $result->fetch_assoc();
      $total_posts = intval($row['count']);
      $last_page = ceil($total_posts / $limit);
    ?>

    <div class="pagination">
      <div class="pagination_info">
        Total Pages: <?php echo $last_page; ?> / Current Page: <?php echo $offset / $limit + 1; ?>
      </div>
      <div class="pagination_controller">
        <?php if ($offset !== 0) { ?>
          <a href="./index.php">
            <div class="pagination_first">FIRST</div>
          </a>
          <a href="./index.php?offset=<?php echo $offset - 5; ?>">
            <div class="pagination_previous">&lt;</div>
          </a>
          <?php } ?>
          <?php if ($total_posts - $offset > 5) { ?>
          <a href="./index.php?offset=<?php echo $offset + 5; ?>">
            <div class="pagination_next">&gt;</div>
          </a>
          <a href="./index.php?offset=<?php echo $total_posts - ($total_posts % 5); ?>">
            <div class="pagination_last">LAST</div>
          </a>
        <?php } ?>
      </div>
    </div>

    <?php require_once('./partial/footer.php'); ?>
    <?php require_once('./partial/login_page.php'); ?>

    <script src="./javascript/login.js"></script>

  </body>
</html>

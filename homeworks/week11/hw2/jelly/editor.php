<?php
  session_start();
  require_once('./handlers/conn.php');
  require_once('./handlers/utils.php');

  $title = '';
  $content = '';
  $category_id = '';
  if (!empty($_POST['article_id'])) {
    $sqlQuery = 'SELECT * FROM JAS0NHUANG_blog_articles WHERE article_id=?;';
    $stmt = $conn->prepare($sqlQuery);
    $stmt->bind_param('i', $_POST['article_id']);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
      
    $title = $row['title'];
    $content = $row['content'];
    $category_id = $row['category_id'];
  }

?>

<!DOCTYPE html>
<html lang="en">

  <?php require_once('./partial/head.php'); ?>

  <body>

    <?php require_once('./partial/header.php'); ?>
    <?php require_once('./partial/banner.php'); ?>

    <main class="main">
      <?php if (!$_SESSION['admin']) { ?>
        <h1>Administrators Only</h1>
      <?php } ?>
      <?php if ($_SESSION['admin']) { ?>
        <form class="editor_form" action="./handlers/handle_add_article.php" method="POST">
          <label for="title">Title: </label>
          <input class="editor_form_title" type="text" name="title" value="<?php echo $title; ?>">
          <br>
          <label for="category_id">Category: </label>
          <select class="editor_form_category"  id="category_id" name="category_id">

            <?php
              $sqlQuery = 'SELECT * FROM JAS0NHUANG_blog_categories;';
              $stmt = $conn->prepare($sqlQuery);
              $result = $stmt->execute();
              $result = $stmt->get_result();
              while ($row = $result->fetch_assoc()) {
                if (intval($row['category_id']) === intval($category_id)) {
                  $option = sprintf(
                    '<option value="%d" selected>%s</option>',
                    $row['category_id'],
                    $row['category_name']
                  );
                } else {
                  $option = sprintf(
                    '<option value="%d">%s</option>',
                    $row['category_id'],
                    $row['category_name']
                  );
                }
                echo $option;
              }
            ?>

          </select>
          <textarea id="editor" name="content">
            <?php echo $content; ?>
          </textarea>
          <?php if ($_POST['article_id']) { ?>
            <input type="hidden" name="article_id" value="<?php echo $_POST['article_id'] ?>">
          <?php } ?>
          <input type="submit" value="Submit">
        </form>
      <?php } ?>
    </main>

    <?php require_once('./partial/footer.php'); ?>
    <?php require_once('./partial/login_page.php'); ?>

  <script>
    CKEDITOR.replace( 'content' )
  </script>
  <script src="./javascript/login.js"></script>

</body>
</html>

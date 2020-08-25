<?php
  session_start();
  require_once('./handler/generate_post.php');
  require_once('./handler/conn.php');
  require_once('./handler/utils.php');
  
  $isLoggedIn = false;
  $user_id = null;
  if ($_SESSION['user_id'] && $_SESSION['lemon']) {
    $user_id = $_SESSION['user_id'];
    $username = escape($_SESSION['username']);
    $isLoggedIn = true;
  }
  $user_info = getUserInfo($user_id);
  $is_admin = false;
  if (intval($user_info['group_id']) === 1) {
    $is_admin = true;
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta 
    name="viewport" 
    content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
  >
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./style/index.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Aladin&display=swap" rel="stylesheet">
  <title>Lemon Wall</title>
</head>

<body>
  <!-- ------------------------------------ header ----------------------------------------->
  <header class="header">
    
    <a href="index.php">
      <h1 class="header_title">Lemon Wall</h1>
    </a>
    <nav class="header_nav">
      <?php if (!$user_id) { ?>
        <button  class="header_login-btn">LOG IN</button>
        <button class="header_signup-btn">SIGN UP</button>
      <?php } ?>
      <?php if ($is_admin) { ?>
        <a href="admin.php">
          <button class="header_admin-btn" >Admin</button>
        </a>
      <?php } ?>
      <?php if ($user_id) { ?>
        <button class="header_edit_nickname-btn">EDIT NICKNAME</button>
        <?php if (intval($user_info['group_id']) !== 99) { ?>
          <button class="header_post-btn">POST</button>
        <?php } ?>
        <button class="header_logout-btn">LOG OUT</button>
      <?php } ?>
    </nav>
    <?php
    if (strval($_GET['errorCode']) === '1062') {
      echo '<div class="header_errorMsg">Username or Nickname already taken.</div>';
    } elseif (strval($_GET['errorCode']) === '0') {
      echo '<div class="header_errorMsg">Invalid username or password</div>';
    } elseif (strval($_GET['errorCode']) === '1') {
      echo '<div class="header_errorMsg">Please Log in.</div>';
    } elseif (strval($_GET['errorCode']) === '99') {
      echo '<div class="header_errorMsg">You are suspended.</div>';
    } 

    if ($user_id) {
      $user_nickname = escape(getUserInfo($user_id)['nickname']);
      $greetingMsg = sprintf(
        '<div class="header_greeting">Welcome! %s.</div>',
        $user_nickname
      );
      echo $greetingMsg;
    }
    ?>
  </header>
  <!-- ------------------------------------ main ----------------------------------------->
  <main class="main">
    <div class="main_posts">
      <?php
        $limit = 15;
        if (empty($_GET['offset'])) {
          $offset = 0;
        } else {
          $offset = $_GET['offset'];
        }
        $sqlQuery = 
          'SELECT * FROM JAS0NHUANG_posts '.
          'WHERE is_deleted IS NULL '.
          'ORDER BY created_at DESC '. 
          'limit ? offset ?;';
        $stmt = $conn->prepare($sqlQuery);
        $stmt->bind_param('ii', $limit, $offset);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        if (!$result) {
          die($conn->error);
        }

        while ($row = $result->fetch_assoc()) {
          $nickname = escape(getUserInfo($row['user_id'])['nickname']);
          $username = escape(getUserInfo($row['user_id'])['username']);
          $user_id = escape($row['user_id']);
          $post_content = escape($row['post_content']);
          $created_at = escape($row['created_at']);
          $post_id = escape($row['post_id']);
          $postGenerated = generatePost($user_id, $username, $post_content, $created_at, $nickname, $post_id, $user_info['group_id']);
          print_r($postGenerated);
        }
      ?>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
      <div class="main_placeholder"></div>
    </div>
  </main>
  <?php
      $limit = 15;
      if (empty($_GET['offset'])) {
        $offset = 0;
      } else {
        $offset = $_GET['offset'];
      }
      $sqlQuery = 
          'SELECT COUNT(post_id) AS count FROM JAS0NHUANG_posts WHERE is_deleted IS NULL;';
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
  <footer class="footer">
    <div class="page_info">
      Total Pages: <?php echo $last_page; ?> / Current Page: <?php echo $offset / $limit + 1; ?>
    </div>
    <div class="pagination">
      <?php if ($offset !== 0) { ?>
      <a href="./index.php">
        <div class="pagination_first">FIRST</div>
      </a>
      <a href="./index.php?offset=<?php echo $offset - 15; ?>">
        <div class="pagination_previous">&lt;</div>
      </a>
      <?php } ?>
      <?php if ($total_posts - $offset > 15) { ?>
      <a href="./index.php?offset=<?php echo $offset + 15; ?>">
        <div class="pagination_next">&gt;</div>
      </a>
      <a href="./index.php?offset=<?php echo $total_posts - ($total_posts % 15); ?>">
        <div class="pagination_last">LAST</div>
      </a>
      <?php } ?>
    </div>
    <div class="copyright">
      copyright © 2020 JH all rights reserved.
    </div>
  </footer>
  <!-- ------------------------------------ scripts ----------------------------------------->
  <script src="./javascript/index.js"></script>  
  <?php if (!$isLoggedIn) { ?>    
    <script src="./javascript/sign_up.js"></script>
    <script src="./javascript/log_in.js"></script>
  <?php } ?>
  <?php if ($isLoggedIn) { ?>
    <script src="./javascript/log_out.js"></script>
    <script src="./javascript/edit_nickname.js"></script>
    <script src="./javascript/add_edit_post.js"></script>
    <script src="./javascript/delete_post.js"></script>
  <?php } ?>
</body>
</html>

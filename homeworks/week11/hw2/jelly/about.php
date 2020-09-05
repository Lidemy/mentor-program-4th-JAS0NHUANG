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
        <div class="article_container">
          <div class="i18n_btn_wrapper">
            <button class="i18n_btn" onclick="changLang('en_us')">EN</button>
            <button class="i18n_btn" onclick="changLang('fr_fr')">FR</button>
            <button class="i18n_btn" onclick="changLang('zh_tw')">中文</button>
          </div>
          <div class="article_title"></div>
          <div class="article_excerpt"></div>        
      </div>
    </main>

    <?php require_once('./partial/footer.php'); ?>
    <?php require_once('./partial/login_page.php'); ?>

    <script src="./javascript/lang_en_us.js"></script>
    <script src="./javascript/lang_fr_fr.js"></script>
    <script src="./javascript/lang_zh_tw.js"></script>
    <script src="./javascript/about.js"></script>
    <script src="./javascript/login.js"></script>

  </body>
</html>

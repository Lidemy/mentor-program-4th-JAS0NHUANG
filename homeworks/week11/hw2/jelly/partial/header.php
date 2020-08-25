<header class="header">
  <div class="header_wrapper">
    <div class="header_logo_main">
      <a href="./index.php">
        <div class="header_logo"></div>
      </a>
      <nav class="header_main nav">
        <ul>
          <a href="./archive.php"><li>ARCHIVE</li></a>
          <a href="./category.php"><li>CATEGORY</li></a>
          <a href="./about.php"><li>ABOUT</li></a>
        </ul>
      </nav>
    </div>
    <nav class="header_admin nav">
      <ul>
        <?php if (!$_SESSION['admin']) { ?>
        <li class="header_admin_login">LOG IN</li>
        <?php } ?>
        <?php if ($_SESSION['admin']) { ?>
        <a href="./admin.php"><li>ADMIN</li></a>
        <a href="./editor.php"><li>NEW POST</li></a>
        <a href="./handlers/handle_logout.php"><li>LOG OUT</li></a>
        <?php } ?>
      </ul>
    </nav>
  </div>
</header>

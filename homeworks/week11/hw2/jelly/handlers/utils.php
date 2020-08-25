<?php
  session_start();

  function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES);
  }

  function generateArticle (
    $article_id, 
    $category_name, 
    $title, 
    $content, 
    $created_at
  ) {
    $delimiter = "<!--more-->";
    $excerptArray = explode($delimiter, $content);
    if (empty($_GET['article_id'])) {
      $show_content = $excerptArray['0'];
    } else {
      $show_content = $content;
    }
    
    $edit_btn = '';
    if ($_SESSION['admin']) {
      $edit_btn = sprintf(
        '<form action="./editor.php" method="post">
          <input type="hidden" name="article_id" value="%d">
          <input class="article_list_edit" type="submit" value="">
        </form>',
      escape($article_id)
      );
    }

    $article_excerpt = sprintf(
      '<div class="article_container">
        <div class="article_title">%s %s</div>
        <div class="article_metadata">
          <div class="article_created">%s</div>
          <div class="article_category"><span class="cate_icon"></span><span>%s</span></div>
        </div>
        <div class="article_excerpt">%s</div>',
      escape($title),
      $edit_btn,
      escape($created_at),
      escape($category_name),
      $show_content
    );
    $read_more = sprintf(
      '<div class="article_read-more"><a href="./article.php?article_id=%d">Read More</a></div>
      </div>',
      escape($article_id)
    );
    if (empty($_GET['article_id'])) {
      return $article_excerpt . $read_more;
    } else {
      return $article_excerpt . "</div>";
    }
  }

  function generateArticleTitle (
    $article_id, 
    $title, 
    $content
  ) {
    $article_title = sprintf(
      '<div class="article_list_container">
        <div class="article_list_title">
          <a href="./article.php?article_id=%d">
            %s
          </a>
        </div>',
      escape($article_id),
      escape($title)
    );
    $article_modification = sprintf(
      '<div class="edit_delete">
        <form action="./editor.php" method="POST">
          <input type="hidden" name="article_id" value="%d">
          <input class="article_list_edit" type="submit" value="">
        </form>
        <form action="./handlers/handle_delete_article.php" method="POST">
          <input type="hidden" name="article_id" value="%d">
          <input class="article_list_delete" type="submit" value="">
        </form>
      </div>
      </div>',
      escape($article_id),
      escape($article_id) 
    );

    if (!empty($_SESSION['admin'])) {
      return $article_title . $article_modification;
    } else {
      return $article_title . "</div>";
    }
  }
?>

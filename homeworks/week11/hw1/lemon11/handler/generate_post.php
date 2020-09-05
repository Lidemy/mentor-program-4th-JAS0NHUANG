<?php
  session_start();

  // Generate single post
  function generatePost($user_id, $username, $post_content, $created_at, $nickname, $post_id, $group_id) {
    $postTemplate = sprintf(
      '<div class="main_post_container">
        <div class="main_post_nickname"><span>%s</span><span> （@ %s）</span></div>
        <div class="main_post_content">%s</div>
        <div class="main_post_created">%s</div>
        <div class="main_post_id">%d</div>',
      $nickname,
      $username,
      $post_content,
      $created_at,
      $post_id
    );

    // If the user is logged in, show edit and delete option for their own posts.
    if (
      intval($user_id) === intval($_SESSION['user_id']) ||
      intval($group_id) === 1
    ) {
      $editAndDeleteBtn = sprintf(
        '<div class="main_post_delete-btn"></div>
        <div class="main_post_edit-btn"></div>'
      );
    }
    return $postTemplate . $editAndDeleteBtn . "</div>";
  }
?>

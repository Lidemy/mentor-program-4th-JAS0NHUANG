<?php
  session_start();
  require_once('utils.php');
  // Generate single post
  function generatePost($user_id, $post_content, $created_at, $nickname, $post_id) {
    $postTemplate = sprintf(
      '<div class="main_post_container">
        <div class="main_post_nickname">%s</div>
        <div class="main_post_content">%s</div>
        <div class="main_post_created">%s</div>
        <div class="main_post_id">%d</div>',
      $nickname,
      $post_content,
      $created_at,
      $post_id
    );

    // If the user is logged in, show edit and delete option for their own posts.
    if ($user_id === $_SESSION['user_id']) {
      $editAndDeleteBtn = sprintf(
        '<div class="main_post_delete-btn"></div>
        <div class="main_post_edit-btn"></div>'
      );
    } 
    return $postTemplate . $editAndDeleteBtn . "</div>";
  }
?>

<?php
  session_start();
  if (empty($_SESSION['admin'])) {
    die('YOU SHELL NOT PASSSSSSSSSS~~~~~');
  }
  require_once('./handler/conn.php');
  require_once('./handler/utils.php');

  $sqlQuery = 'SELECT * FROM JAS0NHUANG_users';
  $stmt = $conn->prepare($sqlQuery);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die('Error: ' . $stmt->error);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="./style/index.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Aladin&display=swap" rel="stylesheet">
  <title>Lemon Wall - Admin</title>
</head>
<body>
  <header class="header">
   
    <a href="index.php">
      <h1 class="header_title">Lemon Wall</h1>
    </a>
    <nav class="header_nav">
        <button class="header_logout-btn">LOG OUT</button>
    </nav>
  </header>

  <main class="main">
    <div class="users_list">
    <table>
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Nickname</th>
        <th>Group ID</th>
        <th>Group Setting</th>
      </tr>

    <?php
      while ($row = $result->fetch_assoc()) {
        $user_id = escape($row['user_id']);
        $username = escape($row['username']);
        $nickname = escape($row['nickname']);
        $group_id = escape($row['group_id']);

        $template = sprintf( 
          '<tr class="admin_user_info">
            <td class="user_id">%d</div>
            <td class="username">%s</div>
            <td class="nickname">%s</div>
            <td class="group_id">%d</div>
           
            <td class="group_setting">
              <form class="set_admin" action="./handler/handle_group.php" method="POST">
                <input type="hidden" name="user_id" value="%d">

                <label for"groups">Group: </label>
                <select id="groups" name="group_id">
                  <option value="0">Standard</option>
                  <option value="1">Admin</option>
                  <option value="99">Suspended</option>
                </select>
                <input type="submit" value="Set Group">
              </form>
            </td>
          </tr>',
          $user_id, $username, $nickname, $group_id, $user_id);
        echo $template;
      }
    ?>
    </table>
    </div>
  </main>
  <script src="./javascript/index.js"></script>
  <script src="./javascript/log_out.js"></script>
</body>
</html>

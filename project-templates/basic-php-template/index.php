<?php
$include_path = "/";
include($include_path . 'includes/site-info.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Home | <?php echo $site_name; ?></title>

  <?php include($include_path . 'includes/compatibility.php'); ?>
  <?php include($include_path . 'includes/og.php'); ?>

  <!----- Styles start ----->
  <?php include($include_path . 'includes/header-styles.php') ?>
  <!----- Styles end ----->
</head>

<body>
  <!----- Header start ----->
  <?php include($include_path . 'includes/header.php') ?>
  <!----- Header end ----->



  <!----- Footer start ----->
  <?php include($include_path . 'includes/footer.php') ?>
  <!----- Footer end ----->
  <!----- Scripts start ----->
  <?php include($include_path . 'includes/footer-scripts.php') ?>
  <!----- Scripts end ----->
</body>

</html>
<?php
include("includes/site-info.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Home | <?php echo $siteName;?></title>

    <?php include("includes/compatibility.php"); ?>
    <?php include("includes/og.php"); ?>

    <!-- META TITLE AND DESCRIPTION -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <!-- META TITLE AND DESCRIPTION -->


    <!--==== STYLES START ====-->
    <?php include('includes/header-styles.php') ?>
    <!--==== STYLES END ====-->
</head>

<body>

    <!--==== HEADER START ====-->
    <?php include('includes/header.php') ?>
    <!--==== HEADER END ====-->



    <!--==== FOOTER START ====-->
    <?php include('includes/footer.php') ?>
    <!--==== FOOTER END ====-->
    
    <!--==== SCRIPTS START ====-->
    <?php include('includes/footer-scripts.php') ?>
    <!--==== SCRIPTS END ====-->
</body>

</html>
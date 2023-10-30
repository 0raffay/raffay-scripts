<?php

/*
Template Name: Gaza Appeal template

ADD THIS LINE IF THIS IS A TEMPLATE FOR CUSTOM POST TYPE:
Template Post Type: appeals
*/

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- META TITLE AND DESCRIPTION -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <!-- META TITLE AND DESCRIPTION -->


    <!--==== HEADER STYLES START ====-->
    <?php get_header('styles') ?>
    <!--==== HEADER STYLES END ====-->

    <title><?php the_title() ?></title>
</head>

<body>

    <!--==== HEADER START ====-->
    <?php get_header() ?>
    <!--==== HEADER END ====-->
    
    <!--==== QUICK DONATE START ====-->
    <?php include(get_template_directory() . '/includes/quick-donate-section.php'); ?>
    <!--==== QUICK DONATE END ====-->



    <!--==== FOOTER START ====-->
    <?php get_footer() ?>
    <?php get_footer('scripts') ?>
    <!--==== FOOTER END ====-->
</body>

</html>
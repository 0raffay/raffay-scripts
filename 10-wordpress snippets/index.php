<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php get_header('styles') ?>
</head>

<body>

    **** PLUGINS ****
    1- ACF - For custom fields
    2- Classic Editor
    3- WP migration
    4- Contact Form 7 --- ASK chat gpt how to Implement it there is a function : echo dot() something like that.
    5- icegram express for newsletter

    BASIC HEADER AND FOOTER TEMPLATE --- HEADER AND FOOTER SHOULD
    BE IN ROOT--- IF NOT THEN YOU WILL HAVE TO USE:
    get_template_part('include/header') -- donts mention .php just header
    <!--============= HEADER START ========== -->
    <?php get_header() ?>
    <!--============= HEADER START ========== -->

    1-ADD STYLE.css and INDEX.css to root
    a) ADD comment in css saying:
    /*
    Theme Name: ARF
    Description: Charity
    Author: ARF
    */
    b) add screenshot.png to root

    2 - FOR LINKING:
    a) use: echo get_template_directory_uri()
    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="">

    b) for linking page directly without using menu of wp:
    bloginfo('url'); ?>/impact " here bloginfo(url) is
    function and impact is the slug -- find this in
    quick edit page in veiw all page for a specific page
    <a href="<?php bloginfo('url'); ?>/impact "></a>

    3- for includes:
    use inlcludes like this I am keeping includes in includes folder
    a) <?php include(get_template_directory() . '/includes/inc-gallerySection.php'); ?>

    4- you can keep page templates anywhere wp is going to track them
    I am keeping all page templates in my page-templates folder

    5- BLOGS:
    a) for MOST RECENT POSTS:
    <?php
    $recent_posts = new WP_Query(array(
        'posts_per_page' => 2, // Display two most recent posts
        'post_status' => 'publish',
    ));

    while ($recent_posts->have_posts()) : $recent_posts->the_post();
    ?>
        <div class="blogCards blogCardBig">
            <div class="img__wrap">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail(); ?>
                <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/popular-blog-1.png" alt="Default Image">
                <?php endif; ?>
            </div>
            <div class="blogCardText">
                <h5 class="card__title"><?php the_title(); ?></h5>
                <div class="card__excerpt">
                    <?php the_excerpt(); ?>
                    <a href="<?php the_permalink(); ?>">Read More</a>
                </div>
                <div class="blogInfo">
                    <p class="timeToRead"><?php echo estimated_reading_time(get_the_content()); ?></p>
                    <p class="uploadTime"><?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ago'; ?></p>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
    <?php wp_reset_postdata(); ?>

    b) for all posts minus 2 recent posts
    <div class="blogCards">
        <?php
        // Get the IDs of the two most recent posts
        $recent_posts = new WP_Query(array(
            'posts_per_page' => 2,
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        $excluded_post_ids = array();
        while ($recent_posts->have_posts()) : $recent_posts->the_post();
            $excluded_post_ids[] = get_the_ID();
        endwhile;

        // Reset the query
        wp_reset_postdata();

        // Now, display the remaining posts excluding the recent ones
        $remaining_posts = new WP_Query(array(
            'posts_per_page' => -1, // Display all remaining posts
            'post__not_in' => $excluded_post_ids,
            'orderby' => 'date',
            'order' => 'DESC',
        ));

        while ($remaining_posts->have_posts()) : $remaining_posts->the_post();
        ?>
            <div class="img__wrap">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail(); ?>
                <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/blog-1.png" alt="Default Image">
                <?php endif; ?>
            </div>
            <div class="blogCardText">

                <h5 class="card__title"><?php the_title(); ?></h5>
                <div class="card__excerpt">
                    <?php the_excerpt(); ?>
                    <a href="<?php the_permalink(); ?>">Read More</a>
                </div>
                <div class="blogInfo">
                    <p class="timeToRead"><?php echo estimated_reading_time(get_the_content()); ?></p>
                    <p class="uploadTime"><?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ago'; ?></p>
                </div>
            </div>
        <?php endwhile; ?>











        <!--============= FOOTER START ========== -->
        <?php get_footer() ?>
        <!--============= FOOTER END ========== -->
        <?php get_footer('scripts') ?>



</body>

</html>
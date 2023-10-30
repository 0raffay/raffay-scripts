<?php

add_theme_support('post-thumbnails' );


register_nav_menus(array(
    'header-menu' => 'header-main-menu',
    'footer-menu' => 'footer-main-menu',
));


//CALL HEADER LIKE THIS:
  wp_nav_menu(array(
        'theme_location' => 'header-menu',
    ));

    function remove_excerpt_p_tags($excerpt)
    {
        return strip_tags($excerpt);
    }
    add_filter('the_excerpt', 'remove_excerpt_p_tags');
    ?>


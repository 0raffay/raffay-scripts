<?php
/* --- Site urls --- */
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$site_info = $protocol . $host ;
/* --- Site urls --- */


/* --- Site data --- */
$site_name = "";
$site_email = " ";
$site_phone = "";
$site_address = "";
/* --- Site data --- */


/* --- Og data --- */
$meta_title = "";
$meta_sub_title = "";
$meta_description = "";
$meta_image =  "$site_info/assets/images/og.png";
/* --- Og data --- */

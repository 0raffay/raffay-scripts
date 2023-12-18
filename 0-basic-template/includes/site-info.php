<?php
if (isset($_SERVER['HTTPS']))
    $siteURL = "https://";
else
    $siteURL = "http://";
$siteURL .= $_SERVER['HTTP_HOST'];

/* --- Site urls --- */
//Local
$siteURL = "https://localhost/";

//Live:
$siteURL = "https://live.com/";
/* --- Site urls --- */


/* --- Site data --- */
$siteName = "";
$siteEmail = " ";
$sitePhone = "";
$siteAddress = "";
/* --- Site data --- */


/* --- Og data --- */
$ogContent1 = "";
$ogContent2 = "";
$ogImgPath =  "$siteURL/assets/images/og.png";
/* --- Og data --- */

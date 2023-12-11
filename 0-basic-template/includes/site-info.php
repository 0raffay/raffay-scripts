<?php
if (isset($_SERVER['HTTPS']))
    $siteURL = "https://";
else
    $siteURL = "http://";
$siteURL .= $_SERVER['HTTP_HOST'];

//local:
$siteURL = "https://localhost/";

//Live:
$siteURL = "https://live.com/";


// OG DATA:
$siteName = "";
$siteEmail = " ";
$sitePhone = "";
$siteAddress = "";


$ogContent1 = "";
$ogContent2 = "";
$ogImgPath =  "$siteURL/assets/images/og.png";

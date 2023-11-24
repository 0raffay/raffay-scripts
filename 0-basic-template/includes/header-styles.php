<?php
if (isset($_SERVER['HTTPS']))
    $siteURL = "https://";
else
    $siteURL = "http://";
$siteURL .= $_SERVER['HTTP_HOST'];

$documentRoot = $_SERVER['DOCUMENT_ROOT'];
$currentScriptPath = $_SERVER['SCRIPT_FILENAME'];
$relativePath = str_replace($documentRoot, '', $currentScriptPath);
$pathParts = explode("/", $relativePath);
$folderName = $pathParts[1];

// OG DATA:
$siteName = "";
$siteURL .= "/" . $folderName;

$siteEmail = " ";
$sitePhone = "";
$siteAddress = "";


$ogContent1 = "";
$ogContent2 = "";
$ogImgPath =  "$siteURL/assets/images/og.png";
?>
<!--==== FAVICON START ====-->
<link rel="icon" type="image/png" href="assets/images/favicon/favicon.png">
<!--==== FAVICON END ====-->


<!--==== OFINFO START ====-->
<meta property="og:url" content="<?php echo $siteURL?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?php echo $ogContent1 ?>">
<meta property="og:description" content="<?php echo $ogContent2 ?>">
<meta property="og:image" content="<?php echo $ogImgPath ?>">

<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="<?php echo $siteURL ?>">
<meta property="twitter:url" content="<?php echo $siteURL ?>">
<meta name="twitter:title" content="<?php echo $ogContent1 ?>">
<meta name="twitter:description" content="<?php echo $ogContent2 ?>">
<meta name="twitter:image" content="<?php echo $ogImgPath?>">

<meta property="og:image" content="<?php echo $ogImgPath?>" />
<meta property="og:image:secure_url" content="<?php echo $ogImgPath?>" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="600" />
<meta property="og:image:height" content="330" />
<meta property="og:image:alt" content="<?php echo $ogContent1 ?>" />
<meta name="image" property="og:image" content="<?php echo $ogImgPath?>">
<meta name="author" content="<?php echo $siteName?>">
<meta name="description" property="og:description" content="<?php echo $ogContent2 ?>">
<!--==== OFINFO END ====-->


<!--==== REMIX ICONS START ====-->
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
<!--==== REMIX ICONS END ====-->

<!--==== FONTS START ====-->

<!--==== FONTS END END ====-->


<!--==== LOCAL FILE START ====-->
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/responsive.css">
<!--==== LOCAL FILE END ====-->


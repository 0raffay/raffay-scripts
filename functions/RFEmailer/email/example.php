<?php
require("configuration.php");
require("RFEmailer.php");

header('Content-Type: application/json');

if (!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["message"])) {
  echo json_encode(["success" => false, "error" => "Missing required fields"]);
  exit;
}

$name = htmlspecialchars($_POST["name"]);
$lname = htmlspecialchars($_POST["lname"]);
$phone = htmlspecialchars($_POST["phone"]);
$email = htmlspecialchars($_POST["email"]);
$message = nl2br(htmlspecialchars($_POST["message"]));

$emailBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
</head>
<body style='font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;'>
  <table role='presentation' style='width: 100%; max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;'>
    <tr>
      <td style='text-align: center;'>
        <h2 style='color: #333;'>New Contact Form Submission</h2>
        <p style='color: #666; font-size: 14px;'>You have received a new message from your website's contact form.</p>
      </td>
    </tr>
    <tr>
      <td style='padding: 15px;'>
        <table role='presentation' style='width: 100%; border-collapse: collapse;'>
          <tr>
            <td style='background: #f8f8f8; padding: 10px; font-weight: bold; border-bottom: 1px solid #ddd;'>Name</td>
            <td style='background: #ffffff; padding: 10px; border-bottom: 1px solid #ddd;'>".$name." ".$lname."</td>
          </tr>
          <tr>
            <td style='background: #f8f8f8; padding: 10px; font-weight: bold; border-bottom: 1px solid #ddd;'>Email</td>
            <td style='background: #ffffff; padding: 10px; border-bottom: 1px solid #ddd;'>".$email."</td>
          </tr>
          <tr>
            <td style='background: #f8f8f8; padding: 10px; font-weight: bold; border-bottom: 1px solid #ddd;'>Phone</td>
            <td style='background: #ffffff; padding: 10px; border-bottom: 1px solid #ddd;'>".$phone."</td>
          </tr>
          <tr>
            <td style='background: #f8f8f8; padding: 10px; font-weight: bold;'>Message</td>
            <td style='background: #ffffff; padding: 10px;'>".$message."</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style='text-align: center; padding: 20px;'>
        <p style='color: #888; font-size: 12px;'>This email was sent from <strong>The Paradise Hotel Nursery</strong></p>
      </td>
    </tr>
  </table>
</body>
</html>";

return RFEmailer($smtpConfiguration, array(
  "from" => "info@theparadisehotelnursery.com",
  "fromName" => "The Paradise Hotel Nursery",
  "to" => "info@theparadisehotelnursery.com",
  "subject" => "New Contact Form Submission",
  "body" => $emailBody
));

<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';
require '../phpmailer/src/Exception.php';

function RFEmailer($smtpConfiguration, $emailConfiguration, $onSuccess = null)
{
  header('Content-Type: application/json');
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Auth-Token, Origin');

  $mail = new PHPMailer(true);

  try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = $smtpConfiguration["host"];
    $mail->SMTPAuth = true;
    $mail->Username = $smtpConfiguration["username"];
    $mail->Password = $smtpConfiguration["password"];
    $mail->SMTPSecure = $smtpConfiguration["security"] ?? 'tls';
    $mail->Port = $smtpConfiguration["port"] ?? 587; // Default to 587 if not provided

    // Email Configuration
    $mail->setFrom($emailConfiguration["from"], $emailConfiguration["fromName"]);
    $mail->addAddress($emailConfiguration["to"]);
    $mail->isHTML(true);
    $mail->Subject = $emailConfiguration["subject"];
    $mail->Body = $emailConfiguration["body"];

    // Send Email
    $mail->send();

    if ($onSuccess) {
      $onSuccess();
    }

    // JSON success response
    echo json_encode(["success" => true, "message" => "Email was sent successfully"]);
    exit;
  } catch (Exception $e) {
    // JSON error response
    echo json_encode(["success" => false, "error" => "Message could not be sent: " . $mail->ErrorInfo]);
    exit;
  }
}

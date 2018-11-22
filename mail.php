<?php

$return = false;

if (isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['message'])) {
    $nameFrom  = $_REQUEST['name'];
    $mailFrom = $_REQUEST['email'];
    $nameTo  = "김도은";
    $mailTo = "info@myturnkids.com";
    $subject = $nameFrom . "님의 문의";
    $content = $_REQUEST['message'];    

    $charset = "UTF-8";

    $nameFrom   = "=?$charset?B?".base64_encode($nameFrom)."?=";
    $nameTo   = "=?$charset?B?".base64_encode($nameTo)."?=";
    $subject = "=?$charset?B?".base64_encode($subject)."?=";

    $header  = "Content-Type: text/html; charset=utf-8\r\n";
    $header .= "MIME-Version: 1.0\r\n";

    $header .= "Return-Path: <". $mailFrom .">\r\n";
    $header .= "From: ". $nameFrom ." <". $mailFrom .">\r\n";
    $header .= "Reply-To: <". $mailFrom .">\r\n";

    $result = mail($mailTo, $subject, $content, $header, $mailFrom);

    if ($result) {
        $return = true;
    }
}

header("Content-Type: text/html; charset=UTF-8");
echo json_encode(array( 'is_success' => $return, 'data' => $_POST ));

?>
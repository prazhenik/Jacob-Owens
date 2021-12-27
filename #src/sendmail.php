<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('ellinets.dok@gmail.com', 'Илья Илья');
//Кому отправить
$mail->addAddress('prazhenik.dev@gmail.com');
//Тема письма
$mail->Subject = 'Новое сообщение';


//Тело письма
$body = '<h1>Новое сообщение prazhenik.dev</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
}


$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка PHP';
} else {
	$message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

<?php

$host = 'localhost';
$dbname = 'fittrack';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else
    echo "OK";
?>
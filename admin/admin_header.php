<?php
require_once "../backend/db_connection.php";
session_start();

$user = $_SESSION["user"];
$type = $_SESSION["type"];
if (empty($user) || empty($type) || $user != "admin" || $type != "admin") {
    header("location: ../auth.php");
    exit();
}
?>
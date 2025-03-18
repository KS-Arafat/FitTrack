<?php
require_once "db_connection.php";
require_once "sanitizer.php";

$email = sanitize_input($_POST["email"]);
$pwd = $_POST["pwd"];

if (!isset($email, $pwd))
    exit("Invalid Input");

$query = mysqli_query($conn, "select * from users where email ='$email' Limit 1");
if (mysqli_num_rows($query) == 0)
    exit("User Not Found");
$row = mysqli_fetch_assoc($query);

$phash = $row["hash"];

if (password_verify($pwd, $phash)) {
    session_start();
    $_SESSION["username"] = $row["username"];
    header("Location: ../dashboard.php");
    exit();
} else
    header("Location: ../auth.php?userPwd=false");

exit();
?>
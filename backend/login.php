<?php
require_once "db_connection.php";
require_once "sanitizer.php";
$email = sanitize_input($_POST["email"]);
$pwd = $_POST["pwd"];
if (!isset($email, $pwd))
    exit("Invalid Input");
if ($email === "admin" && $pwd === "admin") {
    session_start();
    $_SESSION["user"] = "admin";
    $_SESSION["type"] = "admin";
    header("location: ../admin/index.php");
    exit();
}
$query = mysqli_query($conn, "select * from users where email ='$email' Limit 1");
if (mysqli_num_rows($query) == 0)
    exit("User Not Found");
$row = mysqli_fetch_assoc($query);
$phash = $row["hash"];
if (password_verify($pwd, $phash)) {
    session_start();
    $_SESSION["uuid"] = $row["uuid"];
    $_SESSION["username"] = $row["username"];
    header("Location: ../dashboard.php");
    exit();
} else
    header("Location: ../auth.php?userPwd=false");
exit();
?>
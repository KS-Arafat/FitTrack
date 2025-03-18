<?php
require_once "db_connection.php";
require_once "sanitizer.php";

$username = sanitize_input($_POST["uname"]);
$email = sanitize_input($_POST["email"]);
$pwd = $_POST["pwd"];
$rpwd = $_POST["rpwd"];


if (!isset($username, $email, $pwd, $rpwd))
    exit("Invalid Input");

if ($pwd != $rpwd)
    exit("Invalid Password");

$user_exists = mysqli_query($conn, "select * from users where email='$email'");
if (mysqli_num_rows($user_exists) > 0) {
    header('Location: ../auth.php?userExists=true');
    echo $user_exists;
    exit();
}

// Insert User
$pwd_hash = password_hash($pwd, PASSWORD_BCRYPT);
$qres = mysqli_query($conn, "INSERT INTO users (uuid, username, email, hash) 
VALUES (UUID(), '$username', '$email', '$pwd_hash');
");

if ($qres)
    header("Location: ../auth.php");
else
    echo "Error" . $qres;

?>
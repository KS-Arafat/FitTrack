<?php
session_start();
$username = $_SESSION["username"];
if (!isset($username))
    header("Location: auth.php?userPwd=false");

echo $username . "<br>";
echo $_SESSION["uuid"];

?>
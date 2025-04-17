<?php
require_once __DIR__ . "/../backend/db_connection.php";
session_start();
$username = $_SESSION["username"];
$uuid = $_SESSION["uuid"];
if (!isset($username, $uuid)) {
    echo "No session";
    header("location: ../auth.php?userPwd=false");
    exit();
}
$user_uuid = mysqli_real_escape_string($conn, $uuid);
$sql = "SELECT id FROM user_profiles WHERE user_uuid = '$user_uuid'";
$query = mysqli_query($conn, $sql);
if (!$query) {
    echo "Query Error: " . mysqli_error($conn);
} elseif (mysqli_num_rows($query) > 0) {
} else {
    header("Location: profile.php");
}

?>
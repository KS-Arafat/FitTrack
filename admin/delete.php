<?php require_once "admin_header.php";
$uuid = $_GET["uuid"];
if (empty($uuid)) {
    header("location: index.php");
    exit;
}

$sql = "DELETE FROM users WHERE uuid = '$uuid'";
$result = mysqli_query($conn, $sql);

header("location: index.php");


?>
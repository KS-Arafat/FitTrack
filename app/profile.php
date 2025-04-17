<?php
session_start();
if (!isset($_SESSION["uuid"], $_SESSION["username"]))
    header("location:../auth.php?userPwd=false");
?>
<!DOCTYPE html>
<html lang="en">
<?php include_once "app_header.php" ?>

<body class="profile__body">
    <div class="profile-container">
        <h1>Create Your Fitness Profile</h1>
        <form id="profile-form" method="post">
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" id="age" name="age" required>
            </div>
            <div class="form-group">
                <label for="gender">Gender</label>
                <select id="gender" name="gender" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="height">Height (cm)</label>
                <input type="number" id="height" name="height" required>
            </div>
            <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" name="weight" required>
            </div>
            <button type="submit">Save Profile</button>
        </form>
    </div>
    <?php
    require_once __DIR__ . "/../backend/sanitizer.php";
    require_once "../backend/db_connection.php";
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $age = sanitize_input($_POST['age']);
        $gender = sanitize_input($_POST['gender']);
        $height_cm = sanitize_input($_POST['height']);
        $weight_kg = sanitize_input($_POST['weight']);
        if (!isset($age, $gender, $height_cm, $weight_kg)) {
            echo "<br><br> Operation Unsuccessful!!";
        } else {
            $uuid = $_SESSION["uuid"];
            $delete_sql = "DELETE FROM user_profiles WHERE user_uuid = '$uuid'";
            mysqli_query($conn, $delete_sql);
            $sql = "INSERT INTO user_profiles (user_uuid, age, gender, height_cm, weight_kg) 
                VALUES ('$uuid', $age, '$gender', $height_cm, $weight_kg)";
            if (mysqli_query($conn, $sql))
                header("Location: ../dashboard.php");
            else
                echo "<br><br> Operation Unsuccessful!!";
        }
    }

    ?>
    <?php
    require_once("app_nav.php");
    ?>
</body>

</html>
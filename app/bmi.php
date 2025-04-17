<?php include_once "../components/protected.php";

$sql = "SELECT weight_kg, height_cm 
FROM user_profiles 
WHERE user_uuid = '$uuid' 
ORDER BY updated_at DESC 
LIMIT 1";
$result = mysqli_query($conn, $sql);
if ($row = mysqli_fetch_assoc($result)) {
    $weight = $row['weight_kg'];
    $height_cm = $row['height_cm'];
    $height_m = $height_cm / 100;

    $bmi = $weight / ($height_m * $height_m);
    $bmi = round($bmi, 2);

    if ($bmi < 18.5) {
        $category = "Underweight";
    } elseif ($bmi < 24.9) {
        $category = "Normal weight";
    } elseif ($bmi < 29.9) {
        $category = "Overweight";
    } else {
        $category = "Obese";
    }
    $bmi_result = "BMI: {$bmi} ({$category})";
}
?>
<!DOCTYPE html>
<html lang="en">
<?php include_once "app_header.php" ?>

<body>
    <div class="bmi-container">
        <center>
            <h2>User BMI Calculation</h2>
            <?php if ($weight && $height_cm): ?>
                <p>Weight: <?php echo $weight; ?> kg</p>
                <p>Height: <?php echo $height_cm; ?> cm</p>
                <p class="bmi-result"><?php echo $bmi_result; ?></p>
            <?php else: ?>
                <p class="bmi-result">No profile data found.</p>
            <?php endif; ?>
        </center>
    </div>
    <?php
    require_once("app_nav.php");
    ?>
</body>

</html>
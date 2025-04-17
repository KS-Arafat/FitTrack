<?php include_once "../components/protected.php";
$sql = "SELECT * FROM activities WHERE user_uuid = '$uuid' ORDER BY activity_date DESC";
$result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="en">
<?php include_once "app_header.php" ?>

<body>
    <center>
        <h2>Activity Records</h2>
    </center>
    <table>
        <tr>
            <th>Activity Type</th>
            <th>Distance (km)</th>
            <th>Duration (min)</th>
            <th>Calories Burned (kcal)</th>
            <th>Date</th>
        </tr>
        <?php if (mysqli_num_rows($result) > 0): ?>
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['activity_type']); ?></td>
                    <td><?php echo htmlspecialchars($row['distance_km']); ?></td>
                    <td><?php echo htmlspecialchars($row['duration_minutes']); ?></td>
                    <td><?php echo htmlspecialchars($row['calories_burned']); ?></td>
                    <td><?php echo htmlspecialchars($row['activity_date']); ?></td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr>
                <td colspan="5">No activities found.</td>
            </tr>
        <?php endif; ?>
    </table>
    <?php
    require_once("app_nav.php");
    ?>
</body>

</html>
<?php require_once "admin_header.php";
$uuid = $_GET["uuid"];
if (empty($uuid)) {
    header("location: index.php");
    exit;
}
$sql = "SELECT * FROM activities WHERE user_uuid = '$uuid' ORDER BY activity_date DESC";
$result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin View</title>
    <link rel="stylesheet" href="admin.css">
</head>

<body>

    <body>
        <center>
            <h2>Activity Records</h2>
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
        </center>
    </body>

</html>
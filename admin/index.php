<?php
require_once "../minify.php";
require_once "admin_header.php"; ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fitness Admin Dashboard</title>
    <link rel="stylesheet" href="admin.min.css">
</head>

<body>
    <div class="dashboard">

        <div class="main-content">
            <header class="header">
                <div class="search-bar">
                    <input type="text" placeholder="Search...">
                    <i class="ri-search"></i>
                </div>
                <div class="user-area">
                    <div class="user-profile">
                        <span><a href="logout.php">Logout</a></span>
                    </div>
                </div>
            </header>
            <div class="content">
                <h1>Admin Dashboard Overview</h1>
                <div class="stats-cards">
                    <div class="card">
                        <div class="card-icon blue">
                            <i class="ri-users"></i>
                        </div>
                        <div class="card-info">
                            <h3>Total Users</h3>
                            <span id="tu">0</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon green">
                            <i class="ri-chart-line"></i>
                        </div>
                        <div class="card-info">
                            <h3>Active Users</h3>
                            <span id="au">0</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon orange">
                            <i class="ri-weight"></i>
                        </div>
                        <div class="card-info">
                            <h3>Avg. Weight</h3>
                            <span id="aw">0</span> kg
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon red">
                            <i class="ri-height"></i>
                        </div>
                        <div class="card-info">
                            <h3>Avg. Height</h3>
                            <span id="ah">0</span> cm
                        </div>
                    </div>
                </div>
                <div class="recent-users">
                    <h2>Recent User Profiles</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script>
        const userData = [
            <?php
            $sql = "SELECT users.uuid, users.email, id, age, gender, height_cm, weight_kg, updated_at FROM `user_profiles` inner join users on users.uuid = user_profiles.user_uuid;";
            $result = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result) > 0) {
                $first = true;
                while ($row = mysqli_fetch_assoc($result)) {
                    if (!$first)
                        echo ",";
                    echo json_encode($row);
                    $first = false;
                }
                mysqli_data_seek($result, 0);
            }
            ?>
        ];
    </script>
    <script src="admin.min.js" defer></script>
</body>

</html>

<?php ob_end_flush(); ?>
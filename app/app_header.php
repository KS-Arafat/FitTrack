<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.min.css" />
    <title>Exercise Tracker</title>
    <link rel="icon" type="image/png" href="../assets/favicon.png" />
    <style>
        .profile-circle-holder {
            height: 60px;
            width: 100dvw;
        }

        .profile-circle {
            position: absolute;
            height: 60px;
            width: 60px;
            border: 0 transparent solid;
            border-radius: 100%;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px;
            text-decoration: none;
            animation: none;
            text-transform: uppercase;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
            font-weight: 800;
            background: linear-gradient(to right bottom, #8d465b, #cdefef, #cdc5f2);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>

<?php
$current_url = $_SERVER['REQUEST_URI'];
if ($current_url !== "/fittrack/app/profile.php")
    echo '<body><div class="profile-circle-holder">
        <a href="profile.php" class="profile-circle">' .
        substr($_SESSION["username"], 0, 4) . '</a></div></body>';
?>
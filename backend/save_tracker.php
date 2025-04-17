<?php
session_start();
require_once "db_connection.php";
function calculateMET($speed_kmh)
{
    if ($speed_kmh <= 5.6) {
        return (0.1 * $speed_kmh * 16.67) + 3.5;
    } else {
        return (0.2 * $speed_kmh * 16.67) + 3.5;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['distance']) && isset($_POST['duration']) && isset($_SESSION["uuid"])) {
        $distance = $_POST['distance'];
        $duration_str = $_POST['duration'];
        list($hours, $minutes, $seconds) = explode(":", $duration_str);
        $duration = ($hours * 60) + $minutes + ($seconds / 60);
        $user_uuid = $_SESSION["uuid"];
        $sql = "SELECT weight_kg FROM `user_profiles` where user_uuid='$user_uuid'";
        $result = mysqli_query($conn, $sql);
        if ($row = mysqli_fetch_assoc($result)) {
            $weight = $row["weight_kg"];
            $duration_hours = $duration / 60;

            $speed_kmh = $distance / $duration_hours;
            $activity_type = ($speed_kmh <= 5.6) ? "walking" : "running";

            $MET = calculateMET($speed_kmh);

            $calories_burned = $MET * $weight * $duration_hours;

            $logEntry = "Distance: " . $distance . " km, Duration: " . $duration . " min, User: " . $user_uuid . ", Weight: " . $weight . " kg, Calories Burned: " . round($calories_burned, 2) . " kcal\n";

            $sql = "INSERT INTO `activities` (`user_uuid`, `activity_type`, `distance_km`, `duration_minutes`, `calories_burned` ) VALUES ('$user_uuid', '$activity_type', '$distance', '$duration', '$calories_burned')";
            $qres = mysqli_query($conn, $sql);
            if ($qres)
                $response = array(
                    'status' => 'success',
                    'message' => $logEntry
                );
            else
                $response = array(
                    'status' => 'error',
                    'message' => $qres
                );

        }
    } else {
        $response = array(
            'status' => 'error',
            'message' => 'Missing distance or duration.'
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method.'
    );
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>
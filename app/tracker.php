<?php
include_once "../minify.php";
include_once "../components/protected.php"; ?>

<html lang="en">
<?php include_once "app_header.php" ?>

<head>
    <link rel="stylesheet" href="./leaflet_style.min.css" />
</head>

<body>

    <div class="container">
        <h1>Travel Distance Tracker</h1>
        <br>
        <center>

            <div class="weather-widget">
                <div class="weather-header">
                    <div class="location">Dhaka, BD</div>
                    <div class="date" id="current-date">Loading date...</div>
                </div>

                <div id="weather-content">
                    <div class="loading">Loading weather data...</div>
                </div>
            </div>
        </center>
        <div class="controls">
            <button id="startBtn" class="btn">Start Tracking</button>
            <button id="stopBtn" class="btn" disabled>Stop Tracking</button>
            <button id="clearBtn" class="btn">Clear Map</button>
            <button id="locateBtn" class="btn">Find My Location</button>
            <div class="stats">
                <div>Distance: <span id="distance">0</span> km</div>
                <div>Duration: <span id="duration">00:00:00</span></div>
            </div>
        </div>
        <div id="map"></div>
        <div class="trip-info" id="tripInfo" style="display: none">
            <h3>Trip Summary</h3>
            <p>Total Distance: <span id="summaryDistance">0</span> km</p>
            <p>Total Duration: <span id="summaryDuration">00:00:00</span></p>
            <button id="saveBtn" class="btn">Save Trip</button>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
    <script src="tracker.min.js" defer></script>
    <script src="weather.min.js" defer></script>
    <?php
    require_once("app_nav.php");
    ?>
</body>

</html>

<?php ob_end_flush(); ?>
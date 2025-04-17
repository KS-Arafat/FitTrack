<style>
    * {
        margin: 0;
        padding: 0;
    }

    .app__nav {
        position: fixed;
        bottom: 0;
        width: 100dvw;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        z-index: 500;
    }

    .app__nav a {
        width: 25dvw;
        text-decoration: none;
        font-size: large;
        padding: 5px 0 5px 0;
        text-align: center;
        color: aliceblue;
        opacity: .5;
        transition: opacity .25s ease-in-out;
    }

    .app__nav a:nth-child(1) {
        background-color: dodgerblue;
    }

    .app__nav a:nth-child(2) {
        background-color: darkorange;
    }

    .app__nav a:nth-child(3) {
        background-color: limegreen;
    }

    .app__nav a:nth-child(4) {
        background-color: indianred;
    }

    .app__nav a:hover {
        opacity: 1;
        border-top-left-radius: 15px;
        /* border-top-right-radius: 15px; */
        transition: opacity .25s ease-in-out;
        transition: border-radius .25s ease-in-out;
    }
</style>

<div class="app__nav">
    <a href="tracker.php">Tracker</a>
    <a href="bmi.php">BMI</a>
    <a href="records.php">Records</a>
    <a href="logout.php">Logout</a>
</div>
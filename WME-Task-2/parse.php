<!DOCTYPE html>
<html lang="de">
<head>
    <?php include("head.php"); ?>
</head>

<body>
<?php include("navi.php"); ?>
<div class="container">
    <?php
    /**
     * implementation of the parse of csv_file: world_data.csv to an array with showing of them
     */
    include ("showhide.php");
    require 'world_data_parser.php';
    $wdp = new WorldDataParser();
    $csv = $wdp -> parseCSV('world_data.csv');
    echo '<h1>Returned array:</h1>';
    echo '<pre>'; print_r($csv); echo '</pre>';
    include("footer.php");
    ?>
</div>
</body>
</html>

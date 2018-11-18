<!DOCTYPE html>
<html lang="de">
<head>
    <?php include("head.php"); ?>
</head>

<body>
<?php include("navi.php"); ?>
<div id="content">
    <?php
    require 'world_data_parser.php';
    include("ipsum.php");
    include ("showhide.php");
    $wdp = new WorldDataParser();
    $csv = $wdp -> parseCSV('world_data.csv');
    if ($wdp -> saveXML($csv)==true){
        echo '<h1>Data was successfully saved as "world_data.xml" =)</h1>';
    }else echo '<h1>Data was not saved =(</h1>';

    include("footer.php");
    ?>
</div>
</body>
</html>


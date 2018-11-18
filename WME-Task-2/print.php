<!DOCTYPE html>
<html lang="de">
<head>
  <?php include("head.php"); ?>
</head>

<body>
  <?php include("navi.php"); ?>
  <div>
    <?php
      include("ipsum.php");
      include("showhide.php");
      require 'world_data_parser.php';
      $wdp = new WorldDataParser();
      $csv = $wdp -> parseCSV('world_data.csv');
      echo '<pre>';
      print_r($wdp -> printXML("world_data.xml", "world_data.xsl"));
      echo '</pre>';
      include("footer.php");
    ?>
  </div>
</body>
</html>
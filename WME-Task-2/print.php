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
     * implementation of printing of world_data.xml
     */
      include("showhide.php");
      require 'world_data_parser.php';
      $wdp = new WorldDataParser();
      $csv = $wdp -> parseCSV('world_data.csv');
      echo '<h1>Printed world_data.xml</h1>';
      echo '<pre>';
      print_r($wdp -> printXML("world_data.xml", "world_data.xsl"));
      echo '</pre>';
      include("footer.php");
    ?>
  </div>
</body>
</html>
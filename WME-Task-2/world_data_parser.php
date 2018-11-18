<?php
class WorldDataParser
{

    function parseCSV($csv_link)
    {
        $array = array_map('str_getcsv', file($csv_link));
        return $array;
    }
    function saveXML($array)
    {
        try {
            // go through first array and collect tags
            $xml_tag = array();
            foreach ($array[0] as $line) {
                $tag = str_replace(' ', '_', trim($line));
                $xml_tag[] = $tag;
            }
            $xml = new DOMDocument("1.0", "UTF-8");
            $xml_countries = $xml->createElement('Countries');
            // go through remaining array and get the content of the array
            foreach ($array as $col_nr => $content) {
                if ($col_nr) {
                    $xml_country = $xml->createElement("Country");
                    foreach ($content as $index => $value) {
                        $table_ele = $xml->createElement($xml_tag[$index]);
                        $table_ele->nodeValue = $value;
                        $xml_country->appendChild($table_ele);
                    }
                    $xml_countries->appendChild($xml_country);
                }
            }
            $xml->appendChild($xml_countries);
            $ret = $xml->save('world_data.xml');
            return boolval($ret);
        } catch (Exception $exception) {
            return false;
        }
    }

    // import the xsl and xml file and transfoorm it to the new html table
    function printXML($xml_link, $xsl_link)
    {
        $xsl = new DOMDocument("1.0", "UTF-8");
        $xsl->load($xsl_link);
        $xml = new DOMDocument("1.0", "UTF-8");
        $xml->load($xml_link);
        $proc = new XSLTProcessor();
        $proc->importStylesheet($xsl);
        $proc = $proc->transformToXML($xml);
        return $proc;
    }
}

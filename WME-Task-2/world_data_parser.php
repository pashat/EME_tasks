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
            $xml_tags_array = array();
            foreach ($array[0] as $line) {
                $tag = str_replace(' ', '_', trim($line));
                $xml_tags_array[] = $tag;
            }
            $xml = new DOMDocument("1.0", "UTF-8");
            $xml->preserveWhiteSpace = false;
            $xml->formatOutput = true;
            $xml_countries = $xml->createElement('Countries');
            // go through remaining array in array, create xml from every entry.
            foreach ($array as $entry_nr => $entry) {
                if ($entry_nr) {
                    $xml_country = $xml->createElement("Country");
                    foreach ($entry as $index => $value) {
                        $value = trim($value);
                        $xele = $xml->createElement($xml_tags_array[$index]);
                        $xele->nodeValue = $value;
                        $xml_country->appendChild($xele);
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
    function printXML($xml_link, $xsl_link)
    {
        $xsl = new DOMDocument("1.0", "UTF-8");
        $xsl->load($xsl_link);
        $xml = new DOMDocument("1.0", "UTF-8");
        $xml->load($xml_link);
        $procxml = new XSLTProcessor();
        $procxml->importStylesheet($xsl);
        $procxml = $procxml->transformToXML($xml);
        return $procxml;
    }
}
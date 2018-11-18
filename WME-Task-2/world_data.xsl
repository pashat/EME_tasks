<?xml version="1.0" encoding="UTF-8"?>
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:output method="xml" omit-xml-declaration="yes" />
        <xsl:template match="/">
            <table id="table">
                <thead>
                    <tr>
                        <th class="col1" >id</th>
                        <th class="col2" >country</th>
                        <th class="col3" >birth rate per 1000</th>
                        <th class="col4" >cell phones per 100</th>
                        <th class="col5" >children per woman</th>
                        <th class="col6" >electricity consumption per capita</th>
                        <th class="col7" >gdp per capita</th>
                        <th class="col8" >gdp per capita growth</th>
                        <th class="col9" >inflation annual</th>
                        <th class="col10" >internet user per 100</th>
                        <th class="col11" >life expectancy</th>
                        <th class="col12" >military expenditure percent of gdp</th>
                        <th class="col13" >gps lat</th>
                        <th class="col14" >gps long</th>
                    </tr>
                </thead>
                <tbody id="table_body">
                    <xsl:for-each select="Countries/Country">
                        <tr>
                            <td class="col1" ><xsl:value-of select="format-number(id, '#')"/></td>
                            <td class="col2"><xsl:value-of select="name"/></td>
                            <td class="col3"><xsl:value-of select="format-number(birth_rate_per_1000, '#.###')"/></td>
                            <td class="col4"><xsl:value-of select="format-number(cell_phones_per_100, '#.########')"/></td>
                            <td class="col5"><xsl:value-of select="format-number(children_per_woman, '#.###')"/></td>
                            <td class="col6"><xsl:value-of select="format-number(electricity_consumption_per_capita, '#.######')"/></td>
                            <td class="col7"><xsl:value-of select="format-number(gdp_per_capita, '#.##')"/></td>
                            <td class="col8"><xsl:value-of select="format-number(gdp_per_capita_growth, '#.########')"/></td>
                            <td class="col9"><xsl:value-of select="format-number(inflation_annual, '#.##')"/></td>
                            <td class="col10"><xsl:value-of select="format-number(internet_user_per_100, '#.#######')"/></td>
                            <td class="col11"><xsl:value-of select="format-number(life_expectancy, '#.###')"/></td>
                            <td class="col12"><xsl:value-of select="format-number(military_expenditure_percent_of_gdp, '#.######')"/></td>
                            <td class="col13"><xsl:value-of select="format-number(gps_lat, '#.####')"/></td>
                            <td class="col14"><xsl:value-of select="format-number(gps_long, '#.###')"/></td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </xsl:template>
</xsl:stylesheet>

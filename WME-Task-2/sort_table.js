/**
 * this script was written with help from website https://www.w3schools.com
 * https://www.w3schools.com/howto/howto_js_sort_table.asp
 */
function sortTableAbc() {
        var table, casex, row, i, a, b, change;
        table = document.getElementById("sortedTable");
        casex = 1;
        while (casex===1) {
            casex = 0;
            row = table.rows;
            for (i = 1; i < (row.length - 1); i++) {
                change = 0;
                a = row[i].getElementsByTagName("TD")[1];
                b = row[i + 1].getElementsByTagName("TD")[1];
                if (a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase()) {
                    change = 1;
                    break;
                }
            }
            if (change===1) {
                row[i].parentNode.insertBefore(row[i + 1], row[i]);
                casex = 1;
            }
        }
    }
function sortTableZyx() {
        var table, casex, row, i, a, b, change;
        table = document.getElementById("sortedTable");
        casex = 1;
        while (casex===1) {
            casex = 0;
            row = table.rows;
            for (i = 1; i < (row.length - 1); i++) {
                change = 0;
                a = row[i].getElementsByTagName("TD")[1];
                b = row[i + 1].getElementsByTagName("TD")[1];
                if (a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase()) {
                    change = 1;
                    break;
                }
            }
            if (change===1) {
                row[i].parentNode.insertBefore(row[i + 1], row[i]);
                casex = 1;
            }
        }
}
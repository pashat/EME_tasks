function showHide() {
    var x = document.getElementById("data_table");

    rows = x.rows
    for (i = 1; i < (rows.length - 1); i++){

      y = rows[i].getElementsByTagName("TD")[2];
    if (y.style.visibility == "visible") {
        y.style.visibility = "hidden";
    } else {
        y.style.visibility = "visible";
    }
}

function showHideClass (){
  var x = document.getElementsByClassName("testo");
  var i;
  for (i = 0; i < x.length; i++){
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
}

  for (var i = 0; i < x.length; i++){
    if (x[i].style.visibility === "visible") {
        x[i].style.visibility = "hidden";
    } else {
        x[i].style.visibility = "visible";
    }

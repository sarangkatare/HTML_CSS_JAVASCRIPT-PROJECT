
var data;
function myfunc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(JSON.parse(this.responseText));
            data = JSON.parse(this.responseText);
            data = data.filter(function (item) {
                return (item.is_published === true || item.is_published === "true");
            })

            boxsorting("fromload");
        }
    };
    xhttp.open("GET", "./data.json", true);
    xhttp.send();
}
myfunc();

function boxsorting(from) {

    if (from === "frombutton") {
        document.getElementById("content").innerHTML = "";
        data= data.reverse();
    }
    else {
        data = data.sort(function (a, b) {
            var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });
    }

    data.forEach(function (item) {
        var el = document.getElementById("content")
        el.insertAdjacentHTML('afterbegin', "<div class='content-boxes'> <div class='image'>   <img src= 'images/" + item.image_name + "'/>        </div>           <div class='title' id='title'>  " + item.title + "         </div>           <div class='filename'>             " + item.image_name + "          </div>     <hr>      <div class='description'>                " + item.description + "          </div> <div> <i class='material-icons box-icon'> favorite</i>	<i class='material-icons box-icon'>grade</i> </div>        </div>");

    });
};

document.getElementById("sorting").addEventListener("click", function () {
    boxsorting("frombutton")
});




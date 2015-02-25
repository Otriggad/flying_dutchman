
function nextLocation(nextLocation) {
    //document.getElementById("myButtonN").onclick = function () {
    location.href = nextLocation;
    //};
}

function testfunc(request) {
		var inv = JSON.parse(request);
		var text = "";
		for (i = 0; i < inv.payload.length; i++) {
				text += "<b>Name</b>: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + " <b>Count:</b> " + inv.payload[i].count + " <b>Price:</b> " + inv.payload[i].price + "</br></br>";
		}
		return text;
}

function testfunctable(request) {
    var inv = JSON.parse(request);
    var text = "";
    var myTableDiv = document.getElementById("status");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.border = '1';
    table.appendChild(tableBody);
    var i = 0;
    var tr = document.createElement('TR');
    
    while (i<inv.payload.length) {
	var tr = document.createElement('TR');
	for(j = 0;j <5;j++){
	    if(i<inv.payload.length) {
		//text += "Name: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + "Count:" + inv.payload[i].count + "Price:" + inv.payload[i].price;
		//var textName = "Name: " + inv.payload[i].namn;
		//var textCount = "Count: " + inv.payload[i].count;
		//var textPrice = "Price: " + inv.payload[i].price;
		
		var td = document.createElement('TD');
		var b1 = document.createElement('B');
		b1.appendChild(document.createTextNode('Name: '));
		td.appendChild(b1)
		if(inv.payload[i].namn != "") {
		    td.appendChild(document.createTextNode(inv.payload[i].namn));
		} else {
		    td.appendChild(document.createTextNode(inv.payload[i].namn2));
		}
	        td.appendChild(document.createElement('BR'));	       
		var b2 = document.createElement('B');
		b2.appendChild(document.createTextNode('Count :'));
		td.appendChild(b2);
		td.appendChild(document.createTextNode(inv.payload[i].count));
		td.appendChild(document.createElement('BR'));	       		
		var b3 = document.createElement('B');
		b3.appendChild(document.createTextNode('Price :'));
		td.appendChild(b3);
		td.appendChild(document.createTextNode(inv.payload[i].price));
		td.appendChild(document.createElement('BR'));
		var btn = document.createElement("BUTTON");        // Create a <button> element
		var t = document.createTextNode("BUY!!!");       // Create a text node
		btn.appendChild(t);                                // Append the text to <button>
		td.appendChild(btn);                    // Append <button> to <body>
		tr.appendChild(td);
		i++;
	    }
	}
	tableBody.appendChild(tr);
	text = "";
    }
    myTableDiv.appendChild(table);

}

//JSON of inventory before callback to init values
var retur = null;

function inventory_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
    send_request_callback(data,testfunctable);
//		send_request_callback(data, function() {
//				var inv = JSON.parse(this);
//				var text = "";
//				for (i = 0; i < inv.payload.length; i++) {
//						text += "<b>Name</b>: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + " <b>Count:</b> " + inv.payload[i].count + " <b>Price:</b> " + inv.payload[i].price + "</br></br>";
//				}
//				document.getElementById("status").innerHTML = "<br/>" + testfunc(this);
//				retur = this;
//				return retur;
//		});
		//console.log(retur);
}

function purchases_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=purchases_get";
    send_request(data);
}

function purchases_get_all_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=purchases_get_all";
    send_request(data);
}

function purchases_append_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var beer_id = document.getElementById('beer_id').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=purchases_append" + "&beer_id=" + beer_id;
    send_request(data);
}

function payments_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=payments_get";
    send_request(data);
}

function payments_get_all_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=payments_get_all";
    send_request(data);
}

function payments_append_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var amount = document.getElementById('amount').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=payments_append" + "&amount=" + amount;
    send_request(data);
}

function iou_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=iou_get";
    send_request(data);
}

function iou_get_all_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=iou_get_all";
    send_request(data);
}

function beer_data_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var beer_id = document.getElementById('beer_id').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=beer_data_get" + "&beer_id=" + beer_id;
    send_request(data);
}

function user_edit_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var new_usr = document.getElementById('new_username').value.toString();
    var new_pass = document.getElementById('new_password').value.toString();
    var fname = document.getElementById('first_name').value.toString();
    var lname = document.getElementById('last_name').value.toString();
    var email = document.getElementById('email').value.toString();
    var phone = document.getElementById('phone').value.toString();
    var data = "username=" + usr + "&password=" + pass + "action=&user_edit" + "&new_username=" + new_usr +
            "&new_password=" + new_pass + "&first_name=" + fname + "&last_name=" + lname +
            "&email=" + email + "&phone=" + phone;
    send_request(data);
}

function inventory_append_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var beer_id = document.getElementById('beer_id').value.toString();
    var amount = document.getElementById('amount').value.toString();
    var price = document.getElementById('price').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_append" + 
            "&beer_id=" + beer_id + "&amount=" + amount + "&price=" + price;
    send_request(data);
}

function send_request_callback(data, callback) {
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create file variables
    var url = "http://pub.jamaica-inn.net/fpdb/api.php?";
    var request = url.concat(data);
    
    hr.open("POST", request, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function () {
        if (hr.readyState === 4 && hr.status === 200) {
            //return_data = JSON.parse(hr.responseText);
	    callback(hr.responseText);
	    callback.call(hr.responseText);
            //document.getElementById("status").innerHTML = return_data.payload[25].namn;
	}
    };
    
    // Send request and wait for response to update the status div
    hr.send(null); // Actually execute the request
    
    document.getElementById("status").innerHTML = "processing..";
}

function send_request(data) {
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create file variables
    var url = "http://pub.jamaica-inn.net/fpdb/api.php?";
    var request = url.concat(data);
    
    //hr.open("POST", "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=iou_get", true);
    hr.open("POST", request, true);

    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function () {
        if (hr.readyState === 4 && hr.status === 200) {
            var return_data = hr.responseText;
            document.getElementById("status").innerHTML = return_data;
        }
    };
    
    // Send request and wait for response to update the status div
    hr.send(null); // Actually execute the request
    document.getElementById("status").innerHTML = "processing..";
}

function setLanguage (inputLang) {
    $(function() {
        var language = inputLang;
        $.ajax({
            url: 'languages.xml',
            success: function(xml) {
                $(xml).find('translation').each(function(){
                    var id = $(this).attr('id');
                    var text = "<p>" + $(this).find(language).text() + "</p>";
                    $("" + id).html(text);
                });
            }
        });
    });

}

$(document).ready(function(){
$("img.lang").on("click", function () {
    if($(this).hasClass("sv")){
        $("#swedish").addClass("hidden");
        $("#english").removeClass("hidden");
        setLanguage("english");  
    }
    else{
        $("#swedish").removeClass("hidden");
        $("#english").addClass("hidden");  
        setLanguage("swedish");
    }
})
});


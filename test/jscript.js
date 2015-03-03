function nextLocation(nextLocation) {
    //document.getElementById("myButtonN").onclick = function () {
    location.href = nextLocation;
    //};
}

function testfunc(request) {
    var inv = JSON.parse(request);
    var text = "";
    var myTableDiv = document.getElementById("status");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.border = '1'
    table.appendChild(tableBody);
    // for (i = 0; i < inv.payload.length; i++) {
    //     text += "<b>Name</b>: " + inv.payload[i].namn
    // 	+ "</br> <b>Beer ID:</b>"
    // 	+ inv.payload[i].beer_id + " <b>Count:</b> "
    // 	+ inv.payload[i].count + " <b>Price:</b> "
    // 	+ inv.payload[i].price
    // 	+ "</br></br>";
    // }
    int i = 0;
    while(i < inv.payload.length) {
	var tr = document.createElement('TR');
	for(int j = 0;j<5;j++) {
	    var td = document.createElement('TD');
	    text += "<b>Name</b>: "
		+ inv.payload[i].namn
    		+ "</br> <b>Beer ID:</b>"
    		+ inv.payload[i].beer_id
		+ " <b>Count:</b> "
    		+ inv.payload[i].count
		+ " <b>Price:</b> "
    		+ inv.payload[i].price
    		+ "</br></br>";
	    td.appendChild(document.createTextNode(text));
            tr.appendChild(td);
	}
	tableBody.appendChild(tr);
	text = "";
	i += 5;
    }
    myTableDiv.appendChild(table)
    //return text;
}

//JSON of inventory before callback to init values
var retur = null;

function inventory_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
	
    send_request_callback(data, testfunc);
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

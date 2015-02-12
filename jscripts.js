
function nextLocation(nextLocation) {
    //document.getElementById("myButtonN").onclick = function () {
    location.href = nextLocation;
    //};
}

function inventory_get_request() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
    send_request(data);
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
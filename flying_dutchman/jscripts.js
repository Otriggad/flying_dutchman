
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

//Carts should be represented by an json object {items:[{name,id,count,price}]}
function addToCart(data) {
   
    var jsonStr;
    var obj;
    var obj2 = JSON.parse(data);
    var myListDiv = document.getElementById("cart");
    var list;
    if (document.getElementById("cList") == null) {
	list = document.createElement('UL');
	list.setAttribute("id","cList");
    }  else {
	list = document.getElementById("cList");
    }

    if (sessionStorage.cart != undefined) {
	jsonStr = sessionStorage.cart;
	obj = JSON.parse(jsonStr);
	var length =  obj.items.length
	for (var i = 0;i <= length;i++) {
	   if (i == obj.items.length) {
		obj.items.push({"name":obj2.name,"id":obj2.id,"count":obj2.count,"price":p})
		var li1 = document.createElement('LI');
		li1.setAttribute("id",obj.items[i].id);
		li1.appendChild(document.createTextNode(obj.items[i].name));
		li1.appendChild(document.createElement('BR'));
		li1.appendChild(document.createTextNode(obj.items[i].count));
		li1.appendChild(document.createElement('BR'));
		li1.appendChild(document.createTextNode(obj.items[i].price));
		li1.appendChild(document.createElement('BR'));
		li1.appendChild(document.createTextNode(obj.items[i].id));
		list.appendChild(li1);
		
		/*obj.items[i].name = obj2.name;
		obj.items[i].id = id;
		obj.items[i].count = count;
		obj.items[i].price = price*count;*/
	     console.log(data);
	    } else  if(obj.items[i].id == obj2.id) {		
		obj.items[i].count += obj2.count;
		obj.items[i].price += obj2.count*obj2.price;
		return
	    }
	}
    } else {
	var p = (obj2.count * obj2.price)
	obj = {"items":[{"name":obj2.name,"id":obj2.id,"count":obj2.count,"price":p}]}
	var li1 = document.createElement('LI');
	li1.setAttribute("id",obj.items[0].id);
	li1.appendChild(document.createTextNode(obj.items[0].name));
	li1.appendChild(document.createElement('BR'));
	li1.appendChild(document.createTextNode(obj.items[0].count));
	li1.appendChild(document.createElement('BR'));
	li1.appendChild(document.createTextNode(obj.items[0].price));
	li1.appendChild(document.createElement('BR'));
	li1.appendChild(document.createTextNode(obj.items[0].id));
	list.appendChild(li1);
	
	/*obj.items[i].name = obj2.name;
	obj.items[i].id = id;
	obj.items[i].count = count;
	obj.items[i].price = price*count; */
    }
    myListDiv.appendChild(list);
    jsonStr = JSON.stringify(obj);
    sessionStorage.cart = jsonStr;    
}

function testfunctable(request) {
    var inv = JSON.parse(request);
    var text = "";
    var myTableDiv = document.getElementById("content_area");
    var table = document.createElement('TABLE');
    table.setAttrubte("id","beer");
    var tableBody = document.createElement('TBODY');
    table.border = '1';
    table.appendChild(tableBody);
    var i = 0;
    var j = 0;
    //var tr = document.createElement('TR');
    while (i<inv.payload.length) {
	var tr = document.createElement('TR');
	while(j <5) {
	    if(i<inv.payload.length) {
		//text += "Name: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + "Count:" + inv.payload[i].count + "Price:" + inv.payload[i].price;
		//var textName = "Name: " + inv.payload[i].namn;
		//var textCount = "Count: " + inv.payload[i].count;
		//var textPrice = "Price: " + inv.payload[i].price;
		if ((inv.payload[i].namn && inv.payload[i].namn2) == "") {
		    i++;		    
		} else {
		    var tmp;
		    if (inv.payload[i].namn != "") {
			var td = document.createElement('TD');
			td.setAttribute("id","prodo"+i);
			var b1 = document.createElement('B');
			b1.setAttribute("name","nm")
			b1.appendChild(document.createTextNode('Name: '));
			td.appendChild(b1)
			td.appendChild(document.createTextNode(inv.payload[i].namn));
			tmp = inv.payload[i].namn;
		    } else if (inv.payload[i].namn2!= "") {
			var td = document.createElement('TD');
			td.setAttribute("id","prod"+i+"td");
			var b1 = document.createElement('B');
			b1.setAttribute("name","name");
			b1.appendChild(document.createTextNode('Name: '));
			td.appendChild(b1)
			td.appendChild(document.createTextNode(inv.payload[i].namn2));
			tmp = inv.payload[i].namn;
		    }
	            td.appendChild(document.createElement('BR'));	       
		    var b2 = document.createElement('B');
		    b2.setAttribute("name","cnt")
		    b2.appendChild(document.createTextNode('Count :'));
		    td.appendChild(b2);
		    td.appendChild(document.createTextNode(inv.payload[i].count));
		    td.appendChild(document.createElement('BR'));	       		
		    var b3 = document.createElement('B');
		    b3.setAttribute("name","prc");
		    b3.appendChild(document.createTextNode('Price :'));
		    td.appendChild(b3);
		    td.appendChild(document.createTextNode(inv.payload[i].price));
		    td.appendChild(document.createElement('BR'));
		    var btn = document.createElement("BUTTON");        // Create a <button> element
		    btn.setAttribute("id","prod"+i);
			//btn.setAttribute("onclick","addToCart("+tmp+","+inv.payload[i].beer_id+","+1+""+inv.payload[i].price+");");*/
		    var obj = {"name":tmp,"id":inv.payload[i].beer_id,"count":1,"price":inv.payload[i].price}
		    obj.name = tmp;
		    obj.id = inv.payload[i].beer_id;
		    obj.count = 1;
		    obj.price = inv.payload[i].price;
		    var data = JSON.stringify(obj);
		    
		    //var obj = JSON.parse(data);
		    btn.setAttribute("onclick","addToCart("+"'"+data+"'"+");");
		    var t = document.createTextNode("Add");       // Create a text node
		    btn.appendChild(t);                                // Append the text to <button>
		    td.appendChild(btn);                    // Append <button> to <body>
		    tr.appendChild(td);
		    i++;
		    j++;
		}
	    }
	}
	j = 0;
	tableBody.appendChild(tr);
	text = "";
    }
    myTableDiv.appendChild(table);
}

function load_cart() {
    if (sessionStorage.getItem("cart") == undefined) {
	return;
    } else {
	var obj = JSON.parse(sessionStorage.getItem("cart"));
	var myListDiv = document.getElementById("cart");
	var list= document.createElement('UL');
	list.setAttribute("id","cList");
	for (var i = 0;i < obj.items.length;i++) {    
	    var li1 = document.createElement('LI');
	    li1.setAttribute("id",obj.items[i].id);
	    li1.appendChild(document.createTextNode(obj.items[i].name));
	    li1.appendChild(document.createElement('BR'));
	    li1.appendChild(document.createTextNode(obj.items[i].count));
	    li1.appendChild(document.createElement('BR'));
	    li1.appendChild(document.createTextNode(obj.items[i].price));
	    li1.appendChild(document.createElement('BR'));
	    li1.appendChild(document.createTextNode(obj.items[i].id));
	    list.appendChild(li1);
	}
	myListDiv.appendChild(list);
    }
}

//JSON of inventory before callback to init values
var retur = null;

function inventory_get_request() {
    
    //var usr = document.getElementById('username').value.toString();
    //var pass = document.getElementById('password').value.toString();
    //var usr = localStorage.getItem("usrAdmin");
    //var pass = localStorage.getItem("passAdmin");
    var usr = "jorass"
    var pass = "jorass"
    localStorage.setItem("usrAdmin",usr);
    localStorage.setItem("passAdmin",pass);
    load_cart();
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
    //var usr = document.getElementById('username').value.toString();
    //var pass = document.getElementById('password').value.toString();
    var usr = localStorage.getItem("usrAdmin");
    var pass = localStorage.getItem("passAdmin");
    var new_usr = document.getElementById('new_username').value.toString();
    var new_pass = document.getElementById('new_password').value.toString();
    var fname = document.getElementById('first').value.toString();
    var lname = document.getElementById('last').value.toString();
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
            //return_data = JSON.parse(hr.responseText)
	    console.log(hr.responseTex)
	    callback(hr.responseText);
	    
            //document.getElementById("status").innerHTML = return_data.payload[25].namn;
	}
    };
    
    // Send request and wait for response to update the status div
    hr.send(null); // Actually execute the request
    
    document.getElementById("content_area").innerHTML = "processing..";
    
}

function login(){
    var usr = document.getElementById("username").value.toString();
    var pass = document.getElementById("password").value.toString();
    if (document.getElementById("bar").checked){
	barLogin(usr,pass);
    } else {
	user_login(usr,pass);
    }
}

function user_login(usr,pass) {
    localStorage.setItem("usr",usr);
    localStorage.setItem("pass",pass);
    location.href = 'startpageusr.html';
}
function barLogin(usr,pass){
    localStorage.setItem("barUsr",usr);
    localStorage.setItem("barPass",pass);
    location.href = 'bartender.html';
}

function startup_login() {
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    localStorage.setItem("usrAdmin","jorass");
    localStorage.setItem("passAdmin","jorass");
    location.href = '_index.html.html';
}
function user_logout() {
    localStorage.removeItem("usr");
    localStorage.removeItem("pass");
    location.href= "_index.html";
}
function bartender_logout() {
    localStorage.removeItem("barUsr");
    localStorage.removeItem("barPass");
    location.href= "_index.html";
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
                    var text = $(this).find(language).text();
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
    $("content_area").on("load",function (){
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



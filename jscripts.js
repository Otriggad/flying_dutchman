
function nextLocation(nextLocation) {
    location.href = nextLocation;
}

function clear_content() {
    document.getElementById("content_area").innerHTML = "";
}

function clear_cart() {
    sessionStorage.removeItem("cart");
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
            localStorage.setItem("response", return_data);
        }
    };
    // Send request and wait for response to update the status div
    hr.send(null); // Actually execute the request
}

function staff_account_register_confirm(userType) {
    var mesg = "Username: " + document.getElementById('username').value.toString()
            + "<br><br>Type: " + userType
            + "<br><br><br><br>Successfully Added to the System";
    localStorage.setItem("message", mesg);
    location.href = "staff_account_register_confirm.html";
}

function staff_account_delete_confirm() {
    var mesg = "Username: " + document.getElementById('del_username').value.toString()
            + "<br><br><br><br>Successfully Deleted from the System";
    localStorage.setItem("message", mesg);
    location.href = "staff_account_delete_confirm.html";
}

function staff_account_edit_confirm() {
    user_edit_request();
    var mesg = localStorage.getItem("response");
    window.alert(mesg);
    localStorage.setItem("response", "Hello");
    localStorage.setItem("message", mesg);
    location.href = "staff_account_edit_confirm.html";
}

function beer_data_get_request(id) {
    console.log("beerdataget");
    var usr = "jorass";
    var pass = "jorass";
    localStorage.setItem("usrAdmin", usr);
    localStorage.setItem("passAdmin", pass);
    var data = "username=" + usr + "&password=" + pass + "&action=beer_data_get&beer_id=" + id;
    send_request_callback(data, beer_data_display);
}

function beer_data_display(request) {
    var beer_data = JSON.parse(request);
    console.log(beer_data);

    var beerdetails = document.getElementById("beerdetail");
    var beerobj = beer_data.payload[0];
    beerdetails.innerHTML = "<h3>" + beerobj.namn + " " + beerobj.namn2 + "</h3> <p><b>Price: </b>"
            + beerobj.prisinklmoms + "</p> <p><b>Type: </b>" + beerobj.varugrupp + "</p> <p><b>Packaging: </b>"
            + beerobj.forpackning + "</p> <p><b>Alcohol level: </b>" + beerobj.alkoholhalt + "</p>";

    var beerimage = document.getElementById("beerimg");
    beerimage.setAttribute("src", "Images/beer.png");
    beerimage.setAttribute("height", "90%");
}

function getMessage(divName) {
    document.getElementById(divName).innerHTML = localStorage.getItem("message");
}

function checkout_bar() {
    var usr = localStorage.barUsr;
    var pass = localStorage.barPass;
//    sessionStorage.cart = undefined;
    sessionStorage.removeItem("cart");
}

function findAsset(data, usr) {
    console.log("hej");
    var iou = JSON.parse(data);
    
    var funds = 0;
    for (var i = 0; i < iou.payload.length; i++) {
        if (iou.payload[i].username === usr) {
            funds = iou.payload[i].assets;
            return funds;
        }
    }
}

function checkout2(iou) {
    var ausr = localStorage.usrAdmin;
    var apass = localStorage.passAdmin;

    var temp = JSON.parse(iou);
    if(temp.type == "error"){
	document.getElementById("status").innerHTML = "An error occured";
	return;
    }
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    
    funds = findAsset(iou, usr);
    var data = sessionStorage.cart;
    var data2;
    var obj = JSON.parse(data);
    var sum = 0;
    for (var i = 0; i < obj.items.length; i++) {
        sum = sum + (obj.items[i].price * obj.items[i].count);
    }
    if (sum > funds) {
	if ((funds - sum) < -1000) {
	    
	    document.getElementById("status").innerHTML = "You can't afford this";
	    
	    return;
	}
    }
    
    for(var i = 0;i < obj.items.length;i++) {
	/*	data = "username=" + ausr + "&password=" + apass + "&action=inventory_append" + 
		"&beer_id=" + obj.items[i].id + "&amount=" + "-" + obj.items[i].count + "&price=" + obj.items[i].price;
		send_request(data);
		data2 = "username=" + usr + "&password=" + pass + "&action=purchases_append" + 
		"&beer_id=" + obj.items[i].id
		send_request(data2);*/

	data = "username=" + ausr + "&password=" + apass + "&action=inventory_append" + 
	    "&beer_id=" + obj.items[i].id + "&amount=" + "-" + obj.items[i].count + "&price=" + obj.items[i].price;
	    console.log(apass);
	send_request_callback(data,function tmp(resp) {

	    var respObj = JSON.parse(resp);
	    if(respObj.type == "error") {
		document.getElementById("status").innerHTML = "An error occured";
		return;
	    }
	    data2 = "username=" + usr + "&password=" + pass + "&action=purchases_append" + 
		"&beer_id=" + obj.items[i].id;
	    send_request_callback(data2,function tmp2(resp2) {
		var respObj = JSON.parse(resp);
		if( respObj.type == "error"){
		    document.getElementById("status").innerHTML = "An error occured2";
		    return;
		}
		
	    });
	});
    }

    document.getElementById("status").innerHTML = "Purchase sucessful";
    document.getElementById("pay").setAttribute("class", "hidden");
    sessionStorage.removeItem("cart");
    
}

function checkout() {
    document.getElementById("status").innerHTML = "Processeing";
    var usr = document.getElementById('username').value.toString();
    var pass = document.getElementById('password').value.toString();
    var ausr = localStorage.usrAdmin;
    var apass = localStorage.passAdmin;
    var data = sessionStorage.cart;
    var obj = JSON.parse(data);

    var data2;
    var sum = 0;
    var funds;
    var iou;
    for (var i = 0; i < obj.items.length; i++) {
        sum = sum + (obj.items[i].price * obj.items[i].count);
    }

    if (sessionStorage.mode === "usr") {
        var val = parseInt(document.getItembyId("funds").toValue);
    } else {
        var data = "username=jorass &password=jorass&action=iou_get_all";

        send_request_callback(data, checkout2);
        return;
    }
    if (sum > funds) {
	if ((funds - sum) < -1000) {
	    document.getElementById("status").innerHTML = "You can't afford this";
	    
	    return;
	}
    }

    for(var i = 0;i < obj.items.length;i++) {
	data = "username=" + ausr + "&password=" + apass + "&action=inventory_append" + 
	    "&beer_id=" + obj.items[i].id + "&amount=" + "-" + obj.items[i].count + "&price=" + obj.items[i].price;
	send_request_callback(data,function tmp(resp) {
	    var respObj = JSON.parse(resp);
	    if( respObj.type == "error") {
		document.getElementById("status").innerHTML = "An error occured";
		return;
	    }
	    data2 = "username=" + usr + "&password=" + pass + "&action=purchases_append" + 
		"&beer_id=" + obj.items[i].id;
	    send_request_callback(data2,function tmp2(resp2) {
		var respObj = JSON.parse(resp);
		if( respObj.type == "error"){
		    document.getElementById("status").innerHTML = "An error occured2";
		    return;
	    }
		
	    });
	});
    }

    document.getElementById("status").innerHTML = "Purchase sucessful";
    document.getElementById("pay").setAttribute("class", "hidden");
    sessionStorage.removeItem("cart");

    nextLocation('inventory.html');
}

function load_prev_cart() {

    if (sessionStorage.oldcart == null) {
        var cdiv = document.getElementById("cart");
        var ld = document.getElementById("cList");
        if (ld !== null) {
            while (ld.firstChild)
                ld.removeChild(ld.firstChild);
        }
        cdiv.appendChild(ld);
	document.getElementById("span_total").innerHTML = "0.00";
        return;
    } else {  
        var obj = JSON.parse(sessionStorage.oldcart);
        var myListDiv = document.getElementById("cart");
        var list = document.createElement('UL');
        list.setAttribute("id", "cList");
        for (var i = 0; i < obj.items.length; i++) {
            var li1 = document.createElement('LI');
            li1.setAttribute("id", obj.items[i].id);
            li1.appendChild(document.createTextNode(obj.items[i].name));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].count));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].price));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].id));
            list.appendChild(li1);
            document.getElementById("span_total").innerHTML = parseFloat(sessionStorage.oldsum);
        }
        myListDiv.appendChild(list);
    }
}
function previous_orders() {
    location.href = "inventory_usr.html";
}

function undo() {
    if (sessionStorage.cart === undefined || sessionStorage.cart === null) {
	return;
    } else {
        var myListDiv = document.getElementById("cart");
        var li1 = document.getElementById("cList");
        while (li1.firstChild) {
            li1.removeChild(li1.firstChild);
        }
        myListDiv.appendChild(li1);
        load_prev_cart();
        sessionStorage.cart = sessionStorage.oldcart;
	sessionStorage.redo2 = sessionStorage.redo;
        //sessionStorage.oldcart = undefined;
        //sessionStorage.removeItem("cart");
	sessionStorage.removeItem("oldcart");
    }

}


function redo() {
    if (sessionStorage.redo2 !== undefined && sessionStorage.redo2 !== null) {
        addToCart(sessionStorage.redo2);
        sessionStorage.removeItem("redo2");
        //sessionStorage.removeItem("oldcart");
	
    } else {
	return
    }
}


//This function adds a new item to the list, if there's already a list it empty it's and parse the jsonc art and fills it again. 
//Carts should be represented by an json object {items:[{name,id,count,price}]}
function addToCart(data) {
    var jsonStr;
    var obj;
    var obj2 = JSON.parse(data);
    var myListDiv = document.getElementById("cart");
    var list;
    var sum = parseFloat(document.getElementById("span_total").innerHTML);
    if (document.getElementById("cList") === null) {
        list = document.createElement('UL');
        list.setAttribute("id", "cList");
    } else {
        list = document.getElementById("cList");
    }
    if (sessionStorage.cart !== undefined && sessionStorage.cart !== null) {
        jsonStr = sessionStorage.cart;
        obj = JSON.parse(jsonStr);
        var length = obj.items.length;
        for (var i = 0; i <= length; i++) {
            if (i === obj.items.length) {
                obj.items.push({"name": obj2.name, "id": obj2.id, "count": obj2.count, "price": (obj2.count * obj2.price)});
                var li1 = document.createElement('LI');
                li1.setAttribute("id", obj.items[i].id);
                li1.appendChild(document.createTextNode(obj.items[i].name));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode(obj.items[i].count));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode(obj.items[i].price));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode(obj.items[i].id));
                list.appendChild(li1);
                sum += obj.items[i].price * obj.items[i].count;
                console.log(data);
            } else if (obj.items[i].id === obj2.id) {
                obj.items[i].count += obj2.count;
                obj.items[i].price = obj2.price;
                var li1 = document.getElementById(obj.items[i].id);
                while (li1.firstChild)
                    li1.removeChild(li1.firstChild);
                li1.setAttribute("id", obj.items[i].id);
                li1.appendChild(document.createTextNode(obj.items[i].name));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode(obj.items[i].count));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode((obj.items[i].price * obj.items[i].count).toFixed(2)));
                li1.appendChild(document.createElement('BR'));
                li1.appendChild(document.createTextNode(obj.items[i].id));
                list.appendChild(li1);
                myListDiv.appendChild(list);
                jsonStr = JSON.stringify(obj);
                sessionStorage.redo = data;
                var old = sessionStorage.cart;
                sessionStorage.oldcart = old;
                sessionStorage.cart = jsonStr;
                sum += obj.items[i].price * obj2.count;
                sessionStorage.oldsum = sessionStorage.total;
                sessionStorage.total = sum;
                document.getElementById("span_total").innerHTML = sum.toFixed(2);
                console.log(sessionStorage.oldcart);
		return; 
            }
        }
    } else {
//        alert("Hello2");
//        alert(sessionStorage.cart);
//        alert(sessionStorage.cart !== undefined);
//        alert(sessionStorage.cart !== "null");
        var p = (obj2.count * obj2.price).toFixed(2);
        obj = {"items": [{"name": obj2.name, "id": obj2.id, "count": obj2.count, "price": obj2.price}]};
        var li1 = document.createElement('LI');
        li1.setAttribute("id", obj.items[0].id);
        li1.appendChild(document.createTextNode(obj.items[0].name));
        li1.appendChild(document.createElement('BR'));
        li1.appendChild(document.createTextNode(obj.items[0].count));
        li1.appendChild(document.createElement('BR'));
        li1.appendChild(document.createTextNode(p));
        li1.appendChild(document.createElement('BR'));
        li1.appendChild(document.createTextNode(obj.items[0].id));
        list.appendChild(li1);
        sum += obj.items[0].price * obj.items[0].count;
    }
    myListDiv.appendChild(list);
    document.getElementById("span_total").innerHTML = sum.toFixed(2);
    jsonStr = JSON.stringify(obj);
    sessionStorage.oldsum = sessionStorage.total;
    sessionStorage.total = sum;
    sessionStorage.redo = data;
    var old = sessionStorage.cart;
    sessionStorage.oldcart = old;
    sessionStorage.cart = jsonStr;
}

function load_user_info(data) {
    var iou = JSON.parse(data);
    var funds = 0;
    for (var i = 0; i < iou.payload.length; i++) {
        if (iou.payload[i].username === localStorage.usr) {
            funds = iou.payload[i].assets;
        }
    }
    var myDiv = document.getElementById("info");
    var p = document.createElement('P');
    var br = document.createElement('BR');
    var usrN = localStorage.getItem("usr");
    console.log(usrN);
    var text = "User: " + usrN;
    var tnode = document.createTextNode(text);
    p.appendChild(tnode);
    p.appendChild(br);
    p.appendChild(document.createTextNode("Assets : " + funds));
    p.setAttribute("id", "funds");
    myDiv.appendChild(p);

}

//draws inventory content
//this function simply parses the inventory json object and creates the necessary cells for our inventory table.
function create_table(inv, mode) {
    var text = "";
    var myTableDiv = document.getElementById("content_area");
    var table = document.createElement('TABLE');
    table.setAttribute("id", "beer");
    var tableBody = document.createElement('TBODY');
    table.border = '1';
    table.appendChild(tableBody);
    var i = 0;
    var j = 0;

    //var tr = document.createElement('TR');
    var roundUpLength = Math.ceil(inv.payload.length / 5.0) * 5;
    console.log("i=" + i + " rul=" + roundUpLength);
    while (i < roundUpLength) {
        var tr = document.createElement('TR');
        while (j < 5) {
            if (i < inv.payload.length) {
                //text += "Name: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + "Count:" + inv.payload[i].count + "Price:" + inv.payload[i].price;
                //var textName = "Name: " + inv.payload[i].namn;
                //var textCount = "Count: " + inv.payload[i].count;
                //var textPrice = "Price: " + inv.payload[i].price;
                if (inv.payload[i].namn === "" && inv.payload[i].namn2 === "") {
                    i++;
                    continue;
                } else {
                    var tmp;
                    if (inv.payload[i].namn !== "") {
                        var td = document.createElement('TD');
                        td.setAttribute("draggable", "true");
                        td.setAttribute("ondragstart", "drag(event)");
//                        td.setAttribute("class", "item");
                        td.setAttribute("id", "prodo" + i);
                        var b1 = document.createElement('B');
                        
                        b1.appendChild(document.createTextNode(''));
                        td.appendChild(b1);
                        b1.appendChild(document.createTextNode(inv.payload[i].namn));
                        tmp = inv.payload[i].namn;
                    } else if (inv.payload[i].namn2 !== "") {
                        var td = document.createElement('TD');
                        td.setAttribute("width", "20%");
                        //dragndrop
                        td.setAttribute("draggable", "true");
                        td.setAttribute("ondragstart", "drag(event)");
                        //
                        td.setAttribute("id", "prodo" + i + "td");
                        var b1 = document.createElement('B');
                        b1.setAttribute("name", "name");
                        b1.appendChild(document.createTextNode(''));
                        td.appendChild(b1);
                        b1.appendChild(document.createTextNode(inv.payload[i].namn2));
                        tmp = inv.payload[i].namn;
                    }
                    td.appendChild(document.createElement('BR'));
                    var b2 = document.createElement('B');
                    b2.setAttribute("name", "cnt");
                    b2.appendChild(document.createTextNode('In stock: '));
                    td.appendChild(b2);
                    if (inv.payload[i].count > 0) {
                        td.appendChild(document.createTextNode(inv.payload[i].count));
                    } else {
                        td.removeChild(td.childNodes[2]);
                        var tn = document.createTextNode("Out of stock!");

                        td.appendChild(tn);
                    }
                    td.appendChild(document.createElement('BR'));
                    var b3 = document.createElement('B');
                    b3.setAttribute("name", "prc");
                    b3.appendChild(document.createTextNode('Price: '));
                    td.appendChild(b3);
                    td.appendChild(document.createTextNode(inv.payload[i].price));
                    td.appendChild(document.createElement('BR'));
                    var btn = document.createElement("BUTTON");        // Create a <button> element
                    var btn_detail = document.createElement("LABEL");        // Create a <button> element

                    btn_detail.setAttribute("for", "modal-2");
                    btn_detail.setAttribute("onclick", "beer_data_get_request(" + inv.payload[i].beer_id + ");");
                    btn.setAttribute("id", "hot-container");
                    btn.setAttribute("hot-container", "prod" + i);
                    btn.setAttribute("onclick", "addToCart(" + tmp + "," + inv.payload[i].beer_id + ",1," + inv.payload[i].price + ");");
                    btn.setAttribute("id", "prod" + i);
		    
                    btn.setAttribute("name","add");
                    var obj = {"name": tmp, "id": inv.payload[i].beer_id, "count": 1, "price": inv.payload[i].price};

                    /*		    obj.name = tmp;
                     obj.id = inv.payload[i].beer_id;
                     obj.count = 1;
                     obj.price = inv.payload[i].price;*/
                    var data = JSON.stringify(obj);

                    //var obj = JSON.parse(data);

                    btn.setAttribute("onclick", "addToCart(" + "'" + data + "'" + ");");
                    var t = document.createTextNode("Add");       
                    btn.appendChild(t);                                
                    var t_detail = document.createTextNode("Details");
                    btn_detail.appendChild(t_detail);
		    btn_detail.setAttribute("name","details");
                    td.appendChild(btn);                    
                    td.appendChild(btn_detail);
                    btn_detail.setAttribute("Style", "float: right;");
                    if (inv.payload[i].count <= 0) {
                        btn.setAttribute("class", "hidden");
                        td.setAttribute("draggable", "false");
                        td.setAttribute("class", "outofstock");
                    }
                    if (mode === "bar") {
                        var lbl = document.createElement("LABEL");        
                        lbl.appendChild(document.createTextNode("Refill"));
                        lbl.setAttribute("id", "hot-container");
                        lbl.setAttribute("hot-container", "prod" + i);
                        lbl.setAttribute("for", "modal-1");
                        td.appendChild(lbl);
                    }
                    tr.appendChild(td);
                    i++;
                    j++;
                }
            } else {
                var td = document.createElement('TD');
                td.appendChild(document.createElement('BR'));
                tr.appendChild(td);
                i++;
                j++;
            }
        }
        j = 0;
        tableBody.appendChild(tr);
        text = "";
    }
    myTableDiv.appendChild(table);
    if(localStorage["currentLang"] == null){
	localStorage.setItem("currentLang", "english")
    }
    setLanguage(localStorage.getItem("currentLang"));
}

//callback function to handle request for full inventory
function testfunctable(request) {
    if (sessionStorage.mode === "usr") {
        var ui = document.getElementById("user_info");
        //load_user_info();
        iou_get_all_request();
        ui.setAttribute("display","block");
    }
    var inv = JSON.parse(request);
    var mode = sessionStorage.mode;
    create_table(inv, mode);
}

//callback function used when filtering inventory by name 
function callback_filtered_inv(request) {
    if (sessionStorage.mode === "usr") {
        //var ui = document.getElementById("user_info");
        //load_user_info();
        iou_get_all_request();
        //ui.setAttribute("display","block");
    }
    var mode = sessionStorage.mode;

    var searchStr = document.getElementById("searchbar").value.toString();

    var inv = JSON.parse(request);
    //var inv = miniPayload;
    inv.payload = jQuery.grep(inv.payload, function (element, index) {
        return element.namn.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 || element.namn2.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
    });

    document.getElementById("content_area").innerHTML = "";

    create_table(inv, mode);
    if (document.getElementById("beer").rows.length === 0) {
        document.getElementById("content_area").innerHTML = "Your search for <b><i>" + searchStr + "</i></b> did not match anything in the inventory.";
    }
}

//callback function used when filtering inventory by name 
function callback_instock_inv(request) {
    if (sessionStorage.mode === "usr") {
        //var ui = document.getElementById("user_info");
        //load_user_info();
        iou_get_all_request();
        //ui.setAttribute("display","block");
    }
    var mode = sessionStorage.mode;

    var inv = JSON.parse(request);
    //var inv = miniPayload;
    inv.payload = jQuery.grep(inv.payload, function (element, index) {
        return element.count > 0;
    });

    document.getElementById("content_area").innerHTML = "";

    create_table(inv, mode);
    if (document.getElementById("beer").rows.length === 0) {
        document.getElementById("content_area").innerHTML = "Your search for <b><i>" + searchStr + "</i></b> did not match anything in the inventory.";
    }
}

function load_cart() {
    if (sessionStorage.cart === undefined) {
        var cdiv = document.getElementById("cart");
        var ld = document.getElementById("cList");
        if (ld !== null) {
            while (ld.firstChild)
                ld.removeChild(ld.firstChild);
            cdiv.appendChild(ld);
        }
        return;

    } else {
        var obj = JSON.parse(sessionStorage.getItem("cart"));
        var myListDiv = document.getElementById("cart");
        var list = document.createElement('UL');
        list.setAttribute("id", "cList");
        for (var i = 0; i < obj.items.length; i++) {
            var li1 = document.createElement('LI');
            li1.setAttribute("id", obj.items[i].id);
            li1.appendChild(document.createTextNode(obj.items[i].name));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].count));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].price));
            li1.appendChild(document.createElement('BR'));
            li1.appendChild(document.createTextNode(obj.items[i].id));
            list.appendChild(li1);
            document.getElementById("span_total").innerHTML = parseFloat(sessionStorage.sum);
        }
    }
}

//JSON of inventory before callback to init values
var retur = null;


function inventory_get_request() {
    var usr = "jorass";
    var pass = "jorass";
    localStorage.setItem("usrAdmin", usr);
    localStorage.setItem("passAdmin", pass);
    //    load_cart();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
    send_request_callback(data, testfunctable);
    //send_request(data);
}

function search_inventory_get_request() {
    var usr = "jorass";
    var pass = "jorass";
    localStorage.setItem("usrAdmin", usr);
    localStorage.setItem("passAdmin", pass);
    load_cart();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
    send_request_callback(data, callback_filtered_inv);
}

function instock_inventory_get_request() {
    var usr = "jorass";
    var pass = "jorass";
    localStorage.setItem("usrAdmin", usr);
    localStorage.setItem("passAdmin", pass);
    load_cart();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
    send_request_callback(data, callback_instock_inv);
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
    var usr = "jorass";
    var pass = "jorass";
    var data = "username=" + usr + "&password=" + pass + "&action=iou_get";
}

function iou_get_all_request() {
    //var usr = document.getElementById('username').value.toString();
    //var pass = document.getElementById('password').value.toString();
    var usr = "jorass";
    var pass = "jorass";

    var data = "username=" + usr + "&password=" + pass + "&action=iou_get_all";
    send_request_callback(data, load_user_info);

}

/*function beer_data_get_request() {
 var usr = document.getElementById('username').value.toString();
 var pass = document.getElementById('password').value.toString();
 var beer_id = document.getElementById('beer_id').value.toString();
 var data = "username=" + usr + "&password=" + pass + "&action=beer_data_get" + "&beer_id=" + beer_id;
 send_request(data);
 }
 */
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
    //var usr = document.getElementById('username').value.toString();
    //var pass = document.getElementById('password').value.toString();
    var usr = localStorage.barUsr;
    var pass = localStorage.barPass;
    var beer_id = document.getElementById('beer_id').value.toString();
    var amount = document.getElementById('amount').value.toString();
    var price = document.getElementById('price').value.toString();
    var data = "username=" + usr + "&password=" + pass + "&action=inventory_append" +
            "&beer_id=" + beer_id + "&amount=" + amount + "&price=" + price;
    send_request(data);
}


//Since there's no support for new users in the api this is just a placeholder
function user_new() {
    location.href = 'staff_account.html';

}

//Since there's no support for adding credit in the api this is just a placeholder
function user_add_credit() {
    location.href = 'staff_account.html';
}

//Since there's no support for deleting users in the api this is just a placeholder
function user_delete() {
    location.href = 'staff_account.html';

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
            callback(hr.responseText);

            //document.getElementById("status").innerHTML = return_data.payload[25].namn;
        }
    };

    // Send request and wait for response to update the status div
    hr.send(null); // Actually execute the request

    //document.getElementById("content_area").innerHTML = "processing..";

}

function showvalid(showhide) {
    if (showhide === "show") {
        document.getElementById('validation').style.visibility = "visible";
        //	document.getElementById('validation').style.visibility="visible";
    } else if (showhide === "hide") {
        document.getElementById('validation').style.visibility = "hidden";
    }
}

function user_login() {
    var usr = document.getElementById("username").value.toString();
    var pass = document.getElementById("password").value.toString();
    console.log(usr);
    localStorage.setItem("usr", usr);
    localStorage.setItem("pass", pass);
    sessionStorage.setItem("mode", "usr");
    location.href = 'inventory.html';
}
function bar_login() {
    var usr = document.getElementById("bar_username").value.toString();
    var pass = document.getElementById("bar_password").value.toString();
    localStorage.setItem("barUsr", usr);
    localStorage.setItem("barPass", pass);
    sessionStorage.setItem("mode", "bar");
    //location.href = 'bartender.html';
    nextLocation('staff.html');
}

function user_logout() {
    localStorage.removeItem("usr");
    localStorage.removeItem("pass");
    location.href = "index.html";
}
function bartender_logout() {
    localStorage.removeItem("barUsr");
    localStorage.removeItem("barPass");
    localStorage.bar = "";
    location.href = "index.html";
}

function setLanguage(inputLang) {
    $(function () {
        var language = inputLang;
        var $saveLanguage = localStorage.setItem("currentLang", inputLang);
        $.ajax({
            url: 'languages.xml',
            success: function (xml) {
                $(xml).find('translation').each(function () {
                    var id = $(this).attr('id');
                    var text = $(this).find(language).text();
                    $("" + id).html(text);
                });
            }
        });
    });

}

$(document).ready(function(){
    if(localStorage["currentLang"] == null){ localStorage.setItem("currentLang", "english") }
    setLanguage(localStorage.getItem("currentLang"));
});

/*
 $("img.lang").on("click", function () {
 if ($(this).hasClass("sv")) {
 $("#swedish").addClass("hidden");
 $("#english").removeClass("hidden");
 setLanguage("english");
 }
 else {
 $("#swedish").removeClass("hidden");
 $("#english").addClass("hidden");
 setLanguage("swedish");
 }
 })
 $("content_area").on("load", function () {
 if ($(this).hasClass("sv")) {
 $("#swedish").addClass("hidden");
 $("#english").removeClass("hidden");
 setLanguage("english");
 }
 else {
 $("#swedish").removeClass("hidden");
 $("#english").addClass("hidden");
 setLanguage("swedish");
 }
 
 });
 });
 */
//Allows shopping cart to change css properties, position turned fixed from static when scrolled to
$(function () {
    // Check the initial Poistion of the Sticky Header
    var stickyHeaderTop = $('#cart').offset.top;

    $(window).scroll(function () {
        if ($(window).scrollTop() > stickyHeaderTop) {
            $('#cart').css({position: 'fixed', top: '0px', "margin-top": '0px', "margin-left": '965px', "margin-bottom": '1000px'});
        } else {
            $('#cart').css({position: 'static', "margin-top": '30px', "margin-left": '0px', "margin-bottom": '0px'});

        }
    });
});

//Drag and drop functions
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var productID = ev.dataTransfer.getData("text");
    var btnElement = document.getElementById(productID.substring(0, 4) + productID.substring(5, productID.length));
    //var asd document.getElementById("home");
    //ev.target.appendChild(document.getElementById(data));
    cartcmd = btnElement.getAttribute("onclick");
    eval(cartcmd);

    console.log(btnElement);
}

//function inventory_get_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=inventory_get";
//    send_request(data);
//}
//
//function purchases_get_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=purchases_get";
//    send_request(data);
//}
//
//function purchases_get_all_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=purchases_get_all";
//    send_request(data);
//}
//
//function purchases_append_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var beer_id = document.getElementById('beer_id').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=purchases_append" + "&beer_id=" + beer_id;
//    send_request(data);
//}
//
//function payments_get_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=payments_get";
//    send_request(data);
//}
//
//function payments_get_all_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=payments_get_all";
//    send_request(data);
//}
//
//function payments_append_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var amount = document.getElementById('amount').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=payments_append" + "&amount=" + amount;
//    send_request(data);
//}
//
//function iou_get_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=iou_get";
//    send_request(data);
//}
//
//function iou_get_all_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=iou_get_all";
//    send_request(data);
//}
//
//function beer_data_get_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var beer_id = document.getElementById('beer_id').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=beer_data_get" + "&beer_id=" + beer_id;
//    send_request(data);
//}
//
//function user_edit_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var new_usr = document.getElementById('new_username').value.toString();
//    var new_pass = document.getElementById('new_password').value.toString();
//    var fname = document.getElementById('first_name').value.toString();
//    var lname = document.getElementById('last_name').value.toString();
//    var email = document.getElementById('email').value.toString();
//    var phone = document.getElementById('phone').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "action=&user_edit" + "&new_username=" + new_usr +
//            "&new_password=" + new_pass + "&first_name=" + fname + "&last_name=" + lname +
//            "&email=" + email + "&phone=" + phone;
//    send_request(data);
//}

//function inventory_append_request() {
//    var usr = document.getElementById('username').value.toString();
//    var pass = document.getElementById('password').value.toString();
//    var beer_id = document.getElementById('beer_id').value.toString();
//    var amount = document.getElementById('amount').value.toString();
//    var price = document.getElementById('price').value.toString();
//    var data = "username=" + usr + "&password=" + pass + "&action=inventory_append" +
//            "&beer_id=" + beer_id + "&amount=" + amount + "&price=" + price;
//    send_request(data);
//}

/*
 function testfunc(request) {
 var inv = JSON.parse(request);
 var text = "";
 for (i = 0; i < inv.payload.length; i++) {
 text += "<b>Name</b>: " + inv.payload[i].namn + "</br> <b>Beer ID:</b>" + inv.payload[i].beer_id + " <b>Count:</b> " + inv.payload[i].count + " <b>Price:</b> " + inv.payload[i].price + "</br></br>";
 }
 return text;
 }
 */

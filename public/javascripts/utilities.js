function sendRequest(url,methodtype,callback,postData) {
	var req = createXMLHTTPObject();
	if (!req) return;
	var method = methodtype;
	req.open(method, url, true);
	req.setRequestHeader('Content-type', 'application/json');
	req.onreadystatechange = function() {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	var senddata = JSON.stringify(postData);
	req.send(senddata);
}

var XMLHttpFactories = [
	function() {return new XMLHttpRequest()},
	function() {return new ActiveXObject('Msxml2.XMLHTTP')},
	function() {return new ActiveXObject('Msxml3.XMLHTTP')},
	function() {return new ActiveXObject('Microsoft.XMLHTTP')}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i = 0; i < XMLHttpFactories.length; i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}

function handleRequest(req) {
}

function addEvent(node, type, listener ) {
    // Check compatibility using the earlier method
    // to ensure graceful degradation
    if (!(node = $(node))) return false;
    if (node.addEventListener) {
        // W3C method
        node.addEventListener(type, listener, false);
        return true;
    } else if (node.attachEvent) {
        // MSIE method
        node['e' + type + listener] = listener;
        node[type + listener] = function() {node['e' + type + listener](window.event);}
        node.attachEvent('on' + type, node[type + listener]);
        return true;
    }
    // Didn't have either so return false
    return false;
}

function $() {
    var elements = new Array();
    // Find all the elements supplied as arguments
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        // If the argument is a string assume it's an id
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        // If only one argument was supplied, return the element immediately
        if (arguments.length == 1) {
            return element;
        }
        // Otherwise add it to the array
        elements.push(element);
    }
    // Return the array of multiple requested elements
    return elements;
}


// Altera a visualizacao do json para os produtos da NFC-e
function changeToProducts(el, json) {
	if (el.checked) {
		let newJson = json.ItemNFCeList;
		let jsonViewer = new JSONViewer();
		jsonViewer.deleteJSON();
		document.querySelector("#json").appendChild(jsonViewer.getContainer());
		jsonViewer.showJSON(newJson, -1, 2);
	} else {
		let jsonViewer = new JSONViewer();
		jsonViewer.deleteJSON();
		document.querySelector("#json").appendChild(jsonViewer.getContainer());
		jsonViewer.showJSON(json, -1, 1);
	}
}

function changeToPayment(el, json) {
	if (el.checked) {
		let newJson = json.PagNFCeList;
		let jsonViewer = new JSONViewer();
		jsonViewer.deleteJSON();
		document.querySelector("#json").appendChild(jsonViewer.getContainer());
		jsonViewer.showJSON(newJson, -1, 0);
	} else {
		let jsonViewer = new JSONViewer();
		jsonViewer.deleteJSON();
		document.querySelector("#json").appendChild(jsonViewer.getContainer());
		jsonViewer.showJSON(json, -1, 0);
	}
}

function buildBaseJson() {
	var jsonViewer = new JSONViewer();
	document.querySelector("#json").appendChild(jsonViewer.getContainer());
	jsonViewer.showJSON(json, -1, 0);
	document.getElementById("jsonInput").style.display = 'none';
	document.getElementById("optionsTable").style.display = 'block';
}

function alterDivs(el) {
	
	if (el.value == 1) {
		document.getElementById("viewDiv").style.display = "block";
		document.getElementById("validateDiv").style.display = "none";
	}

	if (el.value == 2) {
		document.getElementById("viewDiv").style.display = "none";
		document.getElementById("validateDiv").style.display = "block";
	}
}

function calcula629(vProd, vUnCom, qCom) {
	
	let calc = (vUnCom * qCom).toFixed(4)

	if (vProd.toFixed(4) == calc) {
		return true;
	} else {
		if (vProd > calc) {
			if (Math.abs(vProd - calc) <= 0.01) {
				return true;
			} 
		} else if (Math.abs(calc - vProd) <= 0.01) {
				return true
		}
	}
	return false;
}

function resetJson(json) {
	clearResultDiv();
	let jsonViewer = new JSONViewer();
	jsonViewer.deleteJSON();
	document.querySelector("#json").appendChild(jsonViewer.getContainer());
	jsonViewer.showJSON(json, -1, 0);
	document.getElementById("changeJson").checked = false;
	document.getElementById("change1").checked = "checked";
	document.getElementById("change1").onchange();
}

function runJson629(json) {

	let newJson = json.ItemNFCeList;
	let product = [];
	let returnArray = [];

	for (var i = newJson.length - 1; i >= 0; i--) {
		if (!calcula629(newJson[i].vProd, newJson[i].vUnCom, newJson[i].qCom)) {

			returnArray[newJson[i].nItem] = {
										"vProd": newJson[i].vProd,
										"vUnCom": newJson[i].vUnCom,
										"qCom": newJson[i].qCom,
										"nItem": newJson[i].nItem
									   };

			product[i] = newJson[i].nItem;
		}
	}

	buildResultDiv(product, newJson);
	let jsonViewer = new JSONViewer();
	jsonViewer.deleteJSON();
	document.querySelector("#json").appendChild(jsonViewer.getContainer());
	jsonViewer.showJSON(returnArray, -1, 1);
}

function buildResultDiv(ids, array) {
	
	clearResultDiv();

	for (var i = array.length - 1; i >= 0; i--) {
		if (inArray(array[i].nItem, ids)) {
			var text = "<span style='color:red'><br> Produto de numero: "+array[i].nItem+" possivelmente causa a rejeição. <br><span>";
			document.getElementById("resultDiv").innerHTML += text;
		}
	}

}

function clearResultDiv() {
	document.getElementById("resultDiv").innerHTML = "";
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}




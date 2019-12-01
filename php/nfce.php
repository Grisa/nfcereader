<?php 
 $str =  file_get_contents($_FILES["file"]["tmp_name"]);
?>
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <script src="../js/json-viewer.js"></script>
  <script src="../js/reader_function.js"></script>
  <script type="text/javascript">
	  var json = JSON.parse(`<?=$str?>`);
  </script>
  <link rel="stylesheet" href="../css/json-viewer.css">
</head>
<body>
	<div style="padding-top: 30px"></div>

	<table id="optionsTable">
		<tr>
			<td>
				<div id="options">
					<input type="radio" value="1" name="view" id="change1" checked="checked" onchange="alterDivs(this)"> Visualizar
					<input type="radio" value="2" name="view" id="change2" onchange="alterDivs(this)"> Validar
					<button type="button" name="actionRadio" id="629" onclick="resetJson(json)"> Redefinir JSON </button>
					<div id="viewDiv" style="display: block">
						<input type="checkbox" value="1" id="changeJson" onchange="changeToProducts(this, json)">Visualizar apenas os produtos
						<input type="checkbox" value="1" id="changeJson" onchange="changeToPayment(this, json)">Visualizar pagamentos
					</div>
					<div id="validateDiv" style="display: none">
						<button type="button" name="actionRadio" id="629" onclick="runJson629(json)"> Rejeição 629 </button>
					</div>
				</div>
				<div id="json"></div>
			</td>
			<td>
				<div style="padding-left: 10px;" id="resultDiv"></div>
			</td>
		</tr>
	</table>
	<script type="text/javascript">buildBaseJson()</script>
</body>
</html>
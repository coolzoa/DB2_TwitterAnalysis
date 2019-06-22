
$('#boton_usuariosPorTema').on('click', 
	function() {
		crearGalleta(1);
	}
);

function usuariosPorTema() {
	var $funcion = 1;
	var values = {function : $funcion}
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			var $result = [];
			for (var i = 0; i < data.length; i++){
				var tema = data[i];
				$result.push([tema.idTema, tema.cantUsuarios]);
			}
			filtracionSimple($result);
		},
		error: function(data){
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#boton_tweetsPorTema').on('click', 
	function() {
		crearGalleta(2);
	}
);

function tweetsPorTema() {
	var $funcion = 2;
	var values = {function : $funcion}
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			var $result = [];
			for (var i = 0; i < data.length; i++){
				var tema = data[i];
				$result.push([tema.idTema, tema.cantTweets]);
			}
			filtracionSimple($result);
		},
		error: function(data){
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#boton_10palabras').on('click', 
	function() {
		crearGalleta(3);
	}
);

function top10palabras(result, i){
	var $funcion = 3;
	var $temas = tagsActivos();
	if (i < $temas.length) {
		get10($funcion, $temas[i], result, i);
	}
	else {
		filtracionTops(result);
	}
}

function get10(funcion, temaActual, resultado, i){
	var values = {function : funcion, tema: temaActual}
	var $temp = [temaActual];
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			for (var j = 0; j < data.length; j++){
				var fila = data[j];

				$temp.push([fila.palabra, fila.apariciones]); 
			}
			resultado.push($temp);
			i += 1;
			top10palabras(resultado, i);
		},
		error: function(data){
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#boton_10hashtags').on('click', 
	function() {
		crearGalleta(4);
	}
);

function top10hashtags(result, i){
	var $funcion = 4;
	var $temas = tagsActivos();
	if (i < $temas.length) {
		get10_2($funcion, $temas[i], result, i);
	}
	else {
		filtracionTops(result);
	}
}

function get10_2(funcion, temaActual, resultado, i){
	var values = {function : funcion, tema: temaActual}
	var $temp = [temaActual];
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			for (var j = 0; j < data.length; j++){
				var fila = data[j];

				$temp.push([fila.hashtag, fila.apariciones]); 
			}
			resultado.push($temp);
			i += 1;
			top10hashtags(resultado, i);
		},
		error: function(data){
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#boton_distribucionTiempo').on('click', 
	function() {
		crearGalleta(5);
	}
);

function distribucionTiempo(result, i){
	var $funcion = 5;
	$temas = tagsActivos();
	if (i < 24) {
		getTiempos($funcion, i, result);
	}
	else {
		$resultadoFinal = [];
		for (var j = 0; j < result.length; j++) {
			var $temp = [result[j][0]];
			for (var k = 1; k < result[j].length; k++) {
				for (var m = 0; m < $temas.length; m++) {
					if (result[j][k][0] == $temas[m]){
						$temp.push(result[j][k]);
						break;
					}
				}
			}
			if ($temp.length > 1) {
				$resultadoFinal.push($temp);
			}
		}
		filtracionTops($resultadoFinal);
	}
}

function getTiempos(funcion, h, resultado) {
	var values = {function : funcion, hora: h}
	var $temp = [h];
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			for (var j = 0; j < data.length; j++){
				var fila = data[j];
				$temp.push([fila.idTema, fila.apariciones]); 
			}
			if (data.length > 0) {
				resultado.push($temp);
			}
			h += 1;
			distribucionTiempo(resultado, h);
		},
		error: function(data){
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#boton_inclusion').on('click', 
	function() {
		crearGalleta(6);
	}
);

function inclusionTema(result, i){
	var $funcion = 6;
	var $temas = tagsActivos();
	if (i < $temas.length) {
		inclusion2($funcion, $temas[i], result, i);
	}
	else {
		filtracionTops(result);
	}
}

function inclusion2(funcion, temaActual, resultado, i){
	var values = {function : funcion, tema: temaActual}
	var $temp = [temaActual];
	$.ajax({
		type: 'POST',
		url: '/php/mySQL.php',
		dataType: 'json',
		data: values,
		success: function(data){
			$('#chart').html("");
			for (var j = 0; j < data.length; j++){
				var fila = data[j];
				$temp.push([fila.temaIncluido, fila.apariciones]); 
			}
			resultado.push($temp);
			i += 1;
			inclusionTema(resultado, i);
		},
		error: function(data){
			alert("error")
			console.log("[!] No se pudo realizar la coneccion.");
		}
	});
}

$('#2030NOW').on('click', function(){
	$('#chart').html("");
	if (!$('#2030NOW').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#women').on('click', function(){
	$('#chart').html("");
	if (!$('#women').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#costarica').on('click', function(){
	$('#chart').html("");
	if (!$('#costarica').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#puravida').on('click', function(){
	$('#chart').html("");
	if (!$('#puravida').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#MakeAmericaGreatAgain').on('click', function(){
	$('#chart').html("");
	if (!$('#MakeAmericaGreatAgain').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#Trumprussia').on('click', function(){
	$('#chart').html("");
	if (!$('#Trumprussia').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#RecycleReuse').on('click', function(){
	$('#chart').html("");
	if (!$('#RecycleReuse').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

$('#TraficoCR').on('click', function(){
	$('#chart').html("");
	if (!$('#TraficoCR').is(':checked')) {
		var $clear = ValidateClear();
		if ($clear == false) {
			iniciarGrafica();
		}

	} else {
		iniciarGrafica();
	}
});

function iniciarGrafica(){
	if (numFuncion == 1){
		usuariosPorTema();
	}
	if (numFuncion == 2){
		tweetsPorTema();
	}
	if (numFuncion == 3){
		top10palabras([],0);
	}
	if (numFuncion == 4){
		top10hashtags([],0);
	}
	if (numFuncion == 5){
		distribucionTiempo([],0);
	}
	if (numFuncion == 6){
		inclusionTema([],0);
	}
}

function filtracionSimple(resultado){ // Funciona con Cantidad de Usuarios y Cantidad de Tweets
	var tags = tagsActivos();
	var resultadoFinal = [];
	for (var i = 0; i < resultado.length; i++) {
		if (tags.indexOf(resultado[i][0]) > -1) {
			resultadoFinal.push(resultado[i]);
		}
	}
	var secuenciaHTML = "";
	for (var i = 0; i < resultadoFinal.length; i++) {
		secuenciaHTML += '<p>' + resultadoFinal[i][0] + ' cantidad de usuarios: ' + resultadoFinal[i][1] + '</p>';
	}
	$("#chart").html(secuenciaHTML);
	var cat = [];
	for (var i = 0; i < resultadoFinal.length; i++) {
		cat.push(resultadoFinal[i][0]);
	}
	var chart = c3.generate({
		data: {
			columns: resultadoFinal,
			type: 'bar'
		},
		bar: {
			width: {
				ratio: 0.5
			}
		}
	});
}

function filtracionTops(resultado){
	var secuenciaHTML = "";
	if (resultado.length == 0) {
		secuenciaHTML += "<p>No poseemos tweets del o de los temas seleccionados para analizar los datos por el momento.</p>"
	}
	else {
		for (var i = 0; i < resultado.length; i++) {
			if (numFuncion == 5) {
				secuenciaHTML += '<p>' + resultado[i][0] + ':00:';
			}
			else {
				secuenciaHTML += '<p>' + resultado[i][0] + ':';
			}
			if (resultado[i].length > 1) {
				for (var j = 1; j < resultado[i].length; j++) {
					var infoPalabra = resultado[i][j];
					secuenciaHTML += ' |' + infoPalabra[0] + ',' + infoPalabra[1] + '| ';
				}
				secuenciaHTML += '</p>';
			} else {
				secuenciaHTML += ' No poseemos tweets de este tema para analizar datos por el momento.</p>';
			}
		}
	}
	$("#chart").html(secuenciaHTML);
	if (resultado.length > 0) {
		if (numFuncion != 5){
			var tags = tagsActivos();
			var r = [];
			var x = ['x'];
			var palabras = [];
			for (var i = 0; i < tags.length; i++) {
				x.push(tags[i]);
			}
			r.push(x);
			for (var i = 0; i < resultado.length; i++) {
				for (var j = 1; j < resultado[i].length; j++) {
					if (palabras.indexOf(resultado[i][j][0]) > -1) {
						for (var k = 1; k < r.length; k++) {
							if (r[k][0] == resultado[i][j][0]){
								r[k][i + 1] = resultado[i][j][1];
								break;
							}
						}
					} else {
						palabras.push(resultado[i][j][0]);
						var lista_temp = [resultado[i][j][0]];
						for (var k = 0; k < tags.length; k++) {
							if (i == k) {
								lista_temp.push(resultado[i][j][1]);
							}
							else {
								lista_temp.push(null);
							}
						}
						r.push(lista_temp);
					}
				}
			}
			var chart = c3.generate({
			    data: {
			        x : 'x',
			        columns: r,
			        groups: [palabras],
			        type: 'bar'
			    },
			    legend: {
			        show: false
			    },
			    axis: {
			        x: {
			            type: 'category' // this needed to load string x value
			        }
			    }
			});
		} else {
			var tags = tagsActivos();
			var r = [];
			var x = ['x'];
			var palabras = [];
			for (var i = 0; i < resultado.length; i++) {
				x.push(resultado[i][0]);
			}
			r.push(x);
			for (var i = 0; i < resultado.length; i++) {
				for (var j = 1; j < resultado[i].length; j++) {
					if (palabras.indexOf(resultado[i][j][0]) > -1) {
						for (var k = 1; k < r.length; k++) {
							if (r[k][0] == resultado[i][j][0]){
								r[k][i + 1] = resultado[i][j][1];
								break;
							}
						}
					} else {
						palabras.push(resultado[i][j][0]);
						var lista_temp = [resultado[i][j][0]];
						for (var k = 0; k < resultado.length; k++) {
							if (i == k) {
								lista_temp.push(resultado[i][j][1]);
							}
							else {
								lista_temp.push(null);
							}
						}
						r.push(lista_temp);
					}
				}
			}
			for (var i = 1; i < x.length; i++) {
				x[i] = x[i] + ":00"
			}
			var chart = c3.generate({
			    data: {
			        x : 'x',
			        columns: r,
			        groups: [palabras],
			        type: 'bar'
			    },
			    legend: {
			        show: false
			    },
			    axis: {
			        x: {
			            type: 'category' // this needed to load string x value
			        }
			    }
			});
		}
	}
}

function tagsActivos(){
	var tags = [];
	if ($('#2030NOW').is(':checked')){
		tags.push("#2030NOW");
	}
	if ($('#women').is(':checked')){
		tags.push("#WOMEN");
	}
	if ($('#costarica').is(':checked')){
		tags.push("#COSTARICA");
	}
	if ($('#puravida').is(':checked')){
		tags.push("#PURAVIDA");
	}
	if ($('#MakeAmericaGreatAgain').is(':checked')){
		tags.push("#MAKEAMERICAGREATAGAIN");
	}
	if ($('#Trumprussia').is(':checked')){
		tags.push("#TRUMPRUSSIA");
	}
	if ($('#RecycleReuse').is(':checked')){
		tags.push("#RECYCLEREUSE");
	}
	if ($('#TraficoCR').is(':checked')){
		tags.push("#TRAFICOCR");
	}
	return tags;
}

function crearGalleta(numeroFuncion){
	document.cookie = "num=" + numeroFuncion + "; path =/;";
	window.location = "index.php";
}

var numFuncion = 1;
var cookieName = "num=";
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++){
    var c = ca[i];
    while (c.charAt(0) == ' '){
        c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0){
        numFuncion = c.substring(cookieName.length, c.length);
    }
}
if (numFuncion == 1) {
	$('#actualTitle').append('<p class="actualTitle"><b>Numero de Usuarios que se recibieron para cada Tema</b></p>');
}
if (numFuncion == 2) {
	$('#actualTitle').append('<p class="actualTitle"><b>Numero de Tweets recibidos para cada Tema</b></p>');
}
if (numFuncion == 3) {
	$('#actualTitle').append('<p class="actualTitle"><b>Las 10 palabras que más se repitieron en los Tweets para cada Tema</b></p>');
}
if (numFuncion == 4) {
	$('#actualTitle').append('<p class="actualTitle"><b>Los otros 10 hashtags más populares que contiene el Tweet para cada uno de los Temas</b></p>');
}
if (numFuncion == 5) {
	$('#actualTitle').append('<p class="actualTitle"><b>La distribución de tiempo de los Tweets hechos por hora</b></p>');
}
if (numFuncion == 6) {
	$('#actualTitle').append('<p class="actualTitle"><b>Cuantos Tweets incluían alguno de los otros Temas para cada Tema</b></p>');
}
ValidateClear();
console.log("Funcion Actual = " + numFuncion);

function ValidateClear(){
	if (!$('#2030NOW').is(':checked') && !$('#women').is(':checked') && 
	!$('#costarica').is(':checked') && !$('#puravida').is(':checked') && 
	!$('#MakeAmericaGreatAgain').is(':checked') && !$('#Trumprussia').is(':checked') && 
	!$('#RecycleReuse').is(':checked') && !$('#TraficoCR').is(':checked')) {
		$('#chart').html("<p>Seleccione algun tema para visualizar la grafica</p>")
		return true;
	}
	else {
		return false;
	}
}
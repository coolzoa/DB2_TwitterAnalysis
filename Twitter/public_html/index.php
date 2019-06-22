<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/styles.css">
	<link rel="stylesheet" type="text/css" href="css/c3.css">
	<script src="js/d3.v3.min.js" charset="utf-8"></script>
	<script src="js/c3.min.js" charset="utf-8"></script>
	<title>Page Title</title>
</head>
<body>
	<h1>Estadisticas de Twitter</h1>
	<p>Seleccione la categoria de datos a mostrar para ver los datos en un grafico. Los datos se pueden filtrar.</p>
	
	<div id="sideMenu"><!-- Seccion de Botones - Corresponden a las divisiones de datos propuestas para el proyecto -->
		<button id="boton_usuariosPorTema" type="button">Usuarios por Tema</button>
		<button id="boton_tweetsPorTema" type="button">Tweets por Tema</button>
		<button id="boton_10palabras">Top 10 Palabras</button>
		<button id="boton_10hashtags">Top 10 Hashtags</button>
		<button id="boton_distribucionTiempo">Distribucion de Tiempo</button>
		<button id="boton_inclusion">Inclusion de los Otros</button>		
	</div>
	<div id="upperFilter">
		<input id="2030NOW" type="checkbox">#2030NOW</input>
		<input id="women" type="checkbox">#women</input>
		<input id="costarica" type="checkbox">#costarica</input>
		<input id="puravida" type="checkbox">#puravida</input>
		<input id="MakeAmericaGreatAgain" type="checkbox">#MakeAmericaGreatAgain</input>
		<input id="Trumprussia" type="checkbox">#Trumprussia</input>
		<input id="RecycleReuse" type="checkbox">#RecycleReuse</input>
		<input id="TraficoCR" type="checkbox">#TraficoCR</input>
	</div>
	<div id="actualTitle"></div>
	<div id="chart">

	</div>
	<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="js/script.js"></script>
</body>
</html>
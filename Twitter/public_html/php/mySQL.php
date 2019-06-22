<?php

	$function = $_POST['function'];

	function usuarioTema() {
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$sql = $conn->query("SELECT idTema, cantUsuarios FROM `tema`");
		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}
		$conn->close();
		echo json_encode($json);
	}

	function tweetTema() {
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$sql = $conn->query("SELECT idTema, cantTweets FROM `tema`");
		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}
		$conn->close();
		echo json_encode($json);
	}

	function top10palabrasTema(){
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$tema = $_POST['tema'];
		$sql = $conn->query("SELECT DISTINCT * FROM `palabra` WHERE tema = '$tema' ORDER BY apariciones LIMIT 10;");
		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}		
		$conn->close();
		echo json_encode($json);
	}

	function top10hashtagsTema(){
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$tema = $_POST['tema'];
		$sql = $conn->query("SELECT DISTINCT * FROM `hashtags` WHERE tema = '$tema' ORDER BY apariciones LIMIT 10;");
		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}		
		$conn->close();
		echo json_encode($json);
	}

	function distTiempo(){
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$hora = $_POST['hora'];
		$sql = $conn->query("SELECT * FROM `tiempo` where hora = '$hora' ORDER BY idTema;");

		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}		
		$conn->close();
		echo json_encode($json);
	}

	function inclusionTweets(){
		$conn = new mysqli('localhost', 'root', 1234, 'twitter_data');
		if ($conn->connect_error){
			die ("Connection failed: " . $conn->connect_error);
		}

		$tema = $_POST['tema'];
		$sql = $conn->query("SELECT DISTINCT * FROM `incluirTema` WHERE idTema = '$tema' ORDER BY apariciones;");

		$json = array();

		while ($row = mysqli_fetch_assoc($sql)) {
			$json[] = $row;
		}
		$conn->close();
		echo json_encode($json);
	}	

	switch ($function) {
		case 1:
			usuarioTema();
			break;
		
		case 2:
			tweetTema();
			break;

		case 3:
			top10palabrasTema();
			break;

		case 4:
			top10hashtagsTema();
			break;

		case 5:
			distTiempo();
			break;

		case 6:
			inclusionTweets();
			break;
	}


?>
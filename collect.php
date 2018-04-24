<?php 
	include("conn/conn.php");
	
	$db = new MyDB();
	$b_ID = $_POST['b_ID'];
	$tel = $_COOKIE['tel'];

	$sql = "INSERT INTO tb_collect(tel,b_ID) VALUES('$tel','$b_ID')";
	$result = $db -> execSQL($sql);
	if($result) {
		echo 1;
	} else {
		echo 0;
	}

?>
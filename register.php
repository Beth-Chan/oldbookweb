<?php
	header("Content-type: text/html; charset=utf-8"); 
	include("conn/conn.php");

	$db = new MyDB();
	$tel = $_POST['tel'];
	$username = $_POST['username'];
	$pwd = $_POST['pwd'];
	$dormitory = (int)$_POST['dormitory'];
	$classname = $_POST['classname'];

	$sql = "INSERT INTO tb_user(tel,username,pwd,dormitory,classname) VALUES(?,?,?,?,?)";
	$stmt = $db -> prepare($sql); 
	$stmt -> bind_param('sssis',$tel,$username,$pwd,$dormitory,$classname);   
	$result = $stmt -> execute();      
	if($result) {
	  	echo "1";
	} else {
	  	echo "0";
	}

?>
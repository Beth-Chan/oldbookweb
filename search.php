<?php
	header("Content-type: text/html; charset=utf-8"); 
	include("conn/conn.php");

	$db = new MyDB();
	$b_name = $_POST['b_name'];
	
	$sql = "SELECT * FROM tb_book_info WHERE b_name LIKE '%".$b_name."%'";
	$stmt = $db -> prepare($sql); 
	$stmt -> bind_param('issss',null,$b_name,$b_press,date('Y-m-d',now()),$b_price);   
	$result = $stmt -> execute();      
	if($result) {
	 	echo "1";
	} else {
	  	echo "0";
	}
?>
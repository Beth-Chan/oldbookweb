<?php 
	include("conn/conn.php");

	$list = array();
	$db = new MyDB();
	$b_ID = $_POST['b_ID'];

	$sql = "SELECT * FROM tb_book_info WHERE status='1' AND b_ID=$b_ID";
	$result = $db -> execSQL($sql);
	while($row = mysqli_fetch_array($result)) {      	
		$list[] = $row; 
	}
	echo json_encode($list,JSON_UNESCAPED_UNICODE);
?>
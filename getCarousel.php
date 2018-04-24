<?php 
	include("conn/conn.php");

	$list = array();
	$db = new MyDB();
	$sql = "SELECT * FROM tb_book_info";
	$result = $db -> execSQL($sql);
	while($row=mysqli_fetch_array($result)) {      	
		$list[]=$row; 
	}
	echo json_encode($list,JSON_UNESCAPED_UNICODE);
?>
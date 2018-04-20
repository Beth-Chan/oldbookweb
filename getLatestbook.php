<?php 
	include("conn/conn.php");

	$list = array();
	$db = new MyDB();
	$sql = "SELECT * FROM tb_book_info WHERE status='1' ORDER BY b_ID DESC LIMIT 6";
	$result = $db -> execSQL($sql);
	while($row=mysqli_fetch_array($result)) {      	
		$list[]=$row; 
	}
	echo json_encode($list,JSON_UNESCAPED_UNICODE);
?>
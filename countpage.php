<?php 
	include("conn/conn.php");

	$db = new MyDB();
	$count = 0;

	$sql = "SELECT count(*) FROM tb_book_info WHERE status='1'";
	$result = $db -> execSQL($sql);
	while($row = mysqli_fetch_array($result)) {      	
		$count = $row[0]; 
	}
	echo $count;
?>
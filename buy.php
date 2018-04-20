<?php 
	include("conn/conn.php");

	$list = array();
	$db = new MyDB();
	$purchaser_tel = $_COOKIE['tel'];
	$b_ID = $_POST['b_ID'];
	$b_quantity = $_POST['b_quantity'];
	$addtime = $_POST['addtime'];
	$totalprice = $_POST['totalprice'];

	$sql = "INSERT INTO tb_order(seller_tel,purchaser_tel,b_ID,b_quantity,addtime,totalprice) 
			VALUES('$seller_tel','$purchaser_tel','$b_ID','$b_quantity','$addtime','$totalprice')";
	$result = $db -> execSQL($sql);
	if($result) {
		echo 1;
	} else {
		echo 0;
	} 
?>
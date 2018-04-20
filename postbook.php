<?php 
	include("conn/conn.php");

	$b_isbn = $_POST['b_isbn'];
	$b_name = $_POST['b_name'];
	$b_author = $_POST['b_author'];
	$b_press = $_POST['b_press'];
	$pic_url = $_POST['pic_url'];
	$b_price = (int)$_POST['b_price'];
	$b_quantity = (int)$_POST['b_quantity'];
	$db = new MyDB();
	$tel = $_COOKIE['tel'];

	$sql = "INSERT INTO tb_book_info(b_isbn,b_name,b_press,b_author,b_price,b_quantity,tel,pic_url) 
	VALUES('$b_isbn','$b_name','$b_press','$b_author','$b_price','$b_quantity','$tel','$pic_url')";
	$result = $db -> execSQL($sql);
	if($result) {
		echo "1";
	} else {
		echo "0";
	}
?>
<?php 
	include("conn/conn.php");

	$list = array();
	$db = new MyDB();
	$records = 10; // 每页显示的记录个数
	$page = 1; // 表示显示的页码
	if(isset($_POST['page']) === true) {
		$page = $_POST['page']; // 获得显示页码,如第一次访问则为1
	}
	$nStart = ($page-1) * $records; // 计算起始记录, 0 开始

	$sql = "SELECT * FROM tb_book_info WHERE status='1' ORDER BY b_ID DESC LIMIT ".$nStart.", $records"; // .连接符等同于其他语言里字符串操作的+
	$result = $db -> execSQL($sql);
	while($row = mysqli_fetch_array($result)) {      	
		$list[] = $row; 
	}
	// 对$list变量进行 JSON 编码，JSON_UNESCAPED_UNICODE是二进制掩码，表示中文不转为unicode
	echo json_encode($list, JSON_UNESCAPED_UNICODE);
?>
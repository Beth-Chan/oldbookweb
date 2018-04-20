<?php
  header("Content-type: text/html; charset=utf-8"); 
  include("conn/conn.php");

  $db = new MyDB();
  $tel = $_POST['tel'];
  $pwd = $_POST['pwd'];

  if(isset($tel) && isset($pwd)) {
        $sql = "SELECT * FROM tb_user WHERE tel=? AND pwd=?";
        $stmt = $db->prepare($sql); 
        $stmt -> bind_param('ss',$tel,$pwd);   
        $stmt -> execute();
        $result = $stmt->get_result();      
        $nums = $result->num_rows;
  	if($nums == 1) {
  	    setcookie("tel",$tel,time()+3600*24*30);
  	    setcookie("pwd",$pwd);
  		  echo "1";
  	} else {
  		  echo "0";
    }
  }
  
?>
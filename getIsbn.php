<?php
    header("Content-type:text/html;charset=utf-8");
    // 添加响应头信息,在服务器响应客户端的时候，带上Access-Control-Allow-Origin头信息。
    // 设置 Access-Control-Allow-Origin:*，则允许所有域名的脚本访问该资源。
	header("Access-Control-Allow-Origin: *"); 

	$isbn = $_POST['isbn'];

    $url="https://api.douban.com/v2/book/isbn/:".$isbn;
    $html = file_get_contents($url);
    if(!$html) {
    	echo 0;
    } else {
    	echo $html;
    } 
?>
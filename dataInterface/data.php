<?php
	$num=file_get_contents('num.txt')?intval(file_get_contents('num.txt')):0;;
	
	file_put_contents('num.txt',++$num);
	echo $num;
	/*header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Origin: http://localhost:3000");
	session_start();
	if(!$_SESSION['num']){
		$_SESSION['num']=1;
	}else{
		$_SESSION['num']+=1;
	}
	//echo $_SESSION['num'];
	echo session_id();
	//$data=rand(2,19);
	//echo $data;*/
<?php
	$num=file_get_contents('num.txt')?intval(file_get_contents('num.txt')):0;
	if($_GET['type']=='getData'){
		echo $num;
		exit();
	}
	file_put_contents('num.txt',++$num);
	echo $num;
<?php
$hostname = "";
$dbusername = "";
$dbpassword = "";
$dbname = "";

$con = mysqli_connect($hostname, $dbusername ,$dbpassword,$dbname);

header("Location: ../html/index-home.php");
exit();

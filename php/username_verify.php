<?php
include_once "functions.php";

$conn = connectDB();

$sql = $conn->prepare("SELECT COUNT(*) FROM users WHERE username=:userName");

$sql->bindParam(':userName', $_POST['userName']);
$sql->execute();

if($sql->fetchColumn() > 0){
    echo "true";
}
?>
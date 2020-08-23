<?php
include_once "functions.php";

$conn = connectDB();

$sql = $conn->prepare("SELECT user_id FROM users WHERE username=:userName AND PASSWORD=:password LIMIT 1");
$sql->bindParam(':userName', $_POST['userName']);
$sql->bindParam(':password', $_POST['password']);
$sql->execute();

$result = $sql->fetchColumn();

if(!$result){
    echo "User not found";
} else {
    echo $result;
}

$conn = null;
?>

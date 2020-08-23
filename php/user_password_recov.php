<?php
include_once "functions.php";

    $conn = connectDB();

    $sql = $conn->prepare("SELECT * FROM users WHERE username=:userName AND email=:email");
    $sql->bindParam(':userName', $_POST['userName']);
    $sql->bindParam(':email', $_POST['email']);
    $sql->execute();

    $result = $sql->fetch(PDO::FETCH_ASSOC);

    if(!$result){
        echo "User info not known";
    } else {
        echo json_encode($result);
    }
    
    $conn = null;
?>
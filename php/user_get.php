<?php
include_once "functions.php";

if(verifyUser($_POST['sUserId'], $_POST['sUserName'], $_POST['sPassword'])){

    $conn = connectDB();

    $sql = $conn->prepare("SELECT * FROM users WHERE user_id=:userId");
    $sql->bindParam(':userId', $_POST['sUserId']);
    $sql->execute();

    echo json_encode($sql->fetch(PDO::FETCH_ASSOC));
    $conn = null;

} else {
    echo "User not logged in";
}

?>
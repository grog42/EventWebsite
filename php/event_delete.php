<?php
include_once "functions.php";

if(verifyUser($_POST['sUserId'], $_POST['sUserName'], $_POST['sPassword'])){

    $conn = connectDB();

    $sql = $conn->prepare("DELETE FROM event_details WHERE event_id=:eventId");

    $sql->bindParam(':eventId', $_POST['eventId']);

    try{

       $sql->execute();

    } catch (PDOException $e){

        echo $e->getMessage();
    }

    echo "true";

    $conn = null;

} else {
    echo "User not logged in";
}
?>
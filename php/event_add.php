<?php
include_once "functions.php";

if(verifyUser($_POST['userId'], $_POST['userName'], $_POST['password'])){

    $conn = connectDB();

    $sql = $conn->prepare("INSERT INTO event_details VALUES (0, :userId, :name, :description, :category,
    :keywords, :location, :startDate, :endDate, :videoURL, :imageURL)");

    $sql->bindParam(':userId', $_POST['userId']);
    $sql->bindParam(':name', $_POST['name']);
    $sql->bindParam(':description', $_POST['description']);
    $sql->bindParam(':category', $_POST['category']);
    $sql->bindParam(':keywords', $_POST['keywords']);
    $sql->bindParam(':location', $_POST['location']);

    $startDate = encodeDate($_POST['startDate']);
    $sql->bindParam(':startDate', $startDate);

    $endDate = encodeDate($_POST['endDate']);
    $sql->bindParam(':endDate', $endDate);

    $videoURL = urlencode($_POST['videoURL']);
    $sql->bindParam(':videoURL', $videoURL);

    $imageURL = urlencode($_POST['imageURL']);
    $sql->bindParam(':imageURL', $imageURL);

    try{

        $sql->execute();

    } catch (PDOException $e){

        echo $e->getMessage();
    }

    $eventId = $conn->lastInsertId();
    $conn = null;

    echo $eventId;

} else {
    echo "User not logged in";
}
?>
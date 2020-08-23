<?php
include_once "functions.php";

if(verifyUser($_POST['sUserId'], $_POST['sUserName'], $_POST['sPassword'])){

    $conn = connectDB();

    $sql = $conn->prepare("UPDATE event_details SET event_name=:name, event_description=:description, 
    event_category=:category, keywords=:keywords, location=:location, start_date=:startDate, end_date=:endDate, 
    video_url=:videoURL, image_url=:imageURL WHERE event_id=:eventId");

    $sql->bindParam(':eventId', $_POST['eventId']);
    $sql->bindParam(':name', $_POST['name']);
    $sql->bindParam(':description', $_POST['description']);
    $sql->bindParam(':category', $_POST['category']);
    $sql->bindParam(':keywords', $_POST['keywords']);
    $sql->bindParam(':location', $_POST['location']);
    $sql->bindParam(':startDate', encodeDate($_POST['startDate']));
    $sql->bindParam(':endDate', encodeDate($_POST['endDate']));
    $sql->bindParam(':videoURL', urlencode($_POST['videoURL']));
    $sql->bindParam(':imageURL', urlencode($_POST['imageURL']));

    try{

       $sql->execute();

    } catch (PDOException $e){

        echo $e->getMessage();
    }

    $conn = null;

} else {
    echo "User not logged in";
}
?>
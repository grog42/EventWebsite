<?php
include_once "functions.php";

    $conn = connectDB();

    $sql = $conn->prepare("SELECT * FROM event_details WHERE event_id=:eventId");
    $sql->bindParam(':eventId', $_POST['eventId']);
    $sql->execute();
    
    $conn = null;

    echo json_encode($sql->fetch(PDO::FETCH_ASSOC));

?>
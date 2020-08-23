<?php
include_once "functions.php";

    $conn = connectDB();
    $arrayJSON = [];

    if($_POST['userId'] == null){

        $currentDate = date('Ymd');
        $limit = intval($_POST['limit']);

        if(intval($_POST['orderBy']) === 1){
            $sql = $conn->prepare("SELECT * FROM event_details WHERE start_date>$currentDate ORDER BY start_date ASC LIMIT $limit");

        } else {
            $sql = $conn->prepare("SELECT * FROM event_details WHERE start_date>$currentDate ORDER BY start_date DESC LIMIT $limit");
        }
        
    } else {
        $sql = $conn->prepare("SELECT * FROM event_details WHERE user_id=:userId ORDER BY start_date");
        $sql->bindParam(':userId', $_POST['userId']);
    }

    $sql->execute();

    if($sql->rowCount() > 0){
        while($row = $sql->fetch(PDO::FETCH_ASSOC)){

            array_push($arrayJSON, $row);
        }
    
        echo json_encode($arrayJSON);
    } else {
        echo "false";
    }

    $conn = null;
?>
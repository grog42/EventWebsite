<?php
include_once "functions.php";

$conn = connectDB();
$arrayJSON = [];

$sql = $conn->prepare("SELECT * FROM event_details WHERE event_name LIKE :str OR keywords LIKE :str LIMIT 4");

$str = '%'.$_POST['str'].'%';
$sql->bindParam(':str', $str);
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
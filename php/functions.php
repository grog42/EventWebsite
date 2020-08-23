<?php
function connectDB(){

    $serverName = "localhost";
    $dbName = "cmeteventmanagement";
    $userName = "root";
    $password = "";
    
    try 
    {
        $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $userName, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }

    return $conn;
}

function verifyUser($userId, $userName, $password){
    $conn = connectDB();

    $sql = $conn->prepare("SELECT COUNT(*) FROM users WHERE user_id=:userId AND username=:userName AND PASSWORD=:password");
    $sql->bindParam(':userId', $userId);
    $sql->bindParam(':userName', $userName);
    $sql->bindParam(':password', $password);
    $sql->execute();

    if($sql->fetchColumn() > 0){
        return true;
    } else {
        return false;
    }
}

function encodeDate($date){
    return date('Y-m-d', strtotime($date));
}

function decodeDate($date){
    
}
?>
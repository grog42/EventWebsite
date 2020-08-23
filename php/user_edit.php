<?php
include_once "functions.php";

if(verifyUser($_POST['sUserId'], $_POST['sUserName'], $_POST['sPassword'])){

    $conn = connectDB();

    $sql = $conn->prepare("UPDATE users SET username=:userName, PASWORD=:password, title=:title, first_name=:firstName, lastName=:last_name, adress1=:adress1,
    adress2=:adress2, adress3=:adress3, postcode=:postcode, description=:description, email=:email, telephone=:telephone,
    profile_url=:profileURL WHERE user_id=:userId");

    $sql->bindParam(':userId', $_POST['userId']);
    $sql->bindParam(':userName', $_POST['userName']);
    $sql->bindParam(':password', $_POST['password']);
    $sql->bindParam(':title', $_POST['title']);
    $sql->bindParam(':firstName', $_POST['firstName']);
    $sql->bindParam(':lastName', $_POST['lastName']);
    $sql->bindParam(':adress1', $_POST['adress1']);
    $sql->bindParam(':adress2', $_POST['adress2']);
    $sql->bindParam(':adress3', $_POST['adress3']);
    $sql->bindParam(':postcode', $_POST['postcode']);
    $sql->bindParam(':description', $_POST['description']);
    $sql->bindParam(':email', $_POST['email']);
    $sql->bindParam(':telephone', $_POST['telephone']);
    $sql->bindParam(':profileURL', urlencode($_POST['profileURL']));

    try{

        $sql->execute();

    } catch (PDOException $e){

        echo $e->getMessage();
    }

    $conn = null;
    echo true;

} else {
    echo "User not logged in";
}
?>
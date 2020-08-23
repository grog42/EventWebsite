<?php
include_once "functions.php";

$conn = connectDB();

$sql = $conn->prepare("INSERT INTO users VALUES (0, :userName, :password, :title, :firstName, :lastName, :gender, :adress1, :adress2,
:adress3, :postcode, :description, :email, :telephone, :profileURL)");

$sql->bindParam(':userName', $_POST['userName']);
$sql->bindParam(':password', $_POST['password']);
$sql->bindParam(':title', $_POST['title']);
$sql->bindParam(':firstName', $_POST['firstName']);
$sql->bindParam(':lastName', $_POST['lastName']);
$sql->bindParam(':gender', $_POST['gender']);
$sql->bindParam(':adress1', $_POST['adress1']);
$sql->bindParam(':adress2', $_POST['adress2']);
$sql->bindParam(':adress3', $_POST['adress3']);
$sql->bindParam(':postcode', $_POST['postcode']);
$sql->bindParam(':description', $_POST['description']);
$sql->bindParam(':email', $_POST['email']);
$sql->bindParam(':telephone', $_POST['telephone']);
$profileURL = urlencode($_POST['profileURL']);
$sql->bindParam(':profileURL', $profileURL);

try{

    $sql->execute();

} catch (PDOException $e){

    echo $e->getMessage();
}

$conn = null;

echo "true";
?>
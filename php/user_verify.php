<?php
    include_once "functions.php";

    echo verifyUser($_POST['userId'], $_POST['userName'], $_POST['password']);
?>
<?php
// Get the form data and sanitize it

//get the personal information
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$age = (int)$_POST['age'];

//get the answers
$bodyTypeAnswer = $_POST['bodyTypeAnswer'];
$favouriteSpeedAnswer = $_POST['favouriteSpeedAnswer'];
$costRangeMinAnswer = (int)$_POST['costRangeMinAnswer'];
$costRangeMaxAnswer = (int)$_POST['costRangeMaxAnswer'];
$carSafetyAnswer = $_POST['carSafetyAnswer'];
$carFunctionalityAnswer = $_POST['carFunctionalityAnswer'];
$fuelConsumptionAnswer = $_POST['fuelConsumptionAnswer'];
$carTechnologyAnswer = $_POST['carTechnologyAnswer'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cars_survey";
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//the mysql query for creating the owner
$createOwner = $conn->prepare("INSERT INTO owners (firstName, lastName, email, age)
VALUES (?, ?, ?, ?)");
$createOwner->bind_param("sssi",$firstName, $lastName, $email, $age);


if ($createOwner->execute() === TRUE) {
  $ownerId = $conn->insert_id;

  //the mysql query for creating the answer for this owner
  $createAnswer = $conn->prepare("INSERT INTO surveys (bodyTypeAnswer, favouriteSpeedAnswer, costRangeMinAnswer
  , costRangeMaxAnswer, carSafetyAnswer, carFunctionalityAnswer, fuelConsumptionAnswer
  , carTechnologyAnswer, ownerId)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

  $createAnswer->bind_param("ssiissssi",$bodyTypeAnswer, $favouriteSpeedAnswer, $costRangeMinAnswer
  , $costRangeMaxAnswer, $carSafetyAnswer, $carFunctionalityAnswer, $fuelConsumptionAnswer
  , $carTechnologyAnswer, $ownerId);


  if ($createAnswer->execute() === TRUE) {
    echo "Survey response saved successfully";
    header("Location: results.html");
    exit;
  } else {
    echo "Error: " . $createOwner . "<br>" . $conn->error;
  }
    
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();


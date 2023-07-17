<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "cars_survey";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from database
$sql = "";

if($_GET['type'] === 'body'){
  $sql = "SELECT surveys.id, bodyTypeAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'speed'){
  $sql = "SELECT surveys.id, favouriteSpeedAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'cost'){
  $sql = "SELECT surveys.id, costRangeMinAnswer, costRangeMaxAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'safety'){
  $sql = "SELECT surveys.id, carSafetyAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'functionality'){
  $sql = "SELECT surveys.id, carFunctionalityAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'fuel'){
  $sql = "SELECT surveys.id, fuelConsumptionAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
else if($_GET['type'] === 'technology'){
  $sql = "SELECT surveys.id, carTechnologyAnswer, age FROM surveys , owners where surveys.id = owners.id";
}
$result = $conn->query($sql);

// Convert data to JSON and return to client
$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
echo json_encode($data);


?>
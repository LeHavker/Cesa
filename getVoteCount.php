<?php

// Connection to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vote";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch vote counts from the database
$sql = "SELECT candidate_name, vote_count FROM votes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $voteCounts = array();
    while ($row = $result->fetch_assoc()) {
        $voteCounts[$row['candidate_name']] = $row['vote_count'];
    }

    // Return the vote counts in JSON format
    header('Content-Type: application/json');
    echo json_encode($voteCounts);
} else {
    echo "No votes found";
}

$conn->close();

?>

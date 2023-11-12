$(document).ready(function() {
    // Fetch vote counts when the page loads
    updateVoteCounts();

    // Handle form submission
    $("#voteForm").submit(function(e) {
        e.preventDefault();

        // Your existing form submission code
        var formData = $(this).serialize();  // Serialize the form data

        $.ajax({
            url: "submitVote.php",
            method: "POST",
            data: formData,
            success: function(response) {
                console.log(response);  // Log the response from the server

                // After submitting the form, update the vote counts
                updateVoteCounts();
            },
            error: function(xhr, status, error) {
                console.error("Error submitting vote:", status, error);
            }
        });
    });

    // Function to update vote counts
    function updateVoteCounts() {
        $.ajax({
            url: "getVoteCounts.php",
            method: "GET",
            dataType: "json",
            success: function(data) {
                // Update the HTML with the fetched vote counts
                for (var candidate in data) {
                    $("#voteCount" + candidate).html(candidate + " | <span class='vote-count'>" + data[candidate] + "</span> Votes");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error fetching vote counts:", status, error);
            }
        });
    }
});

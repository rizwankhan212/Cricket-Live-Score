// script.js
const fetchLiveScores = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/live-scores');
        const data = await response.json();

        console.log('Data from backend:', data); // Add this for debugging
        renderScores(data);
    } catch (error) {
        console.error('Error fetching live scores:', error);
    }
};


function renderScores(data) {
    const scoresContainer = document.getElementById('live-scores');
    scoresContainer.innerHTML = ''; // Clear previous scores

    data.matches.forEach((match, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        // Extract teams and status
        const team1 = match.teams && match.teams[0] ? match.teams[0] : 'Team 1';
        const team2 = match.teams && match.teams[1] ? match.teams[1] : 'Team 2';
        const status = match.status || 'Match status not available';
        const venue = match.venue || 'Unknown Venue';

        // Create a unique ID for match details
        const detailsId = `match-details-${index}`;

        // Basic match info card
        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <strong>${team1} vs ${team2}</strong>
                </div>
                <div class="card-body">
                    <p><strong>Venue:</strong> ${venue}</p>
                    <p><small>${status}</small></p>
                    <button class="btn btn-primary btn-sm" onclick="toggleDetails('${detailsId}')">View Details</button>
                    <div id="${detailsId}" class="match-details" style="display: none; margin-top: 10px;">
                        ${renderMatchDetails(match.score)}
                    </div>
                </div>
            </div>
        `;
        scoresContainer.appendChild(card);
    });
}

// Generate HTML for match details dynamically
function renderMatchDetails(scores) {
    if (!scores || !Array.isArray(scores)) {
        return '<p>No detailed score available</p>';
    }

    let detailsHTML = '';
    scores.forEach(innings => {
        detailsHTML += `
            <div class="innings-details">
                <p><strong>${innings.inning}:</strong> ${innings.r}/${innings.w} in ${innings.o} overs</p>
            </div>
        `;
    });
    return detailsHTML;
}

// Toggle match details on button click
function toggleDetails(detailsId) {
    const detailsDiv = document.getElementById(detailsId);
    if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block';
    } else {
        detailsDiv.style.display = 'none';
    }
}


// Fetch scores every minute (or your preferred interval)
setInterval(fetchLiveScores, 60000);
fetchLiveScores();

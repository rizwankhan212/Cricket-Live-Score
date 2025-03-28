// backend/utils/apiHelper.js
// Function to format API response into a clean format
const formatApiResponse = (matches) => {
    return matches.map(match => ({
        id: match.id,
        team1: match.teams[0],
        team2: match.teams[1],
        score: match.score || 'Score not available',
        status: match.status || 'Match in progress'
    }));
};

module.exports = { formatApiResponse };

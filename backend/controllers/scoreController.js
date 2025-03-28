const axios = require('axios');
const { CRIC_API_URL, API_KEY } = require('../config/keys');

const getLiveScores = async (req, res, next) => {
    try {
        const response = await axios.get(CRIC_API_URL, {
            params: {
                apikey: API_KEY,
                offset: 0
            }
        });

        if (response.data && response.data.data) {
            res.status(200).json({ matches: response.data.data });
        } else {
            res.status(404).json({ message: 'No live matches found.' });
        }
    } catch (error) {
        console.error('Error fetching live scores:', error.message);
        res.status(500).json({ message: 'Error fetching live scores' });
    }
};

module.exports = { getLiveScores };

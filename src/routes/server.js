const { getRecommendation } = require('../controllers/recommendationController');

const apiRoutes = [
    {
        method: 'POST',
        path: '/api/recommendation',
        handler: async (request, h) => {
            try {
                console.log('Received Payload:', request.payload);  // Menambahkan log untuk melihat payload
                const { name, weight, height, gender, age, activityLevel } = request.payload;

                if (!name || !weight || !height || !gender || !age || !activityLevel) {
                    return h.response({ message: 'All fields are required' }).code(400);
                }

                // Panggil fungsi rekomendasi
                const recommendation = getRecommendation({
                    name,
                    weight,
                    height,
                    gender,
                    age,
                    activityLevel,
                });

                return h.response({
                    message: `Hi ${name}, here are your fitness recommendations`,
                    data: recommendation,
                }).code(200);
            } catch (error) {
                console.error('Error during recommendation processing:', error);  // Menambahkan log error
                return h.response({ message: 'An internal server error occurred' }).code(500);
            }
        },
    },
];

module.exports = apiRoutes;

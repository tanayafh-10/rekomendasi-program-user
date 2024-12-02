const { calculateRecommendation } = require('../services/recommendationService');

exports.getRecommendation = (data) => {
    try {
        const { name, weight, height, gender, age, activityLevel } = data;

        console.log('Received data:', data); // Log data untuk melihat input yang diterima

        const bmi = weight / ((height / 100) ** 2);
        let maintenanceCalories, bulkingCalories, cuttingCalories;
        let photoLink = '';

        switch (activityLevel.toLowerCase()) {
            case 'ringan':
                maintenanceCalories = bmi * 25;
                break;
            case 'sedang':
                maintenanceCalories = bmi * 30;
                photoLink = 'https://storage.googleapis.com/recomendasi-storage01/images/Ideal.jpg'; // Link foto dari Cloud Storage
                break;
            case 'berat':
                maintenanceCalories = bmi * 35;
                break;
            default:
                maintenanceCalories = bmi * 25;
        }

        bulkingCalories = maintenanceCalories + 500;
        cuttingCalories = maintenanceCalories - 500;

        console.log('Calculated values - Maintenance: ', maintenanceCalories, 'Bulking: ', bulkingCalories, 'Cutting: ', cuttingCalories); // Log hasil perhitungan

        // Tentukan program berdasarkan BMI
        const program = bmi < 18.5 ? 'bulking' : bmi > 25 ? 'cutting' : 'maintenance';

        if (program === 'bulking') {
            photoLink = 'https://storage.googleapis.com/recomendasi-storage01/images/Ideal.jpg'; // Link foto dari Cloud Storage
        } else if (program === 'cutting') {
            photoLink = 'https://storage.googleapis.com/recomendasi-storage01/images/Kurus.jpg'; // Link foto dari Cloud Storage
        }

        return {
            maintenance: maintenanceCalories,
            bulking: bulkingCalories,
            cutting: cuttingCalories,
            program: program,
            photo: photoLink, // Menambahkan link foto
        };
    } catch (error) {
        console.error('Error in getRecommendation:', error); // Log jika terjadi error dalam fungsi
        throw new Error('Error in recommendation calculation');
    }
};

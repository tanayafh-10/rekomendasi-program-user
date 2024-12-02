exports.calculateRecommendation = (weight, height, gender, age, activityLevel) => {
    const bmi = weight / ((height / 100) ** 2);
    let maintenanceCalories;

    switch (activityLevel.toLowerCase()) {
        case 'ringan':
            maintenanceCalories = bmi * 25;
            break;
        case 'sedang':
            maintenanceCalories = bmi * 30;
            break;
        case 'berat':
            maintenanceCalories = bmi * 35;
            break;
        default:
            maintenanceCalories = bmi * 25;
    }

    const bulkingCalories = maintenanceCalories + 500;
    const cuttingCalories = maintenanceCalories - 500;

    return {
        maintenance: maintenanceCalories,
        bulking: bulkingCalories,
        cutting: cuttingCalories,
        program: bmi < 18.5 ? 'bulking' : bmi > 25 ? 'cutting' : 'maintenance',
    };
};

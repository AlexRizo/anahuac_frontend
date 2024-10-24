export const filterAspirantByOrigin = (aspirants, origin) => {
    if (!origin || origin.includes('SECUNDARIA') && origin.includes('PREPARATORIA')) {
        return aspirants;
    } else if (origin.includes('SECUNDARIA')) {
        return aspirants.filter((aspirant) => aspirant.application.origin === 'SECUNDARIA');
    } else if (origin.includes('PREPARATORIA')) {
        return aspirants.filter((aspirant) => aspirant.application.origin === 'PREPARATORIA');
    }
};
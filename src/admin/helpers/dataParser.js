import { format } from "date-fns";
import localCustom from "./localCustom";
import { toZonedTime } from "date-fns-tz";

export const customParseISO = (date) => {
    return format(date, 'dd MMMM y', { locale: localCustom });
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const dataParser = (apps) => {
    return apps.map((app) => {
        app.date = customParseISO(app.date)
        app.origin = capitalizeFirstLetter(app.origin);
        app.status = capitalizeFirstLetter(app.status);

        return app;
    });
}

export const getAspirantKey = (aspirant_name = '') => {
    const lastIndex = aspirant_name.lastIndexOf('-');
    return aspirant_name.substring(0, lastIndex);
};

export const parseDateForInput = (date = new Date()) => {
    const parsedDate = date.toISOString().split('T')[0];
    const UTCDate = toZonedTime(parsedDate, 'America/Mexico_City')
    return format(UTCDate, 'yyyy-MM-dd')
};

export const parseAdminRole = (role = '') => {
    const roleMap = {
        'ADMIN_ROLE': 'Administrador',
        'MOD_ROLE': 'Manejador',
        'APPLICATOR_ROLE': 'Aplicador'
    };
    
    return roleMap[role] || 'Sin rol';
};

export const formatDateDMYHMS = (date = new Date()) => {
    return format(date, 'MMMM dd, yyyy HH:mm a', { locale: localCustom });
};
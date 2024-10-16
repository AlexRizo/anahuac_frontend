import { format } from "date-fns";
import localCustom from "./localCustom";

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

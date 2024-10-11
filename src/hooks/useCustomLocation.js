import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCustomLocation = () => {
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem("lastRoute", location);
    }, [location]);
};
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";
import { onSetAdmins } from "@/store/users/usersSlice";

export const useUsersStore = () => {
    const dispatch = useDispatch();

    const { alumns, admins } = useSelector((state) => state.users);
    
    const startLoadingUsers = () => {};
    
    const startLoadingAlumns = () => {};

    const startLoadingAdmins = async () => {
        try {
            const { data } = await anahuacApi.get('/users/getadmins');
            dispatch(onSetAdmins(data.admins));
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    
    return {
        // ? properties
        alumns,
        admins,

        // ? methods
        startLoadingUsers,
        startLoadingAlumns,
        startLoadingAdmins,
    };
};
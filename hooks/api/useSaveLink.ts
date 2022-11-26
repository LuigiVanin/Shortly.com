import api from "../../services/api";
import { useAsync } from "../useAsync";

export const useSaveLink = () => {
    const { action, data, isLoading, error } = useAsync(async (data) => {
        return await api.post("link/save", {
            data,
        });
    }, false);

    return {
        shortData: data?.data.result,
        saveLink: action,
        isLoading,
        error,
    };
};

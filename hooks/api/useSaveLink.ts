import api from "../../services/api";
import { useAsync } from "../useAsync";

export const useCreateLink = () => {
    const { action, data, isLoading, error } = useAsync(async (data) => {
        return await api.post("link", {
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

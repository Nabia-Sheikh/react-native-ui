import { useState } from "react";

export default useApi = (apiFunc) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const request = async () => {
        setIsLoading(true);
        setError(null);
        const response = await apiFunc();
        setIsLoading(false);

        if (!response.ok) {
            setError(true);
            return;
        }

        setError(false);
        setData(response.data);
        setAllData(response.data);
    };

    return { isLoading, error, data, allData, setData, request };
}
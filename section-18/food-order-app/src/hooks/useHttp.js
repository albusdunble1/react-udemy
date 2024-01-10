import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong with send http request LOL!');
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData)
        } catch (error) {
            setError(error.message || 'Something went wrong in useHttp hook LOL!');
        }

        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        // triggers whenever the component that uses the useHttp hook is loaded
        // this is to make sure that only GET request executes on load and not POST requests like checkout
        if ((config && (config.method === 'GET' || !config.method)) || !config){
            sendRequest();
        }
    }, [sendRequest, config])


    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
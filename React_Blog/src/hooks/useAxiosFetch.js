import {useState, useEffect} from 'react';
import axios from 'axios';


const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            }
        }

        fetchData(dataUrl);


        // fetch clean up function
        const cleanUp = () => {
            console.log('clean up function');
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    },
    // dependencies
     [dataUrl]);

    return {
        data,
        fetchError,
        isLoading
    }
}


export default useAxiosFetch;

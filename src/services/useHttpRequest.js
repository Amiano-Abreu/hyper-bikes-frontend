import axios from "axios";
import { useState, useEffect } from "react";

export default useHttpRequest = (method, url, body) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: method,
            url: url,
            data: body
          });
          const data = await resp?.data;
  
          setApiData(data);
          setIsLoading(false);
        } catch (error) {
          if (error.hasOwnProperty("response")) {
              if (error.response.hasOwnProperty("data")) {
                  const data = error.response.data;
                  setServerError(data);
              }
          }
          else {
            setServerError({
                status: "Error",
                message: error.message
            })
          }
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url, method, body]);
  
    return { isLoading, apiData, serverError };
};
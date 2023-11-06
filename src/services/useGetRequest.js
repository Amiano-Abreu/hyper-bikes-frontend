import axios from "axios";
import { useState, useEffect } from "react";

const useGetRequest = (method, url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: method,
            url: url
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
  
      if( url !== "undefined" ) {
        console.log("radio Url ", url)

        setIsLoading(true);
        fetchData();
      }
    }, [url, method]);
  
    return { isLoading, apiData, serverError };
};

export default useGetRequest;
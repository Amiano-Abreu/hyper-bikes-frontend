import axios from "axios";
import { useState, useEffect } from "react";

const useGetRequest = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await axios({
            method: "GET",
            url: url
          });
          const data = await resp?.data;
  
          console.log(data)
          setApiData(data);
          setServerError(null);
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
          setApiData(null);
          setIsLoading(false);
        }
      };
  
      if( url !== "undefined" ) {
        console.log("radio Url ", url)

        setIsLoading(true);
        fetchData();
      }
    }, [url]);
  
    return { isLoading, apiData, serverError };
};

export default useGetRequest;
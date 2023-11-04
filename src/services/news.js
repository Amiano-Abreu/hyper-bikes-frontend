import axios from 'axios'

const BASEURL = "http://localhost:5000/api/news";

export const getAllNews = async ( limit = false ) => {
    try {
        const response = await axios.get(`${BASEURL}${limit ? '?limit=true' : ''}`);

        const data = response.data;
        return data;

    } catch (e) {
        console.log(e)
        
        if (e.hasOwnProperty("response")) {
            if (e.response.hasOwnProperty("data")) {
                const data = e.response.data;
                return data;
            }
        }

        return {
            status: "Error",
            message: e.message
        }
    }
}

export const getNewsByID = async ( id ) => {
    try {
        const response = await axios.get(`${BASEURL}/${id}`);

        const data = response.data;
        return data;

    } catch (e) {
        console.log(e)
        
        if (e.hasOwnProperty("response")) {
            if (e.response.hasOwnProperty("data")) {
                const data = e.response.data;
                return data;
            }
        }

        return {
            status: "Error",
            message: e.message
        }
    }
}
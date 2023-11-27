import axios from 'axios'

const BASEURL = "http://localhost:5000/api"

export const httpAddReview = async (body) => {
    try {
        const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(`${BASEURL}/review`, {
                                    _csrf: csrfToken,
                                    ...body
                        },
                        {
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': "application/json"
                            },
                            withCredentials: true,
                            mode: 'cors'
                        });

        const data = response.data;
        return data;

    } catch (e) {
        // console.log(e)
        
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

export const httpEditReview = async (body) => {
    try {
        const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(`${BASEURL}/editreview`, {
                                    _csrf: csrfToken,
                                    ...body
                        },
                        {
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': "application/json"
                            },
                            withCredentials: true,
                            mode: 'cors'
                        });

        const data = response.data;
        return data;

    } catch (e) {
        // console.log(e)
        
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

export const httpDeleteReview = async (bikeID) => {
    try {
        const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(`${BASEURL}/deletereview`, {
                                    _csrf: csrfToken,
                                    bikeID
                        },
                        {
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': "application/json"
                            },
                            withCredentials: true,
                            mode: 'cors'
                        });

        const data = response.data;
        return data;

    } catch (e) {
        // console.log(e)
        
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
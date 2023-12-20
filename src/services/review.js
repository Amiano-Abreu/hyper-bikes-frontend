import axios from 'axios'

const BASEURL = "api"

export const httpAddReview = async (body) => {
    try {
    const csrfURL = new URL(`${BASEURL}/csrf`, process.env.REACT_APP_API_URL)
    const reviewURL = new URL(`${BASEURL}/review`, process.env.REACT_APP_API_URL)

        const res = await axios.get(csrfURL.toString(), {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(reviewURL.toString(), {
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
    const csrfURL = new URL(`${BASEURL}/csrf`, process.env.REACT_APP_API_URL)
    const reviewURL = new URL(`${BASEURL}/editreview`, process.env.REACT_APP_API_URL)

        const res = await axios.get(csrfURL.toString(), {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(reviewURL.toString(), {
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
    const csrfURL = new URL(`${BASEURL}/csrf`, process.env.REACT_APP_API_URL)
    const reviewURL = new URL(`${BASEURL}/deletereview`, process.env.REACT_APP_API_URL)

        const res = await axios.get(csrfURL.toString(), {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(reviewURL.toString(), {
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
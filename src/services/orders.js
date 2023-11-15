import axios from 'axios'

const BASEURL = "http://localhost:5000/api";

export const getAllOrders = async () => {
    try {
        const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(`${BASEURL}/orders`, {
                                    _csrf: csrfToken
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

export const cancelOrder = async (orderID) => {
    try {
        const res = await axios.get(`${BASEURL}/csrf`, {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(`${BASEURL}/cancelorder`, {
                                    _csrf: csrfToken,
                                    orderID
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
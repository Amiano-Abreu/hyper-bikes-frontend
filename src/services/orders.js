import axios from 'axios'

const BASEURL = "api";

export const getAllOrders = async () => {
    try {
    const csrfURL = new URL(`${BASEURL}/csrf`, process.env.REACT_APP_API_URL)
    const orderURL = new URL(`${BASEURL}/orders`, process.env.REACT_APP_API_URL)

        const res = await axios.get(csrfURL.toString(), {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(orderURL.toString(), {
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

export const cancelOrder = async (orderID) => {
    try {
    const csrfURL = new URL(`${BASEURL}/csrf`, process.env.REACT_APP_API_URL)
    const orderURL = new URL(`${BASEURL}/cancelorder`, process.env.REACT_APP_API_URL)

        const res = await axios.get(csrfURL.toString(), {withCredentials: true});
        const csrfToken = res.data.csrfToken;

        const response = await axios.post(orderURL.toString(), {
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
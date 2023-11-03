import axios from 'axios';

const BASEURL = "http://localhost:5000/api";

export const getBikeDetails = async (id) => {
    try {
        const response = await axios.get(`${BASEURL}/bike/${id}`);

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

export const getSingleBikeSummary = async (id) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes/${id}`);

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

export const getAllBikes = async ( limit = false ) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes${limit ? '?limit=true' : ''}`);

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

export const getBikesByBrand = async (brand) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes/brand/${brand}`);

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

export const getBikesByCategory = async (category) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes/category/${category}`);

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

export const getBikesByDisplacement = async (start, end=false) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes/displacement?start=${start}${end ? `&end=${end}` : ''}`);

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

export const getBikesByPrice = async (under, above) => {
    try {
        const response = await axios.get(`${BASEURL}/bikes/price?start=${start}${end ? `&end=${end}` : ''}`);

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
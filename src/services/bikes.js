import axios from 'axios';

export const getBikeDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/bike/${id}`);

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

const BASEURL = "http://localhost:5000/api/bikes";

export const getSingleBikeSummary = async (id) => {
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

export const getAllBikes = async ( limit = false ) => {
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

export const getBikesByBrand = async (brand) => {
    try {
        const response = await axios.get(`${BASEURL}/brand/${brand}`);

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
        const response = await axios.get(`${BASEURL}/category/${category}`);

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
        const response = await axios.get(`${BASEURL}/displacement?start=${start}${end ? `&end=${end}` : ''}`);

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

export const getBikesByPrice = async ({under, above}) => {
    let query = '';

    if (under) {
        query = `under=${under}`
    }
    else if (above) {
        query = `above=${above}`
    }
    else {
        return {
            status: 'Error',
            message: 'Under or Above query not provided !'
        }
    }

    try {
        const response = await axios.get(`${BASEURL}/price?${query}`);

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
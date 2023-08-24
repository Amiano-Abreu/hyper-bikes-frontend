import { useState } from "react";
import axios from 'axios';

const Login = () => {

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
            const csrfToken = response.data.csrfToken;
            console.log(csrfToken);
            const loginResponse = await axios.post('http://localhost:5000/api/login', {
                                        email: email,
                                        password: password
                                    }, {
                                        headers: {
                                            'Accept': "application/json",
                                            'Content-Type': "application/json",
                                            'X-CSRF-Token': csrfToken
                                        },
                                        withCredentials: true,
                                        mode: 'cors'
                                    })
            console.log(loginResponse.data);
        } catch (e) {
            console.log('error ', e)
        }
    }
    console.log(email, password)

    const verify = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/csrf', {withCredentials: true});
            const csrfToken = response.data.csrfToken;
            const userResponse = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    'X-CSRF-Token': csrfToken
                },
                withCredentials: true,
                mode: 'cors'
            })
            console.log('userResponse: ', userResponse);
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    return (
        <>
            <form>
                <input type='email' onChange= {handleEmail} />
                <input type='password'onChange={handlePassword} />
                <button style={
                    {height: '50px',
                    width: '50px'}
                } onClick={handleSubmit} >submit</button>
            </form>
            <button onClick={verify}> verify</button>
        </>
    )
}

export default Login;
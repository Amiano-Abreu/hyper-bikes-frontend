import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginHandler, resetError } from "../../features/userSlice";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useMediaQuery } from '@mui/material';

import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as yup from 'yup';

import Loader from "../Utility/Loader"
import Toaster from "../Utility/Toaster"

import desktopImg from '../../assets/Authentication/auth.webp'
import loginStyles from './loginStyles.module.css'


const Login = () => {

    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(state => state.user);
    
    const isMedium = useMediaQuery('(max-width:990px)');
    const is700 = useMediaQuery('(max-width:700px)');

    const schema = yup.object().shape({
        email: yup
                .string('Email must be a string')
                .email('Please provide a valid email')
                .required('Email is required')
                .trim(),
        password: yup
                    .string('Password must be a string')
                    .required('Password is required')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters with [a-z,A-Z,0-9,!@#$%...]")
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values, {setSubmitting}) => {
            
            // console.log("values of login ", values)
            dispatch(loginHandler(values))
                .finally(() => setSubmitting(false))
        }
    })

    const { submitCount, isValid, setErrors } = formik;

    useEffect(() => {
        dispatch(resetError())
        window.scrollTo(0,0)
    }, [dispatch])
    
    useEffect(() => {
        
        // console.log('useEffect error ',error, 'loading ', !loading, 'submitCount ',formik.submitCount )

        if (!loading && success && error) {
            if (typeof error !== 'string') {
                setErrors(error)
            }
        }
    }, [setErrors, loading, error, success])
    
    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${desktopImg} )`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: { mobile: "bottom", tablet:"right center"},
                    height: `calc(100vh - ${isMedium ? '70px' : '80px'})`,
                    width: 'auto',
                    paddingTop: '75px'
                }}
            >
                
                <Paper
                    elevation={12}
                    sx={{
                        marginX: 'auto',
                        marginTop: '0px',
                        height: 'auto',
                        width: { mobile:'90%', tablet:'600px'},
                        backgroundColor: 'customWhite.main',
                        opacity: `.8`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        paddingBottom: 7.5,
                        px: 10
                    }}
                >
                    <Typography
                        variant="h4"
                        component="p"
                        textAlign='center'
                        sx={{
                            fontWeight: '600',                            
                            color: 'black',
                            my: 5,
                            ...(is700 && {
                                fontSize: '1.5rem'
                            })
                        }}
                    >
                        LOGIN
                    </Typography>
                    <form
                        className={loginStyles.formClass}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        {Object.keys(formik.values).map(input => {

                            return (
                                <TextField
                                    key={input}
                                    id={input}
                                    label={String(input).toLowerCase()}
                                    type={input}
                                    fullWidth={true}
                                    size='small'
                                    value={(formik.values[input])}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched[input] && formik.errors[input] ?
                                        true : false
                                    }
                                    helperText={formik.touched[input] && formik.errors[input]}
                                    sx={{
                                        marginBottom: `${is700 ? '10px' : '20px'}`
                                    }}
                                />
                            )
                        })}
                        <Button
                            type='submit'
                            disabled={formik.isSubmitting ? true : false}
                            sx={{
                                height: '40px',
                                paddingX: 5,
                                py: 2,
                                width: 'auto',
                                bgcolor: 'customBlack.main',
                                color: 'customWhite.main',
                                fontWeight: '600',
                                ...(is700 && {
                                    fontSize: '0.75rem',
                                    height: '30px'
                                }),
                                '&:hover': {
                                    bgcolor: 'customRed.main'
                                }
                            }}
                        >
                            SUBMIT
                        </Button>
                    </form>
                    <Typography
                        variant='subtitle2'
                        sx={{
                            marginX: 'auto',
                            width: 'auto',
                            ...(is700 && {
                                fontSize: '0.75rem'
                            })
                        }}
                    >
                        {`Don't have an account ? `}
                        <Typography
                            variant='subtitle2'
                            component={Link}
                            to='/signup'
                            sx={{
                                
                            ...(is700 && {
                                fontSize: '0.75rem'
                            })
                            }}
                        >Sign up</Typography>
                    </Typography>
                </Paper>

            </Box>
            {
                !loading && error ?
                <Toaster 
                    timer={2000}
                    type={"error"}
                    message={
                        typeof error === 'string' ? 
                            error 
                                :
                            Object.values(error).join("\n")
                    }
                />
                :
                <></>
            }
            {
                !loading && success && !error && submitCount > 0 && isValid ?
                <Toaster timer={1500} message={"Login successfull !"} />
                :
                <></>
            }
            {
                loading ?
                <Loader />

                :
                <></>
            }
        </>
    )
}

export default Login;
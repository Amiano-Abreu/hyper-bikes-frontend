import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { loginHandler } from "../../features/userSlice";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from "formik";
import * as yup from 'yup';

import desktopImg from '../../assets/Authentication/login2.jpg'
import loginStyles from './loginStyles.module.css'


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMedium = useMediaQuery('(max-width:990px)');
    const is700 = useMediaQuery('(max-width:700px)');

    const [openBackdrop, setOpenBackdrop] = useState(false); // for displaying alert
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);

    const handleOpen = () => {
        setOpenBackdrop(true);
    };

    const handleClose = () => {
        setOpenBackdrop(false);
    };

    const handleSuccessOpen = () => {
        setOpenSuccess(true)
    }

    const handleSuccessClose = () => {
        setOpenSuccess(false)
        
        navigate('/home')
    }

    const handleLoaderOpen = () => {
        setOpenLoader(true)
    }

    const handleLoaderClose = () => {
        setOpenLoader(false)
    }

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
            handleLoaderOpen()
            dispatch(loginHandler(values))
            handleLoaderClose()
            handleSuccessOpen()
            formik.resetForm()
            {/*setTimeout(() => {
                console.log(values)
                handleLoaderClose()
                handleSuccessOpen()
                formik.resetForm()
            }, 5000)*/}

            setSubmitting(false)
        }
    })

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
    useEffect(() => {
        if(formik.submitCount > 0 && !formik.isValid){
            handleOpen()
        }
    }, [formik.submitCount, formik.isValid])
    
    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${desktopImg} )`,
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
                        width: `${is700 ? '400px' : '600px'}`,
                        backgroundColor: 'customWhite.main',
                        opacity: `${is700 ? '0.6' : '0.7'}`,
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
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openBackdrop}
              onClick={handleClose}
            >
                <Alert onClose={handleClose} variant='filled' severity="error">
                  <AlertTitle>Error</AlertTitle>
                    <strong>Please check form inputs !</strong>
                </Alert>
            </Backdrop>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openSuccess}
              onClick={handleSuccessClose}
            >
                <Alert onClose={handleSuccessClose} variant='filled' severity="success">
                  <AlertTitle>Success</AlertTitle>
                    <strong>Login successfull !</strong>
                </Alert>
            </Backdrop>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Login;
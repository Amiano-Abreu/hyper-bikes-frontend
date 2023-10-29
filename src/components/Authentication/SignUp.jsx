import { useEffect, useState } from "react";

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

import { useDispatch, useSelector } from "react-redux";
import { signUpHandler } from "../../features/userSlice";

import { Link, useNavigate } from 'react-router-dom';

import desktopImg from '../../assets/Authentication/signup.jpg'
import loginStyles from './loginStyles.module.css'

import { useFormik } from "formik";
import * as yup from 'yup';

const SignUp = () => {
    const is700 = useMediaQuery('(max-width:700px)');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { error, loading } = useSelector(state => state.user);

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
        
        navigate('/')
    }

    const handleLoaderOpen = () => {
        setOpenLoader(true)
    }

    const handleLoaderClose = () => {
        setOpenLoader(false)
    }

    const schema = yup.object().shape({
        firstName: yup
                    .string('First name must be a string')
                    .required('First name is required')
                    .trim(),
        lastName: yup
                    .string('Last name must be a string')
                    .required('Last name is required')
                    .trim(),
        email: yup
                .string('Email must be a string')
                .email('Please provide a valid email')
                .required('Email is required')
                .trim(),
        password: yup
                    .string('Password must be a string')
                    .required('Password is required')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirmPassword: yup
                            .string('Confirm password must be a string')
                            .required('Confirm password is required')
                            .oneOf([yup.ref('password')], 'Passwords must match'),
        state: yup
                .string('State must be a string')
                .required('State is required')
                .trim(),
        country: yup
                .string('Country must be a string')
                .required('Country is required')
                .trim()
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            state: '',
            country: ''
        },
        validationSchema: schema,
        onSubmit: (values, {setSubmitting}) => {
            handleLoaderOpen()

            // setTimeout(() => {
                dispatch(signUpHandler(values));
                console.log(values)
                if(!loading && error) {
                    // handleSuccessOpen()
                    console.log('form ',error)
                } 
                else if(!loading && !error) {
                    formik.resetForm()
                }
                handleLoaderClose()
            // }, 5000)

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
                    height: 'auto',
                    width: 'auto',
                    py: '75px'
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
                        SIGN UP
                    </Typography>
                    <form
                        className={loginStyles.formClass}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <TextField
                            id='firstName'
                            label='first name'
                            type='text'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.firstName)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && formik.errors.firstName ?
                                true : false
                            }
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='lastName'
                            label='last name'
                            type='text'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.lastName)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && formik.errors.lastName ?
                                true : false
                            }
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='email'
                            label='email'
                            type='email'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.email)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email ?
                                true : false
                            }
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='password'
                            label='password'
                            type='password'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.password)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password ?
                                true : false
                            }
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='confirmPassword'
                            label='confirm password'
                            type='password'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.confirmPassword)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                true : false
                            }
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='state'
                            label='state'
                            type='text'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.state)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && formik.errors.state ?
                                true : false
                            }
                            helperText={formik.touched.state && formik.errors.state}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />

                        <TextField
                            id='country'
                            label='country'
                            type='text'
                            size='small'
                            fullWidth={true}
                            value={(formik.values.country)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && formik.errors.country ?
                                true : false
                            }
                            helperText={formik.touched.country && formik.errors.country}
                            sx={{
                                marginBottom: `${is700 ? '15px' : '20px'}`
                            }}
                        />
                            
                
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
                        {`Already have an account ? `}
                        <Typography
                            variant='subtitle2'
                            component={Link}
                            to='/login'
                            sx={{
                                
                            ...(is700 && {
                                fontSize: '0.75rem'
                            })
                            }}
                        >Login</Typography>
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
                    <strong>Sign up successfull !</strong>
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

export default SignUp;
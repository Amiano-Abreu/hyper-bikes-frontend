import { useEffect } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { signUpHandler, resetError } from "../../features/userSlice";

import { Link } from 'react-router-dom';

import desktopImg from '../../assets/Authentication/auth.jpg'
import loginStyles from './loginStyles.module.css'

import { useFormik } from "formik";
import * as yup from 'yup';
import Toaster from "../Utility/Toaster";
import Loader from "../Utility/Loader";

const SignUp = () => {
    const is700 = useMediaQuery('(max-width:700px)');
    const isMedium = useMediaQuery('(max-width:990px)');

    const dispatch = useDispatch();
    const { error, loading, success } = useSelector(state => state.user);

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
            
            // console.log(values)
            dispatch(signUpHandler(values))
                .finally(() => setSubmitting(false));
        }
    })

    const { setErrors, submitCount, isValid } = formik;

    useEffect(() => {
        dispatch(resetError())
        window.scrollTo(0,0)
    }, [dispatch])

    useEffect(() => {
            
        // console.log('useEffect error ',error, 'loading ', !loading, 'success ',success )

        if (!loading && success && error) {
            if (typeof error !== 'string') {
                setErrors(error)
            }
        }
    }, [loading, error, setErrors, success])

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${desktopImg} )`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: { mobile: "bottom", tablet:"right center"},
                    height: `calc(100vh + ${isMedium ? '70px' : '80px'})`,
                    width: 'auto',
                    py: 8
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
                !loading && success && !error  && submitCount > 0 && isValid ?
                <Toaster timer={1500} message={"Signup successfull !"} />
                :
                <></>
            }
            {
                loading ?
                <Loader loading={loading} />

                :
                <></>
            }
        </>
    )
}

export default SignUp;
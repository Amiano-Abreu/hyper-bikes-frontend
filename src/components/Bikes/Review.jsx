import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';

import { useFormik } from "formik";
import * as yup from 'yup';

import styles from './Review.module.css'

const owned = [
    {
        value: "> 1 yr",
        label: "> 1 yr"
    },
    {
        value: "6 - 12 months",
        label: "6 - 12 months"
    },
    {
        value: "3 - 6 months",
        label: "3 - 6 months"
    },
    {
        value: "< 3 months",
        label: "< 3 months"
    },
    {
        value: "never owned",
        label: "never owned"
    }
]

const used = [
    {
        value: "daily commute",
        label: "Daily commute"
    },
    {
        value: "occasional commute",
        label: "Occasional commute"
    },
    {
        value: "leisure rides",
        label: "Leisure rides"
    },
    {
        value: "tours",
        label: "Tours"
    },
    {
        value: "everything",
        label: "Everything"
    }
]

const ridden = [
    {
        value: "< 5000 Km",
        label: "< 5000 Km"
    },
    {
        value: "5000-10000 Km",
        label:"5000-10000 Km"
    },
    {
        value: "10000-15000 Km",
        label: "10000-15000 Km"
    },
    {
        value: "> 15000 Km",
        label:"> 15000 Km"
    }
]

// VALIDATE THE RADIO ON CHANGE AS IT DOESN'T TRIGGER AN ONBLUR EVENT
const CustomRadio = ({ formik, is700, controlLabel, name, options }) => {
    return (
        <FormControl
            error={formik.touched[name] && formik.errors[name] ? true: false}
            sx={{
                mb: is700 ? '20px' : '25px'
            }}
        >
          <FormLabel id={name}
            sx={{
                fontWeight: '600',
                color: 'customBlack.main',
                fontSize: is700 ? '.9rem' : '1rem'  
            }}
          >{controlLabel}</FormLabel>
          <RadioGroup
            row
            aria-labelledby={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
                '& .MuiTypography-root': {
                    fontSize: is700 ? '.9rem': '1rem'
                }
            }}
          >
            {
                options.map(
                    (obj, index) => (
                        <FormControlLabel key={obj.value + index} value={obj.value} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: is700 ? '1rem' : is700 ? '1rem' : '1.25rem'
                            }
                        }} />} label={obj.label} />
                    )
                )
            }
          </RadioGroup>
          <FormHelperText
            sx={{
                color: 'customRed.main'
            }}
          >{formik.touched[name] && formik.errors[name]}</FormHelperText>
        </FormControl>
    )
}

const Review = () => {
    const is700 = useMediaQuery('(max-width:700px)')
    const [openBackdrop, setOpenBackdrop] = useState(false); // for displaying alert
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openLoader, setOpenLoader] = useState(false);

    const navigate = useNavigate();

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
        navigate({pathname: '/bikes'})
    }

    const handleLoaderOpen = () => {
        setOpenLoader(true)
    }

    const handleLoaderClose = () => {
        setOpenLoader(false)
    }

    const formik = useFormik({
        initialValues: {
            rating: 0,
            title: '',
            body: '',
            owned: '',
            used: '',
            ridden: '',
            mileage: 0
        },
        validateOnChange: false,
        validationSchema: yup.object().shape({
            rating: yup
                .number()
                .typeError('Rating must be a number')
                .positive('Rating must be a positive number')
                .moreThan(0, 'Rating must be a value equal to or more than 1')
                .lessThan(6, 'Rating must be a value equal to or less than 5')
                .required('Rating is required'),
            title: yup
                .string('Title must be a string')
                .required('Title is required'),
            body: yup
                .string('Body must be a string')
                .required('Body is required')
                .max(255, 'Body must be at most 255 characters'),
            owned: yup
                .string('Owned must be a string')
                .required('Owned is required'),
            used: yup
                    .string('Must be a string')
                    .required('Must be required'),
            ridden: yup
                    .string('Ridden must be a string')
                    .required('Ridden is required'),
            mileage: yup
                    .number()
                    .typeError('Mileage must be a number')
                    .positive('Mileage must be a positive number')
                    .required('Mileage is required')
        }),
        onSubmit: (values, {setSubmitting}) => {
            handleLoaderOpen()

            setTimeout(() => {
                console.log(values)
                handleLoaderClose()
                handleSuccessOpen()
                formik.resetForm()
            }, 5000)

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

    console.count();

    return (
        <>
        <Box
            sx={{
                height: 'auto',
                width: 'auto',
                py: 10,
                bgcolor: 'customBlack.light'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    bgcolor: 'customWhite.main',
                    height: 'auto',
                    width: `${is700 ? '400px' : '600px'}`,
                    mx: 'auto',
                    py: 10
                }}
            >
                <Typography
                    variant="h4"
                    component="p"
                    textAlign='center'
                    sx={{
                        fontWeight: '400',                            
                        color: 'customBlack.main',
                        fontSize: '1.8rem',
                        ...(is700 && {
                            fontSize: '1.5rem'
                        }),
                        '& span': {
                            borderBottom: '2px solid #bc1024'
                        }
                    }}
                >
                    WRITE YOUR <span>REVIEW</span>
                </Typography>
                <Typography
                    variant='subtitle2'
                    textAlign='center'
                    sx={{
                        color: 'customBlack.main',
                        pt: 5,
                        width: '300px',
                        mx: 'auto',
                        fontSize: '.75rem'
                    }}
                >
                    Consider looks & styling, performance, servicing experience, mileage etc. before you rate.
                </Typography>
                <form
                    onSubmit={formik.handleSubmit}
                    noValidate
                    className={styles.form}
                >
                    {formik.touched.rating && formik.errors.rating ?
                        <p className={styles.error} style={{ fontWeight: "700"}}>{formik.errors.rating}</p>
                        :
                        null
                    }
                    <Rating 
                        name='rating'
                        id='rating'
                        value={Number(formik.values.rating)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size={is700 ? 'medium' : 'large'}
                        sx={{
                            mb: 2
                        }}
                    />
                    <CustomRadio 
                        formik={formik}
                        is700={is700}
                        controlLabel={"How long have you owned this bike for ?"}
                        name={"owned"}
                        options={owned}
                    />
                    <CustomRadio 
                        formik={formik}
                        is700={is700}
                        controlLabel={"What do you use this bike for?"}
                        name={"used"}
                        options={used}
                    />
                    <CustomRadio 
                        formik={formik}
                        is700={is700}
                        controlLabel={"How much have you ridden this bike ?"}
                        name={"ridden"}
                        options={ridden}
                    />
                    <TextField
                        label='Title'
                        type='text'
                        sx={{
                            marginBottom: `${is700 ? '20px' : '25px'}`
                        }}
                        id='title'
                        size={is700? 'small' : 'medium'}
                        fullWidth={true}
                        onBlur={(e) => {
                            formik.setFieldValue("title", e.target.value).then(
                                () => formik.handleBlur(e)
                            )
                        }}
                        error={formik.touched.title && formik.errors.title ?
                            true : false
                        }
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        id='body'
                        label='Body'
                        placeholder="Less than 255 chars"
                        type='text'
                        size={is700? 'small' : 'medium'}
                        multiline
                        maxRows={4}
                        fullWidth={true}
                        onBlur={(e) => {
                            formik.setFieldValue("body", e.target.value).then(
                                () => formik.handleBlur(e)
                            )
                        }}
                        error={formik.touched.body && formik.errors.body ?
                            true : false
                        }
                        helperText={formik.touched.body && formik.errors.body}
                        sx={{
                            marginBottom: `${is700 ? '20px' : '25px'}`
                        }}
                    />
                    <TextField
                        id='mileage'
                        label='Mileage'
                        placeholder="Got mileage in Km"
                        type='number'
                        size={is700? 'small' : 'medium'}
                        fullWidth={true}
                        onBlur={(e) => {
                            formik.setFieldValue("mileage", e.target.value).then(
                                () => formik.handleBlur(e)
                            )
                        }}
                        error={formik.touched.mileage && formik.errors.mileage ?
                            true : false
                        }
                        helperText={formik.touched.mileage && formik.errors.mileage}
                        sx={{
                            marginBottom: `${is700 ? '20px' : '25px'}`
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
            </Paper>
        </Box>
        {/* <Backdrop
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
                <strong>Review Submitted !</strong>
            </Alert>
        </Backdrop>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        </>
    )
}

export default Review;
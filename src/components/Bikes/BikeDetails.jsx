import ReactCarousel from '../ReactCarousel'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';

import { useMediaQuery } from '@mui/material';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import CustomPaper from './CustomPaper'
import PaperHeader from './PaperHeader'
import FeaturesGrid from './FeaturesGrid'
import CustomDivider from './CustomDivider'
import NewsCard from './NewsCard'
import Toaster from '../Utility/Toaster'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetRequest from '../../services/useGetRequest'
import Loader from '../Utility/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { httpAddToCart, resetAtc } from '../../features/cartSlice'
import { httpDeleteReview } from '../../services/review'

const reviewData = [
    'Used', 'Ridden', 'Mileage' , 'Owned'
]

const specs = [ 
    { 
        label: 'Engine Capacity',
        value: "engineCapacity"
    }, 
    { 
        label: 'Transmission',
        value: "transmission"
    }, 
    { 
        label: 'Kerb Weight',
        value: "kerbWeight"
    }, 
    { 
        label: 'Fuel Tank Capacity',
        value: "fuelTankCapacity"
    }, 
    { 
        label: 'Seat Height',
        value: "seatHeight"
    }, 
    { 
        label: 'Max Power',
        value: "maxPower"
    }
]

const power = [
    {
        value: "fuelType",
        label: 'Fuel Type' 
    }, 
    {
        value: "maxPower",
        label: 'Max Power' 
    }, 
    {
        value: "maxTorque",
        label: 'Max Torque' 
    }, 
    {
        value: "emissionStandard",
        label: 'Emission Standard' 
    }, 
    {
        value: "displacement",
        label: 'Displacement' 
    }, 
    {
        value: "cylinders",
        label: 'Cylinders' 
    }, 
    {
        value: "bore",
        label: 'Bore' 
    },
    {
        value: "stroke",
        label: 'Stroke' 
    }, 
    {
        value: "valves",
        label: 'Valves Per Cylinder' 
    }, 
    {
        value: "compressionRatio",
        label: 'Compression Ratio' 
    }, 
    {
        value: "coolingSystem",
        label: 'Cooling System' 
    }, 
    {
        value: "transmission",
        label: 'Transmission' 
    }, 
    {
        value: "transmissionType",
        label: 'Transmission Type' 
    }, 
    {
        value: "gearShiftPattern",
        label: 'Gear Shifting Pattern' 
    }, 
    {
        value: "clutch",
        label: 'Clutch' 
    }, 
    {
        value: "ignition",
        label: 'Ignition' 
    }, 
    {
        value: "fuelDelivery",
        label: 'Fuel Delivery System' 
    }, 
    {
        value: "fuelTankCapacity",
        label: 'Fuel Tank Capacity' 
    },
    {
        value: "reserveFuelCapacity",
        label: 'Reserve Fuel Capacity' 
    }, 
    {
        value: "topSpeed",
        label: 'Top Speed'
    }
]

const brakeWheel = [ 
    { 
        value: "brakingSystem",
        label: 'Braking System' 
    }, 
    { 
        value: "frontBrakeType",
        label: 'Front Brake Type' 
    }, 
    { 
        value: "frontBrakeSize",
        label: 'Front Brake Size' 
    }, 
    { 
        value: "rearBrakeType",
        label: 'Rear Brake Type' 
    }, 
    { 
        value: "rearBrakeSize",
        label: 'Rear Brake Size' 
    },
    { 
        value: "wheelType",
        label: 'Wheel Type' 
    }, 
    { 
        value: "frontWheelSize",
        label: 'Front Wheel Size' 
    }, 
    { 
        value: "rearWheelSize",
        label: 'Rear Wheel Size' 
    }, 
    { 
        value: "frontTyreSize",
        label: 'Front Tyre Size' 
    }, 
    { 
        value: "rearTyreSize",
        label: 'Rear Tyre Size' 
    },
    { 
        value: "tyreType",
        label: 'Tyre Type' 
    }, 
    { 
        value: "radialTyres",
        label: 'Radial Tyres' 
    }, 
    { 
        value: "frontTyrePressureR",
        label: 'Front Tyre Pressure (Rider)' 
    }, 
    { 
        value: "rearTyrePressureR",
        label: 'Rear Tyre Pressure (Rider)' 
    },
    { 
        value: "frontTyrePressureRP",
        label: 'Front Tyre Pressure (Rider & Pillion)' 
    }, 
    { 
        value: "rearTyrePressureRP",
        label: 'Rear Tyre Pressure (Rider & Pillion)' 
    }, 
    { 
        value: "calliperType",
        label: 'Calliper Type' 
    },
    { 
        value: "frontSuspension",
        label: 'Front Suspension' 
    }, 
    { 
        value: "rearSuspension",
        label: 'Rear Suspension'
    }
]

const dimensions = [
    {
        label:'Kerb Weight', 
        value: "kerbWeight"
    }, 
    {
        label:'Overall Length', 
        value: "overallLength"
    }, 
    {
        label:'Overall Width', 
        value: "overallWidth"
    }, 
    {
        label:'Overall Height', 
        value: "overallHeight"
    }, 
    {
        label:'Wheelbase', 
        value: "wheelBase"
    }, 
    {
        label:'Ground Clearance', 
        value: "groundClearance"
    },
    {
        label:'Seat Height', 
        value: "seatHeight"
    }, 
    {
        label:'Chassis Type', 
        value: "chassisType"
    }
]

const warranty = [
    {
        label:'Standard Warranty (Year)', 
        value: "years"
    }, 
    {
        label:'Standard Warranty (Kilometers)', 
        value: "kilometers"
    }
]

const features = [
    {
        label:'Odometer', 
        value: "odometer"
    }, 
    {
        label:'DRLs (Daytime running lights)', 
        value: "drl"
    }, 
    {
        label:'Mobile App Connectivity', 
        value: "appConnectivity"
    }, 
    {
        label:'GPS & Navigation', 
        value: "gpsNavigation"
    }, 
    {
        label:'USB charging port', 
        value: "usbChargingPort"
    },
    {
        label:'Front storage box', 
        value: "frontStorageBox"
    }, 
    {
        label:'Under seat storage', 
        value: "underSeatStorage"
    }, 
    {
        label:'AHO (Automatic Headlight On)', 
        value: "aho"
    }, 
    {
        label:'Speedometer', 
        value: "speedometer"
    }, 
    {
        label:'Fuel Guage', 
        value: "fuelGuage"
    }, 
    {
        label:'Tachometer', 
        value: "tachometer"
    }, 
    {
        label:'Stand Alarm', 
        value: "standAlarm"
    }, 
    {
        label:'Stepped Seat', 
        value: "steppedSeat"
    }, 
    {
        label:'No. of Tripmeters', 
        value: "numberOfTripmeters"
    }, 
    {
        label:'Tripmeter Type', 
        value: "tripmeterType"
    }, 
    {
        label:'Low Fuel Indicator', 
        value: "lowFuelIndicator"
    }, 
    {
        label:'Low Oil Indicator', 
        value: "lowOilIndicator"
    }, 
    {
        label:'Low Battery Indicator', 
        value: "lowBatteryIndicator"
    }, 
    {
        label:'Pillion Backrest', 
        value: "pillionBackrest"
    }, 
    {
        label:'Pillion Grabrail', 
        value: "pillionGrabrail"
    }, 
    {
        label:'Pillion Seat', 
        value: "pillionSeat"
    }, 
    {
        label:'Pillion Footrest', 
        value: "pillionFootrest"
    }, 
    {
        label:'Digital Fuel Guage', 
        value: "digitalFuelGuage"
    }, 
    {
        label:'Start Type', 
        value: "startType"
    }, 
    {
        label:'Shift Light', 
        value: "shiftLight"
    }, 
    {
        label:'Killswitch',
        value: "killSwitch"
    },
    {
        label:'Clock', 
        value: "clock"
    }, 
    {
        label:'Battery', 
        value: "battery"
    },
    {
        label:'Headlight Type', 
        value: "headlightType"
    }, 
    {
        label:'Brake/Tail Light', 
        value: "brakeLight"
    }, 
    {
        label:'Turn Signal', 
        value: "turnSignal"
    }, 
    {
        label:'Pass Light', 
        value: "passLight"
    }, 
    {
        label:'Additional features', 
        value: "additionalFeatures"
    }
]

const BASEURL = `${process.env.REACT_APP_API_URL}/bike`;

const BikeDetails = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.user);
    const { loading: cartLoading, success, error, atc } = useSelector(state => state.cart);

    const location = useLocation();
    const bike = location.state?.bike;
    // console.log("state bikeDetails ", location.state.bike) // CHECK BOTH CASES ON HOME & BIKES PAGE

    let url;
    let bikeName;
    let bikeSpecs;

    url = `${BASEURL}/${bike?.bikeID}`;
    bikeName = `${bike?.brand} ${bike?.model}`;
    bikeSpecs = {
        engineCapacity: `${bike?.displacement} cc`,
        kerbWeight: bike?.kerbWeight,
        maxPower: `${bike?.power.split("bhp")[0]} bhp`,
        transmission: '6 Speed Manual',
        fuelTankCapacity: '16.1 litres',
        seatHeight: '830 mm',
    }
    
    // console.log("bikeUrl ", url,"bikeName ",bikeName, "bikeSpecs ",bikeSpecs)
    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(url);


    const isMobile = useMediaQuery('(max-width:640px)')
    const isTablet = useMediaQuery('(max-width:1024px)')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();

    const handleButtonDisable = () => {
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(resetAtc());
    }, [dispatch])

    useEffect(() => {
        if ( !cartLoading && success ) {
            setIsButtonDisabled(false);
        }
    }, [cartLoading, success])

    // console.log("api review ", apiData?.review)

    return (
        isLoading ?

        <Loader />

        :

        <Box
            sx={{
                py: 10
            }}
        >
        {
            serverError ?

            <p
                style={{
                    textTransform: 'uppercase',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: '700'
                }}
            >
                {serverError?.message || "Error Occurred !"}
            </p>

            :

            apiData &&
        (    
            <>
            {
                loading ?

                <Loader />

                :

                <></>
            }

            {

                !loading && data && data?.status === 'ERROR' ?
                <Toaster timer={1500} type={"error"} message={data?.data ? data.data.map(obj => Object.values(obj)[0]).join(', ') : data?.message} />
                :
                <></>
            }

            {

                !loading && data && data?.status === 'SUCCESS' ?
                <Toaster timer={1500} message={`${data?.message} !`} />
                :
                <></>
            }

            <Divider
                    variant='middle'
                    textAlign='center'
                    sx={{
                        pb: 5,
                        '&::before': {
                            backgroundColor: 'customRed.main'
                        },
                        '&::after': {
                            backgroundColor: 'customRed.main'
                        },
                        height: '2px',
                        '& span': {
                            textAlign: 'center',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            color: 'customRed.main',
                            fontSize: { mobile: '1rem' , tablet: '1.5rem' , laptop: '2.125rem' }
                        }                        
                    }}    
            >
                {bikeName.trim() ? bikeName : ""}
            </Divider>
            <ReactCarousel images={bike?.images ? bike.images : []} />
            <CustomPaper>
                <Box
                    sx={{
                        mr: 10
                    }}
                >
                    <Typography
                        sx={{
                            color: 'customBlack.light',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            fontSize: { mobile: '.5rem' , tablet: '0.65rem' , laptop: '.75rem' }
                        }}
                    >
                        avg. ex-showroom price
                    </Typography>
                    <Typography
                        variant='h4'
                        sx={{
                            textAlign: 'center',
                            fontWeight: '600',
                            pt: 1.5,
                            textTransform: 'uppercase',
                            fontSize: { mobile: '0.85rem' , tablet: '1rem' , laptop: '1.5rem' }
                        }}
                    >
                        ₹ {bike?.price ? bike.price : ""}
                    </Typography>
                </Box>
                <Button
                    variant='contained'
                    color='customRed'
                    disabled={isButtonDisabled}
                    size={ isMobile ? 'small' : 'medium'}
                    endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                    sx={{
                        color: 'customWhite.main',
                        width: '50%',
                        fontWeight: '600',
                        px: 5,
                        textTransform: 'uppercase',
                        fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                    }}
                    onClick={
                        () => {
                            handleButtonDisable();
                            dispatch(httpAddToCart(bike));
                        }
                    }
                >
                    add to cart
                </Button>
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`${bikeName.trim() ? bikeName : ""} Summary`} />
                <FeaturesGrid arr={specs} obj={bikeSpecs ? bikeSpecs : {}} />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`About ${bikeName.trim() ? bikeName : ""}`} />
                {apiData?.data.about.map((para, i) => {
                    return (
                        <Typography
                            key={para.slice(0,20)+i}
                            variant='body1'
                            sx={{
                                width: '90%',
                                py: 2.5,
                                color: 'customBlack.light',
                                fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' },
                                ...(i===0 && {
                                    pt: 7.5
                                })
                            }}
                        >
                            {para}
                        </Typography>
                    )
                })}
            </CustomPaper>
            <CustomDivider title='rating and reviews' />
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`rating of ${bikeName.trim() ? bikeName : ""}`} />
                {
                    parseInt(apiData?.data.reviewCount) < 1 ? 
                        <Box
                            sx={{
                                width: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50%'
                                }}
                            >
                                <StarBorderRoundedIcon />
                                <Typography
                                    sx={{
                                        color: 'customBlack.light',
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        my: 5,
                                        ml: 1,
                                        fontSize: { mobile: '.5rem' , tablet: '0.65rem' , laptop: '.75rem' }
                                    }}
                                >
                                    no reviews yet
                                </Typography>
                            </Box>
                            <Button
                                variant='contained'
                                color='customRed'
                                size={ isMobile ? 'small' : 'medium'}
                                endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                                sx={{
                                    color: 'customWhite.main',
                                    width: '50%',
                                    fontWeight: '600',
                                    px: 5,
                                    textTransform: 'uppercase',
                                    fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                                }}
                                onClick={
                                    () => {
                                        navigate({pathname: 'review'})
                                    }
                                }
                            >
                                rate this bike
                            </Button>
                        </Box>
                        
                    :
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '90%',
                                height: '50px',
                                mt: 5,
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    '& path': {
                                        color: '#ffa236'
                                    }
                                }}
                            >
                                <StarRoundedIcon
                                    fontSize={ isTablet ? 'medium' : 'large' }
                                />
                                <Typography
                                    variant='h4'
                                    component='p'
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        pt: 1.5,
                                        ml: 1.5,
                                        textTransform: 'uppercase',
                                        fontSize: { mobile: '0.85rem' , tablet: '1rem' , laptop: '1.5rem' }
                                    }}
                                >
                                    {(apiData?.data.totalRating / apiData?.data.reviewCount)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    ml: 5,
                                    height: '100%',
                                    ...(isTablet && {
                                        justifyContent: 'center'
                                    })
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: { mobile: 'end' , laptop: 'inherit'},
                                        fontWeight: '400',
                                        color: 'customBlack.light',
                                        fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                    }}
                                >
                                    Based on
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'inherit',
                                        fontWeight: '600',
                                        color: 'customBlack.light',
                                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.9rem' }
                                    }}
                                >
                                    {`${apiData?.data.reviewCount} User Review${parseInt(apiData?.data.reviewCount) > 1 ? 's' : '' }`}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant='contained'
                            color='customRed'
                            size={ isMobile ? 'small' : 'medium'}
                            endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                            sx={{
                                color: 'customWhite.main',
                                width: { mobile: '57%' , tablet: '50%' },
                                fontWeight: '600',
                                px: 5,
                                mt: 2.5,
                                textTransform: 'uppercase',
                                fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                            }}
                            onClick={
                                () => {
                                    navigate({pathname: 'review'})
                                }
                            }
                        >
                            rate this bike
                        </Button>
                    </>
                }
            </CustomPaper>
            {
                parseInt(apiData?.data.reviewCount) < 1
                    ? 
                        <></>
                        
                        :
                        
                        <CustomPaper
                            content={true}
                        >
                            <PaperHeader text={`${bikeName.trim() ? bikeName : ""} User Reviews`} />
                            {apiData?.review.map((review, i) => {
                                return (
                                    <div
                                        key={review.userID}
                                        style={{
                                            width: "90%"
                                        }}
                                    >
                                        <Typography
                                            
                                            sx={{
                                                textAlign: 'left',
                                                width: '100%',
                                                fontWeight: '600',
                                                mt: 7.5,
                                                color: 'customBlack.main',
                                                textTransform: 'uppercase',
                                                textDecoration: 'underline',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '1.25rem' }
                                            }}
                                        >
                                            {review.title}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-end',
                                                height: '20px',
                                                mb: ".5rem",
                                                width: '100%'
                                            }}
                                        >
                                            <Rating
                                                name="read-only"
                                                value={review.rating}
                                                precision={0.5}
                                                size={'small'}
                                                readOnly
                                            />
                                            {
                                                review.userID === uid ?
                                                <div>
                                                
                                                    <IconButton
                                                        aria-label="edit review"
                                                        sx={{
                                                            p: 0,
                                                            mr: 2.5,
                                                            "& svg": {
                                                                fontSize: "18px",
                                                                color: "customBlack.light",
                                                            }
                                                        }}
                                                        onClick={
                                                            () => {
                                                                navigate(`review`, { state: { review } })
                                                            }
                                                        }
                                                    >
                                                        <BorderColorRoundedIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete review"
                                                        sx={{
                                                            p: 0,
                                                            "& svg": {
                                                                fontSize: "20px",
                                                                color: "customRed.main"
                                                            }
                                                        }}
                                                        onClick={
                                                            () => {
                                                                setLoading(true);
                                                                setData(null);
                                                                httpDeleteReview(review.bikeID)
                                                                        .then(
                                                                            data => setData(data)
                                                                        )
                                                                        .finally(
                                                                            () => {
                                                                                setLoading(false)
                                                                                setTimeout(() => {
                                                                                    window.location.reload()
                                                                                }, 1500)
                                                                            }
                                                                        )
                                                            }
                                                        }
                                                    >
                                                        <DeleteForeverRoundedIcon />
                                                    </IconButton>
                                                </div>

                                                :

                                                <></>
                                            }
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: { mobile: '15px' , laptop: '20px' },
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            {reviewData.slice(0,2).map((item,i) => {

                                                return (
                                                    <Box
                                                        key={item}
                                                        sx={{
                                                            display: 'flex',
                                                            ...(isMobile && {
                                                                alignItems: 'flex-start'
                                                            })
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                textAlign: 'left',
                                                                fontWeight: '400',
                                                                color: 'customBlack.light',
                                                                mr: 1,
                                                                fontSize: { mobile: '0.6rem' , tablet: '.75rem' , laptop: '.8rem' },
                                                                '& + span': {
                                                                    fontWeight: '600',
                                                                    color: 'customBlack.main',
                                                                    fontSize: { mobile: '0.6rem' , tablet: '.75rem' , laptop: '.8rem' }
                                                                }
                                                            }}
                                                        >
                                                            {`${item}:`}
                                                        </Typography>
                                                        <span>{review.data[item.toLowerCase()]}</span>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: { mobile: '15px' , laptop: '20px' },
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            {reviewData.slice(2).map((item,i) => {
                                                return (
                                                    <Box
                                                        key={item}
                                                        sx={{
                                                            display: 'flex',
                                                            ...(isMobile && {
                                                                alignItems: 'flex-start'
                                                            })
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                textAlign: 'left',
                                                                fontWeight: '400',
                                                                color: 'customBlack.light',
                                                                mr: 1,
                                                                fontSize: { mobile: '0.6rem' , tablet: '.75rem' , laptop: '.8rem' },
                                                                '& + span': {
                                                                    fontWeight: '600',
                                                                    color: 'customBlack.main',
                                                                    fontSize: { mobile: '0.6rem' , tablet: '.75rem' , laptop: '.8rem' }
                                                                }
                                                            }}
                                                        >
                                                            {`${item}:`}
                                                        </Typography>
                                                        <span>{review.data[item.toLowerCase()]}</span>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                fontWeight: '400',
                                                color: 'customBlack.main',
                                                width: '100%',
                                                my: 2.5,
                                                fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                            }}
                                        >
                                            {review.body}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                textTransform: "capitalize",
                                                color: 'customBlack.main',
                                                fontWeight: 600,
                                                width: '100%',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.8rem' }
                                            }}
                                        >
                                            {'By ' + review.name}
                                            <span
                                                style={{
                                                    marginRight: ".5rem",
                                                    color: "#2a2727c4",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {`${review.edited ? ' (edited)' : ''}`}
                                            </span>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                color: 'customBlack.light',
                                                width: '100%',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.7rem' }
                                            }}
                                        >
                                            {`${new Date(review.createdAt).toGMTString()}`}
                                        </Typography>
                                        <Divider
                                            variant='middle'
                                            sx={{
                                                pt: 2.5,
                                                mx: "auto",
                                                width: '80%',
                                                height: '1px',
                                                borderColor: 'customBlack.main'
                                            }}    
                                        />
                                    </div>
                                )
                            })}
                        </CustomPaper>
            }
            {
                apiData?.news.length > 0 ?

                <CustomPaper
                    content={true}
                >
                    <PaperHeader text={`${bikeName.trim() ? bikeName : ""} News`} />
                    {apiData?.news.map((newsItem , i) => {
                        return (
                            <NewsCard
                                key={newsItem.body.slice(0,20)+ i}
                                path={`/news/${newsItem.newsID}`}
                                news={newsItem}
                            />
                        )
                    })}
                </CustomPaper>

                :

                <></>
            }
            <CustomDivider title='specifications' />
            <CustomPaper
                content={true}
            >
                <PaperHeader text='power and performance' />
                <FeaturesGrid arr={power} obj={apiData?.data.powerPerformance} />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='brakes wheels and suspension' />
                <FeaturesGrid arr={brakeWheel} obj={apiData?.data.brakesWheelSuspension}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='dimensions and chassis' />
                <FeaturesGrid arr={dimensions} obj={apiData?.data.dimensionChassis}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='warranty' />
                <FeaturesGrid arr={warranty} obj={apiData?.data.warranty}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='features' />
                <FeaturesGrid arr={features} obj={apiData?.data.features}  />
            </CustomPaper>
            {
                (!cartLoading && !error && success && atc) ? 
                    <Toaster timer={2000} link='/' message={`Added to cart !`} />
                        :
                    <></>
            }
            {
                (!cartLoading && error && success && atc) ? 
                    <Toaster timer={1500} type="error" message={`Error: ${error} !`} />
                        :
                    <></>
            }
            {
                cartLoading ?

                <Loader />
                :
                <></>
            }
            </>
        )
            
        }
        </Box>
    )
}

export default BikeDetails;
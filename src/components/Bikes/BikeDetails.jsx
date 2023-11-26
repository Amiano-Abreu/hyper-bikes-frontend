import cbr1 from '../../assets/Bikes/Honda cbr 1000rr-r/cbr1.png'
import cbr2 from '../../assets/Bikes/Honda cbr 1000rr-r/BMW M 1000 RR(1).png'
import cbr3 from '../../assets/Bikes/Honda cbr 1000rr-r/Harley Davidson Fourty Eight 1-min.png'
import mva from '../../assets/Home-Page/news/mv-agusta-news.png'

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

const bikeData = [
    {
        bikeId: '1',
        bikeName: 'Honda Cbr 1000rr-r Fireblade',
        bikeImages: [
            {
                src: cbr1,
                alt: 'Honda Cbr 1000rr-r Fireblade',
            },
            {
                src: cbr2,
                alt: 'Honda Cbr 1000rr-r Fireblade',
            },
            {
                src: cbr3,
                alt: 'Honda Cbr 1000rr-r Fireblade',
            }
        ],
        bikeType: 'SuperBike',
        bikeBrand: 'Honda',
        price: '2000000',
        avgRating: 5.0,
        numberOfReviews: '1',
        keySpecs: {
            engineCapacity: '1000 cc',
            transmission: '6 Speed Manual',
            kerbWeight: '201 kg',
            fuelTankCapacity: '16.1 litres',
            seatHeight: '830 mm',
            maxPower: '215 bhp'
        },
        about: [
            'Honda CBR1000RR-R Fireblade is a super bike available at a starting price of Rs. 28,94,716 in India. It is available in 2 variants and 2 colours with top variant price starting from Rs. 29,56,484. The Honda CBR1000RR-R Fireblade is powered by 1000cc BS6 engine which develops a power of 215 bhp and a torque of 113 Nm. With both front and rear disc brakes, Honda CBR1000RR-R Fireblade comes up with anti-locking braking system. This CBR1000RR-R Fireblade bike weighs 201 kg and has a fuel tank capacity of 16.1 liters.',
            'The Honda CBR1000RR-R Fireblade is the company’s flagship sports motorcycle that competes in the litre-class segment. Honda offers two variants of the motorcycle - CBR1000RR-R Fireblade and the CBR1000RR-R Fireblade SP. Both motorcycles are brought into the country via the Completely Built-up (CBU) route.',
            'Honda unveiled the two models at the 2019 EICMA Show in Milan. The chassis technology of the new Fireblade is heavily inspired by the RC213V-S that was based on the company’s MotoGP motorcycle, the RC213V. The new CBR1000RR-R Fireblade features a longer wheelbase, rake and trail that is claimed to deliver improved stability.',
            'The feature list comprises of twin-LED headlamps, multiple air vents, aerodynamic winglets, full-colour five-inch TFT-screen and a sharp tail section. The CBR1000RR-R Fireblade will be offered in two colour options – Grand Prix Red and Matte Pearl Morion Black. The SP version will be available in Grand Prix Red colour only.'
        ],
        powerPerfomance: {
            fuelType: 'Petrol',
            maxPower: '215 bhp @ 14,500 rpm',
            maxTorque: '113 Nm @ 12,500 rpm',
            emissionStandard: 'BS-VI',
            displacement: '1,000 cc',
            cylinders: '4',
            bore: '81 mm',
            stroke: '48.5 mm',
            valves: '4',
            compressionRatio: '13:1',
            coolingSystem: 'Liquid Cooled',
            transmission: '6 Speed Manual',
            transmissionType: 'Chain Drive',
            gearShiftPattern: '1 Down 5 Up',
            clutch: 'Wet, Multiplate',
            ignition: 'Digital',
            fuelDelivery: 'Fuel Injection',
            fuelTankCapacity: '16.1 litres',
            reserveFuelCapacity: '2.4 litres',
            topSpeed: '297 Kmph'
        },
        brakesWheelSuspension: {
            brakingSystem: 'Dual Channel ABS',
            frontBrakeType: 'Disc',
            frontBrakeSize: '330 mm',
            rearBrakeType: 'Disc',
            rearBrakeSize: '220 mm',
            wheelType: 'Alloy',
            frontWheelSize: '17 inch',
            rearWheelSize: '17 inch',
            frontTyreSize: '120/70 - ZR17',
            rearTyreSize: '200/55 - ZR17',
            tyreType: 'Tubeless',
            radialTyres: 'Yes',
            frontTyrePresureR: '36 psi',
            rearTyrePressureR: '42 psi',
            frontTyrePressureRP: '36 psi',
            rearTyrePressureRP: '42 psi',
            calliperType: 'Front - 4 Piston, Rear - 2 Piston Caliper',
            frontSuspension: 'Showa Telescopic Inverted Fork with an inner tube diameter of 43mm',
            rearSuspension: 'Unit Pro-Link with gas-charged HMAS damper featuring 10-step preload'
        },
        dimensionsChassis: {
            kerbWeight: '201 kg',
            overallLength: '2,100 mm',
            overallWidth: '745 mm',
            overallHeight: '1,140 mm',
            wheelBase: '1,455 mm',
            groundClearance: '115 mm',
            seatHeight: '830 mm',
            ChassisType: 'Aluminium composite twin spar'
        },
        warranty: {
            year: '2 Year',
            kilometers: '32000 Kilometers'
        },
        features: {
            odometer: 'Digital',
            drl: 'Yes',
            appConnectivity: 'Yes',
            gpsNavigation: 'Yes',
            usbChargingPort: 'Optional',
            frontStorageBox: 'No',
            underSeatStorage: 'No',
            aho: 'Yes',
            speedometer: 'Digital',
            fuelGuage: 'Yes',
            tachometer: 'Digital',
            standAlarm: 'Yes',
            steppedSeat: 'Yes',
            numberOfTripmeters: '2',
            tripmeterType: 'Digital',
            lowFuelIndicator: 'Yes',
            lowOilIndicator: 'Yes',
            lowBatteryIndicator: 'Yes',
            pillionBackrest: 'No',
            pillionGrabrail: 'Yes',
            pillionSeat: 'Yes',
            pillionFootrest: 'Yes',
            digitalFuelGuage: 'Yes',
            startType: 'Electric Start',
            shiftLight: 'Yes',
            killSwitch: 'Yes',
            clock: 'Yes',
            battery: '12-6 YTZ7S',
            headlightType: 'LED Head Lamp',
            brakeLight: 'LED Tail Lamp',
            turnSignal: 'Yes',
            passLight: 'Yes',
            additionalFeatures: 'TFT-LCD'
        },
        reviews: [
            {
                reviewId: '1',
                userId: 'user1',
                userName: 'user name',
                reviewData: {
                    usedFor: 'Tour',
                    ownedFor: 'Never owned',
                    riddenFor: '200km',
                    gotMileageOf: '10'
                },
                rating: 5,
                reviewTitle: 'review Title',
                reviewBody: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum v lorem ipsum v vlorem ipsum lorem ipsum',
                lastUpdate: '2 mins ago',
                edited: false
            }
        ],
        news: [
            {
                newsId: '1',
                newsImage: {
                    src: mva,
                    alt: 'MV Agusta'
                },
                newsTitle: 'MV AGUSTA UNVEILS 2022 REPARTO CORSE RANGE, WITH F3, TURISMO VELOCE AND DRAGSTER',
                newsUploader: 'User Name',
                uploadDate: '',
                description: `Long-term fans of MV Agusta and/or WorldSBK will recognise the Reparto Corse name as essentially the ‘racing department’ of the famous Italian brand. These “RC” editions of the aforementioned MV road bikes are therefore ‘tuned up’ versions of the standard bikes.`    
            }
        ]
    }
]

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

const BASEURL = "http://localhost:5000/api/bike";

function millisecondsToRelativeTime(milliseconds) {
  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Calculate the difference between the current time and the provided time
  const currentTime = Date.now();
  const timeDifference = currentTime - milliseconds;

  // Determine the appropriate relative time
  if (timeDifference < minute) {
    return 'just now';
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

const BikeDetails = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.user);
    const { loading: cartLoading, success, error, atc } = useSelector(state => state.cart);

    const location = useLocation();
    const bike = location.state.bike;
    console.log("state bikeDetails ", location.state.bike) // CHECK BOTH CASES ON HOME & BIKES PAGE

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
    
    console.log("bikeUrl ", url,"bikeName ",bikeName, "bikeSpecs ",bikeSpecs)
    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(url);


    const isMobile = useMediaQuery('(max-width:640px)')
    const isTablet = useMediaQuery('(max-width:1024px)')

    // const [buyToaster, setBuyToaster] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();
    
    // const handleToasterState = (bool, close = false) => {
    //     setBuyToaster(bool);

    //     if(close) {
    //         setTimeout(() => {
    //             setBuyToaster(false)
    //             setIsButtonDisabled(false)
    //         }, 5100);
    //     }
    // }

    const handleButtonDisable = () => {
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        window.scrollTo(0,0)
        // getAllNews(true);
        dispatch(resetAtc());
    }, [])

    useEffect(() => {
        if ( !cartLoading && success ) {
            setIsButtonDisabled(false);
        }
    }, [cartLoading, success])

    // useEffect(() => {
    //     url.current = `${BASEURL}/${bike?.bikeID}`;
    //     bikeName.current = `${bike?.brand} ${bike?.model}`;
    //     bikeSpecs.current = {
    //         engineCapacity: `${bike?.displacement} cc`,
    //         kerbWeight: bike?.kerbWeight,
    //         maxPower: `${bike?.power.split("bhp")[0]} bhp`,
    //         transmission: '6 Speed Manual',
    //         fuelTankCapacity: '16.1 litres',
    //         seatHeight: '830 mm',
    //     }

    // }, [bike]);

    console.log("api review ", apiData?.review)

    return (
        isLoading ?

        <Loader loading={isLoading} />

        :

        // serverError ?

        // <p>
        //     serverError: {String(serverError)}
        // </p>

        // :

        // apiData &&
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
                {serverError?.message}
            </p>

            :

            apiData &&
        (    
            <>
            {
                loading ?

                <Loader loading={loading} />

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
                {bikeName.trim() ? bikeName : bikeData[0].bikeName}
            </Divider>
            <ReactCarousel images={bike?.images ? bike.images : bikeData[0].bikeImages} />
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
                        ₹ {bike?.price ? bike.price : bikeData[0].price}
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
                            // setTimeout(() => {
                            //     handleToasterState(true, true)
                            // }, [1500])
                        }
                    }
                >
                    add to cart
                </Button>
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`${bikeName.trim() ? bikeName : bikeData[0].bikeName} Summary`} />
                <FeaturesGrid arr={specs} obj={bikeSpecs ? bikeSpecs : bikeData[0].keySpecs} />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`About ${bikeName.trim() ? bikeName : bikeData[0].bikeName}`} />
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
                <PaperHeader text={`rating of ${bikeName.trim() ? bikeName : bikeData[0].bikeName}`} />
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
                            <PaperHeader text={`${bikeName.trim() ? bikeName : bikeData[0].bikeName} User Reviews`} />
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
                                                // <Button
                                                //     variant='contained'
                                                //     color='customRed'
                                                //     size={ isMobile ? 'small' : 'medium'}
                                                //     endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                                                //     sx={{
                                                //         color: 'customWhite.main',
                                                //         width: '50%',
                                                //         fontWeight: '600',
                                                //         px: 5,
                                                //         textTransform: 'uppercase',
                                                //         fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                                                //     }}
                                                //     onClick={
                                                //         () => {
                                                //             navigate({pathname: 'review'})
                                                //         }
                                                //     }
                                                // >
                                                //     edit review
                                                // </Button>

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
                apiData?.news.length > 0 ?

                <CustomPaper
                    content={true}
                >
                    <PaperHeader text={`${bikeName.trim() ? bikeName : bikeData[0].bikeName} News`} />
                    {apiData?.news.map((newsItem , i) => {
                        return (
                            <NewsCard
                                key={newsItem.body.slice(0,20)+ i}
                                path={`/news/${bike.bikeID}`}
                                newsTitle={newsItem.title}
                                newsImg={newsItem.src}
                                newsImgAlt={newsItem.alt}
                                newsDesc={newsItem.body}
                                newsUploader={"Admin"}
                                newsDate={newsItem.createdAt}
                            />
                        )
                    })}
                </CustomPaper>

                :

                <></>
            }
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

                <Loader loading={cartLoading} />
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
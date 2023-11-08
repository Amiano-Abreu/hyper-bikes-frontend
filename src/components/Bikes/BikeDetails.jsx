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

import { useMediaQuery } from '@mui/material';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import CustomPaper from './CustomPaper'
import PaperHeader from './PaperHeader'
import FeaturesGrid from './FeaturesGrid'
import CustomDivider from './CustomDivider'
import NewsCard from './NewsCard'
import Toaster from '../Utility/Toaster'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBikesByPrice, getBikesByDisplacement, getAllBikes, getBikeDetails, getBikesByBrand, getSingleBikeSummary, getBikesByCategory } from '../../services/bikes'
import { getAllNews, getNewsByID } from '../../services/news'
import useGetRequest from '../../services/useGetRequest'
import Loader from '../Utility/Loader'

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
    'Used' , 'Owned' , 'Ridden' , 'Milleage'
]

const specs = [ 
    'Engine Capacity' , 'Transmission' , 'Kerb Weight' , 'Fuel Tank Capacity' , 'Seat Height' , 'Max Power'
]

const power = [
    'Fuel Type' , 'Max Power' , 'Max Torque' , 'Emission Standard' , 'Displacement' , 'Cylinders' , 'Bore' ,
    'Stroke' , 'Valves Per Cylinder' , 'Compression Ratio' , 'Cooling System' , 'Transmission' , 'Transmission Type' , 
    'Gear Shifting Pattern' , 'Clutch' , 'Ignition' , 'Fuel Delivery System' , 'Fuel Tank Capacity' ,
    'Reserve Fuel Capacity' , 'Top Speed'
]

const brakeWheel = [ 
    'Braking System' , 'Front Brake Type' , 'Front Brake Size' , 'Rear Brake Type' , 'Rear Brake Size' ,
    'Wheel Type' , 'Front Wheel Size' , 'Rear Wheel Size' , 'Front Tyre Size' , 'Rear Tyre Size' ,
    'Tyre Type' , 'Radial Tyres' , 'Front Tyre Pressure (Rider)' , 'Rear Tyre Pressure (Rider)' ,
    'Front Tyre Pressure (Rider & Pillion)' , 'Rear Tyre Pressure (Rider & Pillion)' , 'Calliper Type' ,
    'Front Suspension' , 'Rear Suspension'
]

const dimensions = [
    'Kerb Weight' , 'Overall Length' , 'Overall Width' , 'Overall Height' , 'Wheelbase' , 'Ground Clearance' ,
    'Seat Height' , 'Chassis Type'
]

const warranty = [
    'Standard Warranty (Year)' , 'Standard Warranty (Kilometers)'
]

const features = [
    'Odometer' , 'DRLs (Daytime running lights)' , 'Mobile App Connectivity' , 'GPS & Navigation' , 'USB charging port' ,
    'Front storage box' , 'Under seat storage' , 'AHO (Automatic Headlight On)' , 'Speedometer' , 'Fuel Guage' , 
    'Tachometer' , 'Stand Alarm' , 'Stepped Seat' , 'No. of Tripmeters' , 'Tripmeter Type' , 'Low Fuel Indicator' , 
    'Low Oil Indicator' , 'Low Battery Indicator' , 'Pillion Backrest' , 'Pillion Grabrail' , 'Pillion Seat' , 
    'Pillion Footrest' , 'Digital Fuel Guage' , 'Start Type' , 'Shift Light' , 'Killswitch' , 'Clock' , 'Battery' ,
    'Headlight Type' , 'Brake/Tail Light' , 'Turn Signal' , 'Pass Light' , 'Additional features'
]

const BASEURL = "http://localhost:5000/api/bike";

const BikeDetails = () => {
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

    const [buyToaster, setBuyToaster] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();
    
    const handleToasterState = (bool, close = false) => {
        setBuyToaster(bool);

        if(close) {
            setTimeout(() => {
                setBuyToaster(false)
                navigate('/bikes')
            }, 5100);
        }
    }

    const handleButtonDisable = () => {
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        window.scrollTo(0,0)
        // getAllNews(true);
    }, [])

    // useEffect(() => {}, [location.state])

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
                            setTimeout(() => {
                                handleToasterState(true, true)
                            }, [1500])
                        }
                    }
                >
                    Buy Now
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
                {bikeData[0].about.map((para, i) => {
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
            <CustomDivider title='specifications' />
            <CustomPaper
                content={true}
            >
                <PaperHeader text='power and performance' />
                <FeaturesGrid arr={power} obj={bikeData[0].powerPerfomance} />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='brakes wheels and suspension' />
                <FeaturesGrid arr={brakeWheel} obj={bikeData[0].brakesWheelSuspension}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='dimensions and chassis' />
                <FeaturesGrid arr={dimensions} obj={bikeData[0].dimensionsChassis}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='warranty' />
                <FeaturesGrid arr={warranty} obj={bikeData[0].warranty}  />
            </CustomPaper>
            <CustomPaper
                content={true}
            >
                <PaperHeader text='features' />
                <FeaturesGrid arr={features} obj={bikeData[0].features}  />
            </CustomPaper>
            <CustomDivider title='rating and reviews' />
            <CustomPaper
                content={true}
            >
                <PaperHeader text={`rating of ${bikeName.trim() ? bikeName : bikeData[0].bikeName}`} />
                {
                    parseInt(bikeData[0].numberOfReviews) < 1 ? 
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
                                    {bikeData[0].avgRating}
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
                                    {`${bikeData[0].numberOfReviews} User Review${parseInt(bikeData[0].numberOfReviews) > 1 ? 's' : '' }`}
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
                parseInt(bikeData[0].numberOfReviews) < 1
                    ? 
                        <></>
                        
                        :
                        
                        <CustomPaper
                            content={true}
                        >
                            <PaperHeader text={`${bikeName.trim() ? bikeName : bikeData[0].bikeName} User Reviews`} />
                            {bikeData[0].reviews.map((review, i) => {
                                return (
                                    <div
                                        key={review.userId}
                                    >
                                        <Typography
                                            
                                            sx={{
                                                textAlign: 'left',
                                                width: '90%',
                                                fontWeight: '600',
                                                mt: 7.5,
                                                color: 'customBlack.main',
                                                textTransform: 'uppercase',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '1.25rem' }
                                            }}
                                        >
                                            {review.reviewTitle}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                height: '20px',
                                                width: '90%'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    textAlign: 'inherit',
                                                    color: 'customBlack.light',
                                                    fontWeight: '600',
                                                    mr: 2.5,
                                                    fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '1rem' }
                                                }}
                                            >
                                                {bikeData[0].avgRating}
                                            </Typography>
                                            <Rating
                                                name="read-only"
                                                value={bikeData[0].avgRating}
                                                precision={0.5}
                                                size={'small'}
                                                readOnly
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '90%',
                                                height: { mobile: '15px' , laptop: '20px' },
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            {reviewData.map((item,i) => {
                                                const rKeys = Object.keys(review.reviewData);
                                                
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
                                                                fontSize: { mobile: '0.5rem' , tablet: '.75rem' , laptop: '.8rem' },
                                                                '& + span': {
                                                                    fontWeight: '600',
                                                                    color: 'customBlack.main',
                                                                    fontSize: { mobile: '0.5rem' , tablet: '.75rem' , laptop: '.8rem' }
                                                                }
                                                            }}
                                                        >
                                                            {`${item}:`}
                                                        </Typography>
                                                        <span>{review.reviewData[rKeys[i]]}</span>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                fontWeight: '400',
                                                color: 'customBlack.light',
                                                width: '90%',
                                                my: 2.5,
                                                fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                            }}
                                        >
                                            {review.reviewBody}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                color: 'customBlack.main',
                                                fontWeight: 600,
                                                width: '90%',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.8rem' }
                                            }}
                                        >
                                            {'By ' + review.userName}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textAlign: 'left',
                                                color: 'customBlack.light',
                                                width: '90%',
                                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.7rem' }
                                            }}
                                        >
                                            {`${review.lastUpdate} ${review.edited ? 'edited' : ''}`}
                                        </Typography>
                                        <Divider
                                            variant='middle'
                                            sx={{
                                                pt: 2.5,
                                                width: '60%',
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
                bikeData[0].news.length > 0 ?

                <CustomPaper
                    content={true}
                >
                    <PaperHeader text={`${bikeName.trim() ? bikeName : bikeData[0].bikeName} News`} />
                    {bikeData[0].news.map((newsItem , i) => {
                        return (
                            <NewsCard
                                key={newsItem.description.slice(0,20)+ i}
                                path={'/news/123'}
                                newsTitle={newsItem.newsTitle}
                                newsImg={newsItem.newsImage.src}
                                newsImgAlt={newsItem.newsImage.alt}
                                newsDesc={newsItem.description}
                                newsUploader={newsItem.newsUploader}
                                newsDate={newsItem.newsDate}
                            />
                        )
                    })}
                </CustomPaper>

                :

                <></>
            }
            {
                buyToaster ? 
                    <Toaster link='/' type="success" message={`Successfully placed order for ${bikeName.trm() ? bikeName : bikeData[0].bikeName}`} />
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
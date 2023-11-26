import pic from '../../assets/Home-Page/news/mv-agusta-news.png'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useMediaQuery } from '@mui/material';

import PaperHeader from '../Bikes/PaperHeader';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useGetRequest from '../../services/useGetRequest';
import Loader from '../Utility/Loader';

const newsData = {
    newsUploader: 'Admin',
    newsDate: 'Wed, October 12, 2022',
    newsImg: pic,
    newsImgAlt: 'mv-agusta',
    newsTitle: 'MV AGUSTA UNVEILS 2022 REPARTO CORSE RANGE, WITH F3, TURISMO VELOCE AND DRAGSTER',
    newsSubtitle: `Long-term fans of MV Agusta and/or WorldSBK will recogni se the Reparto Corse name as essentially the ‘racing department’ of the famous Italian brand. These “RC” editions of the aforementioned MV road bikes are therefore ‘tuned up’ versions of the standard bikes.`,
    para: [
        {
            img: pic,
            alt: 'mv agusta',
            desc: [
                `We will start in the place that seems to make the most sense: the F3. This is the motorcycle that Bahattin Sofuoglu and Niki Tuuli race in the Supersport World Championship, and is essentially the flagship sports bike of MV Agusta without the presence of the F4 anymore.`,
                `For the 2022 RC edition, the “front forks have an advanced titanium nitride (TiN) coating to reduce friction, wheels that are 10% lighter, resulting in a moment of inertia reduction of 7%,” MV says.`,
                `From the engine, MV have squeezed 147 horsepower and 88Nm, and to help you control it they have equipped a traction control system with eight different settings, and a four-level torque control.`,
                `Once all of the power is unleashed, and if you nail the upshifts with the electronic quickshifter, the F3 RC will reach a top speed of 149.1mph.`,
            ]
        },
        {
            img: pic,
            alt: 'mv agusta',
            desc: [
                `Now, we will move onto the Dragster RC, which features the same titanium nitride coating on 43mm Marzocchi USD telescopic forks. At the rear, again we find a Sachs single shock absorber with adjustable preload, compression and rebound, as well as an aluminium swingarm.`,
                `The brakes are also the same as on the F3 RC, with dual 320mm front discs and four-piston radial callipers from Brembo; and a single 220mm disc with a two-piston radial calliper at the rear. Additionally, the ABS system is the same as the F3. `,
                `An addition, though, to the Dragster RC compared to the F3 RC is a parking brake. On the engine side, the Dragster RC is seven horsepower down on the F3 RC, with 140hp. It also produces one less Newton-metre with 87 compared to the F3’s 88.`,
                `However, the Dragster RC is five kilograms lighter than the F3 RC, so the top speed is actually 2.5mph faster at 151.6mph. This, of course, fits the name “Dragster” quite well.`,
            ]
        }
    ]
}

const NewsDetails = () => {
    const isMedium = useMediaQuery('(max-width:990px)');
    const location = useLocation();

    const news = location.state;
    console.log("new Deatils news ", news)

    let url;

    if (news?.newsID) {
        url = `http://localhost:5000/api/news/${news?.newsID}`;
    }

    const {
        isLoading,
        apiData,
        serverError
    } = useGetRequest(url);

    console.log(serverError)
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    return (
        <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '90%', tablet: '620px' , laptop: '1000px'},
                    mx: 'auto',
                    alignItems: 'center',
                    p: 5,
                    mt: 30,
                    ...(isMedium && {
                        mt: 25
                    }),
                    mb: 10,
                    bgcolor: 'customWhite.main',
                    flexDirection: 'column'
                }}
            >
                {
                    isLoading ?
                        isLoading && <Loader loading={isLoading} />
                        :
                        <></>
                }
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
        
                    (
                        apiData &&
                        <>
                    <PaperHeader text={news?.title} />
                    <Typography
                    sx={{
                        textAlign: 'left',
                        color: 'customBlack.main',
                        fontWeight: 600,
                        mt: 2.5,
                        width: '90%',
                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.8rem' }
                    }}
                >
                    Admin
                    </Typography>
                    <Typography
                    sx={{
                        textAlign: 'left',
                        color: 'customBlack.main',
                        width: '90%',
                        fontSize: { mobile: '0.6rem' , tablet: '.7rem' , laptop: '.7rem' }
                    }}
                >
                    {`${news?.createdAt}`}
                    </Typography>
                    <Box
                    sx={{
                        width: '90%',
                        height: { mobile: '' , tablet: '' , laptop: '550px'},
                        mt: 5,
                        '& img': {
                            width: '100%',
                            height: '100%'
                        }
                    }}
                >
                    <img src={news?.src} alt={news?.alt} />
                    </Box>
                    <Typography
                    sx={{
                        textAlign: 'left',
                        fontWeight: '600',
                        mt: 5,
                        color: 'customBlack.light',
                        width: '90%',
                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.9rem' }
                    }}
                >
                    {news?.body}
                    </Typography>
                    {

                        apiData?.data.body.map((item , i) => {
                        return (
                            <div
                                key={item.alt+i}
                            >
                                <Box
                                    sx={{
                                        width: '90%',
                                        height: { mobile: '' , tablet: '' , laptop: '550px' },
                                        mt: 5,
                                        mx: 'auto',
                                        '& img': {
                                            width: '100%',
                                            height: '100%'
                                        }
                                    }}
                                >
                                    <img src={item.src} alt={item.alt} />
                                </Box>
                                {
                                    item.desc.map((para , index) => {
                                        return (
                                            <Typography
                                                key={para.slice(0,20)+index}
                                                sx={{
                                                    textAlign: 'left',
                                                    fontWeight: '400',
                                                    mt: 2.5,
                                                    color: 'customBlack.main',
                                                    width: '90%',
                                                    mx: 'auto',
                                                    ...(index === 0 && {
                                                        mt: 5,
                                                    }),
                                                    fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                                }}
                                            >
                                                {para}
                                            </Typography>
                                        )
                                    })
                                }
                            </div>
                        )
                        })
                    }
                    </>
                    )
                }
        </Paper>
    )
}

export default NewsDetails;
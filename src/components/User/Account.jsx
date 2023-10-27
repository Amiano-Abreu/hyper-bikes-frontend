import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box"
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';

import { useMediaQuery } from '@mui/material';

const reviewData = [
    'Used' , 'Owned' , 'Ridden' , 'Milleage'
]

const Account = () => {
    const isMobile = useMediaQuery('(max-width:640px)')

    return (
        <>
            <Box
                sx={{
                    height: 'auto',
                    p: 15,
                    bgcolor: 'customWhite.main',
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        textAlign: 'center',
                        color: 'customBlack.main',
                        textTransform: 'uppercase',
                        fontSize: { mobile: '1.5rem', laptop: '2.125rem' },
                        '& span': {
                            borderBottom: '2px solid #bc1024',
                            pb: .5
                        }
                    }}
                >
                    your <span>orders</span>
                </Typography>
                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        textAlign: 'center',
                        color: 'customBlack.main',
                        textTransform: 'uppercase',
                        fontSize: { mobile: '1.5rem', laptop: '2.125rem' },
                        '& span': {
                            borderBottom: '2px solid #bc1024',
                            pb: .5
                        }
                    }}
                >
                    your <span>reviews</span>
                </Typography>
                {
                    [
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
                    ].map((review, i) => {
                        return (
                            <div
                                key={review.userId}
                            >
                                <Typography
                                
                                sx={{
                                    textAlign: 'left',
                                    width: '100%',
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
                                    width: '100%'
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
                                    {3}
                                </Typography>
                                <Rating
                                    name="read-only"
                                    value={3}
                                    precision={0.5}
                                    size={'small'}
                                    readOnly
                                />
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
                                    width: '100%',
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
                                    width: '100%',
                                    fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.8rem' }
                                }}
                            >
                                {'By ' + review.userName}
                                </Typography>
                                <Typography
                                sx={{
                                    textAlign: 'left',
                                    color: 'customBlack.light',
                                    width: '100%',
                                    fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.7rem' }
                                }}
                            >
                                {`${review.lastUpdate} ${review.edited ? 'edited' : ''}`}
                                </Typography>
                                <Divider
                                    variant='middle'
                                sx={{
                                    pt: 2.5,
                                    width: 'auto',
                                    height: '1px',
                                    borderColor: 'customBlack.main'
                                    }}    
                                />
                            </div>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default Account; 
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import { useMediaQuery } from '@mui/material';

const FeaturesGrid = ({ arr, obj  }) => {
    const isTablet = useMediaQuery('(max-width:1024px)')

    return (
        <>
            <Grid
                    container
                    spacing={ { laptop: 2 } }
                    sx={{
                        width: { mobile: '60%', laptop: '90%'},
                        pt: 5
                    }}
                >
                    {arr.map((item,i) => {
                        return (
                            <Grid
                                key={item.value}
                                item
                                mobile={12}
                                laptop={6}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    ...(isTablet && {
                                        justifyContent: 'center'
                                    })
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: { mobile: 'end' , laptop: 'inherit'},
                                        fontWeight: '400',
                                        pt: 1.5,
                                        mr: 2,
                                        color: 'customBlack.light',
                                        width: '50%',
                                        fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                                    }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: 'inherit',
                                        fontWeight: '600',
                                        pt: 1.5,
                                        color: 'customBlack.light',
                                        width: '50%',
                                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.9rem' }
                                    }}
                                >
                                    {obj[item.value]}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
        </>
    )
}

export default FeaturesGrid;
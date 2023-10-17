import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box";

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function ActionAreaCard({ newsImg , newsImgAlt , newsTitle , newsDesc , newsUploader , newsDate }) {
  const d = new Date()
  return (
    <Card 
        sx={{ 
            mt: 5,
            mb: 2.5,
            width: '85%',
            height: { mobile: '300px' , laptop: '400px' }
        }}
    >
        <CardActionArea
            sx={{
                height: '100%',
                position: 'relative'
            }}
        >
            <CardMedia
                component="img"
                image={newsImg}
                alt={newsImgAlt}
                sx={{
                    height: '100%'
                }}
            />
            <CardContent
                sx={{
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bgcolor: 'rgba(0,0,0,0.5)'
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        mt: { mobile: 7.5 , laptop: 20 },
                        textAlign: 'left',
                        fontWeight: '600',
                        color: 'customWhite.main',
                        textTransform: 'uppercase',
                        fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '1rem' }
                    }}
                >
                  {newsTitle}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        textAlign: 'left',
                        fontWeight: '400',
                        color: 'customWhite.light',
                        my: { mobile: 2 , laptop: 2.5 },
                        fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                    }}
                >
                  {newsDesc}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent:'space-between',
                        mt: { mobile: 15 , laptop: 25 }
                    }}
                >   
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <AccountCircleRoundedIcon
                            sx={{
                                color: '#fbfbf2',
                                mr: 1,
                                fontSize: { mobile: '1rem' , tablet: '1.5rem' }
                            }}
                        />
                        <Typography
                            sx={{
                                textAlign: 'left',
                                color: 'customWhite.main',
                                fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.7rem' }
                            }}
                        >
                            {newsUploader}
                        </Typography>
                    </Box>
                    
                    <Typography
                        sx={{
                            textAlign: 'left',
                            color: 'customWhite.main',
                            fontSize: { mobile: '0.7rem' , tablet: '.8rem' , laptop: '.7rem' }
                        }}
                    >
                        {d.toLocaleDateString(undefined,{ weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import { Link } from 'react-router-dom'

import Honda from '../../assets/Home-Page/hero/Honda-Cbr-Fireblade-1000rr.png';

export default function BikeCard({ path }) {
    const isMobile = useMediaQuery('(max-width:1023px)')
    const isLaptop = useMediaQuery('(min-width:1024px)')
    const is640 = useMediaQuery('(max-width:640px)')

    console.log('Path ',path)
  return (
    <Card 
      sx={{ 
          ...(isLaptop && {maxWidth: 325}),
          ...(isMobile && {
            width: '100%'
          }),
          bgcolor: 'customWhite.main',
          '&.MuiPaper-root': {
              height: 'auto',
              ...(isLaptop && {
                pb: 5
              })
          },
          textDecoration: 'none',
          display: 'inline-block'
      }}
      elevation={6}
      component={Link}
      to={path}
    >
      <Typography
        variant='h6'
        component='p'
        sx={{
            mt: 1,
            textAlign: 'center',
            fontWeight: '900',
            fontSize: '.75rem',
            textTransform: 'uppercase',
            ...(isMobile && {
              py: 1,
              fontSize: '.7rem'
            })
        }}
      >
        Honda
      </Typography>
      <CardActionArea
        disableRipple
        sx={{
          height: 'calc(100% - 32.922px)',
          ...(isMobile && {
            width: '100%'
          }),
          '&:hover': {
            '& span.MuiCardActionArea-focusHighlight': {
              opacity: '0'
            }
          }
        }}
      >
        <CardMedia
          component="img"
          height="230"
          image={Honda}
          alt="green iguana"
          sx={{
              objectFit: 'scale-down',
              ...(is640 && {
                height: 'auto',
                botton: '6.2%'
              })
          }}
        />
        <CardContent
            sx={{
                mx: 'auto',
                ...(is640 && {
                  px: 3.2,
                  pt: 4,
                  mx: 0
                }),
                position: 'relative'
            }}
        >
          <Typography
            variant='h6'
            component='p'
            gutterBottom
            sx={{
                fontSize: isMobile ? '0.85rem' : '1rem',
                textAlign: 'center',
                fontWeight: '600'
            }}
          >
            Honda Cbr Fireblade 1000rr
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            sx={{
                ...(!isMobile && {
                  position: 'absolute',
                  left: '30%'
                }),
                ...(isMobile && {
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                })
            }}
          >
            {['1000cc','100bhp','195kg'].map((spec, i) => {
                return (
                <Typography
                    key={spec + i}
                    variant='body1'
                    component='p'
                    sx={{
                        fontSize: isMobile ? '.55rem' : '.75rem'
                    }}
                >
                    {spec}
                </Typography>
                )
            })}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
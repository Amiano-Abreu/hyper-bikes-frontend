import { Paper, useMediaQuery, Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import PaperHeader from '../Bikes/PaperHeader'

import { Link } from "react-router-dom";

import { useEffect } from "react";

const arr = [
    {
        brand: "Ducati",
        model: "panigale v2 bayliss",
        quantity: 1,
        price: 7000000
    }
];
const Cart = () => {
    const isMedium = useMediaQuery('(max-width:990px)');
    const isMobile = useMediaQuery('(max-width:640px)')

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '320px', tablet: '620px' , laptop: '1000px'},
                    mx: 'auto',
                    alignItems: 'center',
                    p: 5,
                    mt: 30,
                    ...(isMedium && {
                        mt: 25
                    }),
                    mb: 10,
                    bgcolor: 'customWhite.main',
                    flexDirection: 'column',
                    backgroundColor: 'customBlack.light'
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        textAlign: 'center',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        color: 'customWhite.main',
                        fontSize: { mobile: '1rem' , tablet: '1.5rem' , laptop: '2.125rem' }
                    }}
                >
                    Cart
                </Typography>

                <Box
                    sx={{
                        ...(
                            arr.length > 0 && {
                                width: "100%"
                            }
                        ),
                        ...(
                        arr.length === 0 && {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }),
                        mt: "1rem",
                    }}
                >
                    <Typography
                        variant='body1'
                        sx={{
                            ...(
                                arr.length > 0 && {
                                    textAlign: 'left',
                                    fontWeight: "600"
                                }
                            ),
                            mb: ".5rem",
                            color: 'customWhite.main',
                            fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                        }}
                    >                    
                        { arr.length === 0 ? 'Start adding bikes to your cart !' : `You have ${arr.length} cart item${arr.length > 1 ? "s" : "" }.` }
                    </Typography>
                    {
                        arr.length > 0 ?
                            
                                arr.map(
                                    (cartItem, i) => {
                                        return (
                                            <Paper
                                                elevation={1}
                                                key={
                                                    cartItem.brand + i
                                                }
                                                sx={{
                                                    height: "100px",
                                                    px: "1rem",
                                                    pt: ".5rem",
                                                    pb: "1rem"
                                                }}
                                            >
                                                <PaperHeader    text={`${cartItem.brand} : ${cartItem.model}`} 
                                                    cart={true}
                                                />
                                                
                                                <Typography>
                                                    {cartItem.quantity} * {cartItem.price}
                                                </Typography>
                                            </Paper>
                                        )
                                    }
                                ) 
                                
                                    : 
                                
                                <Button
                                    variant='contained'
                                    color='customRed'
                                    size={ isMobile ? 'small' : 'medium'}
                                    endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                                    sx={{
                                        color: 'customWhite.main',
                                        fontWeight: '600',
                                        px: 5,
                                        textTransform: 'uppercase',
                                        fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                                    }}
                                    component={
                                        Link
                                    }
                                    to="/bikes"
                                >
                                    Buy Now
                                </Button>

                    }
                </Box>
            </Paper>
        </>
    )
}

export default Cart;
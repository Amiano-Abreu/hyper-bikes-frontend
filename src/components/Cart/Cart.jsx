import { Paper, useMediaQuery, Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import PaperHeader from '../Bikes/PaperHeader'

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import Toaster from "../Utility/Toaster";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Utility/Loader";
import { httpAddToCart, httpRemoveAllCart, httpRemoveFromCart, httpAddOrder, resetAtc } from "../../features/cartSlice";

const getTotal = (cart) => {
    let total = 0;

    cart.forEach(item => {
        const itemTotal = Number(item.quantity) * Number(item.price);

        total += itemTotal;
    })

    return total;
}

const Cart = () => {
    const { loading, error, success, cart, atc } = useSelector(state => state.cart);
    const total = getTotal(cart);

    const dispatch = useDispatch();

    const isMedium = useMediaQuery('(max-width:990px)');
    const isMobile = useMediaQuery('(max-width:639px)')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleButtonDisable = () => {
      setIsButtonDisabled(true);
    };

    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(resetAtc())
    }, [dispatch])

    return (
        <>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: { mobile: '90%', tablet: '550px' , laptop: '1000px'},
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
                {
                    loading ? 
                    <Loader loading={loading} />
                    :
                    <></>
                }
                {
                    (!loading && !error && atc && success) ?
                    <Toaster timer={1500} message={`Successful`} />
                    :
                    <></>
                }
                {
                    (!loading && error && atc && success) ?
                    <Toaster timer={1500} type={"error"} message={`Error: ${error}`} />
                    :
                    <></>
                }
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
                            cart.length > 0 && {
                                width: "100%"
                            }
                        ),
                        ...(
                        cart.length === 0 && {
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
                                cart.length > 0 && {
                                    textAlign: 'left',
                                    fontWeight: "600",
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }
                            ),
                            mb: ".5rem",
                            color: 'customWhite.main',
                            fontSize: { mobile: '0.65rem' , tablet: '.75rem' , laptop: '.8rem' }
                        }}
                    >                    
                        { cart.length === 0 ? 'Start adding bikes to your cart !' : `You have ${cart.length} cart item${cart.length > 1 ? "s" : "" }.` }
                        {
                            cart.length > 0 &&
                            <Button 
                            variant='contained'
                            color='customWhite'
                            sx={{
                                color: 'customRed.main',
                                width: '170px',
                                px: 4,
                                fontWeight: '600',
                                py: 1,
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                textTransform: 'uppercase',
                                ...(isMobile && {
                                    fontSize: '0.75rem'
                                })
                            }}
                            startIcon={<DeleteIcon />}
                            onClick={
                                () => {
                                    dispatch(httpRemoveAllCart())
                                }
                            }
                        >
                            delete all
                        </Button>}
                    </Typography>
                    {
                        cart.length > 0 ?
                            
                                cart.map(
                                    (cartItem, i) => {
                                        return (
                                            <Paper
                                                elevation={1}
                                                key={
                                                    cartItem.brand + i
                                                }
                                                sx={{
                                                    height: "300px",
                                                    px: "1rem",
                                                    pt: ".5rem",
                                                    pb: "1rem",
                                                    ...(
                                                        cart.length > 1 &&
                                                        i !== cart.length -1 && {
                                                            mb: 5
                                                        }
                                                    )
                                                }}
                                            >
                                                <PaperHeader    text={`${cartItem.brand} : ${cartItem.model}`} 
                                                    cart={true}
                                                />
                                                
                                                <Box
                                                    sx={{
                                                        height: "250px",
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: {
                                                            mobile: 'column',
                                                            laptop: 'row'
                                                        },
                                                        alignItems: "center",
                                                        justifyContent: "space-around",
                                                        "& img": {
                                                            height: { mobile: '65%', tablet: '100%'},
                                                            width: { mobile: '100%', tablet: "400px"},
                                                            objectFit: { mobile: 'contain'},
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={cartItem.src}
                                                        alt={cartItem.alt}
                                                    />
                                                    <Box
                                                        sx={{
                                                            width: { mobile: '90%', tablet:'400px'},
                                                            display: 'flex',
                                                            flexDirection: { mobile: 'column', tablet: 'row'},
                                                            alignItem: 'center',
                                                            justifyContent: 'space-between',
                                                            pb: { mobile: 5, laptop: 'none'}
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: { mobile: '0.85rem' , tablet: '1rem'}
                                                            }}
                                                        >
                                                            QUANTITY: 
                                                                <span
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        marginRight: '5px',
                                                                        padding: '5px',
                                                                        paddingTop: '2.5px',
                                                                        paddingBottom: '2.5px',
                                                                        marginLeft: '5px',
                                                                        borderWidth: '2px',
                                                                        borderStyle: 'solid',
                                                                        borderColor: '#2a2727c4'
                                                                    }}
                                                                    onClick={() => {
                                                                        dispatch(httpAddToCart(cartItem))
                                                                    }}
                                                                >
                                                                    +
                                                                </span>
                                                                {cartItem.quantity}
                                                                <span
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        marginRight: '5px',
                                                                        padding: '5px',
                                                                        paddingTop: '2.5px',
                                                                        paddingBottom: '2.5px',
                                                                        marginLeft: '5px',
                                                                        borderWidth: '2px',
                                                                        borderStyle: 'solid',
                                                                        borderColor: '#2a2727c4'
                                                                    }}
                                                                    onClick={() => {
                                                                        dispatch(httpRemoveFromCart({ 
                                                                            bikeID: cartItem.bikeID
                                                                        }))
                                                                    }}
                                                                >
                                                                    -
                                                                </span>
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: { mobile: '0.85rem' , tablet: '1rem'}
                                                            }}
                                                        >
                                                            PRICE: ₹{cartItem.price}
                                                        </Typography>
                                                        <DeleteIcon 
                                                            sx={{
                                                                fontSize: { mobile: '1.25rem' , tablet: '1.5rem'},
                                                                color: 'customRed.main',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                dispatch(httpRemoveFromCart({ 
                                                                    bikeID: cartItem.bikeID, 
                                                                    removeItem: 'true'
                                                                }))
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        )
                                    }
                                ) 
                                
                                    : 
                                
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {mobile: 'column', tablet: 'row'}
                                    }}
                                >
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
                                    <Button
                                        variant='contained'
                                        color='customWhite'
                                        size={ isMobile ? 'small' : 'medium'}
                                        endIcon={isMobile ? <></> : <ArrowRightAltRoundedIcon />}
                                        sx={{
                                            ...(
                                                isMobile && {
                                                    mt: 2.5
                                                }
                                            ),
                                            ...(
                                                !isMobile && {
                                                    ml: 5
                                                }
                                            ),
                                            color: 'customRed.main',
                                            fontWeight: '600',
                                            px: 5,
                                            textTransform: 'uppercase',
                                            fontSize: { mobile: '0.5rem' , tablet: '0.65rem' , laptop: '0.75rem' }
                                        }}
                                        component={
                                            Link
                                        }
                                        to="/orders"
                                    >
                                        go to orders
                                    </Button>
                                </Box>

                    }
                    {
                        cart.length > 0 ? 
                            (
                                <div
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: 'customWhite.main',
                                            width: '280px',
                                            textTransform: 'uppercase',
                                            fontWeight: '700',
                                            fontSize: { mobile: '0.85rem' , tablet: '1rem'},
                                            textAlign: 'center',
                                            mt: 5,
                                            mx: 'auto'
                                        }}
                                    >
                                        Total: ₹{total}
                                    </Typography>
                                    <Button 
                                        variant='contained'
                                        color='customRed'
                                        disabled={isButtonDisabled}
                                        sx={{
                                            color: 'customWhite.main',
                                            display: 'block',
                                            width: '280px',
                                            px: 4,
                                            fontWeight: '600',
                                            py: 1,
                                            mx: 'auto',
                                            textTransform: 'uppercase',
                                            mt: 5,
                                            ...(isMobile && {
                                                fontSize: '0.75rem'
                                            })
                                        }}
                                        onClick={
                                            () => {
                                                handleButtonDisable();
                                                dispatch(httpAddOrder({ products: cart, total }))
                                            }
                                        }
                                    >
                                        buy now
                                    </Button>
                                </div>
                            )

                            :

                            <></>
                    }
                    {
                        cart.length === 0 && !loading && success && error ?
                        <>
                            <p
                                style={{
                                    textTransform: 'uppercase',
                                    width: '100%',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    marginTop: '5rem'
                                }}
                            >
                                {error}
                            </p>
                        </>

                        :

                        <>
                        </>
                    }
                </Box>
            </Paper>
        </>
    )
}

export default Cart;
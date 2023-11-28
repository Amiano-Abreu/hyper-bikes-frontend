import { useState } from "react";

import { NavLink, useNavigate, Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Badge from '@mui/material/Badge';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import styles from './MobileNav.module.css';

import AccountMenu from './AccountMenu'
import Toaster from "../Utility/Toaster";
import Loader from '../Utility/Loader';

import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../../features/userSlice";
import { resetCart } from "../../features/cartSlice";

const MobileNav = ({ navLinks }) => {
    const {isLoggedIn} = useSelector(state => state.user);
    const { loading, success, error, cart } = useSelector(state => state.cart);

    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => setIsOpen(true)

    const closeDrawer = (e) => {
        
        // console.log(e, "NAVLINKS ", navLinks)
        setIsOpen(false);

        if(e !== undefined && e.target) {
            const link = String(e.target.textContent).toLowerCase();
            if(link === "sign up"){
                // setIsOpen(false);
                return
            }
            if(link !== 'logout') {
                // setIsOpen(false);
                navigate(link);
            } else {
                setIsLoading(true)
                dispatch(logoutHandler())
                    .then((data) => {
                        // console.log("logouterr suc ",data)
            
                        if (data.type.split("/")[2] === "rejected") {
                            setStatus("error");
                        }
            
                        if (data.type.split("/")[2] === "fulfilled") {
                            setStatus("success");
                            dispatch(resetCart())
                        }
                    })
                    .finally(() => setIsLoading(false))
            }
        }
        
    }

    

    return (
        <>  
            {
              loading ?

              <Loader />
              :
              <></>
            }
            {
                isLoading ?
                <Loader />
                    :
                <></>
            }
            {
                !isLoading && status && status === "error" ?
                <Toaster timer={2000} type={"error"} message={"Failed to logout !"} />
                    :
                <></>
            }
            {
                !isLoading && status && status === "success" ?
                <Toaster timer={2000} message={"Successfully logged out !"} link={"/"} />
                    :
                <></>
            }
            <IconButton
              sx={{
                marginLeft: 'auto',
                marginRight: '.5rem',
                color: 'customWhite.main',
                '&.MuiButtonBase-root:hover': {
                  backgroundColor: 'transparent'
                }
              }}
              disableFocusRipple={true}
              to='/cart'
              component={Link}
            >
            {
              !loading && !error && success && cart?.length > 0 ?

              <Badge
                badgeContent={cart.length} 
                color="success" 
              >
                <ShoppingCartRoundedIcon 
                  fontSize='large'
                />
              </Badge>

              :

              <ShoppingCartRoundedIcon 
                  fontSize='large'
                />
            }
            </IconButton>
            <IconButton
                sx={{
                    marginRight: '5%'
                }}
                disableRipple={true}
                onClick={ () => openDrawer() }
            >
                <MenuRoundedIcon
                    fontSize={'large'}
                    color={'customWhite'}
                /> 
            </IconButton>
            <Drawer
              anchor={'right'}
              open={isOpen}
              sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: 'customWhite.main',
                    width: '100%'
                },
                '& ul': {
                    marginTop: '10%'
                }
              }}
              onClose={ () => closeDrawer() }
            >
                <IconButton
                    disableRipple={true}
                    sx={{
                        margin: '25px 10% 0 auto'
                    }}
                    onClick={ () => closeDrawer() }	
                >
                    <CloseRoundedIcon 
                        fontSize={'large'}
                        sx={{
                            color: 'customBlack.main'
                        }}
                    />
                </IconButton>
                <List
                    sx={{
                        width: '100%',
                        mx: 'auto',
                        '& a': {
                          textDecoration: 'none'
                        }
                    }}
                >
                    {
                        navLinks.map((nav,i) => {
                            return (
                                <NavLink
                                    key={nav}
                                    to={`/${nav === 'Home' ? '' : nav.toLowerCase()}`}
                                    className={(navData) => navData.isActive ? 
                                        `${styles.nav} ${styles.navActive}`
                                        : 
                                        styles.nav
                                    }
                                    onClick={closeDrawer}
                                >
                                    {nav.toUpperCase()}
                                </NavLink>
                            )
                        })
                    }
                </List>
                {
                    isLoggedIn ?
                        <AccountMenu
                            closeFunction={closeDrawer}
                            mobile={true}
                        />

                    :

                    <Button
                        component={Link}
                        to='/login'
                        variant='contained'
                        size='small'
                        color='customRed'
                        onClick={closeDrawer}
                        sx={{
                            color: 'customWhite.main',
                            width: '100px',
                            mx: 'auto',
                            mt: 5,
                            py: 2
                        }}
                    >
                        login
                    </Button>
                }
            </Drawer>
        </>
    )
}
    

export default MobileNav;
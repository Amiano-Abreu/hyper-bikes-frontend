import { NavLink, Link } from 'react-router-dom';

import styles from './DesktopNav.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';
import Loader from '../Utility/Loader';

const DesktopNav = ({ navLinks }) => {
    const { isLoggedIn } = useSelector(state => state.user);
    const { loading, success, cart } = useSelector(state => state.cart);
    
    return (
        <>
            {
              loading ?

              <Loader loading={loading} />
              :
              <></>
            }
            <Box 
              className={styles.nav}
              sx={{
                marginLeft: 'auto',
              }}
            >
                {navLinks.map((nav,i) => 
                    <NavLink 
                      key={nav}
                      className={(navData) => navData.isActive ? styles.navActive : '' }
                      to={`/${nav === 'Home' ? '' : nav.toLowerCase()}`}
                    >
                      {nav.toUpperCase()}
                    </NavLink>
                )}
            </Box>
            <IconButton
              sx={{
                marginLeft: 'auto',
                marginRight: '1.5rem',
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
              !loading && success && cart?.length > 0 ?

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
            <Box 
              sx={{
                      marginRight: '5%',
                      display: 'flex',
                      alignItems: 'center'
              }}
            >
              {
                isLoggedIn ?
                  <AccountMenu navLinks={navLinks}/>
                  // <></>
                :
              
                  <Button 
                    component={Link}
                    to='/login'
                    variant="contained"
                    color='customRed'
                    sx={{
                      height: '40px'
                    }}
                    >
                      LOGIN
                  
                  </Button>
              }
            </Box>
        </>
    )
}
        

export default DesktopNav;
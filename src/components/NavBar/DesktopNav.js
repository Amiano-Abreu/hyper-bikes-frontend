import { NavLink, Link } from 'react-router-dom';

import styles from './DesktopNav.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import AccountMenu from './AccountMenu';

const DesktopNav = ({ navLinks }) => {
    
    return (
        <>
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
              <Badge
                badgeContent={4} 
                color="success" 
              >
                <ShoppingCartRoundedIcon 
                  fontSize='large'
                />
              </Badge>
            </IconButton>
            <Box 
              sx={{
                      marginRight: '5%',
                      display: 'flex',
                      alignItems: 'center'
              }}
            >
              {
                true ?
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
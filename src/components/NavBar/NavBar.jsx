import styles from './NavBar.module.css';

import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/material';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const links = ['Home', 'Bikes' , 'News'];

const NavBar = () => {
    const isMedium = useMediaQuery('(max-width:990px)');

    console.log(isMedium);

    return (
        <>
            <AppBar 
              sx={{
                    bgcolor: 'customBlack.main',
                    height: isMedium ? '70px' : '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
              elevation={6}
            >
                <Toolbar
                  sx={{
                    width: '100%',
                    '& a': {
                      textDecoration: 'none',
                      color: 'inherit'
                    }
                  }}
                >
                  <Link 
                    to='/'
                    className={styles.margin}
                  >
                    <div 
                      className={`${styles.logo} ${isMedium ? styles.logoMedium : ''}`} 
                    >
                      <span>HypeRR</span>
                      <span>Bikes</span>
                    </div>
                  </Link>

                  {
                    isMedium ? 
                      <MobileNav navLinks={links} /> : <DesktopNav navLinks={links} />
                  }
                </Toolbar>
            </AppBar>
        </>
    )
}
    
    
export default NavBar;
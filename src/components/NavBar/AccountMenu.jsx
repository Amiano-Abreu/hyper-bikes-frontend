import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler } from '../../features/userSlice';

export default function BasicMenu({closeFunction, mobile}) {
  const {userName} = useSelector(state => state.user)

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log("event ",event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    console.log("eventClose ",e.currentTarget.textContent)
    const link = e.currentTarget.textContent;

    if(link && link !== 'logout') {
      navigate(link)
    } else if (link && link === 'logout') {
      alert('logout')
      dispatch(logoutHandler());
      navigate('/')
    }
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        ...(mobile && {
          marginRight: "auto",
          marginLeft: "auto"
        })
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disableRipple
        disableTouchRipple
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          '&:hover': {
              bgcolor: 'transparent'
          }
        }}
      >
        <Avatar>{userName[0]}</Avatar>
          <Typography
           sx={{
             fontSize: '1rem',
             fontWeight: '600',
             ml: 4,
             ...(mobile && {
               color: 'customBlack.main'
             }),
             ...(!mobile && {
               color: 'customWhite.main'
             })
           }}
          >{userName}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='jacob'
        sx={{
          '& div.MuiPaper-root': {
            width: '260px',
          }
        }}
      >
        {
          ["profile",
           "account",
           "logout"].map(
            item => {
              return (
                <MenuItem 
                  key={item}
                  onClick={ mobile ? closeFunction : handleClose }
                  sx={{
                    textTransform: 'uppercase'
                  }}
                >
                  {item}
                </MenuItem>
              )
            }
          )
        }
        
        {/* <MenuItem onClick={handleClose}>account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';

export default function AccountMenu({ closeFunction, mobile }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    const link = String(event.target.textContent).toLowerCase();
    
    setOpen(false);
    navigate(link);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (

        <Box
            sx={{
                display: 'inline-block',
                mx: 'auto'
            }}
        >
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            disableRipple
            disableTouchRipple
            onClick={handleToggle}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '260px',
              '&:hover': {
                  bgcolor: 'transparent'
              }
            }}
          >
            <Avatar>d</Avatar>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: '600',
                ...(mobile && {
                  color: 'customBlack.main'
                }),
                ...(!mobile && {
                  color: 'customWhite.main'
                })
              }}
            >David Burgeradjfsa</Typography>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{
              width: '260px'
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper
                  sx={{
                    ...(mobile &&{
                      bgcolor: 'customBlack.light'
                    })
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      sx={{
                        ...(mobile && {
                          '& li': {
                            color: 'customWhite.main'
                          },
                          '& li:hover': {
                            bgcolor: 'customBlack.main'
                          }
                        })
                      }}
                    >
                      <MenuItem
                         
                        onClick={
                          mobile ? closeFunction : handleClose
                        }
                      >Profile</MenuItem>
                      <MenuItem onClick={mobile ? closeFunction : handleClose}>Account</MenuItem>
                      <MenuItem onClick={mobile ? closeFunction : handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
  );
}

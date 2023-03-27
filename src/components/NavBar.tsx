import { ChevronLeft, MenuOpen } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase/firebase-config';
import { userLoggedOut } from '../state/Auth/sliceAuth';
import { resetAtLogout } from '../state/GoogleData/sliceGoogle';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { resetAtLogoutMobile } from '../state/MobileAuth/sliceMobile';
import { emptyValue } from '../state/User/user-slice';
import MenuIcon from '@mui/icons-material/Menu';
interface AnotherComponentProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}
const NavBar = ({ open, handleDrawerOpen, handleDrawerClose }: AnotherComponentProps) => {
    const typeLogin = useAppSelector(state => state.auth.mobileLogin);
    const photoURL = useAppSelector(state => state.google.photoURL);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const Logout = () => {
        if (!typeLogin) {
            dispatch(resetAtLogout());
            signOut(auth).then(() => {

            }).catch((error) => {
                console.log("Error while logout")
                console.log(error);
            })
        } else {
            dispatch(resetAtLogoutMobile());
        }
        dispatch(emptyValue());
        dispatch(userLoggedOut());
        navigate('/');
    }
    return (
        <div>
            <Paper elevation={3} style={{ position: 'fixed', width: '100%', top: '0', zIndex: '100', left: '0' }} square>
                <HeaderContainer>
                    <AppBar position='fixed' color='default'>
                        <Toolbar>
                            {
                                open ? <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerClose}
                                    edge="start"
                                >
                                    <ChevronLeft />
                                </IconButton> : <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                >
                                    <MenuIcon />
                                </IconButton>
                            }

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                                width='100%'
                            >
                                <Link to='/'>
                                    <Logo>
                                        <img src="https://igitsarang.ac.in/assets/frontend//images/logo.png" alt="" />
                                        <Typography >Digital Certificate</Typography>
                                    </Logo>
                                </Link>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src={photoURL} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >

                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"  >Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center"  >Setting</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            handleCloseUserMenu();
                                            Logout();
                                        }
                                        }>
                                            <Typography textAlign="center"  >Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </HeaderContainer>
            </Paper>
        </div>
    )
}

export default NavBar;

const HeaderContainer = styled.div`
  margin-left: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns:5fr 1fr;
  gap: 60%;
  align-items: center;
  padding: .5rem 1rem;
  p{
    color: black;
  }
  @media screen and (max-width: 780px)  {
      justify-content: space-evenly;
      padding: 10px 0;
  }
`;
const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    p{
      margin-left: 1rem;
      font-size: 2rem;
      font-weight: 800;
    }
      img{
        width: 3rem;
        height: 3rem;
      }
      @media screen and (max-width: 780px)  {
        margin-left: 0;
          p{
            margin: 0;
            margin-left: 10px;
            font-size: 1rem;
            font: 100;
          }
          img{
            width: 2rem;
            height: 2rem;
          }
        
      }

`;



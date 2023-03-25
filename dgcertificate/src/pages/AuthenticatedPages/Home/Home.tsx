import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system';
import NavBar from '../../../components/NavBar';
import styled from 'styled-components';
import './home.css';
import { MenuListItem } from './MenuList';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../../state/hooks';
import { setDrawerState } from '../../../state/Theme/theme-slice';
interface AnotherComponentProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}
const Home = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        dispatch(setDrawerState(true));
        setOpen(true);
    };

    const handleDrawerClose = () => {
        dispatch(setDrawerState(false));
        setOpen(false);
    };
    const handleContainerClick = () => {
        if (open) {
            handleDrawerClose();
        }
    };

    return (
        <>
            <MainContainer >
                <LeftContainer
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
                <RenderingCompContainer open={open} onClick={handleContainerClick} >
                    <Outlet />
                </RenderingCompContainer>
            </MainContainer>
        </>
    )
}

const LeftContainer = ({
    open,
    handleDrawerOpen,
    handleDrawerClose,
}: AnotherComponentProps) => {
    return (
        <>
            <NavBar open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
            <DrawerContainer>
                <Drawer
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open} >
                    <Box width={'250px'}>
                        <List>
                            {
                                MenuListItem.map((item) => {
                                    return (
                                        <ListItem key={item.id} disablePadding >
                                            <Link to={item.link}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <item.icon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.menuName} />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
                </Drawer>
            </DrawerContainer>
        </>
    )
}




export default Home;

const MainContainer = styled.div`
    display:flex ;
    flex-direction: column;
`;
const DrawerContainer = styled.div`
    position: absolute;
`;
const RenderingCompContainer = styled.div<{ open?: boolean }>`
    margin-top: 4%;
    margin-left: ${props => props.open ? '16%' : '0%'};
    @media screen and (max-width: 820px) {
        margin-top: 8%;
    }
    @media screen and (max-width: 780px) {
        margin-top: 10%;
        margin-left: 0%;
    }
`;

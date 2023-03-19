import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system';
import NavBar from '../../../components/NavBar';
import styled from 'styled-components';
import './home.css';
import { MenuListItem } from './MenuList';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <MainContainer >
                <LeftContainer />
                <RenderingCompContainer>
                    <Outlet />
                </RenderingCompContainer>
            </MainContainer>
        </>
    )
}

const LeftContainer = () => {
    return (
        <>
            <NavBar />
            <DrawerContainer>
                <Drawer variant='permanent'>
                    <Box width={'250px'}>
                        <List>
                            {
                                MenuListItem.map((item) => {

                                    return (
                                        <ListItem key={item.id} disablePadding >
                                            <Link to={item.link}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <item.icon  />
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
const RenderingCompContainer = styled.div`
    margin-top: 4.7%;
    margin-left: 17.4%;

`

const DrawerContainer = styled.div`
    position: absolute;
`;

import {Home,DocumentScannerOutlined,Search,Info} from '@mui/icons-material'
import SvgIcon from '@mui/material/SvgIcon';
type SvgIconComponent = typeof SvgIcon;
interface MenuItemType{
    id:number,
    menuName:string,
    icon:SvgIconComponent,
    link:string
}

export const MenuListItem:MenuItemType[]=[
    {
        id:1,
        menuName:'Home',
        icon:Home,
        link:'/home'
    },
    {
        id:2,
        menuName:'Issued Documents',
        icon:DocumentScannerOutlined,
        link:'/home/documents'
    },
    {
        id:3,
        menuName:'Search Documents',
        icon:Search,
        link:'/home/search'
    },
    {
        id:4,
        menuName:'About',
        icon:Info,
        link:'/home/about'
    },
]
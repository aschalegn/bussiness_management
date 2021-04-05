import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
const useStyles = makeStyles(theme => ({
        menuIconContainer: {
            marginLeft: 'auto',
        }
    }));
export default function LeftSideNavbar() {
    const [openDrawer, setOpenDrawer] = useState(true);
    const drawerClasses = useStyles();
    return (
        <>
        
        <Drawer
        anchor='right'
        onClose={()=> setOpenDrawer(false)}
        open={openDrawer}
        >
            <List>
                <ListItem divider button>
                    <ListItemIcon>
                        <ListItemText>
                        אודות
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
                <ListItem divider button>
                    <ListItemIcon>
                        <ListItemText>
                            שאלות נפוצות
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
                <ListItem divider button>
                    <ListItemIcon>
                        <ListItemText>
                            הירשם עכשיו
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
                <ListItem divider button>
                    <ListItemIcon>
                        <ListItemText>
                            כניסה למערכת
                        </ListItemText>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
        <IconButton className={drawerClasses.menuIconContainer} onClick={()=>{setOpenDrawer(!openDrawer)}}>
            <MenuIcon/>
        </IconButton>
</>
    )
}

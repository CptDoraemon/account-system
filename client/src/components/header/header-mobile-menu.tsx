import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MenuItem} from "./header";
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

interface HeaderMobileMenuProps {
  isOpen: boolean,
  toggleDrawer: () => void,
  menuItems: MenuItem[]
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    maxWidth: 320,
  },
  listItemText: {
    fontWeight: 700,
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center'
  }
}));

const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({isOpen, toggleDrawer, menuItems}) => {
  const classes = useStyles();

  return (
    <Drawer anchor={'right'} open={isOpen} onClose={toggleDrawer} className={classes.root}>
      <List
        className={classes.root}
        onClick={toggleDrawer}
      >
        <ListItem button alignItems={'center'} aria-label={'close menu'}>
          <ListItemIcon><CloseIcon/></ListItemIcon>
        </ListItem>
        {
          menuItems.map(menuItem => (
            <ListItem button component={Link} to={menuItem.to}>
              <ListItemText primary={menuItem.text} classes={{primary: classes.listItemText}}/>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  )
};

export default HeaderMobileMenu

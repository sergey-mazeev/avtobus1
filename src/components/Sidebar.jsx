import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import MUIDrawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";

import {withStyles} from "@material-ui/core";
import clsx from 'clsx';
import {drawerWidth} from "./TaskManager";
import MainMenu from "./MainMenu";

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
});

class Sidebar extends Component {
  render() {
    const {classes, menu} = this.props;
    const open = this.props.sidebarOpen;
    return (
      <MUIDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={() => {this.props.toggleSidebar()}}
          >
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <MainMenu menu={menu} open={open}/>
      </MUIDrawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
import React, {Component} from "react";
import AppBar from "./AppBar";
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import menu from "../mock-menu.json";
import MainPage from "./MainPage";
import References from "./References";
import TaskList from "./TaskList";

const styles = theme => ({
  taskmanager: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export const drawerWidth = 240;

class TaskManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    })
  }


  render() {
    const {classes} = this.props;
    const {sidebarOpen} = this.state;
    return (
      <Router>
        <div className={classes.taskmanager}>
          <AppBar sidebarOpen={sidebarOpen} toggleSidebar={this.toggleSidebar}/>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={this.toggleSidebar} menu={menu}/>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>
              <Route exact path="/(home)?">
                <MainPage/>
              </Route>
              <Route exact path="/references">
                <References/>
              </Route>
              <Route path="/tasks">
                <TaskList/>
              </Route>
              <Redirect to="/"/>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(TaskManager);
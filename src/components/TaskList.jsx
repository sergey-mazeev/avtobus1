import React, {Component} from "react";
import TaskListItem from "./TaskListItem";
//import fetch from 'isomorphic-fetch';
import Snackbar from "@material-ui/core/Snackbar";
import {withStyles} from "@material-ui/core";
import tasks from "../mock-tasks";

const styles = theme => ({
  root: {},
  tasksList: {
    margin: 0,
    marginTop: theme.spacing(2),
    padding: 0,
    listStyle: "none",
  },
});

const initialState = {
  copiedLink: null,
  tasks: [],
};

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = initialState;
    this.copyLink = this.copyLink.bind(this);
  }

  getTasks() {

    this.setState({
      tasks: tasks,
    })

    /*fetch('http://path/to/api/mock-tasks.json', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(response => this.setState({tasks: response}))
      .catch(reason => console.warn(reason))*/
  }

  componentDidMount() {
    this.getTasks();
  }

  copyLink(link) {
    const base = window.location.origin;
    const resultLink = base + link;
    navigator.clipboard.writeText(resultLink)
      .then(() => {
        this.setState({copiedLink: resultLink});
      })
      .catch(err => {
        console.log('Ссылка не скопировалась', err);
      });
  }

  closeSnackbar() {
    this.setState({
      copiedLink: null,
    })
  }

  render() {
    const {classes} = this.props;
    const {tasks} = this.state;
    return (
      <div className={classes.root}>
        Место для фильтров
        <ul className={classes.tasksList}>
          {tasks.map((el, index) => (
            <TaskListItem key={index} {...el} copyLink={this.copyLink}/>
          ))}
        </ul>
        <Snackbar
          open={!!this.state.copiedLink}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          autoHideDuration={3000}
          onClose={() => {
            this.closeSnackbar()
          }}
          message={
            <span>Ссылка `{this.state.copiedLink}` скопирована в буфер обмена</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);

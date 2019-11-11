import React, {Component} from "react";
import TaskListItem from "./TaskListItem";
//import fetch from 'isomorphic-fetch';
import {Snackbar, withStyles} from "@material-ui/core";
import tasks from "../mock-tasks";
import Filters from "./Filters";

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
    this.updateFilters = this.updateFilters.bind(this);
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

  updateFilters(textFilter, statusFilter, fromMeFilter, toMeFilter) {
    let filteredTasks = tasks;
    if (textFilter.length > 0) {
      filteredTasks = filteredTasks.filter(({name}) => name.toLowerCase().includes(textFilter.toLowerCase()));
    }
    if (statusFilter !== "all") {
      filteredTasks = filteredTasks.filter(({status}) => {
        return status === statusFilter;
      });
    }
    if (fromMeFilter) {
      filteredTasks = filteredTasks.filter(({taskFromId}) => (taskFromId === "003"));
    }
    if (toMeFilter) {
      filteredTasks = filteredTasks.filter(({taskToId}) => (taskToId === "003"));
    }
    this.setState(prevState => ({
      tasks: filteredTasks,
    }))
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
    console.log(this.props);
    return (
      <div className={classes.root}>
        <Filters updateFilters={this.updateFilters}/>
        <ul className={classes.tasksList}>
          {!tasks.length && <li>Нет задач, отвечающих выставленным фильтрам</li>}
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

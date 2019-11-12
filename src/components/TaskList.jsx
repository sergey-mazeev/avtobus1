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

// состояние по умолчанию
const initialState = {
  copiedLink: null,
  tasks: [],
};

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = initialState;
    // биндим методы для использования в дочерних компонентах
    this.copyLink = this.copyLink.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  //Метод получения списка тасков. На живом проекте предполагается обращение к API
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

  // При загрузке компонета запускаем метод получения задач
  componentDidMount() {
    this.getTasks();
  }

  // метод обновления списка задач, согласно установленных фильтров. Принимает значения фильтров и с помощью filter фильтрует массив по указанным правилам
  updateFilters(textFilter, statusFilter, fromMeFilter, toMeFilter, closeReasonFilter) {
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
      // Принимаю пользователя с id 003 за "себя"
    }
    if (toMeFilter) {
      filteredTasks = filteredTasks.filter(({taskToId}) => (taskToId === "003"));
    }
    if (closeReasonFilter) {
      filteredTasks = filteredTasks.filter(({reasonForClosing}) => {
        return reasonForClosing === closeReasonFilter;
      });
    }
    // Записываем отфильтрованный список задач в состояние компонента
    this.setState(() => ({
      tasks: filteredTasks,
    }))
  }

  // Метод копирования ссылки на задачу
  copyLink(link) {
    const base = window.location.origin;
    const resultLink = base + link;
    navigator.clipboard.writeText(resultLink)
      .then(() => {
        this.setState({copiedLink: resultLink});
      })
      .catch();
  }

  // Метод закрытия всплывашки с сообщением о копировании ссылки, обновляет состояние компонента.
  closeSnackbar() {
    this.setState({
      copiedLink: null,
    })
  }

  render() {
    const {classes, location} = this.props;
    const {tasks} = this.state;
    return (
      <div className={classes.root}>
        {/*Передаем как свойства метод обновления фильтров и location в компонент Filter*/}
        {/*location передается для фильтрации в зависимости от выбранного пункта меню*/}
        <Filters updateFilters={this.updateFilters} location={location}/>
        <ul className={classes.tasksList}>
          {/*Если задач нет*/}
          {!tasks.length &&
          <li>Нет задач, отвечающих выставленным фильтрам</li>}
          {/*Если задачи есть - рендерим компонент TaskListItem для каждой задачи*/}
          {tasks.length > 0 && tasks.map((el, index) => (
            <TaskListItem key={index} {...el} copyLink={this.copyLink}/>
          ))}
        </ul>
        {/*Компонент всплывашки с сообщением о копировании ссылки*/}
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

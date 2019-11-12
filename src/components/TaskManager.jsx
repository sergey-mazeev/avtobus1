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
import MainPage from "./MainPage";
import References from "./References";
import TaskList from "./TaskList";
import Task from "./Task";

//импорт данных о меню из соответствующего файла
import menu from "../mock-menu.json";

// Основной компонент приложения. Собирает в себе каркас страницы и переключает
// роуты с помощью react-router (https://reacttraining.com/react-router)

// Стили в формате css in js. Функция, принимающая тему (набор правил по
// умолчанию библиотеки Material UI) и возвращает объект со стилями.
// коннектится к компоненту с помощью мидлвара withStyles из Material UI. С
// помощью этого мидлвара стили передаются компоненту как свойства
// (props.classes)
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

// Ширина развернутой области меню
export const drawerWidth = 240;

class TaskManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    // Биндим метод toggleSidebar к this(экземпляру TaskManager) для его работы
    // из дочерних компонентов
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  // метод, меняющий состояние для сворачивани-разворачивания сайдбара
  toggleSidebar() {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    })
  }


  render() {
    // достаем классы для стилизации из свойств компонента
    const {classes} = this.props;
    const {sidebarOpen} = this.state;
    return (
      // роутер react-router. Необходимая обертка для работы роутинга
      <Router>
        <div className={classes.taskmanager}>
          {/*Передаем компонентам нужные данные и методы через props*/}
          <AppBar sidebarOpen={sidebarOpen} toggleSidebar={this.toggleSidebar}/>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={this.toggleSidebar} menu={menu}/>
          {/*Основная область окна*/}
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            {/*Компонент Switch из react-router рендерит только один из подходящих роутов приложения*/}
            <Switch>
              {/*Компонент Route из react-router рендерит дочерний компонент только при выполнении условия `path`*/}
              {/*exact позволяет рендерить компонент только при полном совпадении адреса*/}
              {/*Запись вида `/(home)?` позволяет рендерить дочерний компонент по адресам `/` и `/home`*/}
              <Route exact path="/(home)?">
                <MainPage/>
              </Route>
              <Route exact path="/references">
                <References/>
              </Route>
              {/*`render` позволяет передать в целевой компонент для рендера свойства роута (location)*/}
              <Route path="/tasks" render={({location}) => {
                const {state} = location;
                return (<TaskList location={state}/>)
              }}/>
              <Route path="/task" render={({location}) =>
                <Task {...location.state} />}/>
              {/*Если адрес не соответствует ни одному из роутов, то срабатывает перенаправление на `/` с помощью Redirect из react-router*/}
              <Redirect to="/"/>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

// экспорт компонента с присоединенными с помощью withStyles стилями
export default withStyles(styles)(TaskManager);

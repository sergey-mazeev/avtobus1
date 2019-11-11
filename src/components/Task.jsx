import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CardHeader,
  Avatar,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import formatDate from "../utils/formatDate";
import tasks from "../mock-tasks";
import DoneIcon from "@material-ui/icons/Done";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";
import CrossIcon from "@material-ui/icons/Close";
import {blue, blueGrey, green, red} from "@material-ui/core/colors";

const styles = theme => ({
  task: {},
  listItem: {
    paddingLeft: 0,
    paddingTop: 0,
    fontSize: 14,
  },
  statusSuccess: {
    backgroundColor: green[500],
  },
  statusPending: {
    backgroundColor: blueGrey[500],
  },
  statusClosed: {
    backgroundColor: red[500],
  },
  statusActive: {
    backgroundColor: blue[500],
  },
  link: {
    textDecoration: "none",
  },
});


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTaskInfo() {
    const {taskId} = this.props;
    // здесь нужно сделать fetch с сервера
    const task = tasks.filter(({id}) => (taskId === id))[0];
    this.setState({
      task: task,
    })
  }

  componentDidMount() {
    this.getTaskInfo();
  }

  render() {
    const {classes} = this.props;
    const {task} = this.state;
    let statusIcon;
    if (task) {
      if (task.status === "success") {
        statusIcon = <DoneIcon/>;
      }
      else if (task.status === "pending") {
        statusIcon = <PauseIcon/>;
      }
      else if (task.status === "active") {
        statusIcon = <PlayIcon/>;
      }
      else if (task.status === "closed") {
        statusIcon = <CrossIcon/>;
      }
    }
    return (
      <div className={classes.task}>
        {!task && <p>Информация о задаче загружается</p>}
        {task &&
        <Card>
          <CardHeader
            avatar={
              <Avatar className={clsx({
                [classes.statusSuccess]: task.status === "success",
                [classes.statusPending]: task.status === "pending",
                [classes.statusActive]: task.status === "active",
                [classes.statusClosed]: task.status === "closed",
              })}>
                {statusIcon}
              </Avatar>
            }
            action={
              <Link to="/tasks" className={classes.link}>
                <Button size="small" variant="contained" color="primary">
                  Назад к списку
                </Button>
              </Link>
            }
            title={task.name}
          >
          </CardHeader>
          <CardContent>
            <List>
              <ListItem className={classes.listItem}>Дата постановки задачи: {formatDate(task.dateStart)}
              </ListItem>
              <ListItem className={classes.listItem}>Крайний срок задачи: {formatDate(task.dateEnd)}
              </ListItem>
              <ListItem className={classes.listItem}>Постановщик задачи: {task.taskFromName}
              </ListItem>
              <ListItem className={classes.listItem}>Ответственный: {task.taskToName}</ListItem>
            </List>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              {task.textShort}
            </Typography>
            <Typography paragraph gutterBottom>{task.text}</Typography>
          </CardContent>
        </Card>}
      </div>
    )
  }
}

export default withStyles(styles)(Task);

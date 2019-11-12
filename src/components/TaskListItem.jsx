import React, {Component} from "react";
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ShareIcon from "@material-ui/icons/Share";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";
import CrossIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import formatDate from "../utils/formatDate";
import {Link} from "react-router-dom";
import {red, green, blueGrey, blue} from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(1.5),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  link: {
    textDecoration: "none",
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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
  }
});

class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      expanded: false,
    }
  }

  // метод обработки сворачивания/разворачивания информации о задаче. Устанавливает ключ `expanded` в соответствующее состояние (булевое значение)
  handleExpandClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }))
  }

  render() {

    const {expanded} = this.state;
    const {classes, id, name, dateEnd, taskToName, textShort, text, status, copyLink} = this.props;
    // Сборка ссылки на задачу
    const taskLink = `/task/${id}`;
    const location = {
      pathname: taskLink,
      state: {taskId: id},
    };
    // Выбираем иконку для статуса
    let statusIcon;
    if (status === "success") {
      statusIcon = <DoneIcon/>;
    }
    else if (status === "pending") {
      statusIcon = <PauseIcon/>;
    }
    else if (status === "active") {
      statusIcon = <PlayIcon/>;
    }
    else if (status === "closed") {
      statusIcon = <CrossIcon/>;
    }

    return (
      <li className={classes.root}>
        <Card>
          <CardHeader
            // Цвет иконки статуса
            avatar={
              <Avatar className={clsx({
                [classes.statusSuccess]: status === "success",
                [classes.statusPending]: status === "pending",
                [classes.statusActive]: status === "active",
                [classes.statusClosed]: status === "closed",
              })}>
                {statusIcon}
              </Avatar>
            }
            action={
              <Link to={location} className={classes.link}>
                <Button size="small" variant="contained" color="primary">
                  Перейти к задаче
                </Button>
              </Link>
            }
            title={name}
            subheader={`Ответственный: ${taskToName}, 
            Дата окончания: ${formatDate(dateEnd)}`}
          >
          </CardHeader>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {textShort}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Скопировать ссылку" title="Скопировать ссылку" onClick={() => {
              copyLink(taskLink)
            }}>
              <ShareIcon/>
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => {
                this.handleExpandClick()
              }}
              aria-expanded={expanded}
              aria-label="Показать больше"
            >
              <ExpandMoreIcon/>
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{text}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </li>
    );
  }
}

export default withStyles(styles)(TaskListItem);

import React, {Component} from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";

const styles = theme => ({
  wrapper: {
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(.5),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  inputCheckbox: {
    width: 140,
  }
});

const initialState = {
  textFilter: "",
  statusFilter: "all",
  fromMeFilter: false,
  toMeFilter: false,
  closeReasonFilter: null,

};

class Filters extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.textChange = this.textChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCheckboxMineChange = this.handleCheckboxMineChange.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!!prevProps.location && !!this.props.location &&
      (prevProps.location.root !== this.props.location.root ||
        prevProps.location.status !== this.props.location.status ||
        prevProps.location.reason !== this.props.location.reason)) {
      this.updateState();
    }
  }

  updateState() {
    const {root, status, reason} = this.props.location;
    const {updateFilters} = this.props;
    let newState = {...initialState};
    if (root === "all") {
      newState.statusFilter = "all";
    }
    else if (root === "fromme") {
      newState.fromMeFilter = true;
    }
    else if (root === "mine") {
      newState.toMeFilter = true;
    }
    if (status === "all") {
      newState.statusFilter = "all";
    }
    else if (status === "notfinished") {
      newState.statusFilter = "active";
    }
    else if (status === "closed") {
      newState.statusFilter = "closed";
    }
    else if (status === "success") {
      newState.statusFilter = "success";
    }
    if (reason === "paused") {
      newState.closeReasonFilter = "paused";
    }
    else if (reason === "unnecessary") {
      newState.closeReasonFilter = "unnecessary";
    }
    this.setState(newState);
    setTimeout(() => {updateFilters("", newState.statusFilter, newState.fromMeFilter, newState.toMeFilter, newState.closeReasonFilter)}, 20);
  }

  textChange(event) {
    const {updateFilters} = this.props;
    const {statusFilter, fromMeFilter, toMeFilter} = this.state;
    this.setState({
      textFilter: event.target.value,
    }, updateFilters(event.target.value, statusFilter, fromMeFilter, toMeFilter));
  }

  handleSelectChange(event) {
    const {updateFilters} = this.props;
    const {textFilter, fromMeFilter, toMeFilter} = this.state;
    this.setState({
      statusFilter: event.target.value,
    }, updateFilters(textFilter, event.target.value, fromMeFilter, toMeFilter));
  }

  handleCheckboxChange(event) {
    const {updateFilters} = this.props;
    const {textFilter, statusFilter, toMeFilter} = this.state;
    this.setState(prevState => ({
      fromMeFilter: !prevState.fromMeFilter,
    }), updateFilters(textFilter, statusFilter, event.target.checked, toMeFilter));
  }

  handleCheckboxMineChange(event) {
    const {updateFilters} = this.props;
    const {textFilter, statusFilter, fromMeFilter} = this.state;
    this.setState(prevState => ({
      toMeFilter: !prevState.toMeFilter,
    }), updateFilters(textFilter, statusFilter, fromMeFilter, event.target.checked));
  }

  render() {
    const {classes} = this.props;
    const {textFilter, statusFilter, fromMeFilter, toMeFilter} = this.state;
    return (
      <Paper className={classes.wrapper}>
        <form className={classes.form} noValidate autoComplete="off">
          <FormControl className={classes.input}>
            <TextField
              className={classes.input}
              label="Название задачи"
              onChange={this.textChange}
              value={textFilter}
            />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              onChange={this.handleSelectChange}
              name="statusFilter"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="success">Выполненные</MenuItem>
              <MenuItem value="closed">Закрытые</MenuItem>
              <MenuItem value="pending">На паузе</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={clsx(classes.input, classes.inputCheckbox)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fromMeFilter}
                  onChange={this.handleCheckboxChange}
                  color="primary"
                />
              }
              label="От меня"
            />
          </FormControl>
          <FormControl className={clsx(classes.input, classes.inputCheckbox)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={toMeFilter}
                  onChange={this.handleCheckboxMineChange}
                  color="primary"
                />
              }
              label="Для меня"
            />
          </FormControl>
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(Filters)

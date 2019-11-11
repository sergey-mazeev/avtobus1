import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BookIcon from "@material-ui/icons/Book";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const styles = theme => ({
  mainMenu: {},
  mainMenuOpened: {},
  mainMenuList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  rootMenuItem: {},
  rootMenuItemButton: {
    paddingLeft: 18,
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
    width: "100%",
    justifyContent: "flex-start",
  },
  rootMenuItemIcon: {
    marginRight: 14,
  },
  menuItemLink: {
    textDecoration: "none",
    flexGrow: 2,
  },
  secondMainMenuList: {
    listStyle: "none",
    margin: 0,
    marginTop: theme.spacing(-.5),
    marginBottom: theme.spacing(.5),
    padding: 0,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    maxHeight: 0,
  },
  secondMainMenuListVisible: {
    maxHeight: 500,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
    }),
  },
  innerLevelListItem: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  secondLevelMenuButton: {
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: 58,
    paddingRight: 7,
    textTransform: "none",
    flexGrow: 2,
  },
  buttonExpandMenu: {
    width: 30,
    minWidth: 26,
  },
  buttonExpandMenuSmall: {
    fontSize: 10,
    width: 26,
    height: 26,
    paddingTop: 2,
  },
  chevron: {
    transition: "all .25s ease",
  },
  chevronSmall: {
    width: ".75em",
    height: ".75em",
  },
  chevronBottom: {
    transform: "rotate(90deg)",
  },
  chevronTop: {
    transform: "rotate(-90deg)",
  },
  thirdMainMenuList: {
    width: "100%",
    maxHeight: 0,
    overflow: "hidden",
    listStyle: "none",
    margin: 0,
    padding: 0,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  thirdMainMenuListVisible: {
    maxHeight: 400,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
    }),
  },
  thirdLevelMenuButton: {
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: 64,
    paddingRight: 7,
    textTransform: "none",
    flexGrow: 2,
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
  },
  fourthMainMenuList: {
    width: "100%",
    maxHeight: 0,
    overflow: "hidden",
    listStyle: "none",
    margin: 0,
    padding: 0,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  fourthMainMenuListVisible: {
    maxHeight: 160,
    transition: theme.transitions.create('max-height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 1.5,
    }),
  },
  fourthLevelMenuButton: {
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: 70,
    paddingRight: 7,
    textTransform: "none",
    flexGrow: 2,
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
  },
});

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  handleToggle(item) {
    this.setState(prevState => ({
      [item]: !prevState[item],
    }));
  }

  render() {
    const {classes, open, menu} = this.props;
    return (
      <nav className={clsx(
        classes.mainMenu,
        {
          [classes.mainMenuOpened]: open,
        }
      )}>
        <ul className={classes.mainMenuList}>
          {menu.map(({name, link, childrenItems}, index) => {

            let icon;
            if (index === 0) {
              icon =
                <HomeIcon className={classes.rootMenuItemIcon} color="primary"/>;
            }
            else if (index === 1) {
              icon =
                <ScheduleIcon className={classes.rootMenuItemIcon} color="primary"/>;
            }
            else if (index === 2) {
              icon =
                <BookIcon className={classes.rootMenuItemIcon} color="primary"/>;
            }

            return (
              <li key={index} className={classes.rootMenuItem}>
                <Link to={{pathname: link, state: {root: "all"}}} className={classes.menuItemLink}>
                  <Button className={classes.rootMenuItemButton}
                          color="default"
                          size="large"
                          startIcon={icon}
                          title={name}
                  >
                    {name}
                  </Button>
                </Link>
                {childrenItems.length > 0 &&
                <ul className={clsx(classes.secondMainMenuList, {
                  [classes.secondMainMenuListVisible]: open,
                })}>
                  {childrenItems.length > 0 &&
                  childrenItems.map(({name, link, childrenItems}, index) => {
                    const location = {
                      pathname: link,
                      state: {
                        root: link.slice(1).split('/')[1],
                      }
                    };
                    return (
                      <li key={`second-menu${index}`} className={classes.innerLevelListItem}>
                        <Link to={location} className={classes.menuItemLink}>
                          <Button size="small" className={classes.secondLevelMenuButton}>
                            {name}
                          </Button>
                        </Link>
                        {childrenItems.length > 0 &&
                        <>
                          <Button className={classes.buttonExpandMenu} size="small" onClick={() => {
                            this.handleToggle(`third-${name}`)
                          }}>
                            <ChevronRightIcon className={clsx(classes.chevron, {
                              [classes.chevronBottom]: !this.state[`third-${name}`],
                              [classes.chevronTop]: this.state[`third-${name}`],
                            })}/>
                          </Button>
                          <ul className={
                            clsx(classes.thirdMainMenuList,
                              {
                                [classes.thirdMainMenuListVisible]: this.state[`third-${name}`],
                              })}>
                            {childrenItems.map(({name, link, childrenItems}, index) => {
                              const pathArr = link.slice(1).split('/');
                              const location = {
                                pathname: link,
                                state: {
                                  root: pathArr[1],
                                  status: pathArr[2],
                                }
                              };
                              return (
                                <li key={`third-menu${index}`} className={classes.innerLevelListItem}>
                                  <Link to={location} className={classes.menuItemLink}>
                                    <Button size="small" className={classes.thirdLevelMenuButton}>
                                      {name}
                                    </Button>
                                  </Link>
                                  {childrenItems.length > 0 &&
                                  <>
                                    <Button className={clsx(classes.buttonExpandMenu, classes.buttonExpandMenuSmall)} size="small" onClick={() => {
                                      this.handleToggle(`fourth-${name}`)
                                    }}>
                                      <ChevronRightIcon className={clsx(classes.chevron, classes.chevronSmall, {
                                        [classes.chevronBottom]: !this.state[`fourth-${name}`],
                                        [classes.chevronTop]: this.state[`fourth-${name}`],
                                      })}/>
                                    </Button>
                                    <ul className={clsx(classes.fourthMainMenuList, {
                                      [classes.fourthMainMenuListVisible]: this.state[`fourth-${name}`],
                                    })}>
                                      {childrenItems.map(({name, link}, index) => {
                                        const pathArr = link.slice(1).split('/');
                                        const location = {
                                          pathname: link,
                                          state: {
                                            root: pathArr[1],
                                            status: pathArr[2],
                                            reason: pathArr[3],
                                          }
                                        };
                                        return (
                                          <li key={`fourth-menu${index}`}>
                                            <Link to={location} className={classes.menuItemLink}>
                                              <Button className={classes.fourthLevelMenuButton} size="small" color="default">{name}</Button>
                                            </Link>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  </>
                                  }
                                </li>
                              )
                            })}
                          </ul>
                        </>
                        }
                      </li>
                    );
                  })
                  }
                </ul>
                }
              </li>)
          })}
        </ul>

      </nav>
    )
  }
}

export default withStyles(styles)(MainMenu);
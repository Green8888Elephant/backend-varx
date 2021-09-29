import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, navigate} from 'gatsby'

import search from "../../images/search.svg";
import cart from "../../images/cart.svg"
import accountHeader from "../../images/account-header.svg"
import menu from "../../images/menu.svg"

const useStyles = makeStyles(theme => ({
  coloredIndicator: {
    backgroundColor: "#fff",
  },
  logoText: {
    color: theme.palette.common.offBlack,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    height: '3rem',
    width: '3rem',
  },
}))

export default function Header({ categories}) {
  const classes = useStyles();

  const matchesMD = useMediaQuery((theme => theme.breakpoints.down("md")))

  const [drawerOpen, setDrawerOpen] = useState(false);

  const iOS =
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const routes = [...categories, {node: {name: "Contact Us", strapiId: "contact"}}]

  const tabs = (
    <Tabs value={0} classes={{
      indicator: classes.coloredIndicator,
      root: classes.tabs
    }}>
      {routes.map(route =>(
        <Tab label={route.node.name} key={route.node.strapiId}/>
      ))}
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      disableBackdropTransition={!iOS} disableDiscovery={iOS}>
      <List disablePadding>
        {routes.map(route => (
          <ListItem divider button key={route.node.strapiId}>
            <ListItemText primary={route.node.name} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    {
      icon: search,
      alt: "serach",
      visible: true,
    },
    {
      icon: cart,
      alt: "cart",
      visible: true,
    },
    {
      icon: accountHeader,
      alt: "account",
      visible: !matchesMD,
    },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true)
    },
  ]


  return (
    <AppBar color="transparent" elevation={0}>
      <Toolbar>
        <Button>
          <Typography variant="h1"><span className={classes.logoText}>VAR</span> X</Typography>
        </Button>
        {matchesMD ? drawer : tabs}

        {actions.map(action => (
          <IconButton>
            <img
              className={classes.icon}
              src={action.icon}
              alt={action.alt}/>
          </IconButton>
        ))}
      </Toolbar>
    </AppBar>
  )
}
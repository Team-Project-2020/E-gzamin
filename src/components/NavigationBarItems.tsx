import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import PostAddIcon from "@material-ui/icons/PostAdd";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";

import "./NavigationBarItems.scss";

const NavigationBarItems = () => {
  return (
    <div className="NavigationBarItems">
      <_MenuItem to="/" label="Home">
        <DashboardIcon />
      </_MenuItem>
      <_MenuItem to="/maketest" label="Make a test">
        <PostAddIcon />
      </_MenuItem>
      <_MenuItem to="/group" label="Groups">
        <PeopleIcon />
      </_MenuItem>
      <_MenuItem to="/addquest" label="Add Questions">
        <AddIcon />
      </_MenuItem>
      <_MenuItem to="/settings" label="Settings">
        <SettingsIcon />
      </_MenuItem>
      <_MenuItem to="/tests" label="Designed tests">
        <LayersIcon />
      </_MenuItem>
    </div>
  );
};

const _MenuItem = ({
  to,
  label,
  children
}: {
  to: string;
  label: string;
  children: any;
}) => (
  <NavLink to={to}>
    <ListItem button>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  </NavLink>
);

export default NavigationBarItems;

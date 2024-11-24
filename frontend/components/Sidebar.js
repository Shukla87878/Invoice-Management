import Link from "next/link";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Home, Settings, MenuBook, PeopleAlt } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem button component={Link} href="/dashboard">
          <Home />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} href="/invoices">
          <MenuBook />
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button component={Link} href="/vendors">
          <PeopleAlt />
          <ListItemText primary="Vendors" />
        </ListItem>
        <ListItem button component={Link} href="/settings">
          <Settings />
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

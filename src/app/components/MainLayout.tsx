"use client";
import * as React from "react";
import { JSX, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Typography } from "@mui/material";
import Image from "next/image";

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface MiniDrawerProps {
  menuItems: MenuItem[];
  content: React.ReactNode;
  padding: number | string;
  onMenuItemClick: (link: string) => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none", // Remove shadow
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const MiniDrawer: React.FC<MiniDrawerProps> = ({
  menuItems,
  content,
  padding,
  onMenuItemClick,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeLink, setActiveLink] = useState<string>("/manage/invoices");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#ffffff",
          "& .MuiDrawer-paper": {
            backgroundColor: "#ffffff",
          },
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600} noWrap component="div">
            Manage Invoices
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <Image src="/man_icon.png" alt="user" width={28} height={28} />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                margin: 2,
              }}
            >
              <Typography variant="body1" fontWeight={600} noWrap>
                Rohit Sharma
              </Typography>
              <Typography variant="body2" fontSize="small" noWrap>
                rohithsharma@gmail.com
              </Typography>
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          backgroundColor: "#ffffff",
          "& .MuiDrawer-paper": {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <DrawerHeader sx={{ marginLeft: "10px"}}>
          <Image
            src="/finify_logo.png"
            alt="Karunai Logo"
            className="ml-2"
            width={84}
            height={84}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map(({ text, icon, link }) => (
            <ListItem
              key={text}
              onClick={() => {
                setActiveLink(link);
                onMenuItemClick(link);
              }}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={[
                  {
              color: "black",
                    minHeight: 48,
                    px: 2.5,
                  },
                  activeLink === link && {
                    backgroundColor: "#2874a6", 
                    color: "black",
                    borderRadius: "28px 0  0 28px",
                    marginLeft: "2px"
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      color: "#2874a6",
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    activeLink === link && {
                      color: "white",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    {
                      color: "#2874a6",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "1.5rem",
                      zIndex: 1,
                    },
                    activeLink === link && {
                      color: "white",
                    },
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: padding,
          width: `calc(100vw - ${drawerWidth}px)`,
        }}
      >
        <Divider />
        <DrawerHeader />
        {content}
      </Box>
    </Box>
  );
};
export default MiniDrawer;

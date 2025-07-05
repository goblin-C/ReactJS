import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from '@mui/icons-material/Search';
import logo from "../../assets/logo.png";

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    return (<Box display="flex" justifyContent="space-between" p={1} margin={2}>
        {/* Brand Logo */}
        <Box display="flex" justifyContent="space-between" alignItems={"center"}>
            <img 
                src={logo} // Update path as needed
                alt="Logo"
                style={{ height: 40, marginRight: 20 }}
            />
        {/* SEARCH BAR */}
        <Box 
            display="flex" 
            backgroundColor={colors.primary[400]} 
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1, width: "50%" }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
        </Box>

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
        </Box>
    </Box>)
}

export default TopBar;
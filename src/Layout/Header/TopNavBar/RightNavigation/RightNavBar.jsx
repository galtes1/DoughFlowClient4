// import { Box, CardActions, IconButton, Tooltip } from "@mui/material";
// import { useUser } from "../../../../Users/Providers/UserProvider";
// import { useTheme } from "../../../../Providers/CustomThemeProvider";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import NotLogged from "./NotLogged";
// import Logged from "./Logged";


// export default function RightNavBar() {
//   const { user } = useUser();
//   const { isDark, toggleDarkMode } = useTheme();

//   return (
//     <>
//       <Box
//         sx={{
//           display: { md: "inline-flex" },
//           alignItems: "center",
//         }}
//       >
//         <Box sx={{ display: {xs: "none",  md: "inline-flex"  }}}>
        
//         <CardActions>
//           <Tooltip title="Dark/Light Mode">
//             <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
//               {isDark ? <LightModeIcon /> : <DarkModeIcon />}
//             </IconButton>
//           </Tooltip>
//           </CardActions>

//         </Box>
//         {user && <Logged/>}
//         {!user && <NotLogged/>}
        
//       </Box>
//     </>
//   );
// }

import { Box, IconButton, Tooltip } from "@mui/material";
import { useUser } from "../../../../Users/Providers/UserProvider";
import { useTheme } from "../../../../Providers/CustomThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotLogged from "./NotLogged";
import Logged from "./Logged";
import theme from '../../../../Styles/theme'; // ייבוא נכון לפי מיקום

export default function RightNavBar() {
  const { user } = useUser();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2, // מוסיף רווחים בין האייקון לבין logged/notLogged
      }}
    >
      <Box sx={{ p: 0 }}>
        <Tooltip title="Toggle Dark/Light Mode">
          <IconButton
            sx={{
              color: 'white',
              backgroundColor: isDark ? theme.colors.border : 'transparent',
              '&:hover': {
                backgroundColor: theme.colors.secondary,
                color: 'white',
              },
              transition: 'all 0.3s ease',
            }}
            onClick={toggleDarkMode}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      {user ? <Logged /> : <NotLogged />}
    </Box>
  );
}

/*import React from 'react'
import LeftNavBar from './LeftNavigation/LeftNavBar'
import { AppBar, Toolbar } from '@mui/material'
import RightNavBar from './RightNavigation/RightNavBar';
import  {MenuProvider}  from './Menu/MenuProvider';




export default function NavBar() {
  return (
  <MenuProvider>
      <AppBar position="sticky" elevation={10}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
           <LeftNavBar /> 
          <RightNavBar />
        </Toolbar>
      </AppBar>
      </MenuProvider>  
  );
}*/
import React from 'react';
import LeftNavBar from './LeftNavigation/LeftNavBar';
import RightNavBar from './RightNavigation/RightNavBar';
import { AppBar, Toolbar } from '@mui/material';
import { MenuProvider } from './Menu/MenuProvider';
import theme from '../../../Styles/theme'; // מיקום נכון לפי המבנה שלך

export default function NavBar() {
  return (
    <MenuProvider>
      <AppBar
        position="sticky"
        elevation={6}
        sx={{
          backgroundColor: theme.colors.primary,
          color: 'white',
          padding: 0, // אפס פדינג פנימי
          
        }}
      >
        <Toolbar
        disableGutters
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: 56, sm: 56, md: 56 },
            paddingX: 2,
          }}
        >
          <LeftNavBar />
          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
}

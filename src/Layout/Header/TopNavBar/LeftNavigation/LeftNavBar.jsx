
// import { Box } from '@mui/material'
// import React from 'react'
// import Logo from '../TheLogo/Logo'
// import NavItem from '../../../../Routes/Components/NavItem'
// import ROUTES from '../../../../Routes/routesModel'
// import { useTheme } from '../../../../Providers/CustomThemeProvider'

// export default function LeftNavBar() {
//     const {isDark} = useTheme();
//     const generateSx = () => ({
//         color: isDark ? "#F7F9F9" : "#080303",
//     });
//     return (
//         <Box>
//              <Logo to= {ROUTES.ROOT} label={"PIE"} />
//              <NavItem to={ROUTES.SUMMARY_PAGE} label={"Summery Page"}sx={generateSx()}/>
//         </Box>
//     );
// }
    

import { Box } from '@mui/material';
import React from 'react';
import Logo from '../TheLogo/Logo';
import NavItem from '../../../../Routes/Components/NavItem';
import ROUTES from '../../../../Routes/routesModel';
import { useTheme } from '../../../../Providers/CustomThemeProvider';
import theme from '../../../../Styles/theme';

export default function LeftNavBar() {
  const { isDark } = useTheme();

  const generateSx = () => ({
    color: isDark ? theme.colors.background : 'white', // טקסט לבן כברירת מחדל
    fontWeight: 500,
    fontSize: '1rem',
    marginLeft: 2,
    '&:hover': {
      color: theme.colors.secondary,
    },
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Logo to={ROUTES.ROOT} label="PIE" />
      <NavItem to={ROUTES.SUMMARY_PAGE} label="Summary Page" sx={generateSx()} />
      <NavItem to={ROUTES.ANNUAL_DASHBOARD} label="Yearly"  sx={generateSx()} />

    </Box>
  );
}

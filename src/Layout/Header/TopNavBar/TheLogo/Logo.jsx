// import { Typography } from '@mui/material'
// import NavBarLink from '../../../../Routes/Components/NavBarLink';
// import { useTheme } from '../../../../Providers/CustomThemeProvider';


// export default function Logo({ to }) {
//   const {isDark} = useTheme();
//   return (
//     <>
//       <NavBarLink sx={{color: isDark? "#F7F9F9" : "#080303",}} to={to}>
//         <Typography variant='h4' sx={{ marginRight: 2, fontFamily: "fantasy", display: { sx: "none", md: "inline-flex" } }}>
//         DoughFlow
//         </Typography>
//       </NavBarLink>

//     </> 
//   );
// }

import { Typography } from '@mui/material';
import NavBarLink from '../../../../Routes/Components/NavBarLink';
import { useTheme } from '../../../../Providers/CustomThemeProvider';
import theme from '../../../../Styles/theme';

export default function Logo({ to }) {
  const { isDark } = useTheme();

  return (
    <NavBarLink
      to={to}
      sx={{
        color: isDark ? theme.colors.background : 'white',
        textDecoration: 'none',
        '&:hover': {
          color: theme.colors.secondary,
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginRight: 2,
          fontFamily: theme.fonts.main,
          fontWeight: 700,
          display: { xs: 'none', md: 'inline-flex' },
          letterSpacing: '0.5px',
        }}
      >
        DoughFlow
      </Typography>
    </NavBarLink>
  );
}

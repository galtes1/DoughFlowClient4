// import React from 'react'
// import NavBarLink from './NavBarLink'
// import { Button, Typography } from '@mui/material'

// export default function NavItem({ to, sx, label }) {
//     return (
//         <NavBarLink to={to} sx={sx}>
//             <Button color="inherit">
//                 <Typography variant="customBody"> {label} </Typography>
//             </Button>
//         </NavBarLink>
//     );
// }

import React from 'react';
import NavBarLink from './NavBarLink';
import { Typography } from '@mui/material';
import theme from '../../Styles/theme';

export default function NavItem({ to, sx = {}, label }) {
  return (
    <NavBarLink
      to={to}
      sx={{
        color: 'white',
        textDecoration: 'none',
        padding: '4px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: theme.colors.secondary,
          color: 'white',
        },
        ...sx,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontFamily: theme.fonts.main,
          fontWeight: 500,
          fontSize: '1rem',
        }}
      >
        {label}
      </Typography>
    </NavBarLink>
  );
}

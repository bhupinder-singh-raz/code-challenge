import { SxProps, Theme } from '@mui/material';


export const LoaderContainerStyle = (theme: Theme) : SxProps<Theme> => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '100vh',
  width: '100vw',
});
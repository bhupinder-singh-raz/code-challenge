import { SxProps, Theme } from '@mui/material';

export const listContainerStyle = (theme: Theme): SxProps<Theme> => ({
  mt: "80px",
  display: "flex",
  ml: "10px",
  justifyContent: "space-between"
});

export const listStyle = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
  },
});

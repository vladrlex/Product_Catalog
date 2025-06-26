import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export const Loader = () => {
  return (
    <div className='product__loader'>
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
}
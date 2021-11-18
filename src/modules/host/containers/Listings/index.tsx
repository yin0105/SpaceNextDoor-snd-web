import { Grid } from '@material-ui/core';
import Listing from '../../components/Listing';

const Listings: React.FC<any> = () => (
  <>
    <Grid container justify="center">
      <Grid item xs={10}>
        <Listing />
      </Grid>
    </Grid>
  </>
);

export default Listings;

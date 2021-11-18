import { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Hidden from '@material-ui/core/Hidden';
import InfiniteScroll from 'react-infinite-scroll-component';
import HostReservationsStore from '../../store/HostReservationsStore';
import { BookingsFilter, BookingStatus } from '../../../../typings/graphql.types';
import Table from '../Table';
import useStyles from './styles';
import ReservationLoader from '../ReservationLoader';
import DesktopTabs from '../DesktopTabs';
import MobileVersion from '../MobileVersion';
import { Roles } from '../../contants/role';
import usePageTranslation from '../../../../hooks/usePageTranslation';

interface IReservationsTabsProps {
  hostReservationsStore?: HostReservationsStore;
  role: Roles;
}

const ReservationsTabs: React.FC<IReservationsTabsProps> = ({ hostReservationsStore, role }) => {
  const classes = useStyles();
  const { t } = usePageTranslation('hostReservation', 'Tabs');
  const [value, setValue] = useState('ALL');
  const {
    reservations,
    errorMessage,
    fetchReservations,
    isLoading,
    total,
    hasMore,
    resetOffset,
  } = hostReservationsStore;

  useEffect(() => {
    fetchReservations({ role });
  }, []);

  const handleChange = (_: any, newValue: string) => {
    resetOffset();
    if (newValue !== 'ALL') {
      const filters: BookingsFilter = { status: { _eq: BookingStatus[newValue] } };
      fetchReservations({ filters, role });
    } else {
      fetchReservations({ role });
    }
    setValue(newValue);
  };

  const loadMore = () => {
    const filters: BookingsFilter = { status: { _eq: BookingStatus[value] } };
    const payload: any = {
      isLoadMore: true,
      role,
    };
    if (value !== 'ALL') {
      payload.filters = filters;
    }

    fetchReservations(payload);
  };

  const renderTabItem = () => {
    if (isLoading) {
      return (<ReservationLoader items={[1, 2, 3]} />);
    }

    return (
      <Table data={reservations} role={role} />
    );
  };

  const tabs: string[] = ['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  return (
    <div className={classes.root}>
      <InfiniteScroll
        dataLength={reservations?.length}
        next={loadMore}
        hasMore={hasMore}
        scrollThreshold={0.9}
        loader={<ReservationLoader items={[1]} />}
      >
        <Hidden xsDown>
          <DesktopTabs
            tabs={tabs}
            value={value}
            handleChange={handleChange}
            errorMessage={errorMessage}
          >
            {renderTabItem()}
          </DesktopTabs>
        </Hidden>
        <Hidden smUp>
          <MobileVersion
            tabs={tabs}
            value={value}
            handleChange={handleChange}
            errorMessage={errorMessage}
          >
            {renderTabItem()}
          </MobileVersion>
        </Hidden>
      </InfiniteScroll>
    </div>
  );
};

export default inject('hostReservationsStore')(observer(ReservationsTabs));

import Link from 'next/link';

import withAuth from '../hocs/withAuth';
import usePageTranslation from '../hooks/usePageTranslation';

const Profile = (props) => {
  const { auth: { user } } = props;
  const logout = () => {
    props.auth.logout();
  };
  const { t } = usePageTranslation('profile', 'Profile');
  return (
    <div>
      <h1>{t('h1')}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button type="button" onClick={() => logout()}>{t('button')}</button>
      <br />
      <Link href="/">{t('link')}</Link>
    </div>
  );
};

export default withAuth(Profile);

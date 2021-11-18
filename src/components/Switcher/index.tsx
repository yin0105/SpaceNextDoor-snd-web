import { useMutation } from '@apollo/client';
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react';
import { UPDATE_PROFILE_MUTATION } from 'modules/account/queries';
import { updateProfile, updateProfileVariables } from 'modules/account/queries/__generated__/updateProfile';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import { getCountry, useCurrentCountry, getSupportedCountries } from 'utilities/market';
import AuthStore, { AUTH_REFRESH_TOKEN_KEY, AUTH_STORE_KEY, AUTH_TOKEN_KEY } from '../../modules/app/stores/AuthStore';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5px',
    cursor: 'pointer',
    marginRight: '5px',
    textDecoration: 'underline',
    '& img': {
      width: '12px',
      marginLeft: '13px',
    },
  },
  dropdownMenu: {
    display: 'flex',
    flexFlow: 'column',
    background: '#fff',
    borderRadius: '5px',
    alignItems: 'center',
    padding: '5px',
    position: 'absolute',
    zIndex: 1,
    '& span': {
      textTransform: 'uppercase',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      cursor: 'pointer',
    },
    '& img': {
      width: '10px',
      marginLeft: '14px',
    },
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: '-80px',
    opacity: 0,
    transition: '0.3s ease',
    zIndex: -10,
    visibility: 'hidden',
  },
  switch: {
    padding: '10px 60px',
    background: theme.palette.grey[50],
    cursor: 'pointer',
  },
  switchActive: {
    marginTop: 0,
    opacity: 1,
    visibility: 'inherit',
  },
}));

interface IProps {
  comp: 'lang' | 'country';
  use?: 'independent' | 'dependent';
  [AUTH_STORE_KEY]?: AuthStore;
  isDropdownOpen?: boolean
  disabled?: boolean
}

const Switcher: React.FC<IProps> = ({
  comp, auth, use = 'independent', isDropdownOpen, disabled,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const supportedCountries = getSupportedCountries();
  const supportedLanguages = useCurrentCountry().locales;
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState<string>(null);
  // To avoid useEffect from running right after mounting,
  // It is enabled only when user interacts with the dropdown
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [updateProfileMutation] = useMutation<updateProfile, updateProfileVariables>(
    UPDATE_PROFILE_MUTATION,
  );
  // For language switch
  const changeLang = (val: string) => {
    if (auth?.user?.id) {
      updateProfileMutation({
        variables: {
          payload: {
            preferred_language: val,
          },
        },
      });
    }
    router.push(router.asPath, router.asPath, { locale: val });
  };

  const changeCountry = (country) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
    const url = ['https://', null, `${auth?.user?.id ? `/auth?token=${token}&refresh_token=${refreshToken}` : ''}`];
    const targetCountry = supportedCountries.find((i) => i.name === country);
    url[1] = targetCountry?.defaultDomain;
    const route = url.join('');
    router.push(route);
  };

  useEffect(() => {
    const country = getCountry(router.defaultLocale);
    if (comp === 'lang') {
      setValues(supportedLanguages);
      setValue(router.locale);
    } else if (comp === 'country') {
      setValues(supportedCountries.map((i) => i.name));
      setValue(country.name);
    }
  }, [comp, router.locale, router.defaultLocale]);

  useEffect(() => {
    if (isActive) {
      if (comp === 'lang') {
        changeLang(value);
      } else if (comp === 'country') {
        changeCountry(value);
      }
    }
  }, [value]);

  const defaultSwitcher = () => (
    <div role="presentation" style={{ width: 'max-content' }} onClick={() => setIsActive(true)} ref={ref}>
      <span role="presentation" className={classes.dropdown} onClick={() => !disabled && setIsOpen(!isOpen)}>
        {value}
        <img src="/images/Host/arrow-down.svg" alt="arrow-down" />
      </span>
      {isOpen && (
        <div className={classes.dropdownMenu}>
          {values.map((val) => (
            <span
              role="presentation"
              key={val}
              onClick={(e) => {
                e.stopPropagation();
                setValue(val);
                setIsOpen(false);
              }}
            >
              {val}
              {' '}
              {val === value && <img src="/images/tick.svg" alt="" />}
              {' '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
  const dropDownOnlySwitcher = () => (
    <div
      style={!isDropdownOpen ? { display: 'none' } : {}}
      role="presentation"
      className={clsx(classes.container, isDropdownOpen && classes.switchActive)}
    >
      {values.map((val) => (
        <span
          role="presentation"
          key={val}
          className={classes.switch}
          onClick={() => {
            if (!isActive) setIsActive(true);
            setValue(val);
          }}
          style={{ background: value !== val && 'white' }}
        >
          {val.toLocaleUpperCase()}
        </span>
      ))}
    </div>
  );
  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      {use === 'independent' ? defaultSwitcher() : dropDownOnlySwitcher()}
    </ClickAwayListener>
  );
};

export default inject(AUTH_STORE_KEY)(observer(Switcher));

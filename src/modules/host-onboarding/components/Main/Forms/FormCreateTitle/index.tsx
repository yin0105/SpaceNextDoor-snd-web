import { Box, makeStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import MainInput from '../../../../../../components/Inputs/MainInput';
import { UPDATE_SITE } from '../queries/query';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';
import { getTranslatedName, useTranslatedCountryName } from '../../../../../../utilities/market';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '100px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  paddingRight: {
    paddingRight: '80px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0',
    },
  },
  formBox: {
    marginTop: '42px',
  },
  inputBox: {
    marginTop: '16px',
    paddingRight: '150px',
  },
  input: {
    paddingLeft: '15px',
  },
  error: {
    borderColor: '#E53535',
  },
  errorText: {
    color: '#E53535',
    marginTop: '10px',
  },
}));

interface IProps {
  siteId: number;
  changeStep: (step) => void;
  store?: HostOnboardingStore;
}

const FormCreateTitle: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { siteId, changeStep, store } = props;
  const { locale } = useRouter();
  const { t } = usePageTranslation('hostOnBoarding', 'FormCreateTitle');
  const countryNameT = useTranslatedCountryName();

  const [updateSite] = useMutation(UPDATE_SITE);
  const [form, setForm] = useState({
    ok: '',
    title: { val: '', errorClass: '', isRequired: false },
  });
  const [loading, setLoading] = useState(false);

  const setFormVal = (name, val) => {
    setForm({ ...form, [name]: val });
  };

  useEffect(() => {
    setFormVal('title', {
      ...form.title, val: getTranslatedName(store?.site, 'name', locale) || '',
    });
  }, [store?.site]);

  const handleChangeTitleInput = (e) => {
    const { value } = e.target;
    const errorClass = value.trim() === '' ? classes.error : '';
    const isRequired = value.trim() === '';
    setFormVal('title', {
      ...form.title, val: value, errorClass, isRequired,
    });
  };

  const handleSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    if (!form.title.val) {
      const errorClass = form?.title?.val.trim() === '' ? classes.error : '';
      const isRequired = form?.title?.val.trim() === '';
      setFormVal('title', {
        ...form.title, val: form?.title?.val, errorClass, isRequired,
      });
      return;
    }

    setLoading(true);
    updateSite({
      variables: {
        siteId,
        payload: { name: form?.title?.val },
      },
    }).then((result: any): any => {
      setLoading(false);
      const { errors } = result;

      if (errors && errors[0]) {
        // eslint-disable-next-line no-console
        console.error(errors[0].message);
        return;
      }
      changeStep('next');
    })
      .catch((error: any): void => {
        setLoading(false);

        if (error.message !== '') {
          // eslint-disable-next-line no-console
          console.error(`${error.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });
  };

  useEffect(() => {
    props.store.setStepSavingFunction(handleSubmit);
  }, [form]);

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.paddingRight}>
        <Box>
          <Typography variant="h1">
            {t('typography')}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Grey3Typography />
          </Box>

          <Box className={classes.inputBox}>
            <MainInput
              fullWidth
              placeholder={t('placeholder', { locale, country: countryNameT })}
              inputProps={{ className: `${classes.input} ${form.title.errorClass}` }}
              value={form.title.val}
              onChange={handleChangeTitleInput}
            />
            {
              form?.title?.isRequired && (
                <Grey3Typography className={classes.errorText}>
                  {t('grey3Typography')}
                </Grey3Typography>
              )
            }
          </Box>

          <Buttons isLoading={loading} changeStep={changeStep} />
        </form>

      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormCreateTitle));

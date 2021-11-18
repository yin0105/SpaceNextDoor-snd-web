import {
  Box, makeStyles, Typography, TextareaAutosize,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import { UPDATE_SITE } from '../queries/query';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';
import { getTranslatedName } from '../../../../../../utilities/market';

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
    marginTop: '20px',
  },
  textAreaBox: {
    marginTop: '40px',
  },
  textArea: {
    width: '100%',
    border: '1px solid #989898',
  },
  error: {
    borderColor: '#E53535',
  },
  errorText: {
    color: '#E53535',
  },
}));

interface IProps {
  siteId: number;
  changeStep: (step) => void
  store?: HostOnboardingStore;
}

const FormDescribePlace: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { siteId, changeStep, store } = props;
  const { locale } = useRouter();
  const { t } = usePageTranslation('hostOnBoarding', 'FormDescribePlace');

  const [updateSite] = useMutation(UPDATE_SITE);
  const [form, setForm] = useState({
    description: { val: '', errorClass: '', isRequired: false },
  });
  const [loading, setLoading] = useState(false);

  const setFormVal = (name, val) => {
    setForm({ ...form, [name]: val });
  };

  useEffect(() => {
    setFormVal('description', {
      ...form.description, val: getTranslatedName(store?.site, 'description', locale) || '',
    });
  }, [store?.site]);

  const handleChangeDescriptionInput = (e) => {
    const { value } = e.target;
    const errorClass = value.trim() === '' ? classes.error : '';
    const isRequired = value.trim() === '';
    setFormVal('description', {
      ...form.description, val: value, errorClass, isRequired,
    });
  };

  const handleSubmit = (e?) => {
    if (e) {
      e.preventDefault();
    }

    if (!form.description.val) {
      const errorClass = form?.description?.val.trim() === '' ? classes.error : '';
      const isRequired = form?.description?.val.trim() === '';
      setFormVal('description', {
        ...form.description, val: form?.description?.val, errorClass, isRequired,
      });
      return;
    }
    setLoading(true);
    updateSite({
      variables: {
        siteId,
        payload: { description: form?.description?.val },
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
    store.setStepSavingFunction(handleSubmit);
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
            <Grey3Typography variant="body1" />
          </Box>
          <Box className={classes.textAreaBox}>
            <TextareaAutosize
              rowsMin={20}
              className={`${classes.textArea} ${form.description.errorClass}`}
              value={form.description.val}
              onChange={handleChangeDescriptionInput}
            />
            {
              form?.description?.isRequired && (
                <Grey3Typography variant="body1" className={classes.errorText}>
                  {t('grey3Typography')}
                </Grey3Typography>
              )
            }
          </Box>

          <Buttons changeStep={changeStep} isLoading={loading} />
        </form>

      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormDescribePlace));

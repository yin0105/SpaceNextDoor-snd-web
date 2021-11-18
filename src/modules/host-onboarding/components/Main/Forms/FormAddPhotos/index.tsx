import { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import QS from 'query-string';
import { inject, observer } from 'mobx-react';

import axios from '../../../../../../shared/axios';
import Buttons from '../Buttons';
import Grey3Typography from '../../../../../../components/Typographies/Grey3Typography';
import PrimaryButton from '../../../../../../components/Buttons/PrimaryButton';
import WhiteTypography from '../../../../../../components/Typographies/WhiteTypography';
import Image from '../../../../../../components/Image';
import { API_BASE_URL } from '../../../../../../config';
import { UPDATE_SITE } from '../queries/query';
import { UpdateSite, UpdateSiteVariables } from '../queries/__generated__/UpdateSite';
import HostOnboardingStore, { ONBOARDING_STORE } from '../../../../stores/HostOnboardingStore';
import usePageTranslation from '../../../../../../hooks/usePageTranslation';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    maxWidth: '630px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '120px 20px',
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
    marginTop: '24px',
  },
  imageBox: {
    marginTop: '40px',
    position: 'relative',
  },
  paddingTop: {
    paddingTop: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
  absoluteBox: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #989898',
  },
  buttonBox: {
    position: 'relative',
  },
  buttonImageBox: {
    position: 'absolute',
    top: '18px',
    left: '15px',
    zIndex: 1,
  },
  button: {
    padding: '20px 20px 20px 48px',
    borderRadius: '20px',
  },
  buttonText: {
    fontWeight: 700,
  },
  //
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 42,
  },
  thumb: {
    display: 'inline-flex',
    marginBottom: 8,
    marginRight: 8,
    width: 110,
    height: 110,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative',
  },
  cross: {
    position: 'absolute',
    right: -3,
    top: -5,
    cursor: 'pointer',
  },

  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },

  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
}));

interface IProps {
  siteId: number;
  changeStep: (step) => void;
  store?: HostOnboardingStore;
}

const FormAddPhotos: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const { siteId, changeStep, store } = props;

  const [updateSite] = useMutation<UpdateSite, UpdateSiteVariables>(UPDATE_SITE);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = usePageTranslation('hostOnBoarding', 'FormAddPhotos');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        files.concat(
          acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file),
          })),
        ),
      );
    },
  });

  useEffect(() => {
    setFiles((store?.site?.images || []).map((url) => ({
      preview: url,
      isUploaded: true,
    })));
  }, [store?.site?.images]);

  const handleSubmit = async (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    if (!files.length) {
      return;
    }

    const filesToUpload = files.filter((f) => !f.isUploaded);
    const uploadedFiles = files.filter((f) => f.isUploaded).map((f) => f.preview);
    const formData = new FormData();
    filesToUpload.forEach((file) => formData.append('files', file));

    setLoading(true);
    try {
      if (filesToUpload.length) {
        const query = QS.stringify({
          uploadType: 'site',
          compressImage: false,
          resizeWidth: 3000,
        });
        const url = `${API_BASE_URL}/media/upload_images?${query}`;
        const { data } = await axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadedFiles.push(...data.files.map((file) => `${data.bucketUrl}/${file.key}`));
      }

      await updateSite({ variables: { siteId, payload: { images: uploadedFiles } } });

      setLoading(false);
      changeStep('next');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => () => {
    props.store.setStepSavingFunction(handleSubmit);
  }, []);

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.paddingRight}>
        <Box>
          <Grey3Typography variant="h1">
            {t('grey3Typography')}
          </Grey3Typography>
        </Box>
      </Box>
      <Box className={classes.formBox}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Grey3Typography variant="body1" />
          </Box>
          <Box className={classes.imageBox}>
            <Box className={classes.paddingTop} />
            <Box className={classes.absoluteBox}>
              <Box className={classes.buttonBox} {...getRootProps()}>
                <Box className={classes.buttonImageBox}>
                  <Image name="cloud" folder="LoginPage" />
                </Box>
                <PrimaryButton className={classes.button}>
                  <input {...getInputProps()} />
                  <WhiteTypography className={classes.buttonText}>
                    {t('whiteTypography')}
                  </WhiteTypography>
                </PrimaryButton>
              </Box>
            </Box>
          </Box>

          <Box className={classes.thumbsContainer}>
            {files.map((file, key) => (
              <div className={classes.thumb} key={`${file.name}${key}`}>
                <Box className={classes.cross} onClick={() => removeFile(key)}>
                  <Image name="remove-preview" folder="Host" />
                </Box>
                <div className={classes.thumbInner}>
                  <img
                    src={file.preview}
                    className={classes.img}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </Box>

          <Buttons isLoading={loading} disabled={!files.length} changeStep={changeStep} />
        </form>

      </Box>
    </Box>
  );
};

export default inject(ONBOARDING_STORE)(observer(FormAddPhotos));

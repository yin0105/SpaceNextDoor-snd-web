import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButton from '../../../../../../../../components/RadioButton';
import { ProviderType } from '../../../../../../../../typings/graphql.types';
import usePageTranslation from '../../../../../../../../hooks/usePageTranslation';

interface IProps {
  value: string;
  setSelectedValue: (e) => void
}

const Radios:React.FC<IProps> = (props) => {
  const { value, setSelectedValue } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const { t } = usePageTranslation('hostOnBoarding', 'Radios');
  return (
    <RadioGroup defaultValue="a" aria-label="gender" name="customized-radios">
      <FormControlLabel
        control={(
          <RadioButton
            value={ProviderType.BUSINESS}
            checked={value === ProviderType.BUSINESS}
            onChange={handleChange}
          />
        )}
        label={t('label1')}
      />
      <FormControlLabel
        control={(
          <RadioButton
            value={ProviderType.INDIVIDUAL}
            checked={value === ProviderType.INDIVIDUAL}
            onChange={handleChange}
          />
        )}
        label={t('label2')}
      />
    </RadioGroup>
  );
};

export default Radios;

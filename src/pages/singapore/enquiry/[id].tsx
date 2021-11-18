import React from 'react';
import { Widget } from '@typeform/embed-react';
import { ESTIMATION_FORM_ID } from 'config';

const Enquiry: React.FunctionComponent = () => (
  <Widget id={ESTIMATION_FORM_ID} style={{ position: 'inherit', height: '520px' }} />
);

export default Enquiry;

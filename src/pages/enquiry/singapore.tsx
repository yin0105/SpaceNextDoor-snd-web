import React from 'react';
import { Widget } from '@typeform/embed-react';
import * as gtag from 'utilities/gtag';
import { useRouter } from 'next/router';
import {
  AFFLIATE_TYPEFORM_ID_EN,
  AFFLIATE_TYPEFORM_ID_JP,
} from '../../config';
import { useCurrentCountry } from '../../utilities/market';
// Reference document
// https://github.com/Typeform/embed/blob/main/packages/embed/README.md#options

const eventData = [
  {
    id: '3643e2e1-c69b-415d-a070-8d38ccb0da65',
    name: 'Name_Requested',
  },
  {
    id: '79cc4780-2c8b-4917-a65d-539c8d771e26',
    name: 'Email_Requested',
  },
  {
    id: 'e45cd103-c33c-4ab8-9547-a7f0d9176841',
    name: 'Phone_Number_Requested',
  },
  {
    id: 'be955747-67b7-4059-8022-4086f7212f1b',
    name: 'Preferred_Location_Requested',
  },
  {
    id: 'f942e077-c5de-4e60-a0a1-fc009c740d10',
    name: 'Start_Date_Requested',
  },
  {
    id: 'f621c767-a412-4cae-90f8-02a2974165bd',
    name: 'Contact_Method_Requested',
  },
];

declare const window: any;

const SingaporeEnquiry: React.FC = () => {
  const { locale } = useRouter();
  const currentCountry = useCurrentCountry().name;
  let { formId } = useCurrentCountry();
  if (currentCountry === 'Japan') {
    if (locale === 'ja') {
      formId = AFFLIATE_TYPEFORM_ID_JP;
    } else {
      formId = AFFLIATE_TYPEFORM_ID_EN;
    }
  }

  return (
    <Widget
      id={formId}
      onReady={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window && (window.step = 0);
      }}
      onQuestionChanged={(data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window && (window.step += 1);
        const matchedEvent = eventData.find((item) => item.id === data.ref);
        if (matchedEvent) {
          // prevent double tracking if it's the first question
          // TODO: we need to remove this once the double event triggeration has been fixed.
          if (matchedEvent.id === '3643e2e1-c69b-415d-a070-8d38ccb0da65' && window.step === 1) {
            gtag.track(matchedEvent.name, matchedEvent);
          }
          if (window.step > 2) {
            gtag.track(matchedEvent.name, matchedEvent);
          }
        }
      }}
      onSubmit={(data) => {
        const formSubmitPayload = {
          eventName: 'TypeformSubmit',
          elementId: data.responseId,
        };
        gtag.track('typeform_submit', formSubmitPayload);
      }}
      style={{ position: 'inherit', height: '100vh' }}
    />
  );
};

export default SingaporeEnquiry;

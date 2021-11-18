import { TranslationQuery } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';

interface IReturnType {
  t: (fieldName: string, query?: TranslationQuery) => string;
}

type CustomTranslation = (
  fileName: string,
  ComponentName: string
) => IReturnType;

const usePageTranslation: CustomTranslation = (
  fileName: string,
  componentName: string,
) => {
  const { t } = useTranslation(fileName);
  return {
    t: (fieldName: string, query?: TranslationQuery) => t(`${componentName}_${fieldName}`, query),
  };
};

export default usePageTranslation;

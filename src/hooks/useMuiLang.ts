import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
// ----------------------------------------------------------------------

export default function useMuiLang() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [muiLang, setLang] = useState<string | undefined>(currentLanguage);
  useEffect(() => {
    switch (currentLanguage) {
      case 'en':
        setLang('en');
        break;
      case 'vi':
        setLang('vi');
        break;
      default:
        setLang('zh-tw');
        break;
    }
  }, [currentLanguage]);
  return [muiLang, setLang];
}

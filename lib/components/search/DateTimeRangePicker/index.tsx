import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getDateRange } from '@utils/date';
// material-ue
import { FormControl, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomizedDateTimePicker from '../../../../src/components/dateTimePicker';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
// custom
import { isMobile } from 'react-device-detect';
import dayjs, { Dayjs } from 'dayjs';

import useMuiLang from '@hooks/useMuiLang';

const SearchDateTimeRangePicker = ({
  showShortcutsItems = true,
  views = ['year', 'month', 'day', 'hours', 'minutes', 'seconds'],
  format = 'YYYY-MM-DD HH:mm:ss',
  placeholderI18nKey,
  start,
  end,
  startKey,
  endKey,
  setValue,
  sysTime = dayjs().format('YYYY-MM-DD HH:mm:ss'),
}: {
  showShortcutsItems?: boolean;
  views?: ('hours' | 'minutes' | 'month' | 'day' | 'seconds' | 'year')[];
  format?: string;
  placeholderI18nKey?: string;
  start: string;
  end: string;
  startKey: string;
  endKey: string;
  setValue: (key: string, value: string) => void;
  sysTime: string;
}) => {
  const { t } = useTranslation();
  const [muiLang] = useMuiLang();
  const [startValue, setStartValue] = useState<Dayjs | null>(null);
  const [endValue, setEndValue] = useState<Dayjs | null>(null);
  const shortcutsItems = useMemo(
    () => [
      {
        label: t('lib.today'),
        getValue: () => {
          const dateRange = getDateRange(sysTime, 'today');
          setStartValue(dateRange[0]);
          setEndValue(dateRange[1]);
        },
      },
      {
        label: t('lib.yesterday'),
        getValue: () => {
          const dateRange = getDateRange(sysTime, 'yesterday');
          setStartValue(dateRange[0]);
          setEndValue(dateRange[1]);
        },
      },
      {
        label: t('lib.thisWeek'),
        getValue: () => {
          const dateRange = getDateRange(sysTime, 'thisWeek');
          setStartValue(dateRange[0]);
          setEndValue(dateRange[1]);
        },
      },
      {
        label: t('lib.lastWeek'),
        getValue: () => {
          const dateRange = getDateRange(sysTime, 'lastWeek');
          setStartValue(dateRange[0]);
          setEndValue(dateRange[1]);
        },
      },
      {
        label: t('lib.pass7Days'),
        getValue: () => {
          const dateRange = getDateRange(sysTime, 'pass7Days');
          setStartValue(dateRange[0]);
          setEndValue(dateRange[1]);
        },
      },
    ],
    [t, sysTime],
  );

  useEffect(() => {
    if (dayjs(start).isValid()) {
      setStartValue(dayjs(start));
    }
    if (dayjs(end).isValid()) {
      setEndValue(dayjs(end));
    }
  }, []);

  useEffect(() => {
    // if (startValue === null || endValue === null) return;
    if (dayjs(startValue).isValid() === false) {
      setValue(startKey, '');
    }
    if (dayjs(endValue).isValid() === false) {
      setValue(endKey, '');
    }
    if (dayjs(startValue).isValid() && dayjs(endValue).isValid()) {
      setValue(startKey, dayjs(startValue).format('YYYY-MM-DD HH:mm:ss'));
      setValue(endKey, dayjs(endValue).format('YYYY-MM-DD HH:mm:ss'));
    }
  }, [startValue, endValue]);

  const MemoizedCustomizedDateTimePicker = React.memo(CustomizedDateTimePicker);

  const handleStartChange = useCallback(
    (newValue: Dayjs | null) => {
      setStartValue(newValue);
    },
    [setStartValue],
  );

  const handleEndChange = useCallback(
    (newValue: Dayjs | null) => {
      setEndValue(newValue);
    },
    [setEndValue],
  );
  const startComp = useCallback(() => {
    return (
      <MemoizedCustomizedDateTimePicker
        label={placeholderI18nKey ? `${t(placeholderI18nKey)}-${t('lib.start')}` : t('lib.start')}
        views={views}
        format={format}
        maxDate={dayjs()}
        value={startValue}
        onChange={handleStartChange}
      />
    );
  }, [startValue, endValue, handleStartChange]);

  const endComp = useCallback(() => {
    return (
      <MemoizedCustomizedDateTimePicker
        label={placeholderI18nKey ? `${t(placeholderI18nKey)}-${t('lib.end')}` : t('lib.end')}
        views={views}
        format={format}
        minDate={startValue}
        value={endValue}
        onChange={handleEndChange}
      />
    );
  }, [startValue, endValue, handleEndChange]);

  return (
    <FormControl fullWidth>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={muiLang}
        localeText={{ okButtonLabel: t('lib.confirm'), cancelButtonLabel: t('lib.cancel') }}
      >
        <MultiInputDateTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              component: position === 'start' ? startComp : endComp,
            }),
          }}
        />
      </LocalizationProvider>
      {showShortcutsItems && (
        <Grid container sx={{ ml: 0.5 }}>
          {shortcutsItems.map((item, index) => {
            return (
              <Button
                key={`dateTime${index}`}
                variant="outlined"
                sx={{ mt: 1, mr: isMobile ? 0.5 : 2 }}
                onClick={() => {
                  item.getValue();
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Grid>
      )}
    </FormControl>
  );
};
export default React.memo(SearchDateTimeRangePicker);

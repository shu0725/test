import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getDateRange, dayType, dayTypeValues } from '@utils/date';
// material-ui
import { FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRange, DateRangePickerToolbar } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';
import {
  PickersShortcutsItem,
  PickerShortcutChangeImportance,
} from '@mui/x-date-pickers/PickersShortcuts';
// ant-design
import { CalendarOutlined, CloseOutlined } from '@ant-design/icons';
// custom
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import React from 'react';
import useMuiLang from '@src/hooks/useMuiLang';
import PropTypes from 'prop-types';
// import '@components/dateTimePicker/index.scss';
import './index.scss';

const SearchDateRangePicker = ({
  placeholder = '',
  disabled,
  defaultType = 'null',
  start,
  end,
  startKey,
  endKey,
  setValue,
  sysTime = dayjs().format('YYYY-MM-DD'),
}: {
  placeholder: string;
  disabled?: boolean;
  defaultType?: dayType;
  start: string;
  end: string;
  startKey: string;
  endKey: string;
  setValue: (key: string, value: string) => void;
  sysTime: string;
}) => {
  const { t } = useTranslation();
  const [muiLang] = useMuiLang();
  const [changeImportance, setChangeImportance] =
    useState<PickerShortcutChangeImportance>('accept');
  const [dateValue, setdateValue] = useState<DateRange<Dayjs>>([dayjs(start), dayjs(end)]);
  const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = dayTypeValues.map(
    (type: string) => ({
      label: t(`lib.${type}`),
      getValue: () => {
        const date = getDateRange(sysTime, type as dayType);
        return [date[0], date[1]];
      },
    }),
  );

  const fcSetValues = useCallback(
    (dateAry: Dayjs[]) => {
      setdateValue([dateAry[0], dateAry[1]]);
      setValue(startKey, dateAry[0].format('YYYY-MM-DD'));
      setValue(endKey, dateAry[1].format('YYYY-MM-DD'));
    },
    [endKey, setValue, startKey],
  );

  useEffect(() => {
    if (defaultType === 'null') return;
    const dateAry = getDateRange(sysTime, defaultType);
    fcSetValues(dateAry);
  }, [defaultType, fcSetValues, sysTime]);

  return (
    <FormControl fullWidth>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={muiLang}
        localeText={{ okButtonLabel: t('lib.confirm'), cancelButtonLabel: t('lib.cancel') }}
      >
        <DateRangePicker
          format="YYYY-MM-DD"
          readOnly={disabled}
          label={placeholder}
          value={dateValue}
          onChange={(newValue: any) => {
            if (newValue[0]?.isValid() && newValue[1]?.isValid()) {
              fcSetValues(newValue);
            }
          }}
          dayOfWeekFormatter={(_day, weekday: any) => `${weekday.format('dd')}`}
          slots={{
            field: SingleInputDateTimeRangeField,
            toolbar: DateRangePickerToolbar,
          }}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
              changeImportance,
            },
            textField: {
              InputProps: {
                sx: { cursor: 'pointer' },
                endAdornment:
                  disabled === false &&
                  dayjs(dateValue[0]).isValid() &&
                  dayjs(dateValue[1]).isValid() ? (
                    <CloseOutlined
                      onClick={() => {
                        const dateAry = getDateRange(sysTime, 'null');
                        fcSetValues(dateAry);
                      }}
                    />
                  ) : (
                    <CalendarOutlined />
                  ),
              },
              error: false,
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

SearchDateRangePicker.propTypes = {
  /**
   * Placeholder text for the date range picker input
   */
  placeholder: PropTypes.string,

  /**
   * Boolean to indicate if the date range picker is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Default type for the date range picker
   */
  defaultType: PropTypes.oneOf(dayTypeValues),

  /**
   * Default start date value (required)
   */
  start: PropTypes.string.isRequired,

  /**
   * Default end date value (required)
   */
  end: PropTypes.string.isRequired,

  /**
   * Key for the start date (required)
   */
  startKey: PropTypes.string.isRequired,

  /**
   * Key for the end date (required)
   */
  endKey: PropTypes.string.isRequired,

  /**
   * 設定父層state值(required)
   */
  setValue: PropTypes.func.isRequired,

  /**
   * 後端傳來的系統時間
   */
  sysTime: PropTypes.string,
};

SearchDateRangePicker.defaultProps = {
  placeholder: '',
  disabled: false,
  defaultType: 'null',
  sysTime: dayjs().format('YYYY-MM-DD'),
  start: '',
  end: '',
  startKey: 'startDate',
  endKey: 'endDate',
  setValue: (key: string, value: string) => console.log(key, value),
};
export default React.memo(SearchDateRangePicker);

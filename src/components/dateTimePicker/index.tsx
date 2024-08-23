import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CustomLayout from './layout';
import ActionBar from './actionbar';
import './index.scss';
export default function CustomizedDateTimePicker(props: any) {
  return (
    <DateTimePicker
      slots={{
        layout: CustomLayout,
        actionBar: ActionBar,
      }}
      dayOfWeekFormatter={(_day, weekday: any) => `${weekday.format('dd')}`}
      {...props}
    />
  );
}

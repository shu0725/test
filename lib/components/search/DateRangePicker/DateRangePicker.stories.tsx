import DateRangePicker from '.';

export default {
  title: 'Search/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // decorators: [
  //   (Story: any) => (
  //     <ThemeCustomization>
  //       <I18nextProvider i18n={i18n}>
  //         <Lang />
  //         <Story />
  //       </I18nextProvider>
  //     </ThemeCustomization>
  //   ),
  // ],
};
export const Primary = {
  args: {
    placeholder: 'Select Date Range',
    disabled: false,
    start: '2024-08-23',
    end: '2024-08-26',
    startKey: 'startDate',
    endKey: 'endDate',
    setValue: (key: string, value: string) => console.log(key, value),
  },
};

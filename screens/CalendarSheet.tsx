import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useBookingDate } from '../context/BookingContext';

function CalendarSheet() {
  const COLORS = {
    background: '#2a3239',
    border: '#5a5e64',

    primary: '#f59e0b',
    primaryDark: '#d97706',

    text: '#ffffff',
    textSecondary: '#bdbdbd',
  };
  const { selectedDate, setSelectedDate } = useBookingDate();
  const handleSelectDate = (date: string) => {
    if (date) setSelectedDate(date);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Calendar
        theme={{
          backgroundColor: '#2a3239',
          calendarBackground: '#2a3239',

          monthTextColor: '#fff',
          dayTextColor: '#fff',
          textSectionTitleColor: '#fff',

          selectedDayBackgroundColor: '#f59e0b',
          selectedDayTextColor: '#fff',

          todayTextColor: '#f59e0b',

          arrowColor: '#f59e0b',

          textDisabledColor: '#666',
        }}
        enableSwipeMonths
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'red' },
        }}
        onDayPress={day => handleSelectDate(day.dateString)}
      />
    </View>
  );
}

export default CalendarSheet;

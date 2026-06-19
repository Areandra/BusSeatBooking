/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SelectSeatScreen from './screens/SelectSeatScreen';
import { SeatComponentInterface } from './components/SeatComponent';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar } from 'react-native-calendars';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [isExpress, setIsExpress] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);

    return !isNaN(date.getTime());
  };

  const handleSelectDate = (date: string) => {
    if (date) setSelectedDate(date);
    console.error(date);
  };

  const Stack = createNativeStackNavigator();

  return (
    <View style={[styles.container]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Select Bus Type"
            component={({ navigation }: any) => {
              return (
                <>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{
                        paddingInline: 16,
                        paddingBlock: 10,
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        setIsExpress(true);
                        navigation.push('Select Date');
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        Express
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={{
                        paddingInline: 16,
                        paddingBlock: 10,
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        setIsExpress(false);
                        navigation.push('Select Date');
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        Reguler
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Select Date"
            component={({ navigation }: any) => (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Calendar
                  enableSwipeMonths
                  markedDates={{
                    [selectedDate]: { selected: true, selectedColor: 'red' },
                  }}
                  onDayPress={day => handleSelectDate(day.dateString)}
                />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      paddingInline: 16,
                      paddingBlock: 10,
                      backgroundColor: 'red',
                      alignSelf: 'center',
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      if (isValidDate(selectedDate))
                        navigation.push('Select Screen');
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      Confirm Date
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Stack.Screen
            name="Select Screen"
            component={() => (
              <SelectSeatScreen
                selectedDate={selectedDate}
                isExpress={isExpress}
              />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default App;

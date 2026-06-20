/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SelectSeatScreen from './screens/SelectSeatScreen';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarSheet from './screens/CalendarSheet';
import { BookingProvider } from './context/BookingContext';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import Button from './components/Button';

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
  2;
  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);

    return !isNaN(date.getTime());
  };

  const Stack = createNativeStackNavigator();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: safeAreaInsets.bottom,
        },
      ]}
    >
      <BookingProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              options={({ navigation }: any) => ({
                headerRight: () => (
                  <Button
                    text="Book Seat"
                    handleSubmit={() => navigation.push('Select Seat')}
                    style={{}}
                  />
                ),
              })}
              name="Booking History"
              component={BookingHistoryScreen}
            />
            <Stack.Screen
              // options={({ navigation }: any) => ({
              //   headerRight: () => (
              //     <Button
              //       text="History"
              //       handleSubmit={() => navigation.push('Booking History')}
              //       style={{}}
              //     />
              //   ),
              // })}
              name="Select Seat"
              component={SelectSeatScreen}
            />
            <Stack.Screen
              name="Select Date"
              options={{
                presentation: 'formSheet',
                headerShown: false,
                sheetAllowedDetents: 'fitToContents',
              }}
              component={CalendarSheet}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BookingProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2a3239',
  },
});

export default App;

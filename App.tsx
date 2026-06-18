/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SelectSeatScreen from './screens/SelectSeatScreen';
import { SeatComponentInterface } from './components/SeatComponent';

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

  // dummyDataSeeders
  const seatDataSeader = (seatTotal: number) => {
    let data: SeatComponentInterface[] = [];
    let currentAlphabet = 64;
    for (let i = 0; i < seatTotal; i++) {
      if (!(i % 4)) currentAlphabet++;
      const seatIndexRow = (i % 4) + 1;
      const isWindow: boolean = [1, 4].includes(seatIndexRow);
      const curretSeat: SeatComponentInterface = {
        id: i.toString(),
        seatNumber: `${String.fromCharCode(currentAlphabet)}${seatIndexRow}`,
        isWindow: isWindow,
      };
      data.push(curretSeat);
    }
    console.error(data);
    return data;
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
        },
      ]}
    >
      <SelectSeatScreen seatData={seatDataSeader(20)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

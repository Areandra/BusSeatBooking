import { FlatList, StyleSheet, View } from 'react-native';
import SeatComponent, {
  SeatComponentInterface,
} from '../components/SeatComponent';

interface SelectSeatScreenInterface {
  seatData: SeatComponentInterface[];
}

function SelectSeatScreen({ seatData }: SelectSeatScreenInterface) {
  return (
    <View style={style.container}>
      <FlatList
        numColumns={4}
        keyExtractor={(item) => item.id}
        data={seatData}
        renderItem={(item) => (
          <SeatComponent
            id={item.item.id}
            isWindow={item.item.isWindow}
            seatNumber={item.item.seatNumber}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SelectSeatScreen;

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SeatComponentInterface } from './SeatComponent';

interface LiveTotalPriceInterface {
  selectedSeat: Set<String>;
  seatData: SeatComponentInterface[];
}

function LiveTotalPrice({ seatData, selectedSeat }: LiveTotalPriceInterface) {
  const selectedSeatData = seatData.filter(item => selectedSeat.has(item.id));
  const totalPrice = selectedSeatData.reduce((sum, item) => {
    return sum + item.price!;
  }, 0);
  return (
    <View style={style.container}>
      <View>
        {selectedSeat.size > 0 && <Text>Kursi Terpilih: </Text>}
        <FlatList
          horizontal
          ItemSeparatorComponent={() => (
            <Text style={{ marginInline: 4 }}>,</Text>
          )}
          data={selectedSeatData}
          renderItem={item => <Text>{item.item.seatNumber}</Text>}
        />
      </View>
      {selectedSeat.size > 0 && (
        <Text>Total Price: Rp.{totalPrice.toLocaleString('id')},00</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
  },
  selectedContainer: {
    flexDirection: 'row',
  },
});

export default LiveTotalPrice;

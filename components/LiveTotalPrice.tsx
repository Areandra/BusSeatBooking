import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SeatComponentInterface } from './SeatComponent';
import Button from './Button';

interface LiveTotalPriceInterface {
  selectedSeat: Set<String>;
  seatData: SeatComponentInterface[];
  handleSubmit: () => void;
}

function LiveTotalPrice({
  seatData,
  selectedSeat,
  handleSubmit,
}: LiveTotalPriceInterface) {
  const selectedSeatData = seatData.filter(item => selectedSeat.has(item.id));
  const totalPrice = selectedSeatData.reduce((sum, item) => {
    return sum + item.price!;
  }, 0);
  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={{ color: 'white' }}>Selected Seat: </Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={() => (
            <Text style={{ marginInline: 4, color: 'white' }}>,</Text>
          )}
          data={selectedSeatData}
          renderItem={item => (
            <Text style={{ color: 'white' }}>{item.item.seatNumber}</Text>
          )}
        />
        <Text style={{ color: 'white' }}>Total Price:</Text>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
          Rp.{totalPrice.toLocaleString('id')},00
        </Text>
      </View>
      <Button
        style={{
          alignSelf: 'center',
        }}
        text="Confirm Booking"
        handleSubmit={() => handleSubmit()}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#2a3239',
    paddingInline: 20,
    paddingBlock: 8,
    borderTopWidth: 2,
    borderColor: '#5a5e64',
    flexDirection: 'row',
  },
  selectedContainer: {
    flexDirection: 'row',
  },
});

export default LiveTotalPrice;

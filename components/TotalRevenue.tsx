import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SeatComponentInterface } from './SeatComponent';
import Button from './Button';

interface LiveTotalPriceInterface {
  totalRevenue: number;
}

function TotalRevenue({
totalRevenue
}: LiveTotalPriceInterface) {
  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={{ color: 'white' }}>Total Revenue:</Text>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
          Rp.{totalRevenue.toLocaleString('id')},00
        </Text>
      </View>
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

export default TotalRevenue;

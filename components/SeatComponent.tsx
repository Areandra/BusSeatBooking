import { Text, View } from 'react-native';

export interface SeatComponentInterface {
  id: string;
  seatNumber: string;
  isWindow: boolean;
}

function SeatComponent({ seatNumber, isWindow }: SeatComponentInterface) {
  return (
    <View>
      <Text>{seatNumber}</Text>
    </View>
  );
}

export default SeatComponent;

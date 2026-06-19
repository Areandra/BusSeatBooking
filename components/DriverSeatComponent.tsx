import { StyleSheet, View } from 'react-native';
import SteeringWheelComponenet from './SteeringWheelComponent';
import SeatComponent from './SeatComponent';

function DriverSeatComponent() {
  return (
    <View>
      <View style={style.container}>
        <SteeringWheelComponenet />
        <SeatComponent
          disabled={true}
          seatNumber=""
          isWindow={false}
          id="driver"
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: { width: 69, alignSelf: 'flex-end', marginBottom: 30 },
});

export default DriverSeatComponent;

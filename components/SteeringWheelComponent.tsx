import { StyleSheet, View } from 'react-native';

function SteeringWheelComponenet() {
  return (
    <View style={style.container}>
      <View style={{ flex: 1 }} />
      <View style={style.horizontalStick} />
      <View style={style.verticalStick} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: '100%',
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
    marginBottom: 8,
  },
  horizontalStick: { width: 36, height: 4, backgroundColor: 'black' },
  verticalStick: {
    flex: 1,
    width: 4,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
});

export default SteeringWheelComponenet;

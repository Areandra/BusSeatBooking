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
    borderColor: '#464f56',
    alignSelf: 'center',
    marginBottom: 8,
  },
  horizontalStick: { width: 36, height: 4, backgroundColor: '#464f56' },
  verticalStick: {
    flex: 1,
    width: 4,
    backgroundColor: '#464f56',
    alignSelf: 'center',
  },
});

export default SteeringWheelComponenet;

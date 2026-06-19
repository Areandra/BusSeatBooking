import { StyleSheet, View } from 'react-native';

function WindowComponent() {
  return <View style={style.container} />;
}

const style = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    width: 5,
    marginInline: -2,
    backgroundColor: 'blue',
    marginBlock: 4,
    borderRadius: 100,
  },
});

export default WindowComponent;

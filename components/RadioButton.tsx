import { Pressable, View } from 'react-native';

interface RadioButtonInterface {
  onPress(): void;
  selected: boolean;
}

function RadioButton({ onPress, selected }: RadioButtonInterface) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'white'
        }}
      >
        {selected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#4fd880',
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

export default RadioButton;

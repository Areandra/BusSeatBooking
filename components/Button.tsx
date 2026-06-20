import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Button({
  handleSubmit,
  text,
  style,
}: {
  handleSubmit: () => void;
  text: string;
  style: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity style={style} onPress={() => handleSubmit()}>
      <LinearGradient
        colors={['#f59e0b', '#d97706']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingInline: 16,
          paddingBlock: 10,
          backgroundColor: 'red',
          alignSelf: 'center',
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default Button;

import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface SeatComponentInterface {
  id: string;
  seatNumber?: string;
  isWindow?: boolean;
  price?: number;
  onClick?: (id: string) => void;
  isSelected?: boolean;
  isExpress?: boolean;
  disabled?: boolean;
  isBooked?: boolean;
}

function SeatComponent({
  id,
  seatNumber,
  isWindow,
  onClick,
  isSelected,
  isExpress = false,
  disabled = false,
  isBooked = false,
}: SeatComponentInterface) {
  const thameColor = isBooked ? '#464f56' : isSelected ? '#4fd880' : '#bec1c6';

  const style = StyleSheet.create({
    container: {
      aspectRatio: !isExpress ? 1 : 0.5,
      width: 56,
      // borderColor: 'yellow',
      // borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      margin: 6,
    },
    seatNumberContainer: {
      alignSelf: 'stretch',
      width: 38,
      alignItems: 'center',
      borderStartStartRadius: 10,
      borderEndStartRadius: 10,
      backgroundColor: 'transparent',
      borderColor: thameColor,
      borderWidth: 1.5,
      justifyContent: 'center',
      marginBottom: 0.5,
    },
    handStand: {
      height: 24,
      width: 8,
      backgroundColor: 'transparent',
      borderColor: thameColor,
      borderWidth: 1.5,
      borderRadius: 3,
      marginInline: 0.5,
    },
    seatTop: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    seatBottom: {
      backgroundColor: 'transparent',
      borderColor: thameColor,
      borderWidth: 1.5,
      height: 11,
      width: 56,
      borderRadius: 4,
    },
    seatNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: thameColor,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onClick?.(id);
      }}
      disabled={disabled}
      style={style.container}
    >
      <View style={style.seatTop}>
        <View style={style.handStand} />
        <View style={style.seatNumberContainer}>
          <Text style={style.seatNumber}>{seatNumber}</Text>
        </View>
        <View style={style.handStand} />
      </View>
      <View style={style.seatBottom}></View>
    </TouchableOpacity>
  );
}

export default SeatComponent;

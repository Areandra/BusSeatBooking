import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SeatComponent, {
  SeatComponentInterface,
} from '../components/SeatComponent';
import { useEffect, useRef, useState } from 'react';
import WindowComponent from '../components/WindowComponent';
import DriverSeatComponent from '../components/DriverSeatComponent';
import LiveTotalPrice from '../components/LiveTotalPrice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SelectSeatScreenInterface {
  isExpress: boolean;
  selectedDate: string;
}

function SelectSeatScreen({
  isExpress,
  selectedDate,
}: SelectSeatScreenInterface) {
  const key = `${isExpress ? 'Expess' : 'Reguler'}-${selectedDate}`;

  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());
  const [seatData, setSeatData] = useState<SeatComponentInterface[]>([]);
  const [version, setVesion] = useState<number>(0);

  const seatDataSeader = async (seatTotal: number) => {
    setSelectedSeat(new Set());
    const rawSeatBooked = await AsyncStorage.getItem(key);
    const hashBooked = new Set(JSON.parse(rawSeatBooked!));
    console.error(rawSeatBooked);
    let data: SeatComponentInterface[] = [];
    let currentAlphabet = 64;
    for (let i = 0; i < seatTotal; i++) {
      if (!(i % 4)) currentAlphabet++;
      const seatIndexRow = (i % 4) + 1;
      const isBooked: boolean = hashBooked
        ? hashBooked.has(i.toString())
        : false;
      const isWindow: boolean = [1, 4].includes(seatIndexRow);
      const basePrice = isExpress ? 150000 : 100000;
      const curretSeat: SeatComponentInterface = {
        id: i.toString(),
        seatNumber: `${String.fromCharCode(currentAlphabet)}${seatIndexRow}`,
        isWindow,
        price: basePrice + (isWindow ? 50000 : 0),
        isExpress,
        isBooked,
      };
      data.push(curretSeat);
    }
    console.error(data);
    return data;
  };

  const handleSubmit = async (seat: string[]) => {
    const prevSeatBooked = await AsyncStorage.getItem(key);

    const rawSeatBooking = [...seat, ...(JSON.parse(prevSeatBooked!) ?? [])];

    const newBookedSeat = JSON.stringify(rawSeatBooking);

    if (rawSeatBooking.length === seatData.length) {
      await AsyncStorage.removeItem(key);
      setVesion(prev => prev + 1);
      return;
    }

    console.error(newBookedSeat);

    try {
      await AsyncStorage.setItem(key, newBookedSeat);
      setVesion(prev => prev + 1);
    } catch {}
  };

  useEffect(() => {
    const fetchData = async () => {
      const newSeatData = await seatDataSeader(isExpress ? 12 : 20);
      setSeatData(newSeatData);
    };
    fetchData();
  }, [version]);

  // seatDataSeader;
  // useEffect(() => {
  //   console.error(selectedTableIdRef);
  // }, [selectedTableIdRef]);

  return (
    <>
      <View style={style.container}>
        <Text>{selectedDate}</Text>
        <FlatList
          style={{
            borderColor: 'grey',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            // backgroundColor: 'yellow',
          }}
          ListHeaderComponent={() => <DriverSeatComponent />}
          numColumns={4}
          keyExtractor={item => item.id}
          data={seatData}
          renderItem={item => {
            const isCoridor = !(item.index % 1) && item.index % 4 === 1;
            return (
              <>
                {item.item.isWindow && item.index % 4 == 0 && (
                  <WindowComponent />
                )}
                <SeatComponent
                  id={item.item.id}
                  isWindow={item.item.isWindow}
                  seatNumber={item.item.seatNumber}
                  isBooked={item.item.isBooked}
                  isExpress={item.item.isExpress}
                  disabled={item.item.isBooked}
                  isSelected={selectedSeat.has(item.item.id)}
                  price={item.item.price}
                  onClick={(id: string) => {
                    setSelectedSeat(prev => {
                      const newSelectedMap = new Set(prev);
                      if (selectedSeat.has(id)) newSelectedMap.delete(id);
                      else {
                        if (prev.size > 4) {
                          console.error('Kelebihan');
                          return prev;
                        }
                        newSelectedMap.add(id);
                      }
                      console.error(Array.from(newSelectedMap));
                      return newSelectedMap;
                    });
                  }}
                />
                {isCoridor && <View style={{ width: 40 }} />}
                {item.item.isWindow && item.index % 4 === 3 && (
                  <WindowComponent />
                )}
              </>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          gap: 8,
          backgroundColor: 'grey',
          justifyContent: 'flex-end',
        }}
      >
        <LiveTotalPrice seatData={seatData} selectedSeat={selectedSeat} />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              paddingInline: 16,
              paddingBlock: 10,
              backgroundColor: 'red',
              alignSelf: 'center',
              borderRadius: 100,
            }}
            onPress={() => handleSubmit(Array.from(selectedSeat))}
          >
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectSeatScreen;

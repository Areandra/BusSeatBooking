import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import SeatComponent, {
  SeatComponentInterface,
} from '../components/SeatComponent';
import { useCallback, useEffect, useState } from 'react';
import WindowComponent from '../components/WindowComponent';
import DriverSeatComponent from '../components/DriverSeatComponent';
import LiveTotalPrice from '../components/LiveTotalPrice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookingDate } from '../context/BookingContext';
import RadioButton from '../components/RadioButton';
import { useFocusEffect } from '@react-navigation/native';

function SelectSeatScreen({ navigation, route }: any) {
  const { selectedDate, setSelectedDate } = useBookingDate();
  const [isExpress, setIsExpress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Set<string>>(new Set());
  const [seatData, setSeatData] = useState<SeatComponentInterface[]>([]);
  const [version, setVesion] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedDate('');
      };
    }, []),
  );

  const key = `${isExpress ? 'Expess' : 'Reguler'}-${selectedDate}`;

  const seatDataSeader = async (seatTotal: number) => {
    setSelectedSeat(new Set());
    const rawSeatBooked = await AsyncStorage.getItem(`Seat-Booked-${key}`);
    const hashBooked = new Set(JSON.parse(rawSeatBooked!));
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
    return data;
  };

  const createTicket = async (seatIds: String[], totalPrice: number) => {
    const rawTickets = await AsyncStorage.getItem('Tickets');

    const tickets = JSON.parse(rawTickets ?? '[]');
    const seatNumbers = seatData
      .filter(item => seatIds.includes(item.id))
      .map(item => item.seatNumber);

    const ticket = {
      id: Date.now().toString(),
      departureDate: selectedDate,
      isExpress,
      seats: seatNumbers,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    tickets.push(ticket);

    await AsyncStorage.setItem('Tickets', JSON.stringify(tickets));
  };

  const handleSubmit = async (seat: String[]) => {
    const prevSeatBooked = await AsyncStorage.getItem(`Seat-Booked-${key}`);

    const rawSeatBooking = [...seat, ...(JSON.parse(prevSeatBooked!) ?? [])];

    const newBookedSeat = JSON.stringify(rawSeatBooking);

    if (rawSeatBooking.length === seatData.length) {
      await AsyncStorage.removeItem(`Seat-Booked-${key}`);
      setVesion(prev => prev + 1);
      return;
    }

    try {
      await AsyncStorage.setItem(`Seat-Booked-${key}`, newBookedSeat);
      const totalPrice = seatData
        .filter(item => seat.includes(item.id))
        .reduce((sum, item) => sum + item.price!, 0);

      await createTicket(seat, totalPrice);
      setVesion(prev => prev + 1);
    } catch {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const newSeatData = await seatDataSeader(isExpress ? 12 : 20);
      setRefreshing(false);
      setSeatData(newSeatData);
    };
    fetchData();
  }, [version, selectedDate, isExpress]);

  return (
    <>
      <View style={style.container}>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginInline: 20,
            marginBlock: 8,
          }}
        >
          Departure Date
        </Text>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#404950',
            borderRadius: 100,
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
            marginInline: 24,
          }}
          onPress={() => navigation.push('Select Date')}
        >
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {selectedDate}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'stretch',
            marginBlock: 12,
          }}
        >
          {[
            {
              onPress: () => setIsExpress(false),
              name: 'Reguler',
              slected: !isExpress,
            },
            {
              onPress: () => setIsExpress(true),
              name: 'Express',
              slected: isExpress,
            },
          ].map(item => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
              key={item.name}
              onPress={item.onPress}
            >
              <RadioButton onPress={item.onPress} selected={item.slected} />
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          style={{
            borderColor: '#5a5e64',
            borderLeftWidth: 4,
            borderRightWidth: 4,
          }}
          refreshing={refreshing}
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
                      if (!selectedDate) {
                        ToastAndroid.show(
                          'Please Select Departure Date First',
                          300,
                        );
                        return prev;
                      }
                      const newSelectedMap = new Set(prev);
                      if (selectedSeat.has(id)) newSelectedMap.delete(id);
                      else {
                        if (prev.size > 4) {
                          ToastAndroid.show(
                            'Cant Select More Than 5 Seat',
                            300,
                          );
                          return prev;
                        }
                        newSelectedMap.add(id);
                      }
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
          gap: 8,
          justifyContent: 'flex-end',
        }}
      >
        <LiveTotalPrice
          handleSubmit={() => handleSubmit(Array.from(selectedSeat))}
          seatData={seatData}
          selectedSeat={selectedSeat}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a3239',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectSeatScreen;

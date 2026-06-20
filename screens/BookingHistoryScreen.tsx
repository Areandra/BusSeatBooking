import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookingDate } from '../context/BookingContext';
import { useFocusEffect } from '@react-navigation/native';
import TotalRevenue from '../components/TotalRevenue';

interface Ticket {
  id: string;
  departureDate: string;
  isExpress: boolean;
  seats: string[];
  totalPrice: number;
}

function BookingHistoryScreen({ navigation }: any) {
  const { selectedDate, setSelectedDate } = useBookingDate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadTickets = async () => {
    const raw = await AsyncStorage.getItem('Tickets');

    setTickets(JSON.parse(raw ?? '[]'));
  };

  useFocusEffect(
    useCallback(() => {
      loadTickets();

      return () => {
        setSelectedDate('');
      };
    }, []),
  );

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
          Date Filter
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
        <FlatList
          data={
            selectedDate
              ? tickets
                  .filter(item => item.departureDate === selectedDate)
                  .reverse()
              : tickets.reverse()
          }
          style={{ alignSelf: 'stretch' }}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            padding: 16,
            gap: 12,
          }}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Empty Sales History
            </Text>
          )}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#2a3239',
                borderWidth: 2,
                borderColor: '#5a5e64',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {item.isExpress ? 'Express' : 'Reguler'}
              </Text>

              <Text style={{ color: 'white', marginTop: 8 }}>
                Departure: {item.departureDate}
              </Text>

              <Text style={{ color: 'white' }}>
                Seats: {item.seats.join(', ')}
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 8,
                }}
              >
                Rp.{item.totalPrice.toLocaleString('id')},00
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          gap: 8,
          justifyContent: 'flex-end',
        }}
      >
        <TotalRevenue
          totalRevenue={
            selectedDate
              ? tickets
                  .filter(item => item.departureDate === selectedDate)
                  .reduce((sum, item) => sum + item.totalPrice, 0)
              : tickets.reduce((sum, item) => sum + item.totalPrice, 0)
          }
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

export default BookingHistoryScreen;

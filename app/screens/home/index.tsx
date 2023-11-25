
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/main';
import getAllApartments from '../../services/fetchAllApartments';
import { useEffect, useState } from 'react';
import { IApartment } from '../../types/apartment';

type HomeScreenNavigationProp = StackNavigationProp<
     RootStackParamList,
     'Home'
>;

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {

     const [data, setData] = useState<IApartment[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          getAllApartments()
               .then((res) => {
                    setData(res.data);
                    setLoading(false);
               })
     }, [])

     if (loading) return <ActivityIndicator size="large" />
     return (
          <View style={styles.container}>
               <ScrollView
                    style={styles.scroll}
               >
                    {
                         data.length !== 0 && data.map((item, i) => (
                              <View key={i} style={styles.card}>
                                   <Text style={styles.title}>{item.compound ? `${item.compound} - ` : null}{item.address} - {item.area.toFixed(1)}m</Text>
                                   <Text style={styles.subTitle}>{item.price.toFixed(2)} {item.currency}</Text>
                                   <Button
                                        title="Read more"
                                        onPress={() => navigation.navigate('Details', { id: item.id })}
                                   />
                              </View>
                         ))
                    }
               </ScrollView>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          padding: 10,
     },
     scroll: {
          
     },
     card: {
          backgroundColor: 'rgb(31 41 55)',
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          marginBottom: 10
     },
     title: {
          color: 'white',
          fontWeight: '700',
          fontSize: 18
     },
     subTitle: {
          color: 'lightgrey',
          fontWeight: '500',
          fontSize: 14
     }
});

export default HomeScreen;
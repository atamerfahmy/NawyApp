
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../navigators/main';
import { RouteProp } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { IApartment } from '../../types/apartment';
import fetchApartmentDetails from '../../services/fetchApartmentDetails';
import dateFormatter from '../../utils/dateFormatter';

type DetailsScreenNavigationProp = StackNavigationProp<
     RootStackParamList,
     'Details'
>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

function DetailsScreen({ route, navigation }: { route: DetailsScreenRouteProp, navigation: DetailsScreenNavigationProp }) {
     const [data, setData] = useState<IApartment>();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetchApartmentDetails(route.params.id)
               .then((res) => {
                    setData(res.data);
                    setLoading(false);
               })
     }, [])
     
     if (loading) return <ActivityIndicator size="large" />
     return (
          <View style={styles.container}>
               <View style={styles.section}>
                    <Text style={styles.title}>{data?.type} - {data?.address}</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.title}>Area:</Text>
                    <Text style={styles.subTitle}>{data?.area.toFixed(1)}</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.title}>Price:</Text>
                    <Text style={styles.subTitle}>{data?.price.toFixed(1)}</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.title}>Rooms:</Text>
                    <Text style={styles.subTitle}>{data?.rooms.toFixed(1)}</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.title}>Owner:</Text>
                    <Text style={styles.subTitle}>{data?.owner}</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.title}>Created at:</Text>
                    <Text style={styles.subTitle}>{dateFormatter(data?.createdAt || '')}</Text>
               </View>
          </View>
     );
}


const styles = StyleSheet.create({
     container: { flex: 1, backgroundColor: 'rgb(31 41 55)', padding: 15 },
     section: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
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

export default DetailsScreen;
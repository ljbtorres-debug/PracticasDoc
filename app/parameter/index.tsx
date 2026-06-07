import CareerComponent from '@/components/ParemeterComponents/tables/CareerComponent';
import RoleComponent from '@/components/ParemeterComponents/tables/RoleComponent';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const Parameter = () => {
      console.log("Parameter renderizado");
    return (
        <SafeAreaView className='flex-1'>
            <ScrollView 
            contentContainerStyle={{
                padding:16,
            }}>
            <CareerComponent/>
            <RoleComponent/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Parameter

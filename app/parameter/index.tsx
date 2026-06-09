import CareerComponent from '@/components/ParemeterComponents/tables/CareerComponent';
import RoleComponent from '@/components/ParemeterComponents/tables/RoleComponent';
import SemesterComponent from '@/components/ParemeterComponents/tables/SemesterComponent';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const Parameter = () => {
    return (
        <SafeAreaView className='flex-1'>
            <ScrollView 
            contentContainerStyle={{
                padding:16,
            }}>
            <CareerComponent/>
            <RoleComponent/>
            <SemesterComponent/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Parameter

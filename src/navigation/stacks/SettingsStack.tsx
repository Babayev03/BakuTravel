import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingMain from '../../screens/setting/SettingMain';

const Setting = createNativeStackNavigator();


const SettingsStack = () => {
  return (
    <Setting.Navigator>
      <Setting.Screen name="SettingMain" component={SettingMain} options={{headerShown:false}}/>
    </Setting.Navigator>
  )
}

export default SettingsStack
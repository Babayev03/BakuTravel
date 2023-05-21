import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreStack from '../stacks/ExploreStack';
import SvgHomeIcon from '../../assets/images/HomeIcon';
import SvgSearchIcon from '../../assets/images/SearchIcon';
import SvgSaveIcon from '../../assets/images/SaveIcon';
import SearchStack from '../stacks/SearchStack';
import SaveStack from '../stacks/SaveStack';
import SettingMain from '../../screens/setting/SettingMain';
import SettingsStack from '../stacks/SettingsStack';
import SvgSetting from '../../assets/images/SettingIcon';
const Tab = createBottomTabNavigator();

const TabMain = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#1c1c1c',borderColor:"#1c1c1c",borderTopWidth:1,borderTopColor:"#1c1c1c"},
        }}>
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}: any) => (
              <SvgHomeIcon stroke={focused ? '#E0783E' : '#494949'} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}: any) => (
              <SvgSearchIcon stroke={focused ? '#E0783E' : '#494949'} />
            ),
          }}
        />
        <Tab.Screen
          name="Save"
          component={SaveStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}: any) => (
              <SvgSaveIcon stroke={focused ? '#E0783E' : '#494949'} fill="none" />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingsStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({focused}: any) => (
              <SvgSetting stroke={focused ? '#E0783E' : '#494949'} fill="none" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabMain;

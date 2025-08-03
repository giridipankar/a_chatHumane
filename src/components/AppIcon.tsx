import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

type IconFamilyType =
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'AntIcons'
  | 'Entypo'
  | 'Feather'
  | 'FontAwesome'
  | 'Ionicons'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

type IconType = {
  type: IconFamilyType;
  name: string;
  size?: number;
  color?: string;
};

export const AppIcon = ({ type, name, size = 20, color }: IconType) => {
  switch (type) {
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'AntIcons':
      return <AntIcons name={name} size={size} color={color} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} />;
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'Foundation':
      return <Foundation name={name} size={size} color={color} />;
    case 'Octicons':
      return <Octicons name={name} size={size} color={color} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={name} size={size} color={color} />;
    case 'Zocial':
      return <Zocial name={name} size={size} color={color} />;
    default:
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
  }
};

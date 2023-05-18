import { StyleSheet, Dimensions } from 'react-native';

import Comfortaa from '../assets/fonts/Comfortaa/index';

////////////////////////////////////////////////////////////////////////////////////////////////////

export default
{
  OTHER:
  {
    EVELVATION: 7,
    LINE_HEIGHT: 20,
  },

  OPACTIY: 
  {
    _25: 0.25, 
    _45: 0.45, 
    _65: 0.65, 
  },

  ICON_SIZE:
  {
    _15: 15, 
    _20: 20,
    _25: 25, 
    _30: 30, 
    _45: 45, 
  },

  FONT_SIZE:
  {
    _12: 12,
    _14: 14,
    _16: 16,
    _18: 18,
    _20: 20,
    _22: 22,
    _24: 24,
  },

  FONT_FAMILY:
  {
    Comfortaa
  },

  DIMENSION:
  {
    VISIBLE_WIDTH: Dimensions.get('window').width,
    VISIBLE_HEIGHT: Dimensions.get('window').height,

    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
  },

  BORDER:
  {
    WIDTH: StyleSheet.hairlineWidth,
    RADIUS: Dimensions.get('screen').width * 0.01,
  },

  COLOR:
  {
    WHITE: '#FDFDFD',
    BLACK: '#373737',

    PRIMARY: '#D81E5B',
    SECONDARY: '#8A4EFC',
    LIGHT: '#EEEEEE',
    LIGHT_ALT: '#61759B',
    DARK: '#131A26',
    DARK_ALT: '#202B3E',
  },
};

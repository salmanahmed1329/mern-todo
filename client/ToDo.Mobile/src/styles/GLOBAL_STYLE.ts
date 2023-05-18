import { StyleSheet } from 'react-native';
import STYLE_STRING from './STYLE_STRING';

////////////////////////////////////////////////////////////////////////////////////////////////////

const GLOBAL_STYLE = StyleSheet.create
({
  modal_container:
  {
    zIndex: 1, ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },

  modal_subContainer: 
  {
    height: 'auto', maxHeight: '92%', maxWidth: '92%', 
    backgroundColor: STYLE_STRING.COLOR.WHITE, elevation: STYLE_STRING.OTHER.EVELVATION *2.5, 
    shadowOffset: { width: 0, height: 2 }, shadowRadius: STYLE_STRING.BORDER.RADIUS, shadowOpacity: STYLE_STRING.OPACTIY._25, 
    borderRadius: STYLE_STRING.BORDER.RADIUS *2,
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////

export default GLOBAL_STYLE;

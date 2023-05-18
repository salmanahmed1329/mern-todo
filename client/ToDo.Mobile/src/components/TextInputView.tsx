import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, FlexStyle, TextStyle } from 'react-native';

import { useIsKeyboardFocused } from '../hooks/index';

import { STYLE_STRING } from '../styles/index';

////////////////////////////////////////////////////////////////////////////////////////////////////

type TextInputViewType = 
{
  containerStyle?: FlexStyle;
  textboxStyle?: FlexStyle;
  textStyle?: TextStyle;
  isEditable?: boolean;
  placeholder: string;
  text: string;
  OnTextChange: (text: string) => void;
  OnTextSubmit?: () => void;
};

const TextInputView = 
(
  {
    containerStyle = {},
    textboxStyle = {},
    textStyle = {},
    isEditable = true,
    placeholder = "",
    text = "",
    OnTextChange = (text: string) => {},
    OnTextSubmit = () => {}
  }
  : 
  TextInputViewType
) =>
{
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //#region - variables

  const inputRef = useRef<TextInput>(null);

  const isKeyboardFocused = useIsKeyboardFocused();
  
  const [isFocused, setIsFocused] = useState(false);

  //#endregion

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //#region - functions

  useEffect(() => 
  {
    if (!isKeyboardFocused) 
    {
      inputRef.current?.blur();
    }

  }, [isKeyboardFocused]);

  //#endregion
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //#region - render

  return(
    <View style={[localStyleSheet.container, containerStyle]}>

      <View 
        style={[localStyleSheet.view_textbox, textboxStyle, isFocused && localStyleSheet.view_textboxFocused]}
      >
        
        <TextInput 
          ref={inputRef}
          style={[localStyleSheet.textbox, textStyle]}
          editable={isEditable}
          blurOnSubmit={false}
          selectionColor={STYLE_STRING.COLOR.LIGHT_ALT}
          underlineColorAndroid={'transparent'}
          placeholder={placeholder}
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={text => OnTextChange(text)}
          onSubmitEditing={() => OnTextSubmit()}
        />
      
      </View>

    </View>
  );

  //#endregion

  ////////////////////////////////////////////////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////////////////////////

const localStyleSheet = StyleSheet.create
({
  container: 
  {
    height: 'auto', width: '100%', justifyContent: 'space-evenly', 
    marginVertical: '2%', 
  },

  view_textbox:
  {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: STYLE_STRING.COLOR.LIGHT, 
    padding: 5, marginVertical: 5, marginHorizontal: '0.25%', 
  },

  view_textboxFocused:
  {
    backgroundColor: STYLE_STRING.COLOR.WHITE, elevation: STYLE_STRING.OTHER.EVELVATION, 
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: STYLE_STRING.OPACTIY._25, shadowRadius: STYLE_STRING.BORDER.RADIUS, 
  },

  textbox:
  {
    flex: 1, lineHeight: STYLE_STRING.OTHER.LINE_HEIGHT, color: STYLE_STRING.COLOR.BLACK, 
    fontSize: STYLE_STRING.FONT_SIZE._14, fontFamily: STYLE_STRING.FONT_FAMILY.Comfortaa.Font_Regular, 
    textAlignVertical: 'center', 
    paddingVertical: 0, paddingLeft: 5, 
  },
});

export default TextInputView;

import { useState, useEffect } from 'react';
import { Keyboard } from "react-native";

////////////////////////////////////////////////////////////////////////////////////////////////////

const useIsKeyboardFocused = () => 
{
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //#region - variables

  const [isFocused, setIsFocused] = useState(false);

  //#endregion

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //#region - functions

  useEffect(() => 
  {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _KeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _KeyboardDidHide);

    return () => { keyboardDidShowListener.remove(); keyboardDidHideListener.remove(); }

  }, []);

  const _KeyboardDidShow = () => setIsFocused(true);
  const _KeyboardDidHide = () => setIsFocused(false);

  //#endregion

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return isFocused;
}

export default useIsKeyboardFocused;
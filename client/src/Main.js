import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context/Context';
import toggleStylesheet from './helpers/toggleStylesheet';
import { getItemFromStore, setItemToStore } from './helpers/utils';

const Main = props => {
  const [isFluid, setIsFluid] = useState(getItemFromStore('isFluid', false));
  const [isRTL, setIsRTL] = useState(getItemFromStore('isRTL', false));
  const [isDark, setIsDark] = useState(getItemFromStore('isDark', false));
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [currency, setCurrency] = useState('$');

  const value = {
    isFluid,
    setIsFluid,
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    showBurgerMenu,
    setShowBurgerMenu,
    currency,
    setCurrency
  };

  const setStylesheetMode = mode => {
    setItemToStore(mode, value[mode]);
    toggleStylesheet({ isRTL, isDark });
  };

  useEffect(() => {
    setStylesheetMode('isFluid');
    // eslint-disable-next-line
  }, [isFluid]);

  useEffect(() => {
    setStylesheetMode('isRTL');
    // eslint-disable-next-line
  }, [isRTL]);

  useEffect(() => {
    setStylesheetMode('isDark');
    // eslint-disable-next-line
  }, [isDark]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

Main.propTypes = { children: PropTypes.node };

export default Main;

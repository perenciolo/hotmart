/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { AppProps } from 'next/app';

import '../styles/main.css';
import '../styles/main.scss';
import { AppProvider } from '../context/AppContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
);

export default MyApp;

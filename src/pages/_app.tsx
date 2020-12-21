import React from 'react';

import { AppProps } from 'next/app';

import '../styles/main.css';
import '../styles/main.scss';

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;

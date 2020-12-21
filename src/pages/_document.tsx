import React from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

import { Config } from '../utils/Config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={Config.locale}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;800&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

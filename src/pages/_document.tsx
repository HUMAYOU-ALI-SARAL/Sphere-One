import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    return (
      <Html dir={dir} lang={locale} >
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Actor&family=Alfa+Slab+One&family=DynaPuff&family=Inter:wght@300;400&family=JetBrains+Mono:ital,wght@0,200;1,200&display=swap"
            rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Actor&family=Alfa+Slab+One&family=Blinker:wght@100;200;300;400;600;700;800;900&family=DynaPuff&family=Inter:wght@300;400&family=JetBrains+Mono:ital,wght@0,200;1,200&display=swap"
            rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Abel&family=Actor&family=Alfa+Slab+One&family=Blinker:wght@100;200;300;400;600;700;800;900&family=DynaPuff&family=Inter:wght@300;400&family=JetBrains+Mono:ital,wght@0,200;1,200&display=swap"
            rel="stylesheet" />
          <link href="https://fonts.cdnfonts.com/css/mona-sans" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Abel&family=Actor&family=Alfa+Slab+One&family=Blinker:wght@100;200;300;400;600;700;800;900&family=DynaPuff&family=Inter:wght@100;200;300;400;500&family=JetBrains+Mono:ital,wght@0,200;1,200&display=swap"
            rel="stylesheet" />
          <link href="https://fonts.cdnfonts.com/css/abeezee" rel="stylesheet"></link>
          <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet"></link>
          <link href="https://fonts.cdnfonts.com/css/actor" rel="stylesheet"></link>
          <link href="https://fonts.cdnfonts.com/css/dm-sans" rel="stylesheet"></link>
          <link href="https://fonts.cdnfonts.com/css/abel" rel="stylesheet"></link>
          <link href="https://fonts.cdnfonts.com/css/blinker" rel="stylesheet"></link>
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

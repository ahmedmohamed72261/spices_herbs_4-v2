import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ backgroundColor: '#fdf9f0' }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          html, body {
            background-color: #ffffff;
            color: #303338;
            margin: 0;
            padding: 0;
            font-family: 'Kumbh Sans', 'Cairo', sans-serif;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Kumbh Sans', sans-serif;
            color: #404040;
          }
          html.dark, html.dark body {
            background-color: #0c1510;
            color: #e0eae2;
          }
        ` }} />
      </Head>
      <body className="font-sans bg-background text-on-surface">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


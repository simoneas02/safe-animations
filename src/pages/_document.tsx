/**
 * This file is needed to embed MUI theme CSS into the pre-built HTML files
 * @see https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript
 */

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from '@/styles/emotion'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Safe Animation',
  alternateName: 'Safe',
  // url: 'https://safe.global/',
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          {/* Insertion point for Emotion's CSS styles.  */}
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}

MyDocument.getInitialProps = getInitialProps

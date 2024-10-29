import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles'
import type { EmotionCache } from '@emotion/react'
import { createEmotionCache } from '@/styles/emotion'
import { CssBaseline } from '@mui/material'
import { theme as baseTheme } from '@/styles/theme'
import '@/styles/globals.css'

const clientSideEmotionCache = createEmotionCache()
const cssVarsTheme = extendMuiTheme(baseTheme)

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & {
  emotionCache?: EmotionCache
}) {
  return (
    <>
      <CssVarsProvider theme={cssVarsTheme}>
        <CssBaseline />
      </CssVarsProvider>
      <Component {...pageProps} />
    </>
  )
}

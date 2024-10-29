import { useEffect, useRef, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import css from './styles.module.css'
import AnimatedText from '../shared/AnimatedText'

const HeroVideo = () => {
  const { title, text } = {
    title: 'Smart Accounts to',
    text: 'Own the Internet',
  }

  const [ready, setReady] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const poll = setInterval(() => {
      if (!videoRef.current) return
      if (videoRef.current.readyState >= videoRef.current.HAVE_FUTURE_DATA) {
        setReady(true)
        clearInterval(poll)
      }
    }, 100)

    return () => clearInterval(poll)
  }, [])

  return (
    <div className={`${css.heroVideo} ${css.container}`}>
      <div className={css.wrapper}>
        <div>
          <video
            autoPlay
            muted
            playsInline
            loop
            ref={videoRef}
            style={{ opacity: 0 }}
            className={`${css.video} ${ready ? css.ready : ''}`}
          >
            <source
              src="/videos/Home/safe-2024-hero-vp9.webm"
              type="video/webm"
            />
            <source
              src="/videos/Home/safe-2024-hero-hevc.mov"
              type="video/quicktime; codecs=hvc1"
            />
          </video>
        </div>

        <Grid container className={css.content} width="100%" height="100%">
          <Grid item>
            <motion.div>
              <Typography variant="h1" className={css.title}>
                <AnimatedText text={title} />
              </Typography>
            </motion.div>
            <Typography variant="h1" className={css.title} color="#12FF80">
              <AnimatedText text={text} />
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="caption" className={css.scroll}>
          Scroll
        </Typography>
      </div>
    </div>
  )
}

export default HeroVideo

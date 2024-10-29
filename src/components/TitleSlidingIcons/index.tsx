import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { animate, motion, useMotionValue } from 'framer-motion'
import useMeasure from 'react-use-measure'

import css from './styles.module.css'

type TitleSlidingIconsProps = {
  reverse?: boolean
}

const TitleSlidingIcons = ({ reverse = false }: TitleSlidingIconsProps) => {
  const icons = [
    { name: '1inch', src: '/images/Home/TrustedIcons/1inch.svg' },
    { name: 'Aave', src: '/images/aave.svg' },
    { name: 'Balancer', src: '/images/Home/TrustedIcons/balancer.svg' },
    { name: 'Chainlink', src: '/images/Home/TrustedIcons/chainlink.svg' },
    {
      name: 'Ethereum Name Service',
      src: '/images/Home/TrustedIcons/ethereum-name-service.svg',
    },
    { name: 'Maker DAO', src: '/images/Home/TrustedIcons/maker-dao.svg' },
    { name: 'Polygon', src: '/images/Home/TrustedIcons/polygon.svg' },
  ]

  let [ref, { width }] = useMeasure()
  const xTranslation = useMotionValue(0)

  useEffect(() => {
    if (width === 0) return

    let controls
    let finalPosition = -width / 2 - 30
    const startPosition = reverse ? finalPosition : 0
    const endPosition = reverse ? 0 : finalPosition

    controls = animate(xTranslation, [startPosition, endPosition], {
      ease: 'linear',
      duration: 20,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
    })

    return controls.stop
  }, [xTranslation, width, reverse])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pb="100px"
    >
      <Typography variant="h3" pb="50px">
        Trusted by the best
      </Typography>

      <div className={css.sliderWrapper}>
        <motion.div
          ref={ref}
          className={css.slider}
          style={{ x: xTranslation }}
        >
          {[...icons, ...icons].map(icon => (
            <motion.div className={css.wrapper} key={icon.name}>
              <div className={css.icon}>
                <img src={icon.src} alt={icon.name} width={64} height={64} />
              </div>
              <Typography>{icon.name}</Typography>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Box>
  )
}

export default TitleSlidingIcons

import { useRef, useState } from 'react'
import NextLink from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Button, ButtonBase } from '@mui/material'

import Logo from '@/public/images/logo.svg'
import ArrowIcon from '@/public/images/arrow-out-square-corner.svg'

import css from './styles.module.css'

const Header = () => {
  const [isHidden, setIsHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0)

      lastYRef.current = y
    }
  })

  const variants = {
    hidden: {
      y: '-100%',
    },
    visible: {
      y: '0%',
    },
  }

  const navCategories = [
    'Developers',
    'Wallet',
    'Ecosystem',
    'Community',
    'Resources',
    'Safe',
  ]

  return (
    <motion.div
      className={css.header}
      variants={variants}
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.2 }}
    >
      <div className={css.logo}>
        <Logo />
      </div>

      <ButtonBase
        className={css.burger}
        aria-label="Toggle navigation"
        disableRipple
      >
        <span />
      </ButtonBase>
      <nav className={css.navigation}>
        <ul className={css.navList}>
          {navCategories.map(item => {
            return (
              <li key={item} className={css.navLink}>
                {item}
              </li>
            )
          })}
          <NextLink href="#">
            <li key="WalletButton" className={css.hideInLaptop}>
              <WalletButton />
            </li>
          </NextLink>
        </ul>
      </nav>

      <div className={css.hideInMobile}>
        <WalletButton />
      </div>
    </motion.div>
  )
}

const WalletButton = () => (
  <Button className={css.button} variant="contained">
    Launch Wallet
    <ArrowIcon className={css.icon} />
  </Button>
)

export default Header

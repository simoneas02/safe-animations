import { motion, useInView } from 'framer-motion'
import cssShared from '@components/shared.module.css'
import { useRef } from 'react'

type AnimatedTextProps = {
  text: string
  el?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  className?: string
}

const AnimatedText = ({
  text,
  el: Wrapper = 'span',
  className,
}: AnimatedTextProps) => {
  const splitedText = [...text]
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <Wrapper className={className}>
      <span className={cssShared.screenOnly}>{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.1 }}
        aria-hidden
      >
        {splitedText.map((char, index) => (
          <motion.span key={`${char}-${index}`} variants={defaultAnimations}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

export default AnimatedText

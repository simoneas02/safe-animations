import Header from '@/components/Header'
import HeroVideo from '@/components/HeroVideo'
import TitleSlidingIcons from '@/components/TitleSlidingIcons'

export default function Home() {
  return (
    <>
      <Header />
      <HeroVideo />
      <TitleSlidingIcons />
      <TitleSlidingIcons reverse />
      <HeroVideo />
    </>
  )
}

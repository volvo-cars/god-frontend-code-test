import dynamic from 'next/dynamic'

export const CarScrollerDesktopLazy = dynamic(
  () => import('./carScrollerDesktop').then((mod) => mod.CarScrollerDesktop),
  {
    ssr: false,
  }
)

export const CarScrollerMobileLazy = dynamic(
  () => import('./carScrollerMobile').then((mod) => mod.CarScrollerMobile),
  {
    ssr: false,
  }
)

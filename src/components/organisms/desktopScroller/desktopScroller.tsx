import Image from 'next/image'
import React, {
  Children,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Block, Flex } from 'vcc-ui'

import { desktopScrollerStyles } from './desktopScroller.styles'

type Props = {
  children: ReactNode
  itemBlockSpace: number
}

export const DesktopScroller = ({ children, itemBlockSpace }: Props) => {
  const [scrollIndex, setScrollIndex] = useState(1)
  const [disableScrollLeft, setDisableScrollLeft] = useState(true)
  const [disableScrollRight, setDisableScrollRight] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const itemsInViewport = useMemo(
    () => Math.floor(window.innerWidth / itemBlockSpace),
    [itemBlockSpace]
  )

  const handleScrollRight = () => {
    const element = wrapperRef.current
    const nextRightScroll = itemBlockSpace * scrollIndex
    if (!element || nextRightScroll !== element.scrollLeft + itemBlockSpace) {
      return
    }
    if (disableScrollLeft) {
      setDisableScrollLeft(false)
    }
    if (nextRightScroll >= element.scrollWidth - window.innerWidth) {
      if (Children.count(children) - itemsInViewport === scrollIndex) {
        element.scrollTo({
          left: element.scrollWidth,
          behavior: 'smooth',
        })
        setScrollIndex((oldIndex) => oldIndex + 1)
      }
      setDisableScrollRight(true)
      return
    }
    element.scrollTo({
      left: nextRightScroll,
      behavior: 'smooth',
    })

    setScrollIndex((oldIndex) => oldIndex + 1)
  }

  const handleScrollLeft = () => {
    const element = wrapperRef.current
    const nextLeftScroll = itemBlockSpace * (scrollIndex - 1) - itemBlockSpace
    if (
      !element ||
      (!(
        nextLeftScroll >=
        element.scrollLeft - (nextLeftScroll + itemBlockSpace)
      ) &&
        scrollIndex === 1)
    ) {
      return
    }
    if (disableScrollRight) {
      setDisableScrollRight(false)
    }
    if (nextLeftScroll <= 0) {
      if (element.scrollLeft !== 0) {
        element.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
        setScrollIndex((oldIndex) => oldIndex - 1)
      }
      setDisableScrollLeft(true)
      return
    }
    element.scrollTo({
      left: nextLeftScroll,
      behavior: 'smooth',
    })
    setScrollIndex((oldIndex) => oldIndex - 1)
  }

  const handleKeyScrollRight = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === ' ') {
      handleScrollRight()
    }
  }

  const handleKeyScrollLeft = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === ' ') {
      handleScrollLeft()
    }
  }

  const onTouchStart = (e: MouseEvent<HTMLDivElement>) => {
    setTouchEnd(null)
    setTouchStart(e.clientX)
  }

  const onTouchMove = (e: MouseEvent<HTMLDivElement>) => {
    setTouchEnd(e.clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleScrollRight()
    } else if (isRightSwipe) {
      handleScrollLeft()
    }
  }

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) {
      return
    }
    const allItemsVisible = itemsInViewport >= Children.count(children)
    setScrollIndex(1)
    setDisableScrollRight(allItemsVisible)
    setDisableScrollLeft(true)
    element.scrollTo({ left: 0, behavior: 'smooth' })
  }, [itemsInViewport, children])

  const detectTabKey = useCallback(
    (e: KeyboardEvent) => {
      const element = wrapperRef.current
      if (!element) {
        return
      }

      if (e.key == 'Tab') {
        if (element.scrollLeft > 0) {
          setDisableScrollLeft(false)
        }
        const nextScrollIndex = element.scrollLeft / itemBlockSpace
        setScrollIndex(nextScrollIndex < 1 ? 1 : nextScrollIndex)
        document.activeElement?.scrollIntoView({ behavior: 'smooth' })
        if (element.scrollLeft + window.innerWidth === element.scrollWidth) {
          setDisableScrollRight(true)
        }
      }

      if (e.shiftKey && e.key === 'Tab') {
        const nextScrollIndex =
          element.scrollLeft / itemBlockSpace + 2 - itemsInViewport
        setScrollIndex(nextScrollIndex < 1 ? 1 : nextScrollIndex)
        document.activeElement?.scrollIntoView({ behavior: 'smooth' })
        if (element.scrollLeft === 0) {
          setDisableScrollLeft(true)
        }
        if (element.scrollLeft + window.innerWidth < element.scrollWidth) {
          setDisableScrollRight(false)
        }
      }
    },
    [itemBlockSpace, itemsInViewport]
  )

  useEffect(() => {
    document.addEventListener('keyup', detectTabKey)

    return () => document.removeEventListener('keyup', detectTabKey)
  }, [detectTabKey])

  const styles = useMemo(
    () =>
      desktopScrollerStyles({
        itemsInViewport,
        itemBlockSpace,
        disableScrollLeft,
        disableScrollRight,
      }),
    [disableScrollLeft, disableScrollRight, itemBlockSpace, itemsInViewport]
  )

  return (
    <Block style={{ position: 'relative' }}>
      <Flex
        ref={wrapperRef}
        style={styles.wrapper}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
      >
        {children}
      </Flex>
      <Block style={styles.chevronWrapper}>
        <Image
          src='/chevron-circled.svg'
          width={40}
          height={40}
          style={styles.chevronLeft}
          alt='scroll-left'
          onClick={disableScrollLeft ? undefined : handleScrollLeft}
          onKeyDown={disableScrollLeft ? undefined : handleKeyScrollLeft}
          tabIndex={0}
          role='button'
        />
        <Image
          src='/chevron-circled.svg'
          width={40}
          height={40}
          style={styles.chevronRight}
          alt='scroll-right'
          onClick={disableScrollRight ? undefined : handleScrollRight}
          onKeyDown={disableScrollRight ? undefined : handleKeyScrollRight}
          tabIndex={0}
          role='button'
        />
      </Block>
    </Block>
  )
}

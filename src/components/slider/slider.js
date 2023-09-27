import React, { useRef, useState } from 'react'
import './slider.scss'

const Slider = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)

  const WIDTH = 500
  const HEIGHT = 300

  const DURATION = 400
  const CLICK_TRANSITION = 'ease'
  const DRAG_TRANSITION = 'cubic-bezier(0.18, 0.89, 0.32, 1.28)'

  const handleClickForward = _ => {
    if (currentSlide + 1 === images.length) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handleClickBack = _ => {
    if (currentSlide === 0) {
      setCurrentSlide(images.length - 1)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleDragStart = event => {
    if (event.button !== 0 || event.target.tagName === 'BUTTON')
      return

    const getCurrentOffsetX = _ => new DOMMatrixReadOnly(window.getComputedStyle(sliderImages).getPropertyValue('transform')).m41

    const sliderImages = sliderRef.current.querySelector('.slides')
    const initialCursorPosition = event.pageX
    const initialOffsetX = getCurrentOffsetX()
    let newCursorPosition = 0

    document.body.style.cursor = 'grabbing'

    document.onmousemove = e => {
      newCursorPosition = initialCursorPosition - e.pageX
      sliderImages.style.transform = `translateX(${initialOffsetX - newCursorPosition}px)`
      sliderImages.style.transition = DRAG_TRANSITION
    }

    document.onmouseup = _ => {
      document.onmousemove = null

      const nearestSlide = Math.max(Math.min(Math.round(-getCurrentOffsetX() / WIDTH), images.length - 1), 0)

      nearestSlide === currentSlide
        ? sliderImages.style.transform = `translateX(-${currentSlide * WIDTH}px)`
        : setCurrentSlide(nearestSlide)

      document.body.style.removeProperty('cursor')

      if (Math.abs(newCursorPosition) > WIDTH / 4) {
        sliderImages.ontransitionend = _ => {
          sliderImages.ontransitionend = null
          sliderImages.style.transition = CLICK_TRANSITION
        }
      } else {
        sliderImages.style.transition = CLICK_TRANSITION
      }

      sliderImages.style.transitionDuration = `${DURATION}ms`
    }
  }

  return (
    images.length > 0 &&
    <div className={'slider'}
         style={{
           width: `${WIDTH}px`,
           height: `${HEIGHT}px`
         }}
    >
      <div className="slider__content"
           onMouseDown={handleDragStart}
           ref={sliderRef}
      >
        <div className="slides"
             style={{
               transform: `translateX(-${currentSlide * WIDTH}px)`,
               transition: CLICK_TRANSITION,
               transitionDuration: `${DURATION}ms`
             }}
        >
          {images.map((img, idx) => (
            <div className="slide"
                 style={{
                   width: `${WIDTH}px`,
                 }}
                 key={idx}
            >
              <img src={img} alt="" draggable="false" />
            </div>
          ))}
        </div>
        {images.length > 1 &&
          <div className="slider__buttons">
            <button className="rounded" onClick={handleClickBack}>
              ◀
            </button>
            <button className="rounded" onClick={handleClickForward}>
              ▶
            </button>
          </div>}
      </div>
      {images.length > 1 &&
        <div className="slider__dots">
          {images.map((_, idx) => (
            <span className={idx === currentSlide ? 'active' : ''}
                  onClick={() => setCurrentSlide(idx)}
                  key={idx}>●</span>
          ))}
        </div>}
    </div>
  )
}

export default Slider

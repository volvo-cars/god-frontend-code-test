export type SliderResult = {
  isNextBtnDisabled: boolean;
  isPrevBtnDisabled: boolean;
  current: number;
  size: number;
};

//just to organize the logic in a one place instead of having it everywhere
const SliderHandler = (
  slider: HTMLDivElement,
  callback: (result: SliderResult) => void
) => {
  if (slider) {
    let computedSlider = getComputedStyle(slider);
    let sWidth = parseInt(computedSlider.width);
    let scrollWidth = slider.scrollWidth;

    //did it scroll to end
    let isNextBtnDisabled = scrollWidth <= sWidth + slider.scrollLeft;

    //did it scroll to start
    let isPrevBtnDisabled = slider.scrollLeft <= 0;

    //calculate dot indicators
    var item_size = slider.firstElementChild
      ? parseInt(getComputedStyle(slider.firstElementChild).width)
      : 300;
    let size = Math.ceil((scrollWidth - sWidth) / item_size);
    let current = Math.floor(slider.scrollLeft / item_size);
    callback({
      isNextBtnDisabled: isNextBtnDisabled,
      isPrevBtnDisabled: isPrevBtnDisabled,
      current: current,
      size: size,
    });
  }
};

export default SliderHandler;

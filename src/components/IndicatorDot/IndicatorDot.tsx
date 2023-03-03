import React from 'react';
import styles from './IndicatorDot.module.scss';

type IndicatorDotProps = {
  active: boolean;
  index: number;
  setIndex: (index: number) => void;
};

const IndicatorDot: React.FC<IndicatorDotProps> = (props) => {
  return (
    <button
      onClick={() => props.setIndex(props.index)}
      className={`${styles.indicatorDot} ${props.active ? styles.active : ''}`}
    />
  );
};

export default IndicatorDot;

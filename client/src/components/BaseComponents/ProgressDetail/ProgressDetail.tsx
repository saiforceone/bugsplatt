import {useEffect, useState} from 'react';
import './progressDetail.css';

export interface ProgressDetailProps {
  label: string;
  currentValue: number;
  maxValue: number;
}

const calculateBarWidth = (currentValue: number, maxValue: number): number => {
  if (currentValue >= maxValue) return 100;
  return (currentValue / maxValue) * 100;
}

export const ProgressDetail = ({
  label = 'Default Label',
  currentValue = 12,
  maxValue = 17
}: ProgressDetailProps) => {

  // simple calculation to get width of bar
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {

    const width = calculateBarWidth(currentValue, maxValue);
    setBarWidth(width);
  }, [currentValue, maxValue]);

  return (
    <div className='progress-detail--container'>
      <div className='progress-detail--top-row'>
        <span className='progress-detail--label'>{label}</span>
        <span>{currentValue} / {maxValue} ({barWidth.toFixed(0)}%)</span>
      </div>
      <div className='progress-detail--bar-row'>
        <div className='progress-detail--bar' style={{width: `${barWidth}%`}} />
      </div>
    </div>
  );
}
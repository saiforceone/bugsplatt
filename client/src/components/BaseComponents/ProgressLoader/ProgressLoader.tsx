/**
 * File: ProgressLoader.tsx
 * Created by: sai @ 8/4/22
 */

import React, {CSSProperties, FC} from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

const loaderStyle: CSSProperties = {
  display: 'block'
}

interface ProgressLoaderProps {
  color?: string;
  visible: boolean;
}

export const ProgressLoader: FC<ProgressLoaderProps> = ({color, visible}) => {
  return visible ? (
    <div className="h-fit ml-3 self-center justify-items-center">
      <PulseLoader color={color} cssOverride={loaderStyle} loading={true} size={12}/>
    </div>
  ) : <div />;
};

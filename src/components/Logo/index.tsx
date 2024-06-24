import { memo } from 'react';
import { Image } from '@lobehub/ui';

import { imageUrl } from '@/const/url';
// import { number } from 'zod';
interface ModelTagProps {
  // model: string;
  width: number
}
const Logo = memo<ModelTagProps>(({ width = 150 }) => {
  return (
    <Image
      style={{ width: width }}
      src={imageUrl('canpoint.svg')}
    />
    // <img src={imageUrl('canpoint.svg')} width={width} alt="" />
  );
});

export default Logo;

import { memo } from 'react';
import { imageUrl } from '@/const/url';
import { number } from 'zod';
interface ModelTagProps {
    model: string;
    width:number
  }
const Logo = memo<ModelTagProps>(({width=150}) => {
    return (
        <img src={imageUrl('canpoint.svg')} width={width} alt="" />
    );
  });
  
  export default Logo;
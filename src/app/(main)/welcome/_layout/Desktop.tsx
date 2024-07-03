import { GridShowcase, Logo } from '@lobehub/ui';
import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

// import Follow from '@/features/Follow';

const COPYRIGHT = '' //`© ${new Date().getFullYear()} LobeHub, LLC`;

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Flexbox
        align={'center'}
        height={'100%'}
        justify={'space-between'}
        padding={16}
        style={{ overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
    {/* <svg xmlns="http://www.w3.org/2000/svg" width="940" height="320"   fill-rule="evenodd" fill="currentColor"><title>LobeChat</title><g><title>Layer 1</title><text font-weight="bold" transform="matrix(6.21685 0 0 7.63066 -315.719 -807.618)" stroke="null" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" stroke-width="0" fill="#000000" id="svg_2" y="136.98769" x="59.1126">LobeChat</text></g></svg>
        */}
        <Logo size={36}   style={{ alignSelf: 'flex-start',color:'transparent' }} type={'text'} />
        <GridShowcase
          innerProps={{ gap: 24 }}
          style={{ maxHeight: 'calc(100% - 104px)', maxWidth: 1024 }}
          width={'100%'}
        >
          {children}
        </GridShowcase>
        <Flexbox align={'center'} horizontal justify={'space-between'}>
          <span style={{ opacity: 0.5 }}>{COPYRIGHT}</span>
          {/* <Follow /> */}
        </Flexbox>
      </Flexbox>
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
    </>
  );
};

export default DesktopLayout;

'use client';

import { DraggablePanel } from '@lobehub/ui';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
// import { cookies } from 'next/headers';
import {
  CHAT_TEXTAREA_HEIGHT,
  CHAT_TEXTAREA_MAX_HEIGHT,
  HEADER_HEIGHT,
} from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

import Footer from './Footer';
import Head from './Header';
import TextArea from './TextArea';

// -----------获取token
// const cookieStore = cookies();
// setCookie('CANPOINTTOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw');
const token={value:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'}// cookieStore.get('CANPOINTTOKEN');
// const token = cookieStore.get('CANPOINTTOKEN');

const DesktopChatInput = memo(() => {
  const [expand, setExpand] = useState<boolean>(false);

  const [inputHeight, updatePreference] = useGlobalStore((s) => [
    systemStatusSelectors.inputHeight(s),
    s.updateSystemStatus,
  ]);

  return (
    <DraggablePanel
      fullscreen={expand}
      headerHeight={HEADER_HEIGHT}
      maxHeight={CHAT_TEXTAREA_MAX_HEIGHT}
      minHeight={CHAT_TEXTAREA_HEIGHT}
      onSizeChange={(_, size) => {
        if (!size) return;

        updatePreference({
          inputHeight: typeof size.height === 'string' ? Number.parseInt(size.height) : size.height,
        });
      }}
      placement="bottom"
      size={{ height: inputHeight, width: '100%' }}
      style={{ zIndex: 10 }}
    >
      <Flexbox
        gap={8}
        height={'100%'}
        padding={'12px 0 16px'}
        style={{ minHeight: CHAT_TEXTAREA_HEIGHT, position: 'relative' }}
      >
        <Head expand={expand} setExpand={setExpand} />
        <TextArea setExpand={setExpand} />
        <Footer setExpand={setExpand} />
      </Flexbox>
    </DraggablePanel>
  );
});

DesktopChatInput.displayName = 'DesktopChatInput';

export default DesktopChatInput;

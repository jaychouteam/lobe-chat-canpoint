import { useCallback } from 'react';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { SendMessageParams } from '@/store/chat/slices/message/action';
import { filesSelectors, useFileStore } from '@/store/file';
import { getAuth } from '@/app/api/request'

export type UseSendMessageParams = Pick<
  SendMessageParams,
  'onlyAddUserMessage' | 'isWelcomeQuestion'
>;

export const useSendMessage = () => {
  const [sendMessage, updateInputMessage] = useChatStore((s) => [
    s.sendMessage,
    s.updateInputMessage,
  ]);

  return useCallback(async (params: UseSendMessageParams = {}) => {
    const store = useChatStore.getState();
    if (chatSelectors.isAIGenerating(store)) return;

    const imageList = filesSelectors.imageUrlOrBase64List(useFileStore.getState());
    // if there is no message and no image, then we should not send the message
    if (!store.inputMessage && imageList.length === 0) return;

    // whm----------校验用户
    let res = await getAuth()
    if (!res) {//测试
      //window.open('http://account.canpoint.cn/', '_blank')
      return
    }
    // whm----------校验用户
    sendMessage({
      files: imageList,
      message: store.inputMessage,
      ...params,
    });

    updateInputMessage('');
    useFileStore.getState().clearImageList();

    // const hasSystemRole = agentSelectors.hasSystemRole(useAgentStore.getState());
    // const agentSetting = useAgentStore.getState().agentSettingInstance;

    // // if there is a system role, then we need to use agent setting instance to autocomplete agent meta
    // if (hasSystemRole && !!agentSetting) {
    //   agentSetting.autocompleteAllMeta();
    // }
  }, []);
};

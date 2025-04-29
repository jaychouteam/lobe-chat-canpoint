import { Button, InputPassword } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { useUserStore } from '@/store/user';
import { keyVaultsConfigSelectors } from '@/store/user/selectors';

import { FormAction } from './style';

interface AccessCodeFormProps {
  id: string;
}

const AccessCodeForm = memo<AccessCodeFormProps>(({ id }) => {
  const { t } = useTranslation('error');
  const [password, updateKeyVaults] = useUserStore((s) => [
    keyVaultsConfigSelectors.password(s),
    s.updateKeyVaults,
  ]);
  const [resend, deleteMessage] = useChatStore((s) => [s.regenerateMessage, s.deleteMessage]);
  // 自动执行
  updateKeyVaults({ password: 'QUxnd579eGvC6iW4Ir3JRA0qhyZOglsMYLbHSEjXKu12Nw8tToFkzaDPpmfcVBZ9g0cGDxmJ9ocM0U5LqXzmPB0NWTzFVhPH2ksz'})
  resend(id);
  deleteMessage(id);

  return (
    <>
      <FormAction
        avatar={'🗳'}
        description={t('unlock.password.description')}
        title={t('unlock.password.title')}
      >
        <InputPassword
          autoComplete={'new-password'}
          onChange={(e) => {
            updateKeyVaults({ password: e.target.value });
          }}
          placeholder={t('unlock.password.placeholder')}
          value={password}
          variant={'filled'}
        />
      </FormAction>
      <Flexbox gap={12}>
        <Button
          onClick={() => {
            resend(id);
            deleteMessage(id);
          }}
          type={'primary'}
        >
          {/* 未输入密码 */}
         {t('unlock.confirm')}
        </Button>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          {t('unlock.closeMessage')}
        </Button>
      </Flexbox>
    </>
  );
});

export default AccessCodeForm;

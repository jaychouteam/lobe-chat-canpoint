'use client';

import { Avatar, type AvatarProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { forwardRef } from 'react';

import { DEFAULT_USER_AVATAR_URL } from '@/const/meta';
import { useUserStore } from '@/store/user';
import { authSelectors, userProfileSelectors } from '@/store/user/selectors';

const useStyles = createStyles(({ css, token }) => ({
  clickable: css`
    position: relative;
    transition: all 200ms ease-out 0s;

    &::before {
      content: '';

      position: absolute;
      transform: skewX(-45deg) translateX(-400%);

      overflow: hidden;

      box-sizing: border-box;
      width: 25%;
      height: 100%;

      background: rgba(255, 255, 255, 50%);

      transition: all 200ms ease-out 0s;
    }

    &:hover {
      box-shadow: 0 0 0 2px ${token.colorPrimary};

      &::before {
        transform: skewX(-45deg) translateX(400%);
      }
    }
  `,
}));

export interface UserAvatarProps extends AvatarProps {
  clickable?: boolean;
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ size = 40, background, clickable, className, style, ...rest }, ref) => {
    const { styles, cx } = useStyles();
    const [avatar, username] = useUserStore((s) => [
      userProfileSelectors.userAvatar(s),
      userProfileSelectors.username(s),
    ]);

    const isSignedIn = useUserStore(authSelectors.isLogin);

    return (
      <Avatar
        alt={isSignedIn ? (username as string) : 'Canpoint'}
        // avatar={isSignedIn ? avatar || DEFAULT_USER_AVATAR_URL : DEFAULT_USER_AVATAR_URL}
        avatar={'https://cp-cloud-files-tiku.oss-cn-hangzhou.aliyuncs.com/full-score-applets/user/nickImgs.png'}
        // avatar={'https://cp-cloud-files-tiku.oss-cn-hangzhou.aliyuncs.com/png/f6dc3cce-fe59-4e7d-aa8f-5d03b9718517.png'}
        background={isSignedIn && avatar ? background : undefined}
        className={cx(clickable && styles.clickable, className)}
        ref={ref}
        size={size}
        style={{ flex: 'none', ...style }}
        unoptimized
        {...rest}
      />
    );
  },
);

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;

import { PluginRequestPayload } from '@lobehub/chat-plugin-sdk';
import { memo } from 'react';

import { useToolStore } from '@/store/tool';
import { pluginSelectors } from '@/store/tool/slices/plugin/selectors';

import IFrameRender from './Iframe';

export interface PluginStandaloneTypeProps {
  id: string;
  name?: string;
  payload?: PluginRequestPayload;
}
interface PluginManifest {
  [key: string]: unknown; // 允许任意属性
  ui?: {
    height?: number;
    mode?: string;
    // 这里定义 ui 的具体结构
    url?: string;
    width?: number;
    // 其他可能的属性...
  };
}
const PluginDefaultType = memo<PluginStandaloneTypeProps>(({ payload, id, name = 'unknown' }) => {
  const manifest = useToolStore(pluginSelectors.getPluginManifestById(name) as  any)  as PluginManifest;

  if (!manifest?.ui) return;

  const ui = manifest.ui;

  if (!ui.url) return;

  return (
    <IFrameRender height={ui.height} id={id} payload={payload} url={ui.url} width={ui.width} />
  );
});

export default PluginDefaultType;

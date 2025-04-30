import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense, memo } from 'react';

import { useToolStore } from '@/store/tool';
import { pluginSelectors } from '@/store/tool/selectors';

import Loading from '../Loading';
import { useParseContent } from '../useParseContent';
import IFrameRender from './IFrameRender';

const SystemJsRender = dynamic(() => import('./SystemJsRender'), { ssr: false });

export interface PluginDefaultTypeProps {
  content: string;
  loading?: boolean;
  name?: string;
}

// 先定义 manifest 的类型
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
const PluginDefaultType = memo<PluginDefaultTypeProps>(({ content, name, loading }) => {
  const manifest = useToolStore(pluginSelectors.getPluginManifestById(name || '') as any) as PluginManifest ;

  const { isJSON, data } = useParseContent(content);

  if (!isJSON) {
    return loading && <Loading />;
  }

  if (!manifest?.ui) return;

  const ui = manifest.ui;

  if (!ui.url) return;

  if (ui.mode === 'module')
    return (
      <Suspense fallback={<Skeleton active style={{ width: 400 }} />}>
        <SystemJsRender content={data} name={name || 'unknown'} url={ui.url} />
      </Suspense>
    );

  return (
    <IFrameRender
      content={data}
      height={ui.height}
      name={name || 'unknown'}
      url={ui.url}
      width={ui.width}
    />
  );
});

export default PluginDefaultType;

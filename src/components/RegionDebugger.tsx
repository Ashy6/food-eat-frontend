import { useState, useEffect } from 'react';
import { getRegion, getPlatformName, selectVideoPlatform, type Region, type VideoPlatform } from '../utils/region';
import { useLanguage } from '../contexts/LanguageContext';
import './RegionDebugger.css';

/**
 * 地区调试器组件
 * 开发时可以显示当前检测到的地区和视频平台
 */
export const RegionDebugger = () => {
  const { language } = useLanguage();
  const [region, setRegion] = useState<Region | null>(null);
  const [platform, setPlatform] = useState<VideoPlatform | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      const detectedRegion = await getRegion();
      const selectedPlatform = await selectVideoPlatform();
      setRegion(detectedRegion);
      setPlatform(selectedPlatform);
    };

    init();
  }, [language]);

  // 仅在开发环境显示，或按 Ctrl+Shift+D 切换显示
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return null;
  }

  const clearCache = () => {
    localStorage.removeItem('user_region');
    localStorage.removeItem('region_timestamp');
    window.location.reload();
  };

  const forceRegion = (newRegion: Region) => {
    localStorage.setItem('user_region', newRegion);
    localStorage.setItem('region_timestamp', Date.now().toString());
    window.location.reload();
  };

  return (
    <div className="region-debugger">
      <h4>🧪 地区调试器</h4>
      <div className="debugger-info">
        <p>
          <strong>当前语言:</strong>{' '}
          <span className="platform-badge-debug">
            {language === 'zh-CN' ? '简体中文' : 'English'}
          </span>
        </p>
        <p>
          <strong>检测地区:</strong>{' '}
          <span className={`region-badge ${region}`}>
            {region === 'CN' ? '中国大陆 🇨🇳' : '其他地区 🌍'}
          </span>
        </p>
        <p>
          <strong>视频平台:</strong>{' '}
          <span className="platform-badge-debug">{platform && getPlatformName(platform)}</span>
        </p>
        <p className="hint">
          <small>
            <strong>检测依据:</strong> 优先使用语言设置，其次是时区、语言环境和 IP 地理位置
          </small>
        </p>
      </div>
      <div className="debugger-actions">
        <button onClick={() => forceRegion('CN')} className="btn-debug">
          强制设置为中国
        </button>
        <button onClick={() => forceRegion('OTHER')} className="btn-debug">
          强制设置为其他
        </button>
        <button onClick={clearCache} className="btn-debug btn-danger">
          清除缓存
        </button>
      </div>
      <p className="debugger-tip">
        <small>按 <kbd>Ctrl+Shift+D</kbd> 切换显示</small>
      </p>
    </div>
  );
};

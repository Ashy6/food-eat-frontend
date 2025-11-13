/**
 * 地区检测工具
 * 用于判断用户所在地区，以便提供本地化的视频链接
 */

// 视频平台类型
export type VideoPlatform = 'youtube' | 'bilibili' | 'douyin';

// 地区类型
export type Region = 'CN' | 'OTHER';

/**
 * 检测用户是否在中国大陆
 * 使用多种方法综合判断
 */
export async function detectRegion(): Promise<Region> {
  // 方法 1: 检查时区
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const chineseTimezones = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Urumqi'];

  if (chineseTimezones.includes(timezone)) {
    return 'CN';
  }

  // 方法 2: 检查语言设置
  const language = navigator.language || navigator.languages?.[0];
  if (language?.startsWith('zh-CN')) {
    return 'CN';
  }

  // 方法 3: 尝试通过 IP 地理位置 API（可选）
  try {
    const response = await fetch('https://ipapi.co/json/', {
      timeout: 3000,
    } as RequestInit);

    if (response.ok) {
      const data = await response.json();
      if (data.country_code === 'CN') {
        return 'CN';
      }
    }
  } catch (error) {
    // IP 检测失败，继续使用其他方法
    console.warn('IP geolocation failed, using fallback methods');
  }

  // 默认返回非中国地区
  return 'OTHER';
}

/**
 * 缓存地区检测结果
 */
let cachedRegion: Region | null = null;

/**
 * 获取用户地区（带缓存）
 */
export async function getRegion(): Promise<Region> {
  if (cachedRegion) {
    return cachedRegion;
  }

  cachedRegion = await detectRegion();

  // 缓存到 localStorage（24小时有效）
  try {
    localStorage.setItem('user_region', cachedRegion);
    localStorage.setItem('region_timestamp', Date.now().toString());
  } catch (error) {
    console.warn('Failed to cache region:', error);
  }

  return cachedRegion;
}

/**
 * 从缓存加载地区信息
 */
export function loadCachedRegion(): Region | null {
  try {
    const cached = localStorage.getItem('user_region');
    const timestamp = localStorage.getItem('region_timestamp');

    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24小时

      if (age < maxAge) {
        return cached as Region;
      }
    }
  } catch (error) {
    console.warn('Failed to load cached region:', error);
  }

  return null;
}

/**
 * 根据地区获取推荐的视频平台
 */
export function getRecommendedPlatform(region: Region): VideoPlatform {
  return region === 'CN' ? 'bilibili' : 'youtube';
}

/**
 * 生成视频搜索链接
 * @param recipeName 食谱名称
 * @param platform 视频平台
 * @param originalYoutubeUrl 原始 YouTube 链接（用于提取视频 ID）
 */
export function generateVideoLink(
  recipeName: string,
  platform: VideoPlatform,
  originalYoutubeUrl?: string
): string {
  const encodedName = encodeURIComponent(recipeName);

  switch (platform) {
    case 'youtube':
      // 如果有原始 YouTube 链接，直接使用
      if (originalYoutubeUrl) {
        return originalYoutubeUrl;
      }
      // 否则搜索
      return `https://www.youtube.com/results?search_query=${encodedName}+recipe`;

    case 'bilibili':
      // B站搜索链接
      return `https://search.bilibili.com/all?keyword=${encodedName}+教程`;

    case 'douyin':
      // 抖音搜索链接（网页版）
      return `https://www.douyin.com/search/${encodedName}?type=video`;

    default:
      return originalYoutubeUrl || '#';
  }
}

/**
 * 获取视频平台的显示名称
 */
export function getPlatformName(platform: VideoPlatform): string {
  const names: Record<VideoPlatform, string> = {
    youtube: 'YouTube',
    bilibili: 'Bilibili',
    douyin: '抖音',
  };

  return names[platform] || 'YouTube';
}

/**
 * 检测网络连通性（判断是否能访问 YouTube）
 */
export async function canAccessYouTube(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    await fetch('https://www.youtube.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 智能选择视频平台
 * 综合考虑地区和网络连通性
 * 优先使用用户的语言选择
 */
export async function selectVideoPlatform(): Promise<VideoPlatform> {
  // 优先检查用户的语言设置
  const savedLanguage = localStorage.getItem('app_language');
  if (savedLanguage === 'zh-CN') {
    return 'bilibili';
  }
  if (savedLanguage === 'en-US') {
    return 'youtube';
  }

  // 如果没有语言设置，尝试从缓存加载地区
  const cached = loadCachedRegion();
  if (cached) {
    return getRecommendedPlatform(cached);
  }

  // 最后尝试自动检测地区
  const region = await getRegion();

  // 如果是中国地区，推荐 Bilibili
  if (region === 'CN') {
    return 'bilibili';
  }

  // 非中国地区，使用 YouTube
  return 'youtube';
}

import { settings } from '../../settings/settings.mjs';

function getResolutionOfUrl(url, defaultValue = 1) {
  const resolution = settings.RETINA_PREFIX?.exec(url);
  if (resolution) {
    return parseFloat(resolution[1]);
  }
  return defaultValue;
}

export { getResolutionOfUrl };
//# sourceMappingURL=getResolutionOfUrl.mjs.map

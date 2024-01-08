import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { settings } from '../../../settings/settings.mjs';

const detectAvif = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 1
  },
  test: async () => {
    if (!globalThis.createImageBitmap)
      return false;
    const avifData = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    const blob = await settings.ADAPTER.fetch(avifData).then((r) => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  },
  add: async (formats) => [...formats, "avif"],
  remove: async (formats) => formats.filter((f) => f !== "avif")
};

export { detectAvif };
//# sourceMappingURL=detectAvif.mjs.map

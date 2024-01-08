import { BlendModeFilter } from './BlendModeFilter.mjs';

class DifferenceBlend extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                fragColor = vec4(blendDifference(back.rgb, front.rgb, front.a), uBlend);
            `
      },
      gpu: {
        functions: `
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
      }
    });
  }
}

export { DifferenceBlend };
//# sourceMappingURL=DifferenceBlend.mjs.map

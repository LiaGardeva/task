import { BlendModeFilter } from './BlendModeFilter.mjs';

class ColorBurnBlend extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                fragColor = vec4(blendColorBurn(back.rgb, front.rgb, front.a), uBlend);
            `
      },
      gpu: {
        functions: `
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
      }
    });
  }
}

export { ColorBurnBlend };
//# sourceMappingURL=ColorBurnBlend.mjs.map

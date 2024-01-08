'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var BlendModeFilter = require('./BlendModeFilter.js');

class NegationBlend extends BlendModeFilter.BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                fragColor = vec4(blendNegation(back.rgb, front.rgb, front.a), uBlend);
                `
      },
      gpu: {
        functions: `
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `
      }
    });
  }
}

exports.NegationBlend = NegationBlend;
//# sourceMappingURL=NegationBlend.js.map

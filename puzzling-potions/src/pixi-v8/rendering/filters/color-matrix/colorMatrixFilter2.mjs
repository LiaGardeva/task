var source = "struct GlobalUniforms {\n  projectionMatrix:mat3x3<f32>,\n  worldTransformMatrix:mat3x3<f32>,\n  worldAlpha: f32\n}\n\nstruct GlobalFilterUniforms {\n  inputSize:vec4<f32>,\n  inputPixel:vec4<f32>,\n  inputClamp:vec4<f32>,\n  outputFrame:vec4<f32>,\n  backgroundFrame:vec4<f32>,\n  globalFrame:vec4<f32>,\n};\n\nstruct ColorMatrixUniforms {\n  uColorMatrix:array<vec4<f32>, 5>,\n  uAlpha:f32,\n};\n\n@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;\n\n@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(1) @binding(1) var myTexture: texture_2d<f32>;\n@group(1) @binding(2) var mySampler : sampler;\n@group(1) @binding(3) var backTexture: texture_2d<f32>;\n@group(2) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;\n\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n  };\n  \nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * max(gfu.outputFrame.zw, vec2(0.)) + gfu.outputFrame.xy;\n\n    return vec4((globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);\n}\n\n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition),\n  );\n}\n\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n) -> @location(0) vec4<f32> {\n\n\n  var c = textureSample(myTexture, mySampler, uv);\n  \n  if (colorMatrixUniforms.uAlpha == 0.0) {\n    return c;\n  }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.r /= c.a;\n      c.g /= c.a;\n      c.b /= c.a;\n    }\n\n    var cm = colorMatrixUniforms.uColorMatrix;\n\n\n    var result = vec4<f32>(0.);\n\n    result.r = (cm[0][0] * c.r);\n    result.r += (cm[0][1] * c.g);\n    result.r += (cm[0][2] * c.b);\n    result.r += (cm[0][3] * c.a);\n    result.r += cm[1][0];\n\n    result.g = (cm[1][1] * c.r);\n    result.g += (cm[1][2] * c.g);\n    result.g += (cm[1][3] * c.b);\n    result.g += (cm[2][0] * c.a);\n    result.g += cm[2][1];\n\n    result.b = (cm[2][2] * c.r);\n    result.b += (cm[2][3] * c.g);\n    result.b += (cm[3][0] * c.b);\n    result.b += (cm[3][1] * c.a);\n    result.b += cm[3][2];\n\n    result.a = (cm[3][3] * c.r);\n    result.a += (cm[4][0] * c.g);\n    result.a += (cm[4][1] * c.b);\n    result.a += (cm[4][2] * c.a);\n    result.a += cm[4][3];\n\n    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);\n\n    rgb.r *= result.a;\n    rgb.g *= result.a;\n    rgb.b *= result.a;\n\n    return vec4(rgb, result.a);\n}";

export { source as default };
//# sourceMappingURL=colorMatrixFilter2.mjs.map

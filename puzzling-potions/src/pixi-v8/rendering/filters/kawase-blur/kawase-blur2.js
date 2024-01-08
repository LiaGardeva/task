'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = "struct GlobalUniforms {\n  projectionMatrix:mat3x3<f32>,\n  worldTransformMatrix:mat3x3<f32>,\n  worldAlpha: f32\n}\n\nstruct GlobalFilterUniforms {\n  inputSize:vec4<f32>,\n  inputPixel:vec4<f32>,\n  inputClamp:vec4<f32>,\n  outputFrame:vec4<f32>,\n  backgroundFrame:vec4<f32>,\n  globalFrame:vec4<f32>,\n};\n\nstruct KawaseUniforms {\n  uOffset:vec2<f32>\n};\n\n\n\n@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;\n\n@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(1) @binding(1) var myTexture: texture_2d<f32>;\n@group(1) @binding(2) var mySampler : sampler;\n@group(1) @binding(3) var backTexture: texture_2d<f32>;\n\n@group(2) @binding(0) var<uniform> kawaseUniforms : KawaseUniforms;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) backgroundUv : vec2<f32>,\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;\n\n    return vec4((globalUniforms.projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);\n}\n\nfn filterBackgroundTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * gfu.backgroundFrame.zw;\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  \n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.globalFrame.zw;\n}\n  \n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition),\n   filterBackgroundTextureCoord(aPosition),\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) backgroundUv: vec2<f32>,\n  @builtin(position) position: vec4<f32>\n) -> @location(0) vec4<f32> {\n  let uOffset = kawaseUniforms.uOffset;\n  var color: vec4<f32> = vec4<f32>(0.0);\n\n  // Sample top left pixel\n  color += textureSample(myTexture, mySampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));\n  // Sample top right pixel\n  color += textureSample(myTexture, mySampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));\n  // Sample bottom right pixel\n  color += textureSample(myTexture, mySampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));\n  // Sample bottom left pixel\n  color += textureSample(myTexture, mySampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));\n  // Average\n  color *= 0.25;\n\n  return color;\n}";

exports["default"] = source;
//# sourceMappingURL=kawase-blur2.js.map

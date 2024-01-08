'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vertex = "in vec2 aPosition;\n\nout vec2 vTextureCoord;\nout vec2 vMaskCoord;\n\nuniform globalUniforms {\n  mat3 projectionMatrix;\n  mat3 worldTransformMatrix;\n  float worldAlpha;\n};\n\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\nuniform mat3 filterMatrix;\n\nvec4 filterVertexPosition(  vec2 aPosition )\n{\n    vec2 position = aPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord(  vec2 aPosition )\n{\n    return aPosition * (outputFrame.zw * inputSize.zw);\n}\n\nvec2 getFilterCoord( vec2 aPosition )\n{\n    return  ( filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;\n}   \n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition(aPosition);\n    vTextureCoord = filterTextureCoord(aPosition);\n    vMaskCoord = getFilterCoord(aPosition);\n}\n";

exports["default"] = vertex;
//# sourceMappingURL=mask.js.map

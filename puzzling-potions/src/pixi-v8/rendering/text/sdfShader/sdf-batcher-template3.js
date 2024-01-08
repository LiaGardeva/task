'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fragmentSrc = "in vec2 vTextureCoord;\nin vec4 vColor;\nin float vTextureId;\n\nuniform sampler2D uSamplers[%count%];\nuniform float distance;\n\nout vec4 finalColor;\n\nvoid main(void){\n    vec4 outColor;\n    %forloop%\n\n\n    // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\n   outColor.rgb = outColor.rgb / outColor.a;\n\n    // MSDF\n    float median = outColor.r + outColor.g + outColor.b -\n                    min(outColor.r, min(outColor.g, outColor.b)) -\n                    max(outColor.r, max(outColor.g, outColor.b));\n   \n    // SDF\n    median = min(median, outColor.a);\n\n    float screenPxDistance = distance * (median - 0.5);\n    float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\n    if (median < 0.01) {\n        alpha = 0.0;\n    } else if (median > 0.99) {\n        alpha = 1.0;\n    }\n\n    finalColor =  vec4(vColor.rgb * alpha, alpha);\n}\n";

exports["default"] = fragmentSrc;
//# sourceMappingURL=sdf-batcher-template3.js.map

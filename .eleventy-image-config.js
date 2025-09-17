const Image = require("@11ty/eleventy-img");

module.exports = {
  formats: ["webp", "jpeg"],
  widths: [400, 800, 1200, 1600, null],
  urlPath: "/images/",
  outputDir: "./_site/images/",
  filenameFormat: function (id, src, width, format) {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `${name}-${width}w.${format}`;
  },
  sharpWebpOptions: {
    quality: 80,
    effort: 6
  },
  sharpJpegOptions: {
    quality: 85,
    progressive: true
  }
};

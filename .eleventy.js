module.exports = function(eleventyConfig) {
  // Register isActive shortcode for all template engines
  eleventyConfig.addShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );

  // Also register as Nunjucks shortcode specifically
  eleventyConfig.addNunjucksShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );

  // Passthrough copy for public files
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Add image optimization shortcode for responsive images
  eleventyConfig.addShortcode("responsiveImage", function(src, alt, sizes = "100vw", loading = "lazy") {
    const srcWithoutExt = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const webpSrc = `${srcWithoutExt}.webp`;
    const fallbackSrc = src;

    return `
      <picture>
        <source srcset="${webpSrc}" type="image/webp">
        <img src="${fallbackSrc}" alt="${alt}" loading="${loading}" sizes="${sizes}">
      </picture>
    `;
  });

  // Performance optimizations
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return require("html-minifier").minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    // Performance optimizations
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    // Enable data deep merge
    dataDeepMerge: true,
    // Enable passthrough file copy
    passthroughFileCopy: true
  };
};

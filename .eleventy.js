module.exports = function(eleventyConfig) {
  // Register isActive shortcode for all template engines
  eleventyConfig.addShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );
  
  // Also register as Nunjucks shortcode specifically
  eleventyConfig.addNunjucksShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );

  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};

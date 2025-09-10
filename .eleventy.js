module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("isActive", (href, pageUrl) =>
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

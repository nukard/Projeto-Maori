const fs = require("fs");
const path = require("path");

const imageMetadataCache = new Map();

function parseJpeg(buffer) {
  if (!buffer || buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return {};
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }

    const marker = buffer[offset + 1];
    const blockLength = buffer.readUInt16BE(offset + 2);

    // Baseline and progressive JPEG markers that contain size info
    const isSofMarker =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isSofMarker) {
      if (offset + 7 >= buffer.length) {
        return {};
      }
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      if (width && height) {
        return { width, height };
      }
      return {};
    }

    if (!blockLength) {
      break;
    }

    offset += 2 + blockLength;
  }

  return {};
}

function parsePng(buffer) {
  if (!buffer || buffer.length < 24) {
    return {};
  }

  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!buffer.subarray(0, 8).equals(pngSignature)) {
    return {};
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  if (width && height) {
    return { width, height };
  }

  return {};
}

function getImageMetadata(src) {
  if (!src) {
    return {};
  }

  if (imageMetadataCache.has(src)) {
    return imageMetadataCache.get(src);
  }

  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const absolutePath = path.join("public", normalizedSrc);

  let metadata = {};

  try {
    const fileBuffer = fs.readFileSync(absolutePath);
    if (/\.jpe?g$/i.test(normalizedSrc)) {
      metadata = parseJpeg(fileBuffer);
    } else if (/\.png$/i.test(normalizedSrc)) {
      metadata = parsePng(fileBuffer);
    }
  } catch (error) {
    // Ignore read errors so the build continues uninterrupted
    metadata = {};
  }

  imageMetadataCache.set(src, metadata);
  return metadata;
}

function buildImageAttributes(src, alt, options = {}) {
  if (!src) {
    return "";
  }

  const finalSrc = src.startsWith("/") ? src : `/${src}`;
  const metadata = getImageMetadata(finalSrc);

  const attributes = [
    `src="${finalSrc}"`,
    `alt="${typeof alt === "string" ? alt : ""}"`
  ];

  if (options.class) {
    attributes.push(`class="${options.class}"`);
  }

  if (options.id) {
    attributes.push(`id="${options.id}"`);
  }

  const width = options.width ?? metadata.width;
  const height = options.height ?? metadata.height;

  if (width) {
    attributes.push(`width="${width}"`);
  }
  if (height) {
    attributes.push(`height="${height}"`);
  }

  const loading = options.loading ?? "lazy";
  if (loading && loading !== "auto") {
    attributes.push(`loading="${loading}"`);
  }

  const decoding = options.decoding ?? "async";
  if (decoding) {
    attributes.push(`decoding="${decoding}"`);
  }

  if (options.fetchpriority) {
    attributes.push(`fetchpriority="${options.fetchpriority}"`);
  }

  if (options.sizes) {
    attributes.push(`sizes="${options.sizes}"`);
  }

  if (options.style) {
    attributes.push(`style="${options.style}"`);
  }

  return attributes.join(" ");
}

function imageShortcode(src, alt, options = {}) {
  const attributeString = buildImageAttributes(src, alt, options);
  return attributeString ? `<img ${attributeString}>` : "";
}

module.exports = function(eleventyConfig) {
  // Register isActive shortcode for all template engines
  eleventyConfig.addShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );

  // Also register as Nunjucks shortcode specifically
  eleventyConfig.addNunjucksShortcode("isActive", (href, pageUrl) =>
    (pageUrl === href || (href !== "/" && pageUrl?.startsWith(href))) ? "active" : ""
  );

  eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksShortcode("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ "public": "/" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};

const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const svgSptite = require("gulp-svg-sprite");
const image = require("gulp-image");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const sourceMaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dist"])
}

const resources = () => {
  return src("src/resources/**")
    .pipe(dest("dist"))
}

const stylesDev = () => {
  return src([
    "src/styles/**/normalize.css",
    "src/styles/**/styles.css",
    "src/styles/**/media.css",
    "src/styles/**/*.css"
  ])
    .pipe(sourceMaps.init())
    .pipe(concat("main.css"))
    .pipe(sourceMaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream())
}

const stylesBuild = () => {
  return src([
    "src/styles/**/normalize.css",
    "src/styles/**/styles.css",
    "src/styles/**/media.css",
    "src/styles/**/*.css"
  ])
    .pipe(concat("main.css"))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(dest("dist"))
}

const htmlMinifyDev = () => {
  return src("src/**/*.html")
    .pipe(dest("dist"))
    .pipe(browserSync.stream())
}

const htmlMinifyBuild = () => {
  return src("src/**/*.html")
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest("dist"))
}

const svgSptites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(svgSptite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest("dist/images"))
}

const scriptsDev = () => {
  return src([
    "src/js/components/**/*.js",
    "src/js/main.js"
  ])
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(concat("app.js"))
    .pipe(sourceMaps.write())
    .pipe(dest("dist"))
    .pipe(browserSync.stream())
}

const scriptsBuild = () => {
  return src([
    "src/js/components/**/*.js",
    "src/js/main.js"
  ])
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(concat("app.js"))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest("dist"))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })
}

const images = () => {
  return src([
    "src/images/**/*.jpg",
    "src/images/**/*.png",
    "src/images/*.svg",
    "src/images/**/*.jpeg",
  ])
    .pipe(image())
    .pipe(dest("dist/images"))
}

const fonts = () => {
  return src([
    "src/fonts/**/*.woff",
    "src/fonts/**/*.woff2"
  ])
    .pipe(dest("dist/fonts"))
}

watch("src/**/*.html", htmlMinifyDev)
watch("src/styles/**/*.css", stylesDev)
watch("src/images/svg/**/*.svg", svgSptites)
// watch("src/js/**/*.js", scriptsDev)
watch("src/resources/**", resources)

exports.dev = series(clean, resources, htmlMinifyDev, stylesDev, images, fonts, svgSptites, watchFiles)
exports.build = series(clean, resources, htmlMinifyBuild, stylesBuild, images, fonts, svgSptites)

exports.default = exports.dev;

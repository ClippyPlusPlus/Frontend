module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},
  },
  variants: ['responsive', 'group-hover', 'disabled', 'hover', 'focus', 'active'],
  plugins: [],
}

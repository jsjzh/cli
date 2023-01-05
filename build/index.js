require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    platform: "node",
    bundle: true,
    minify: true,
    sourcemap: true,
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

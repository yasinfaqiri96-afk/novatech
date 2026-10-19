import next from "eslint-config-next";

const eslintConfig = [
  {
    // .output/.wrangler/.work hold generated worker bundles, not source.
    ignores: [".next/**", "node_modules/**", "public/**", "scripts/**", ".archive/**", ".output/**", ".wrangler/**", ".work/**"],
  },
  ...next,
];

export default eslintConfig;

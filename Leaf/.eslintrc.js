module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:react-native/all"],
    plugins: ["react", "react-native"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        "react-native/react-native": true,
    },
    rules: {
        "react-native/no-inline-styles": "off",
        "react-native/no-unused-styles": 2,
        "react-native/no-single-element-style-arrays": 2,
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/prop-types": "off",
        "react-native/split-platform-components": "off",
    },
    settings: {
        react: {
            version: "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
};

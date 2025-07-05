import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}", //
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./src/index.html",
    ],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            ...colors
        },
    },
    plugins: [],
};

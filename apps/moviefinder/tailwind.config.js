const { join } = require('path');

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}')],
    theme: {
        extend: {
            colors: {
                'primary-text': '#f9fafb',
                'secondary-text': '#0F1415',
                'accent-text': '#f9fafb',
                primary: {
                    DEFAULT: '#122E81',
                    50: '#F6F8FE',
                    100: '#E4EAFB',
                    200: '#C0CEF6',
                    300: '#9DB2F1',
                    400: '#7996EC',
                    500: '#557AE7',
                    600: '#2454E0',
                    700: '#1940B3',
                    800: '#122E81',
                    900: '#0B1D50',
                    950: '#081438',
                },
                secondary: {
                    DEFAULT: '#F3ECF1',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#F3ECF1',
                    300: '#DDCAD8',
                    400: '#C8A7BE',
                    500: '#B285A5',
                    600: '#9C638C',
                    700: '#7A4D6D',
                    800: '#57374E',
                    900: '#35212F',
                    950: '#241720',
                },
                accent: {
                    DEFAULT: '#E7557A',
                    50: '#FEF6F8',
                    100: '#FBE4EA',
                    200: '#F6C0CE',
                    300: '#F19DB2',
                    400: '#EC7996',
                    500: '#E7557A',
                    600: '#E02454',
                    700: '#B31940',
                    800: '#81122E',
                    900: '#500B1D',
                    950: '#380814',
                },
                background: {
                    DEFAULT: '#0F1415',
                    50: '#B5C6CA',
                    100: '#A9BDC2',
                    200: '#91ABB1',
                    300: '#7999A0',
                    400: '#64858C',
                    500: '#536F74',
                    600: '#42585C',
                    700: '#314145',
                    800: '#202B2D',
                    900: '#0F1415',
                    950: '#030405',
                },
            },
            fontSize: {
                xxs: '0.5rem',
            },
            fontFamily: {
                mono: ['Anton', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
};


import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#0A192F', // Abyssal Plain
                    800: '#112240', // Card Background
                    700: '#233554', // Border/Stroke
                },
                cyan: {
                    DEFAULT: '#00F0FF', // Electric Teal
                    400: '#00ABB3',     // Interactive
                    glow: 'rgba(0, 240, 255, 0.15)',
                },
                emerald: {
                    500: '#10B981', // Safe/Growth
                },
                orange: {
                    500: '#F97316', // Risk/Warning
                },
                slate: {
                    400: '#94A3B8', // Neutral text
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                display: ['var(--font-outfit)'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            boxShadow: {
                'glow': '0 0 15px rgba(0, 240, 255, 0.3)',
            }
        },
    },
    plugins: [],
};
export default config;

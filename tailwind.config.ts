
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				code: {
					blue: '#4078f2',
					red: '#e45649',
					green: '#50a14f',
					yellow: '#c18401',
					purple: '#a626a4',
					cyan: '#0184bc',
					gray: '#383a42',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'blur-in': {
					from: { opacity: '0', filter: 'blur(5px)' },
					to: { opacity: '1', filter: 'blur(0)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				typewriter: {
					to: {
						left: '100%'
					},
				},
				blink: {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.7s ease-out',
				'blur-in': 'blur-in 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				typewriter: 'typewriter 4s steps(40) forwards',
				blink: 'blink 1s step-end infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			boxShadow: {
				'subtle': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
				'elevation': '0 2px 15px rgba(0,0,0,0.05), 0 5px 30px -5px rgba(0,0,0,0.1)',
				'inner-glow': 'inset 0 1px 1px rgba(255,255,255,0.5)',
			},
			transitionTimingFunction: {
				'ios': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

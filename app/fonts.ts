import { Noto_Sans, Fira_Mono } from 'next/font/google';

export const notoSans = Noto_Sans({
	subsets: ['latin'],
	display: 'swap',
})

export const firaMono = Fira_Mono({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '700']
})

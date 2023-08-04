import './globals.css'
import { Poppins } from 'next/font/google'
import Header from './componets/Header';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata = {
  title: 'Nextjs Tutorial',
  description: 'Web development tutorials and courses',
  keywords: 'web development, web design, javascript, react, node, next course',
  icons: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main className='container'>{children}</main>
       </body>
    </html>
  )
}

'use client'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: 'TaskList',
  description: 'An amazing App to remember everything you need to do.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="background">
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}

import React from 'react';
import Header from './Header'; 

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

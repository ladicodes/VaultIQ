import React from 'react';
import Navbar from './Navbar';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
    </div>
  );
};

export default Layout;
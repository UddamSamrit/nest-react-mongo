
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../context/AuthContext';


const Layout: React.FC<{ children: React.ReactNode  }> = ({ children }) => {
    return (
        <div>
            <Header/>
            <AuthProvider>
                <main>{children}</main>
            </AuthProvider>
            <Footer />
        </div>
    );
};

export default Layout;

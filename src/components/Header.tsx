import React from 'react';
import logoSvg from '../assets/logo_cavalera.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-6 rounded-lg shadow-lg mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logoSvg}
              alt="Cavalera Logo"
              className="h-16 w-auto bg-white rounded-lg p-2"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Reporte Google Ads - Noviembre 2025
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-1">
                Cavalera Tattoo & Piercing Studio
              </p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
            <p className="text-sm font-medium text-white/80">Período</p>
            <p className="text-lg font-bold">1 - 30 Noviembre 2025</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

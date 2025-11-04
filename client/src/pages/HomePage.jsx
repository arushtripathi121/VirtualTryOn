import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Try from '../components/Try';
import YourImages from '../components/YourImages';
import Settings from '../components/Settings';
import Logout from '../components/Logout';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('Try');

  const renderContent = () => {
    switch (activeSection) {
      case 'Try':
        return <Try />;
      case 'Your Images':
        return <YourImages />;
      case 'Settings':
        return <Settings />;
      case 'Logout':
        return <Logout />;
      default:
        return <Try />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-[#090909] to-black text-white overflow-hidden flex">
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[25%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[25%] left-[20%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px] animate-pulse delay-700" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      <div className="relative z-20 flex w-full">
        <section className="w-64 flex-shrink-0">
          <Sidebar onSelect={setActiveSection} active={activeSection} />
        </section>
        <section className="flex-1 p-10">{renderContent()}</section>
      </div>
    </div>
  );
};

export default HomePage;

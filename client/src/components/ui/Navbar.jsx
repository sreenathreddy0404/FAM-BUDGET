import React from 'react'
import {Wallet,ChevronRight} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-foreground"/>
            </div>
            <span className="font-bold text-lg text-foreground" >FamBudget</span>
          </Link>
          <Link to="/dashboard">
            <button className='btn-gradient-primary'>
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
        </div>
      </nav>
  )
}

export default Navbar
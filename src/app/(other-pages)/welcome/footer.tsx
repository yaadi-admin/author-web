'use client';

import React from 'react';

export function FooterWelcome() {
  return (
    <footer className="border-t border-gray-100 bg-white/95 backdrop-blur-sm pt-12 pb-8">
      <div className="max-w-12xl mx-auto px-4 sm:px-6">
        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2025 SueLyn Empowered Living. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterWelcome;

'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Settings, PlayCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useFocusMode } from './FocusModeProvider';
import { useHomeLayout } from './HomeLayoutProvider';
import { useHydrated } from '@/lib/client-state';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  const { isTimeline, setIsTimeline, isDateInside, setIsDateInside, isCompact, setIsCompact } = useHomeLayout();
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const mounted = useHydrated();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between relative">
        <Link href="/" className="h-10 text-base md:text-xl font-black tracking-widest flex items-center justify-center px-4 md:px-5 rounded-full bg-brand-purple/10 dark:bg-brand-purple/30 text-brand-purple dark:text-purple-300 hover:bg-brand-purple/20 dark:hover:bg-brand-purple/40 transition-all shadow-sm hover:shadow-md hover:shadow-brand-purple/10 hover:-translate-y-0.5 truncate max-w-[50%]">
          <span className="truncate">はるまとぺーじ</span>
        </Link>

        {/* 中間置中標語 */}
        <div className="hidden sm:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium tracking-wider whitespace-nowrap">
            非公式節目內容檔案庫・全 10 回收錄
          </span>
        </div>

        <div className="flex gap-2 md:gap-4 items-center font-medium text-sm">
          <a 
            href="https://www.youtube.com/playlist?list=PLR2DEPLZ9lvFrj9JFZJtRgCSS1gJb3Dvd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-10 inline-flex items-center justify-center gap-1.5 px-3 md:px-5 bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-500/40 rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5"
          >
            <PlayCircle size={16} className="shrink-0" />
            <span className="tracking-wide hidden sm:inline">影片清單</span>
          </a>
          {mounted && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-md ${isOpen ? 'bg-brand-purple text-white shadow-brand-purple/20' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-purple dark:hover:text-brand-purple hover:bg-brand-purple/10 dark:hover:bg-brand-purple/20'}`}
                title="設定"
                aria-label="Toggle Settings"
              >
                <Settings size={20} className={isOpen ? "animate-spin-slow" : ""} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 origin-top-right transition-all duration-200 p-2 sm:p-3 ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                  <div className="px-3 pb-2 pt-1 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                      <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 tracking-wider">排版與主題設定</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                      {isHome && (
                        <>
                          <label className="flex justify-between items-center cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 rounded-lg transition-colors">
                              <span className="text-sm font-bold transition-colors text-zinc-700 dark:text-zinc-300 group-hover:text-brand-purple">時間軸</span>
                              <div className="relative">
                                  <input type="checkbox" className="sr-only" checked={isTimeline} onChange={() => setIsTimeline(!isTimeline)} />
                                  <div className={`block w-10 sm:w-11 h-6 rounded-full shadow-inner transition-colors duration-300 ${isTimeline ? 'bg-brand-purple' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ease-in-out ${isTimeline ? 'left-[calc(100%-1.25rem)] sm:left-[calc(100%-1.25rem)]' : 'left-1'}`}></div>
                              </div>
                          </label>

                          <label className="flex justify-between items-center cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 rounded-lg transition-colors">
                              <span className="text-sm font-bold transition-colors text-zinc-700 dark:text-zinc-300 group-hover:text-brand-purple">日期顯示於卡片外</span>
                              <div className="relative">
                                  <input type="checkbox" className="sr-only" checked={!isDateInside} onChange={() => setIsDateInside(!isDateInside)} />
                                  <div className={`block w-10 sm:w-11 h-6 rounded-full shadow-inner transition-colors duration-300 ${!isDateInside ? 'bg-brand-purple' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ease-in-out ${!isDateInside ? 'left-[calc(100%-1.25rem)] sm:left-[calc(100%-1.25rem)]' : 'left-1'}`}></div>
                              </div>
                          </label>

                          <label className="flex justify-between items-center cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 rounded-lg transition-colors">
                              <span className="text-sm font-bold transition-colors text-zinc-700 dark:text-zinc-300 group-hover:text-brand-purple">預設展開卡片</span>
                              <div className="relative">
                                  <input type="checkbox" className="sr-only" checked={!isCompact} onChange={() => setIsCompact(!isCompact)} />
                                  <div className={`block w-10 sm:w-11 h-6 rounded-full shadow-inner transition-colors duration-300 ${!isCompact ? 'bg-brand-purple' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ease-in-out ${!isCompact ? 'left-[calc(100%-1.25rem)] sm:left-[calc(100%-1.25rem)]' : 'left-1'}`}></div>
                              </div>
                          </label>
                        </>
                      )}

                      {!isHome && (
                        <label className="flex justify-between items-center cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 rounded-lg transition-colors">
                            <span className="text-sm font-bold transition-colors text-zinc-700 dark:text-zinc-300 group-hover:text-brand-purple">發光特效</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={isFocusMode} onChange={toggleFocusMode} />
                                <div className={`block w-10 sm:w-11 h-6 rounded-full shadow-inner transition-colors duration-300 ${isFocusMode ? 'bg-brand-purple' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ease-in-out ${isFocusMode ? 'left-[calc(100%-1.25rem)] sm:left-[calc(100%-1.25rem)]' : 'left-1'}`}></div>
                            </div>
                        </label>
                      )}

                      <label className={`flex justify-between items-center cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 rounded-lg transition-colors ${isHome ? 'border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-2' : ''}`}>
                          <span className="text-sm font-bold transition-colors text-zinc-700 dark:text-zinc-300 group-hover:text-brand-purple">亮色主題</span>
                          <div className="relative">
                              <input type="checkbox" className="sr-only" checked={theme === 'light'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                              <div className={`block w-10 sm:w-11 h-6 rounded-full shadow-inner transition-colors duration-300 ${theme === 'light' ? 'bg-amber-400' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                              <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow transition-all duration-300 ease-in-out ${theme === 'light' ? 'left-[calc(100%-1.25rem)] sm:left-[calc(100%-1.25rem)]' : 'left-1'}`}></div>
                          </div>
                      </label>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

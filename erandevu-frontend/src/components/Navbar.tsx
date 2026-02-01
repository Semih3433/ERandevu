'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Activity, LogOut, User as UserIcon, Calendar, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const navItems = {
        Patient: [
            { label: 'Panel', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
            { label: 'Randevu Al', href: '/appointments/book', icon: <Calendar size={18} /> },
        ],
        Doctor: [
            { label: 'Randevularım', href: '/doctor', icon: <Calendar size={18} /> },
        ],
        Admin: [
            { label: 'Panel', href: '/admin', icon: <LayoutDashboard size={18} /> },
            { label: 'Doktorlar', href: '/admin/doctors', icon: <UserIcon size={18} /> },
            { label: 'Departmanlar', href: '/admin/departments', icon: <Settings size={18} /> },
        ]
    };

    const items = navItems[user.role as keyof typeof navItems] || [];

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
            <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <Activity size={28} />
                        <span className="hidden sm:inline">ERandevu</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-2">
                        {items.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <div className="px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-blue-50 hover:text-primary transition-all flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end mr-2">
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user.username}</p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{user.role}</p>
                    </div>

                    <Button variant="outline" className="p-2.5 rounded-xl border-slate-100" onClick={logout}>
                        <LogOut size={20} className="text-slate-400" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

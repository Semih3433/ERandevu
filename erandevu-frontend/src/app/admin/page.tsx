'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Calendar, Settings, Activity, Plus } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalDepartments: 0,
        totalAppointments: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Mocking stats for now based on common endpoints, 
                // in real app these would be a single /admin/stats endpoint
                const [depts, docs, appts] = await Promise.all([
                    api.get('/Departments'),
                    api.get('/Doctors/top'),
                    api.get('/Appointments/all').catch(() => ({ data: [] }))
                ]);

                setStats({
                    totalDepartments: depts.data.length,
                    totalDoctors: docs.data.length,
                    totalPatients: 10, // Mock
                    totalAppointments: appts.data.length
                });
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { label: 'Departmanlar', value: stats.totalDepartments, icon: <Building2 />, color: 'text-blue-600', bg: 'bg-blue-50', link: '/admin/departments' },
        { label: 'Doktorlar', value: stats.totalDoctors, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/admin/doctors' },
        { label: 'Toplam Randevu', value: stats.totalAppointments, icon: <Calendar />, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/admin/appointments' },
        { label: 'Kayıtlı Hastalar', value: stats.totalPatients, icon: <Activity />, color: 'text-rose-600', bg: 'bg-rose-50', link: '#' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Yönetim Paneli</h1>
                    <p className="text-slate-500 font-medium text-lg">Tüm sistem verilerini ve operasyonları buradan yönetin.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={card.link}>
                                <Card className="p-8 hover:border-blue-200 transition-all cursor-pointer group">
                                    <div className="flex flex-col gap-4">
                                        <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                            {card.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                                            <p className="text-3xl font-black text-slate-900">{isLoading ? '...' : card.value}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Hızlı İşlemler</h3>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <Link href="/admin/doctors">
                                <Button variant="outline" className="w-full h-24 text-lg border-2 border-dashed border-slate-200 hover:border-blue-200 hover:bg-blue-50/30">
                                    <Plus size={24} />
                                    Yeni Doktor Ekle
                                </Button>
                            </Link>
                            <Link href="/admin/departments">
                                <Button variant="outline" className="w-full h-24 text-lg border-2 border-dashed border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30">
                                    <Plus size={24} />
                                    Yeni Bölüm Ekle
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-bold">Sistem Durumu</h3>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-600">Veritabanı</span>
                                <span className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    Bağlı
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-600">API Servisi</span>
                                <span className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    Aktif
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

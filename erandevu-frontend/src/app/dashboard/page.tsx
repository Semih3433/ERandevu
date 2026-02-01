'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Bookmark, Activity, Plus } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppointmentList } from '@/components/AppointmentList';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function PatientDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/Appointments/my-appointments');
            setAppointments(response.data);
        } catch (err) {
            console.error('Failed to fetch appointments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancel = async (id: number) => {
        if (!confirm('Bu randevuyu iptal etmek istediğinize emin misiniz?')) return;
        try {
            await api.post(`/Appointments/${id}/cancel`);
            fetchAppointments();
        } catch (err) {
            alert('İptal işlemi başarısız oldu.');
        }
    };

    const stats = [
        { label: 'Aktif Randevular', value: appointments.filter((a: any) => a.status === 'Approved').length, icon: <Calendar />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Bekleyenler', value: appointments.filter((a: any) => a.status === 'Pending').length, icon: <Clock />, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Geçmiş Randevular', value: appointments.filter((a: any) => a.status === 'Completed').length, icon: <Bookmark />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Merhaba, {user?.username} 👋</h1>
                        <p className="text-slate-500 font-medium text-lg">Sağlık durumunuzu ve randevularınızı buradan takip edebilirsiniz.</p>
                    </div>
                    <Link href="/appointments/book">
                        <Button className="h-14 px-8 shadow-xl shadow-blue-200">
                            <Plus size={20} />
                            Yeni Randevu Al
                        </Button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="p-8 hover:border-blue-100 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-3xl font-black text-slate-900 tabular-nums">{stat.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* List Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Activity className="text-primary" />
                            Randevularım
                        </h2>
                    </div>

                    <AppointmentList
                        appointments={appointments}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </section>
            </main>
        </div>
    );
}

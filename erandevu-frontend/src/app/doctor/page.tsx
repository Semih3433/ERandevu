'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, CheckCircle2, XCircle, Activity, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppointmentList } from '@/components/AppointmentList';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function DoctorDashboard() {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const response = await api.get('/Appointments/doctor-appointments');
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

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Doktor Paneli</h1>
                    <p className="text-slate-500 font-medium text-lg">Gelen randevuları ve hasta listenizi buradan yönetin.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <Card className="p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-blue-100 text-primary rounded-[28px] flex items-center justify-center shadow-lg shadow-blue-100">
                                <Users size={40} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Bekleyen Hastalar</p>
                                <p className="text-4xl font-black text-slate-900">{appointments.filter((a: any) => a.status === 'Pending').length}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[28px] flex items-center justify-center shadow-lg shadow-emerald-100">
                                <CheckCircle2 size={40} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Bugünkü Tamamlanan</p>
                                <p className="text-4xl font-black text-slate-900">{appointments.filter((a: any) => a.status === 'Completed').length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Activity className="text-primary" />
                            Güncel Randevu Listesi
                        </h2>
                    </div>

                    <AppointmentList
                        appointments={appointments}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                        isAdmin={true}
                    />
                </section>
            </main>
        </div>
    );
}

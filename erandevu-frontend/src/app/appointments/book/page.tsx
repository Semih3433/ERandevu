'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Building2, User, Clock, CheckCircle2, ArrowRight, ArrowLeft, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';

export default function BookAppointmentPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [selection, setSelection] = useState({
        departmentId: '',
        doctorId: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        const fetchDepts = async () => {
            try {
                const res = await api.get('/Departments');
                setDepartments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDepts();
    }, []);

    useEffect(() => {
        if (selection.departmentId) {
            const fetchDoctors = async () => {
                try {
                    const res = await api.get(`/Doctors?departmentId=${selection.departmentId}`);
                    setDoctors(res.data);
                } catch (err) {
                    console.error(err);
                    setDoctors([]);
                }
            };
            fetchDoctors();
        }
    }, [selection.departmentId]);

    const handleBook = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Combine date and time
            const appointmentDate = `${selection.date}T${selection.time}:00`;
            await api.post('/Appointments/book', {
                doctorId: parseInt(selection.doctorId),
                appointmentDate
            });
            setStep(4); // Success step
        } catch (err: any) {
            setError(err.response?.data?.message || 'Randevu alınamadı. Bu saat dolu olabilir.');
        } finally {
            setIsLoading(false);
        }
    };

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-12 max-w-lg mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-300 border border-slate-200'}`}>
                                {i}
                            </div>
                            {i < 3 && <div className={`w-12 h-0.5 ${step > i ? 'bg-primary' : 'bg-slate-200'}`} />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight text-center">Bölüm ve Doktor Seçin</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="p-8">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Building2 size={24} />
                                        <h3 className="font-bold text-lg">Bölüm</h3>
                                    </div>
                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {departments.map((dept: any) => (
                                            <button
                                                key={dept.id}
                                                onClick={() => setSelection({ ...selection, departmentId: dept.id, doctorId: '' })}
                                                className={`w-full text-left p-4 rounded-2xl font-bold transition-all border ${selection.departmentId === dept.id ? 'bg-blue-50 border-primary text-primary shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {dept.name}
                                            </button>
                                        ))}
                                    </div>
                                </Card>

                                <Card className={`p-8 transition-opacity ${!selection.departmentId ? 'opacity-40 pointer-events-none' : ''}`}>
                                    <div className="flex items-center gap-3 mb-6 text-indigo-600">
                                        <User size={24} />
                                        <h3 className="font-bold text-lg">Doktor</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {doctors.length === 0 ? (
                                            <p className="text-center py-10 text-slate-400 font-medium italic">Bu bölüme ait doktor bulunamadı.</p>
                                        ) : (
                                            doctors.map((doc: any) => (
                                                <button
                                                    key={doc.id}
                                                    onClick={() => setSelection({ ...selection, doctorId: doc.id })}
                                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all border ${selection.doctorId === doc.id ? 'bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                        <User size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-black text-slate-900">{doc.name}</p>
                                                        <p className="text-xs text-slate-500">{doc.departmentName || 'Uzman'}</p>
                                                    </div>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </Card>
                            </div>
                            <div className="mt-12 flex justify-center">
                                <Button
                                    className="px-12 h-14 text-lg"
                                    disabled={!selection.doctorId}
                                    onClick={() => setStep(2)}
                                >
                                    Devam Et
                                    <ArrowRight />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (selection.doctorId ? (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight text-center">Tarih ve Saat Belirleyin</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="p-8">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Calendar size={24} />
                                        <h3 className="font-bold text-lg">Randevu Tarihi</h3>
                                    </div>
                                    <Input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="h-14 font-bold text-lg"
                                        value={selection.date}
                                        onChange={(e) => setSelection({ ...selection, date: e.target.value })}
                                    />
                                    <p className="mt-4 text-xs text-slate-400 font-medium">* Sadece hafta içi ve mesaî saatleri içinde randevu alabilirsiniz.</p>
                                </Card>

                                <Card className={`p-8 transition-opacity ${!selection.date ? 'opacity-40 pointer-events-none' : ''}`}>
                                    <div className="flex items-center gap-3 mb-6 text-amber-600">
                                        <Clock size={24} />
                                        <h3 className="font-bold text-lg">Uygun Saatler</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelection({ ...selection, time })}
                                                className={`py-3 rounded-xl font-bold transition-all border ${selection.time === time ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                            <div className="mt-12 flex justify-center gap-4">
                                <Button variant="outline" className="px-12 h-14" onClick={() => setStep(1)}>
                                    <ArrowLeft /> Geri Dön
                                </Button>
                                <Button
                                    className="px-12 h-14 text-lg"
                                    disabled={!selection.time}
                                    onClick={() => setStep(3)}
                                >
                                    Özeti Gör
                                    <ArrowRight />
                                </Button>
                            </div>
                        </motion.div>
                    ) : null)}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight text-center">Randevu Özeti</h2>
                            <Card className="max-w-md mx-auto overflow-hidden shadow-2xl shadow-blue-100">
                                <div className="bg-primary p-8 text-white text-center">
                                    <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50" />
                                    <h3 className="text-xl font-bold">Onay Bekliyor</h3>
                                </div>
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                        <span className="text-slate-500 font-medium">Bölüm</span>
                                        <span className="font-black text-slate-900">{departments.find((d: any) => d.id == selection.departmentId)?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                        <span className="text-slate-500 font-medium">Doktor</span>
                                        <span className="font-black text-slate-900">{doctors.find((d: any) => d.id == selection.doctorId)?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-slate-50">
                                        <span className="text-slate-500 font-medium">Tarih</span>
                                        <span className="font-black text-slate-900">{selection.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-slate-500 font-medium">Saat</span>
                                        <span className="font-black text-primary text-xl">{selection.time}</span>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        className="w-full h-14 text-lg mt-4 shadow-lg shadow-blue-100"
                                        onClick={handleBook}
                                        isLoading={isLoading}
                                    >
                                        Randevuyu Onayla
                                    </Button>
                                    <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>Vazgeç / Düzenle</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Harika! Randevunuz Alındı</h2>
                            <p className="text-slate-500 font-medium text-lg mb-10">Randevu bilgileriniz sistemimize kaydedildi. Panelinizi kullanarak detayları inceleyebilirsiniz.</p>
                            <Link href="/dashboard">
                                <Button className="px-12 h-14 text-lg shadow-xl shadow-blue-100">
                                    Panele Dön
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

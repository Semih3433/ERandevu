'use client';

import { Calendar, Clock, User, Activity, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Appointment {
    id: number;
    appointmentDate: string;
    status: string;
    doctorName?: string;
    patientName?: string;
    departmentName?: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
    onCancel?: (id: number) => void;
    isLoading?: boolean;
    isAdmin?: boolean;
}

export const AppointmentList = ({ appointments, onCancel, isLoading, isAdmin }: AppointmentListProps) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-3xl" />
                ))}
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Henüz randevu bulunmuyor</h3>
                <p className="text-slate-500 font-medium">Randevularınız burada listelenecektir.</p>
            </div>
        );
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const statusMap: any = {
        'Pending': 'Beklemede',
        'Approved': 'Onaylandı',
        'Cancelled': 'İptal Edildi',
        'Completed': 'Tamamlandı'
    };

    return (
        <div className="grid gap-6">
            {appointments.map((appt) => (
                <Card key={appt.id} className="hover:border-blue-200 transition-all group">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {/* Date Badge */}
                            <div className="bg-slate-50 p-6 md:w-48 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tarih</span>
                                <span className="text-2xl font-black text-slate-900">
                                    {new Date(appt.appointmentDate).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                                </span>
                                <span className="text-sm font-bold text-primary">
                                    {new Date(appt.appointmentDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 p-6 grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Bölüm</p>
                                            <p className="text-sm font-black text-slate-900">{appt.departmentName || 'Belirtilmemiş'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{isAdmin ? 'Hasta' : 'Doktor'}</p>
                                            <p className="text-sm font-black text-slate-900">{isAdmin ? appt.patientName : appt.doctorName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-start sm:items-end">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter border ${getStatusStyles(appt.status)}`}>
                                        {statusMap[appt.status] || appt.status}
                                    </span>

                                    {(appt.status === 'Pending' || appt.status === 'Approved') && onCancel && (
                                        <Button
                                            variant="ghost"
                                            className="text-red-500 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 h-auto text-xs mt-4"
                                            onClick={() => onCancel(appt.id)}
                                        >
                                            <XCircle size={14} />
                                            İptal Et
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

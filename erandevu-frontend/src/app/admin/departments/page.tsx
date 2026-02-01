'use client';

import { useEffect, useState } from 'react';
import { Building2, Plus, Trash2, Activity } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [newDeptName, setNewDeptName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchDepts = async () => {
        try {
            const res = await api.get('/Departments');
            setDepartments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDepts();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDeptName) return;
        setIsLoading(true);
        try {
            await api.post('/Departments', { name: newDeptName });
            setNewDeptName('');
            fetchDepts();
        } catch (err) {
            alert('Ekleme başarısız oldu.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu departmanı silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/Departments/${id}`);
            fetchDepts();
        } catch (err) {
            alert('Silme işlemi başarısız.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">Departman Yönetimi</h1>
                        <p className="text-slate-500 font-medium">Hastaneye yeni bölümler ekleyin veya mevcutları düzenleyin.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <Card className="h-fit">
                        <CardHeader>
                            <h3 className="font-bold text-lg">Yeni Departman</h3>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <Input
                                    label="Departman Adı"
                                    placeholder="Örn: Kardiyoloji"
                                    value={newDeptName}
                                    onChange={e => setNewDeptName(e.target.value)}
                                    icon={<Building2 size={18} />}
                                />
                                <Button className="w-full" isLoading={isLoading}>
                                    <Plus size={18} />
                                    Departman Ekle
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest">
                                            <th className="px-8 py-4">Departman Adı</th>
                                            <th className="px-8 py-4 text-right">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {departments.map((dept: any) => (
                                            <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-slate-900">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                            <Activity size={18} />
                                                        </div>
                                                        {dept.name}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-red-500 hover:bg-red-50 p-2 h-auto rounded-lg"
                                                        onClick={() => handleDelete(dept.id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

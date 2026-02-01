'use client';

import { useEffect, useState } from 'react';
import { User, Plus, Activity, Mail, Trash2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';

export default function DoctorsAdminPage() {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        departmentId: 0,
        isActive: true
    });

    const fetchData = async () => {
        try {
            const [docsRes, deptsRes] = await Promise.all([
                api.get('/Doctors'),
                api.get('/Departments')
            ]);
            setDoctors(docsRes.data);
            setDepartments(deptsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/Auth/register/doctor', {
                ...formData,
                departmentId: parseInt(formData.departmentId.toString())
            });
            setFormData({ name: '', username: '', email: '', password: '', departmentId: 0, isActive: true });
            fetchData();
        } catch (err) {
            alert('Doktor eklenirken hata oluştu. Kullanıcı adı benzersiz olmalıdır.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu doktoru silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/Doctors/${id}`);
            fetchData();
        } catch (err) {
            alert('Silme işlemi başarısız.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Doktor Yönetimi</h1>
                    <p className="text-slate-500 font-medium">Sisteme yeni doktorlar tanımlayın ve uzmanlık alanlarını yönetin.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <Card className="h-fit">
                        <CardHeader>
                            <h3 className="font-bold text-lg">Yeni Doktor Kaydı</h3>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <Input
                                    label="Ad Soyad"
                                    placeholder="Dr. Ahmet Yılmaz"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    icon={<User size={18} />}
                                />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Kullanıcı Adı"
                                        placeholder="ahmety"
                                        required
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                    <Input
                                        label="Şifre"
                                        type="password"
                                        placeholder="••••••"
                                        required
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <Input
                                    label="E-Posta"
                                    type="email"
                                    placeholder="ahmet@hastane.com"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    icon={<Mail size={18} />}
                                />
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700 ml-1">Departman</label>
                                    <select
                                        className="input-field"
                                        required
                                        value={formData.departmentId}
                                        onChange={e => setFormData({ ...formData, departmentId: parseInt(e.target.value) })}
                                    >
                                        <option value="">Seçin...</option>
                                        {departments.map((d: any) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <Button className="w-full mt-4" isLoading={isLoading}>
                                    <Plus size={18} />
                                    Doktoru Kaydet
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
                                            <th className="px-8 py-4">Doktor</th>
                                            <th className="px-8 py-4">Departman</th>
                                            <th className="px-8 py-4 text-right">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {doctors.map((doc: any) => (
                                            <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                                                            {doc.name?.charAt(0) || 'D'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{doc.name}</p>
                                                            <p className="text-xs text-slate-400 font-medium">@{doc.username || 'doktor'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
                                                        {doc.departmentName || 'Genel'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-red-500 hover:bg-red-50 p-2 h-auto rounded-lg"
                                                        onClick={() => handleDelete(doc.id)}
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

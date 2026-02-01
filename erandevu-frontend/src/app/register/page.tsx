'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, CreditCard, Activity, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        phone: '',
        tcKimlikNo: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await api.post('/Auth/register/patient', formData);
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <Card className="text-center p-12">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Kaydınız Oluşturuldu!</h2>
                        <p className="text-slate-600 mb-10 leading-relaxed font-medium">
                            Hesabınız başarıyla oluşturuldu. Şimdi giriş yaparak randevunuzu alabilirsiniz.
                        </p>
                        <Link href="/login">
                            <Button className="w-full">Giriş Yap</Button>
                        </Link>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Content */}
            <div className="hidden lg:flex flex-col justify-between p-16 bg-primary text-white relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-20 hover:opacity-80 transition-opacity">
                        <Activity size={36} />
                        <span>ERandevu</span>
                    </Link>
                    <h1 className="text-5xl font-black mb-6 leading-tight">
                        Sağlıklı Bir <br /> Gelecek İçin <br /> Aramıza Katılın
                    </h1>
                    <p className="text-xl text-blue-100 max-w-sm font-medium leading-relaxed">
                        Üyeliğinizi oluşturun ve size en yakın uzman doktora anında ulaşın.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-4xl font-bold mb-1">10k+</p>
                        <p className="text-blue-100 font-medium">Aktif Hasta</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold mb-1">50+</p>
                        <p className="text-blue-100 font-medium">Bölüm Seçeneği</p>
                    </div>
                </div>

                {/* Abstract shape */}
                <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px]"></div>
            </div>

            {/* Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-slate-50/50">
                <div className="max-w-xl w-full">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Hesap Oluşturun</h2>
                            <p className="text-slate-500 font-medium">Hızlı randevu için bilgilerinizi eksiksiz doldurun</p>
                        </div>
                        <Link href="/" className="lg:hidden text-primary">
                            <Activity size={32} />
                        </Link>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3"
                            >
                                <div className="w-1 h-10 bg-red-500 rounded-full" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Input
                                label="Ad"
                                placeholder="Adınız"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                icon={<User size={18} />}
                            />
                            <Input
                                label="Soyad"
                                placeholder="Soyadınız"
                                required
                                value={formData.surname}
                                onChange={e => setFormData({ ...formData, surname: e.target.value })}
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <Input
                                label="Kullanıcı Adı"
                                placeholder="Bir kullanıcı adı belirleyin"
                                required
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                icon={<Activity size={18} />}
                            />
                            <Input
                                label="E-Posta"
                                type="email"
                                placeholder="ornek@mail.com"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                icon={<Mail size={18} />}
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <Input
                                label="Telefon"
                                type="tel"
                                placeholder="05XX XXX XX XX"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                icon={<Phone size={18} />}
                            />
                            <Input
                                label="TC Kimlik No"
                                placeholder="11 haneli kimlik numarası"
                                required
                                maxLength={11}
                                value={formData.tcKimlikNo}
                                onChange={e => setFormData({ ...formData, tcKimlikNo: e.target.value })}
                                icon={<CreditCard size={18} />}
                            />
                        </div>

                        <Input
                            label="Şifre"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            icon={<Lock size={18} />}
                        />

                        <Button
                            type="submit"
                            className="w-full py-4 text-lg mt-4 shadow-xl"
                            isLoading={isLoading}
                        >
                            Kaydı Tamamla
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-slate-500 font-medium">
                        Zaten üye misiniz? <Link href="/login" className="text-primary font-bold hover:underline">Giriş Yapın</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

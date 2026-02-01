'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Activity, ShieldCheck, Stethoscope, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/Auth/login', { username, password });
            const token = response.data.token || response.data.Token;
            if (!token) throw new Error('Sunucudan geçersiz yanıt alındı.');
            login(token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Giriş yapılamadı. Kullanıcı adı veya şifre hatalı.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-primary text-white mb-6 shadow-2xl shadow-blue-200">
                        <Activity size={40} />
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hoş Geldiniz</h1>
                    <p className="text-slate-500 mt-2 font-medium">Lütfen bilgilerinizi kullanarak giriş yapın</p>
                </div>

                <Card className="p-2 overflow-visible">
                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold leading-relaxed"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Kullanıcı Adı"
                                placeholder="Kullanıcı adınızı girin"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                icon={<User size={18} />}
                            />

                            <Input
                                label="Şifre"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                icon={<Lock size={18} />}
                            />

                            <Button
                                type="submit"
                                className="w-full py-4 text-lg shadow-xl shadow-blue-100"
                                isLoading={isLoading}
                            >
                                Giriş Yap
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-5 rounded-3xl bg-white/50 backdrop-blur-sm border border-white flex flex-col gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">Güvenli <br /> Erişim</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/50 backdrop-blur-sm border border-white flex flex-col gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                            <Stethoscope size={20} />
                        </div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">Uzman <br /> Kadro</p>
                    </div>
                </div>

                <p className="mt-12 text-center text-slate-500 font-medium text-sm">
                    Hesabınız yok mu? <Link href="/register" className="text-primary font-bold hover:underline inline-flex items-center gap-1 ml-1">Kayıt Olun <ChevronRight size={14} /></Link>
                </p>
            </motion.div>
        </div>
    );
}

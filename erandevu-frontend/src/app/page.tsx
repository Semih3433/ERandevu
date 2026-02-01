'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, ShieldCheck, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2 text-primary font-bold text-2xl">
          <Activity size={32} />
          <span>ERandevu</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Giriş Yap</Button>
          </Link>
          <Link href="/register">
            <Button>Hemen Kayıt Ol</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-blue-100/50 text-primary border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 inline-block backdrop-blur-sm">
            Sağlığınız İçin Modern Çözüm
          </span>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Sağlıkta <br />
            <span className="text-primary">Yeni Nesil</span> <br />
            Randevu Deneyimi
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium">
            Türkiye'nin öncü hastane ağıyla entegre, saniyeler içinde randevu alabileceğiniz güvenilir platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button className="px-10 py-5 text-xl group">
                Hemen Başlayın
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="px-10 py-5 text-xl bg-white/50 backdrop-blur-sm border-slate-200">
                Sisteme Giriş
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-8 lg:px-0"
        >
          <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.15)] rounded-[40px] p-6 lg:p-12">
            <div className="bg-primary rounded-[32px] p-8 lg:p-12 text-white shadow-2xl shadow-blue-400/20">
              <div className="flex justify-between items-center mb-16">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                  <Calendar size={48} strokeWidth={1.5} />
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Aktif Doktorlar</p>
                  <p className="text-5xl font-black tabular-nums tracking-tighter">150+</p>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6">Akıllı Sağlık Paneli</h3>
              <div className="space-y-6">
                {[75, 45, 90].map((progress, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl flex items-center gap-5 border border-white/5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Clock size={24} />
                    </div>
                    <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                        className="h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Blooms */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 bg-opacity-20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400 bg-opacity-20 rounded-full blur-[120px] -z-10"></div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white relative z-10 py-32 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Neden ERandevu?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Sağlığınız bizim için değerli. İşte sizi bekleyen avantajlar:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck size={36} />,
                title: "Güvenli ve Hızlı",
                desc: "Verileriniz KVKK uyumlu olarak şifrelenir ve saniyeler içinde işlemleriniz tamamlanır."
              },
              {
                icon: <Calendar size={36} />,
                title: "Kolay Yönetim",
                desc: "Randevularınızı tek bir panelden görüntüleyin, güncelleyin veya anında iptal edin."
              },
              {
                icon: <Activity size={36} />,
                title: "7/24 Erişim",
                desc: "Dilediğiniz zaman platformumuza erişebilir ve en uygun saati kolayca seçebilirsiniz."
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all group"
              >
                <div className="w-20 h-20 bg-white text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-16 text-center text-slate-400 text-sm font-medium border-t border-slate-50">
        <div className="flex items-center justify-center gap-2 mb-4 text-slate-300">
          <Activity size={24} />
          <span className="font-bold text-lg">ERandevu</span>
        </div>
        &copy; 2026 ERandevu Hastane Randevu Sistemi. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

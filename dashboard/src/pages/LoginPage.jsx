import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(pin)) {
            navigate('/dashboard');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
            setPin('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-sm p-8 glass-panel rounded-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-3 rounded-full bg-white/10 ring-1 ring-white/20">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <h2 className="mb-2 text-2xl font-bold text-center text-white">Access Vault</h2>
                <p className="mb-8 text-sm text-center text-gray-400">Enter your security PIN to continue</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            maxLength="4"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-4 py-3 text-2xl tracking-[1em] text-center text-white bg-black/20 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder-white/20"
                            placeholder="••••"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-center gap-2 text-sm text-red-400"
                        >
                            <AlertCircle className="w-4 h-4" />
                            <span>Invalid Access Code</span>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={pin.length < 4}
                    >
                        Unlock Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-6 text-xs text-center text-gray-500">
                    SECURE CONNECTION ESTABLISHED
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

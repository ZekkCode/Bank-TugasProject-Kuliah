import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const IntroAnimation = () => {
    const { finishIntro } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                finishIntro();
                navigate('/login');
            }, 1000); // Wait for exit animation
        }, 3000); // Intro duration 3s

        return () => clearTimeout(timer);
    }, [finishIntro, navigate]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-center"
                    >
                        <motion.div
                            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-primary to-secondary blur-xl opacity-80"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 0.4, 0.8]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <h1 className="text-4xl font-bold tracking-widest text-white uppercase font-sans">
                            Bank Tugas
                        </h1>
                        <p className="mt-2 text-sm tracking-[0.5em] text-gray-400">SECURE VAULT</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroAnimation;

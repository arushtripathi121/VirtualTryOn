import React, { useState } from 'react'
import GridMotion from '../react-bits-components/GridMotion';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../hooks/api';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleGoogleResponse = async (authResult) => {
        try {
            setLoading(true);
            if (authResult?.code) {
                const result = await googleAuth(authResult.code);
                const { email, name, image } = result.data.user;
                const token = result.data.token;
                setLoading(false);
                navigate('/home');
            }
        } catch (e) {
            setLoading(false);
            console.error('Google sign-in failed', e);
        }
    };

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleGoogleResponse,
        onError: handleGoogleResponse,
    });


    const items = [
        'https://images.unsplash.com/photo-1556755211-40b3588fe14e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1761506016449-becfb264e400?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500',
        'https://plus.unsplash.com/premium_photo-1755575025804-6ddbacd28863?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://plus.unsplash.com/premium_photo-1670432159982-6bdac7e7c46c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1721670472474-2f5e2fa80fd0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1625563002251-a1aa997dba14?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1735671820981-5b51f294854b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1565744009914-48f710cf79df?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://plus.unsplash.com/premium_photo-1727976411341-32d4d012e0c5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1747814965209-2301e535f209?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://plus.unsplash.com/premium_photo-1669279283091-f20a687ed6e2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1666468984132-51a5de1d6d44?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://images.unsplash.com/photo-1700687517672-217ddb1a459a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=626',
        'https://plus.unsplash.com/premium_photo-1734388423025-2ed79cfb1ed9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500'
    ]

    return (
        <div>
            <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-black/40">
                <div className="absolute inset-0 -z-10 bg-black/40">
                    <GridMotion
                        items={items}
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-none" />
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center min-h-screen min-w-screen">
                    <div className="absolute top-6 left-10 text-white text-4xl font-semibold tracking-wide">
                        Tryelle
                    </div>

                    <div className="space-y-10 cursor-default px-4">
                        <div className="text-white text-8xl font-bold">
                            Snap. Style. Slay.
                        </div>
                        <div className="text-white text-4xl font-semibold max-w-6xl mx-auto leading-snug">
                            Upload your photo, explore styles, and own your look with our next-gen virtual try-on experience.
                        </div>
                    </div>
                    <div
                        onClick={!loading ? () => googleLogin() : undefined}
                        className="bg-white text-center px-10 py-2 mt-10 rounded-3xl font-semibold shadow-2xl cursor-pointer hover:scale-125 transition-transform duration-500 w-48"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="h-6 w-6 border-4 border-gray-300 border-t-fuchsia-600 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Get Started"
                        )}
                    </div>
                </div>
            </section>

            <section className="relative z-10 min-h-screen w-full bg-black text-white overflow-hidden">
                {/* ambient gradients */}
                <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

                <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 lg:py-32">
                    {/* section label */}
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-gray-300 backdrop-blur">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                        About Tryelle
                    </span>

                    {/* headline */}
                    <h2 className="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                        Why Tryelle?
                    </h2>

                    {/* subcopy */}
                    <p className="mt-6 max-w-3xl text-center text-lg leading-relaxed text-gray-300">
                        Tryelle is your personal virtual styling companion—built to help you visualize fashion effortlessly.
                        Say goodbye to guesswork and hello to real-time confidence. Our AI-powered try-on shows you
                        what your style really looks like—before you buy.
                    </p>

                    {/* cards grid */}
                    <div className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* card 1 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-fuchsia-800/20">
                                    1
                                </div>
                                <h3 className="text-2xl font-semibold">See It Before You Commit</h3>
                                <p className="mt-3 text-gray-300">
                                    Realistic previews with AI precision. Reduce returns, shop smarter, and choose with confidence.
                                </p>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-cyan-800/20">
                                    2
                                </div>
                                <h3 className="text-2xl font-semibold">How It Works</h3>
                                <p className="mt-3 text-gray-300">
                                    Upload a photo, browse styles, and try outfits instantly. Mix colors, fits, and looks—no fitting room needed.
                                </p>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-cyan-800/20">
                                    3
                                </div>
                                <h3 className="text-2xl font-semibold">The Tryelle Promise</h3>
                                <p className="mt-3 text-gray-300">
                                    Tech and creativity, seamlessly blended. Built for precision, privacy, and ease—so you can express your best self.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* mini feature chips */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                        {[
                            'AI-Powered Fit',
                            'Real-Time Preview',
                            'Privacy-First',
                            'Fewer Returns',
                            'Anywhere, Anytime',
                        ].map((label) => (
                            <span
                                key={label}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition hover:bg-white/10"
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
                        <button className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-fuchsia-800/20 transition hover:opacity-95">
                            Start Your Virtual Try-On
                        </button>
                        <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <footer className="relative w-full bg-black text-white border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <div className="flex flex-col items-center md:items-start space-y-2">
                        <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                            Tryelle
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
                            Your AI-powered virtual styling companion — bringing real fashion to your virtual world.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
                        <a href="#" className="hover:text-white transition">Home</a>
                        <a href="#" className="hover:text-white transition">About</a>
                        <a href="#" className="hover:text-white transition">Features</a>
                        <a href="#" className="hover:text-white transition">Contact</a>
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    </div>

                    <div className="text-gray-500 text-sm text-center md:text-right">
                        © {new Date().getFullYear()} Tryelle. All rights reserved.
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-fuchsia-600/40 via-cyan-400/40 to-transparent"></div>
            </footer>

        </div>

    )
}

export default LandingPage

import React from 'react'
import GridMotion from '../react-bits-components/GridMotion';

const LandingPage = () => {

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
    ];



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
                <div className="relative z-10 space-y-10 cursor-default">
                    <div className='text-white text-8xl font-bold'>
                        Snap. Style. Slay.
                    </div>
                    <div className='text-white text-4xl font-bold max-w-6xl'>
                        Upload your photo, explore styles, and own your look with our next-gen virtual try-on experience.
                    </div>
                </div>
            </section>
        </div>

    )
}

export default LandingPage

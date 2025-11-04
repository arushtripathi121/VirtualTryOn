import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
    const gridRef = useRef(null);
    const rowRefs = useRef([]);
    const mouseXRef = useRef(window.innerWidth / 2);

    const totalItems = 28;

    // 1) Pull only valid direct image URLs from your provided items
    const providedUrls = items.filter(
        v =>
            typeof v === 'string' &&
            v.startsWith('http') &&
            // prefer direct Unsplash image hosts
            /(images\.unsplash\.com|plus\.unsplash\.com)/.test(v)
    );

    // 2) Build a 28-length array: keep existing URLs, replace anything else by cycling your previous URLs
    const combinedItems = Array.from({ length: totalItems }, (_, i) => {
        const candidate = items[i];
        const isDirectUrl = typeof candidate === 'string' && candidate.startsWith('http');
        if (isDirectUrl && /(images\.unsplash\.com|plus\.unsplash\.com)/.test(candidate)) {
            return candidate; // already a direct image URL
        }
        // Fallback: reuse one of your previously provided URLs (cycled)
        const fallback = providedUrls.length ? providedUrls[i % providedUrls.length] : null;
        return fallback || candidate; // if no URLs were provided at all, leave as-is
    });

    useEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const handleMouseMove = e => {
            mouseXRef.current = e.clientX;
        };

        const updateMotion = () => {
            const maxMoveAmount = 300;
            const baseDuration = 0.8;
            const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount =
                        ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) *
                        direction;

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const removeAnimationLoop = gsap.ticker.add(updateMotion);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            removeAnimationLoop();
        };
    }, []);

    return (
        <div className="noscroll loading" ref={gridRef}>
            <section
                className="intro"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
                }}
            >
                <div className="gridMotion-container">
                    {[...Array(4)].map((_, rowIndex) => (
                        <div key={rowIndex} className="row" ref={el => (rowRefs.current[rowIndex] = el)}>
                            {[...Array(7)].map((_, itemIndex) => {
                                const content = combinedItems[rowIndex * 7 + itemIndex];
                                return (
                                    <div key={itemIndex} className="row__item">
                                        <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                                            {typeof content === 'string' && content.startsWith('http') ? (
                                                <div
                                                    className="row__item-img"
                                                    style={{ backgroundImage: `url(${content})` }}
                                                />
                                            ) : (
                                                <div className="row__item-content">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="fullview"></div>
            </section>
        </div>
    );
};

export default GridMotion;

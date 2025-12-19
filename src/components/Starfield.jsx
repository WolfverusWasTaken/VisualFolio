import { useEffect, useRef } from 'react';

/**
 * Starfield - A parallax star background effect with planet
 * Creates multiple layers of stars that move at different speeds on scroll
 */
const Starfield = () => {
    const starLayers = [
        { count: 100, speed: 0.1, size: '1px', opacity: 0.5 }, // Distant
        { count: 50, speed: 0.3, size: '2px', opacity: 0.8 },  // Mid
        { count: 20, speed: 0.5, size: '3px', opacity: 1.0 },  // Close
    ];

    const containerRef = useRef(null);
    const planetRef = useRef(null);
    const blackholeRef = useRef(null);
    const cometRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollY = window.scrollY;

            // Apply parallax transform to each star layer
            const layers = containerRef.current.querySelectorAll('.star-layer');
            layers.forEach((layer, i) => {
                if (starLayers[i]) {
                    const speed = starLayers[i].speed;
                    layer.style.transform = `translateY(${scrollY * speed * 0.5}px)`;
                }
            });

            // Apply parallax to comet (diagonal movement - left to right)
            if (cometRef.current) {
                cometRef.current.style.transform = `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`;
            }

            // Apply parallax to black hole (very slow - far back in space)
            if (blackholeRef.current) {
                blackholeRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
            }

            // Apply parallax to planet (slower than stars for depth)
            if (planetRef.current) {
                planetRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to generate random star styles
    const generateStars = (count, size, baseOpacity) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: size,
                height: size,
                opacity: Math.random() * baseOpacity + 0.2,
                animationDelay: `${Math.random() * 3}s`,
            };
            stars.push(style);
        }
        return stars;
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{ background: 'transparent' }}
        >
            {/* Star Layers */}
            {starLayers.map((layer, layerIndex) => (
                <div
                    key={layerIndex}
                    className="star-layer absolute inset-0 w-full h-[150vh]"
                    style={{ willChange: 'transform' }}
                >
                    {generateStars(layer.count, layer.size, layer.opacity).map((style, starIndex) => (
                        <div
                            key={starIndex}
                            className="absolute bg-white rounded-full animate-twinkle"
                            style={style}
                        />
                    ))}
                </div>
            ))}

            {/* Comet - positioned at top left */}
            <div
                ref={cometRef}
                className="absolute"
                style={{
                    left: '5%',
                    top: '5%',
                    width: '200px',
                    height: '200px',
                    willChange: 'transform',
                    opacity: 0.7,
                }}
            >
                <img
                    src="https://www.freeiconspng.com/uploads/comet-transparent-background-image-11.png"
                    alt=""
                    className="w-full h-full object-contain"
                    style={{
                        transform: 'rotate(-120deg)', // Rotated 90deg to the left
                    }}
                />
            </div>

            {/* Black Hole - positioned far back in space on the left */}
            <div
                ref={blackholeRef}
                className="absolute"
                style={{
                    left: '-10%',
                    top: '40%',
                    width: '400px',
                    height: '400px',
                    willChange: 'transform',
                    opacity: 0.6,
                }}
            >
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/023/816/429/small/black-hole-loop-animation-on-black-background-isolated-transparent-alpha-png.png"
                    alt=""
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Planet - positioned on the right side */}
            <div
                ref={planetRef}
                className="absolute"
                style={{
                    right: '-5%',
                    top: '20%',
                    width: '300px',
                    height: '300px',
                    willChange: 'transform',
                    opacity: 0.6,
                }}
            >
                <img
                    src="https://space-facts.com/wp-content/uploads/mercury-transparent.png"
                    alt=""
                    className="w-full h-full object-contain"
                    style={{
                        filter: 'brightness(0.7) contrast(1.1)',
                    }}
                />
            </div>
        </div>
    );
};

export default Starfield;

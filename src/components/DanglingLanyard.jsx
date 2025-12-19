import { useSpring, animated, config } from '@react-spring/web';
import { useState, useEffect } from 'react';
import GlassSegment from './GlassSegment';

/**
 * DanglingLanyard - Animated ID badge with physics-based swinging motion
 * Robotics/AI themed design with profile image placeholder
 */
const DanglingLanyard = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Primary pendulum swing animation
    const [swingProps, swingApi] = useSpring(() => ({
        from: { rotateZ: -3 },
        to: async (next) => {
            while (true) {
                await next({ rotateZ: 3, config: { ...config.gentle, duration: 2000 } });
                await next({ rotateZ: -3, config: { ...config.gentle, duration: 2000 } });
            }
        },
    }));

    // Secondary subtle movement for natural feel
    const [floatProps] = useSpring(() => ({
        from: { y: 0 },
        to: async (next) => {
            while (true) {
                await next({ y: 3, config: { duration: 3000 } });
                await next({ y: 0, config: { duration: 3000 } });
            }
        },
    }));

    // Hover effect - increase swing amplitude
    useEffect(() => {
        if (isHovered) {
            swingApi.start({
                to: async (next) => {
                    await next({ rotateZ: 8, config: { tension: 200 } });
                    await next({ rotateZ: -8, config: { tension: 200 } });
                    // Resume normal animation
                    while (true) {
                        await next({ rotateZ: 3, config: { ...config.gentle, duration: 2000 } });
                        await next({ rotateZ: -3, config: { ...config.gentle, duration: 2000 } });
                    }
                },
            });
        }
    }, [isHovered, swingApi]);

    return (
        <div className="flex flex-col items-center">
            {/* Attachment Point - Robotic mount */}
            <div className="relative">
                {/* Mount bracket */}
                <div className="w-8 h-3 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-sm border border-cyan-500/30" />
                <div className="w-6 h-6 mx-auto bg-gradient-to-b from-cyan-500 to-cyan-700 rounded-full shadow-glow flex items-center justify-center border-2 border-cyan-400/50">
                    <div className="w-2 h-2 bg-deep-space rounded-full" />
                </div>
            </div>

            {/* Lanyard Container - Animated */}
            <animated.div
                style={{
                    ...swingProps,
                    ...floatProps,
                    transformOrigin: 'top center',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="cursor-pointer"
            >
                {/* Lanyard Strap - Tech cable style */}
                <div className="flex flex-col items-center">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 via-cyan-600 to-cyan-700 rounded-full shadow-glow-sm" />
                    <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-700 via-cyan-600 to-cyan-500 rounded-full shadow-glow-sm" />
                    <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-80" />

                    {/* Connector clip */}
                    <div className="w-6 h-3 bg-gradient-to-b from-gray-500 to-gray-700 rounded-sm border border-cyan-500/30 shadow-md" />
                </div>

                {/* ID Badge - Larger with profile image */}
                <GlassSegment className="mt-2 p-4 w-44 hover:shadow-glow-lg transition-shadow border-cyan-500/30">
                    {/* Circuit pattern decoration */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/20" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/20" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/20" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/20" />

                    <div className="space-y-3 relative">
                        {/* Profile Photo Placeholder - Large */}
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-deep-space-light to-deep-space rounded-lg border-2 border-cyan-500/40 flex items-center justify-center overflow-hidden shadow-inner-glow">
                            {/* Replace with actual image: <img src={profileImg} alt="Profile" className="w-full h-full object-cover" /> */}
                            <div className="text-center">
                                <div className="text-4xl mb-1">🤖</div>
                                <p className="text-[8px] text-cyan-500/60 uppercase tracking-wider">Your Photo</p>
                            </div>
                        </div>

                        {/* Divider line with circuit nodes */}
                        <div className="flex items-center gap-1 justify-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-500/30" />
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                            <div className="w-2 h-2 rounded-full bg-cyan-500/30" />
                        </div>

                        {/* Info */}
                        <div className="text-center">
                            <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-1">// OPERATOR</p>
                            <p className="text-sm text-cyan-400 font-bold tracking-wider">YOUR NAME</p>
                            <p className="text-[10px] text-gray-400 mt-1">AI / Robotics Engineer</p>
                        </div>

                        {/* Status indicator */}
                        <div className="flex justify-center items-center gap-2 pt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[9px] text-green-400 uppercase tracking-widest">Systems Online</span>
                        </div>

                        {/* Barcode / ID line */}
                        <div className="flex justify-center gap-px mt-2 opacity-60">
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-cyan-500/50"
                                    style={{
                                        width: Math.random() > 0.5 ? '2px' : '1px',
                                        height: '10px'
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-[8px] text-gray-600 text-center tracking-widest">ID: 0x7F3A9B2C</p>
                    </div>
                </GlassSegment>
            </animated.div>
        </div>
    );
};

export default DanglingLanyard;

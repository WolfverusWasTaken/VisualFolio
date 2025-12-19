import GlassSegment from './GlassSegment';

/**
 * TechStack - Horizontal scrolling marquee of technology logos/names
 * Updated with user's specific skills
 */
const TechStack = () => {
    const technologies = [
        { name: 'Python', icon: '🐍', color: '#3776AB' },
        { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
        { name: 'Robotics', icon: '🤖', color: '#00FFFF' },
        { name: 'Avionics', icon: '✈️', color: '#FFD700' },
        { name: 'Computer Vision', icon: '👁️', color: '#5C3FD6' },
        { name: 'Multimodal LLM', icon: '🧠', color: '#00AAFF' },
        { name: 'Docker', icon: '🐳', color: '#2496ED' },
        { name: 'Django', icon: '🎸', color: '#092E20' },
        { name: 'C++', icon: '⚙️', color: '#00599C' },
        { name: 'TensorFlow', icon: '🟧', color: '#FF6F00' },
        { name: 'OpenCV', icon: '📷', color: '#5C3FD6' },
        { name: 'Linux', icon: '🐧', color: '#FCC624' },
    ];

    // Duplicate for seamless loop
    const duplicatedTech = [...technologies, ...technologies];

    return (
        <div className="marquee-container py-6">
            <div className="animate-marquee flex gap-4 w-fit">
                {duplicatedTech.map((tech, index) => (
                    <div
                        key={`${tech.name}-${index}`}
                        className="flex-shrink-0 px-4 py-2 flex items-center gap-2 min-w-[140px] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <span className="text-xl">{tech.icon}</span>
                        <div>
                            <span className="text-sm font-medium text-gray-300">
                                {tech.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStack;

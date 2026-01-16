import TechStack from '../components/TechStack';

const AboutMe = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="min-h-[85vh] flex items-center py-12">
                <div className="bg-glass-dark backdrop-blur-md p-8 lg:p-12 rounded-lg border border-glass-border w-full">
                    {/* Terminal-style header */}
                    <div className="mb-6">
                        <span className="text-gray-500 text-sm">
                            $ whoami
                        </span>
                    </div>

                    {/* Greeting */}
                    <div className="space-y-4">
                        <p className="text-gray-400 text-lg">
                            <span className="text-gray-500">&gt;</span> Hello, World! I am
                        </p>

                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                            Alexi George
                            <span className="text-gray-500 cursor-blink ml-1"></span>
                        </h1>

                        <h2 className="text-xl lg:text-2xl text-gray-400 font-medium">
                            Aspiring Embodied AI Engineer
                        </h2>

                        {/* Description */}
                        <div className="mt-6 space-y-3 text-gray-400 leading-relaxed max-w-3xl">
                            <p>
                                Specializing in Applied Artificial Intelligence, Robotics, and Multimodal Systems.
                                Passionate about optimizing deep learning models for real-world constraints and
                                developing autonomous systems that bridge the gap between software and hardware.
                            </p>
                        </div>

                        {/* Status indicators */}
                        <div className="flex flex-wrap gap-6 mt-8 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-gray-400">Available for opportunities</span>
                            </div>

                        </div>



                        {/* CTA Buttons - Inline */}
                        <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/10">
                            <button
                                onClick={() => scrollToSection('career')}
                                className="retro-button"
                            >
                                View Career
                            </button>

                            <button
                                onClick={() => scrollToSection('projects')}
                                className="retro-button"
                            >
                                Explore Projects
                            </button>

                            <a
                                href="https://github.com/WolfverusWasTaken"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-button flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub
                            </a>

                            <a
                                href="https://ink-termite-00a.notion.site/A-s-Notes-14883ecdfdac80e2a6a6c55ad84df239"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-button flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.449.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.763 7.28v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.718 1.321l13.496-.933c1.635-.14 2.055-.047 3.08.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.948c0-.84.373-1.54 1.264-1.627z" />
                                </svg>
                                Blog
                            </a>

                            <a
                                href="https://x.com/alexiiiiv2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-button flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                X
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;

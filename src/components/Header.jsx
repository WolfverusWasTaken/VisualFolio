import { useState, useEffect } from 'react';

/**
 * Header - Sticky navigation bar with retrotech styling
 */
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['about', 'career', 'projects'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'career', label: 'Career' },
        { id: 'projects', label: 'Projects' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
                    ? 'bg-deep-space/90 backdrop-blur-lg shadow-glow border-b border-glass-border'
                    : 'bg-transparent'
                }
      `}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Site Title */}
                    <div className="flex-shrink-0">
                        <a
                            href="#about"
                            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                            className="flex items-center gap-2 group"
                        >
                            <span className="text-cyber-cyan text-xl font-bold tracking-wider group-hover:animate-pulse-glow">
                                [
                            </span>
                            <span className="text-white font-semibold text-lg tracking-wide">
                                Alexi George
                            </span>
                            <span className="text-gray-400 text-sm">
                                - Portfolio
                            </span>
                            <span className="text-cyber-cyan text-xl font-bold tracking-wider group-hover:animate-pulse-glow">
                                ]
                            </span>
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`
                  px-4 py-2 text-sm font-medium tracking-wider uppercase
                  transition-all duration-300 relative
                  ${activeSection === link.id
                                        ? 'text-cyber-cyan'
                                        : 'text-gray-400 hover:text-white'
                                    }
                `}
                            >
                                <span className="relative z-10">
                                    <span className="text-cyber-cyan opacity-50">&lt;</span>
                                    {link.label}
                                    <span className="text-cyber-cyan opacity-50">/&gt;</span>
                                </span>

                                {/* Active indicator */}
                                {activeSection === link.id && (
                                    <span
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyber-cyan shadow-glow"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            className="text-cyber-cyan p-2 border border-cyber-cyan/30 rounded hover:bg-cyber-cyan/10 transition-colors"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

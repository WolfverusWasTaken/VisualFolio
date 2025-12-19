import { useState, useMemo } from 'react';
import GlassSegment from '../components/GlassSegment';
import { projects } from '../data/projects';

// Import the technical analysis HTML content
import ocrAnalysisHtml from '../assets/Technical Analysis_OCR-lighting.html?raw';

/**
 * Projects - Filterable grid of project cards
 * Uses useState for filter management and useMemo for filtering logic
 */
const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Curated list of filters
    const filters = ['All', 'Python', 'C', 'AI', 'Embedded/Robotics'];

    // Filter projects based on active filter
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;

        // Define mapping for broad categories if needed, or simple string matching
        return projects.filter(project => {
            // Check if any of the project's tags match the active filter
            // e.g., "Machine Learning" tag matches "AI" filter
            const lowerFilter = activeFilter.toLowerCase();
            return project.tags.some(tag => {
                const lowerTag = tag.toLowerCase();
                if (lowerFilter === 'ai') return ['ai', 'machine learning', 'deep learning', 'computer vision', 'transformers', 'ocr', 'llm'].includes(lowerTag);
                if (lowerFilter === 'embedded/robotics') return ['embedded systems', 'iot', 'hardware', 'robotics', 'control systems', 'slam'].includes(lowerTag);
                if (lowerFilter === 'c') return ['c', 'c++'].includes(lowerTag);
                return lowerTag.includes(lowerFilter);
            });
        });
    }, [activeFilter]);

    const openTechnicalAnalysis = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setIsClosing(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 300); // Match transition duration
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span className="text-gray-500">&lt;</span>
                    Projects
                    <span className="text-gray-500">/&gt;</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    <span className="text-cyber-cyan">//</span> A showcase of my development work and experiments
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filters.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`
              px-4 py-2 text-xs font-medium uppercase tracking-wider
              border rounded transition-all duration-300
              ${activeFilter === tag
                                ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-glow'
                                : 'bg-transparent border-gray-600 text-gray-400 hover:border-cyber-cyan/50 hover:text-white'
                            }
            `}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onTechnicalAnalysis={
                            project.title === 'OCR-lighting'
                                ? () => openTechnicalAnalysis('OCR-lighting Technical Docs', ocrAnalysisHtml)
                                : null
                        }
                    />
                ))}
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        <span className="text-cyber-cyan">{'>'}</span> No projects found for "{activeFilter}"
                    </p>
                </div>
            )}

            {/* Project count */}
            <div className="text-center mt-10">
                <p className="text-sm text-gray-500">
                    Showing <span className="text-cyber-cyan">{filteredProjects.length}</span> of{' '}
                    <span className="text-cyber-green">{projects.length}</span> projects
                </p>
            </div>

            {/* Technical Docs Modal */}
            {showModal && (
                <div
                    className={`fixed z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
                        }`}
                    onClick={closeModal}
                    style={{
                        position: 'fixed',
                        top: '64px', // Below header
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div
                        className={`bg-gray-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="text-lg font-semibold text-white">{modalTitle}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {/* Modal Content - iframe to render HTML */}
                        <div className="overflow-auto max-h-[calc(85vh-60px)]">
                            <iframe
                                srcDoc={modalContent}
                                className="w-full h-[70vh] bg-white"
                                title="Technical Docs"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * ProjectCard - Individual project card component
 */
const ProjectCard = ({ project, index, onTechnicalAnalysis }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <GlassSegment
            hover
            className="p-6 flex flex-col h-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Project Number */}
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-gray-500 font-mono">
                    PROJECT_{String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 flex-grow">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-deep-space border border-glass-border text-gray-400 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-glass-border">
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-cyber-cyan hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Source
                    </a>
                )}
                {onTechnicalAnalysis && (
                    <button
                        onClick={onTechnicalAnalysis}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Technical Docs
                    </button>
                )}
            </div>
        </GlassSegment>
    );
};

export default Projects;

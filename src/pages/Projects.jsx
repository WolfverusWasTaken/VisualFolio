import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import GlassSegment from '../components/GlassSegment';
import { projects } from '../data/projects';

// Import the technical analysis HTML content
import ocrAnalysisHtml from '../assets/Technical Analysis_OCR-lighting.html?raw';
import pix2depthAnalysisHtml from '../assets/Technical_Analysis_Pix2Depth.html?raw';

// Import BogoBeauty slideshow images
import bogo1 from '../assets/BogoBeauty/1.png';
import bogo2 from '../assets/BogoBeauty/2.png';
import bogo3 from '../assets/BogoBeauty/3.png';
import bogo4 from '../assets/BogoBeauty/4.png';

const bogoBeautySlides = [bogo1, bogo2, bogo3, bogo4];

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalType, setModalType] = useState('html'); // 'html' or 'slideshow'
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [copyFeedback, setCopyFeedback] = useState(null); // project id or null

    const filters = ['All', 'Python', 'C', 'AI', 'Embedded/Robotics'];

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;

        return projects.filter(project => {
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

    // Deep linking logic
    useEffect(() => {
        const docs = searchParams.get('docs');
        if (docs) {
            if (docs === 'ocr-lighting') {
                openHtmlModal('OCR-lighting Technical Docs', ocrAnalysisHtml, 'ocr-lighting', false);
            } else if (docs === 'pix2depth') {
                openHtmlModal('Pix2Depth Technical Docs', pix2depthAnalysisHtml, 'pix2depth', false);
            } else if (docs === 'bogo-beauty') {
                openSlideshow('Bogo Beauty Slides', false);
            }
        }
    }, [searchParams]);

    const openHtmlModal = (title, content, slug, updateUrl = true) => {
        setModalTitle(title);
        setModalContent(content);
        setModalType('html');
        setIsClosing(false);
        setShowModal(true);
        if (updateUrl && slug) setSearchParams({ docs: slug });
    };

    const openSlideshow = (title, updateUrl = true) => {
        setModalTitle(title);
        setModalType('slideshow');
        setCurrentSlide(0);
        setIsClosing(false);
        setShowModal(true);
        if (updateUrl) setSearchParams({ docs: 'bogo-beauty' });
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
            setSearchParams({});
        }, 500);
    };

    const handleCopyLink = (docsSlug, projectId) => {
        const baseUrl = window.location.href.split('?')[0];
        const shareUrl = `${baseUrl}?docs=${docsSlug}`;
        navigator.clipboard.writeText(shareUrl);
        setCopyFeedback(projectId);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bogoBeautySlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bogoBeautySlides.length) % bogoBeautySlides.length);

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
                        onTechnicalDocs={
                            project.title === 'OCR-lighting'
                                ? () => openHtmlModal('OCR-lighting Technical Docs', ocrAnalysisHtml, 'ocr-lighting')
                                : project.title === 'Pix2Depth'
                                    ? () => openHtmlModal('Pix2Depth Technical Docs', pix2depthAnalysisHtml, 'pix2depth')
                                    : project.title === 'Bogo Beauty'
                                        ? () => openSlideshow('Bogo Beauty Slides')
                                        : null
                        }
                        onCopyLink={
                            project.title === 'OCR-lighting'
                                ? () => handleCopyLink('ocr-lighting', project.id)
                                : project.title === 'Pix2Depth'
                                    ? () => handleCopyLink('pix2depth', project.id)
                                    : project.title === 'Bogo Beauty'
                                        ? () => handleCopyLink('bogo-beauty', project.id)
                                        : null
                        }
                        copyFeedback={copyFeedback === project.id}
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

            {/* Technical Docs Modal - Right Sliding Panel rendered via Portal */}
            {showModal && createPortal(
                <div
                    className={`fixed inset-0 z-[10001] ${isClosing ? 'opacity-0 transition-opacity duration-500' : 'animate-backdrop-in'}`}
                    onClick={closeModal}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    <div
                        className={`absolute top-0 right-0 h-full w-full ${modalType === 'slideshow' ? 'max-w-4xl' : 'max-w-2xl'} bg-gray-900 shadow-2xl flex flex-col transition-all duration-500 ${isClosing ? 'translate-x-full' : 'translate-x-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ borderLeft: '1px solid rgba(0, 255, 255, 0.2)' }}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-deep-space/50 backdrop-blur-md">
                            <div>
                                <h3 className="text-xl font-bold text-cyber-cyan tracking-wider uppercase">
                                    {modalTitle}
                                </h3>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all border border-transparent hover:border-white/10"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-grow overflow-hidden flex flex-col">
                            {modalType === 'html' ? (
                                <div className="flex-grow bg-white overflow-hidden relative group">
                                    <iframe
                                        srcDoc={modalContent}
                                        className="w-full h-full border-0"
                                        title="Technical Docs"
                                    />
                                    {/* Subtle overlay for premium feel */}
                                    <div className="absolute inset-0 pointer-events-none border-inset border-8 border-gray-900/5 transition-opacity group-hover:opacity-0"></div>
                                </div>
                            ) : (
                                <div className="flex-grow overflow-y-auto bg-black/40 scroll-smooth">
                                    <div className="w-full space-y-0">
                                        {bogoBeautySlides.map((slide, index) => (
                                            <div key={index} className="group relative">
                                                <img
                                                    src={slide}
                                                    alt={`Bogo Beauty Slide ${index + 1}`}
                                                    className="w-full h-auto brightness-90 hover:brightness-100 transition-all duration-500"
                                                />
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-mono text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                                                    IMAGE_{String(index + 1).padStart(2, '0')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

const ProjectCard = ({ project, index, onTechnicalDocs, onCopyLink, copyFeedback }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <GlassSegment
            hover
            className="p-6 flex flex-col h-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 flex-grow">
                {project.description}
            </p>

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
                        Technical Docs
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
                {onTechnicalDocs && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onTechnicalDocs}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Technical Docs
                        </button>
                        {onCopyLink && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onCopyLink();
                                }}
                                className={`p-1 rounded transition-all duration-300 ${copyFeedback ? 'bg-cyber-cyan/20 text-cyber-cyan shadow-glow' : 'text-gray-500 hover:text-cyber-cyan'}`}
                                title="Copy direct link"
                            >
                                {copyFeedback ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </GlassSegment>
    );
};

export default Projects;

import React, { useState, useEffect, useCallback } from 'react';
import styles from './EnhancementPath.module.css';
import pathsConfig from '../../config/paths.json';
import alexiPFP from '../RoboticsPath/assets/AlexiPFP.jpg';
import seeingSoundImg from '../RoboticsPath/assets/projects/seeingSound.png';
import seeingSoundResults from '../RoboticsPath/assets/projects/seeingSound2_results.png';
import uniViz1 from '../RoboticsPath/assets/projects/UniViz1.png';
import uniViz2 from '../RoboticsPath/assets/projects/UniViz2.png';
import uuvDenoiseImg from '../RoboticsPath/assets/projects/UVV_denoiser.png';
import uuvResultImg from '../RoboticsPath/assets/projects/denoisedImage.png';


const EnhancementPath = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);
    const [currentSubItem, setCurrentSubItem] = useState(-1);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const totalSlides = 4;

    const projects = [
        {
            title: "UUV Vision Enhancement",
            header: "UUV Vision Enhancement",
            description: (
                <div className="space-y-6">
                    <p className="text-sm text-white/90 font-bold uppercase tracking-tight">Stage 01: The Noise Bottleneck</p>
                    <div className="space-y-4">
                        <p className="text-xs text-[#888] leading-relaxed">
                            Current underwater vision pipelines suffer from extreme <span className="text-white border-b border-white/20">absorption and backscatter</span>, causing detectors to fail in high-turbidity zones. 
                        </p>
                        <p className="text-xs text-[#888] leading-relaxed italic">
                            The visualization shows a <span className="text-white">Diffusion model trained with LoRA</span> being used as a real-time signal restorer to identify structural features obscured by marine snow.
                        </p>
                    </div>
                </div>
            ),
            customComponent: (
                <img 
                    src={uuvResultImg} 
                    alt="UUV Denoising Results" 
                    className="w-full h-full object-contain"
                />
            ),
            mediaFlex: 2.5,
            mediaMaxHeight: "650px",
            subItems: ["proposed-solution"],
            subContent: [
                {
                    title: "Proposed Solution",
                    description: (
                        <div className="space-y-6">
                            <p className="text-sm text-white/90 font-bold uppercase tracking-tight">Denoising Latent Neck</p>
                            <div className="space-y-4">
                                <p className="text-xs text-[#ccc] leading-relaxed">
                                    Instead of standard feature aggregation, we replaced the YOLO FPN/PANet "Neck" with a <span className="text-white">15M-parameter Latent Diffusion Model</span>.
                                </p>
                                <ul className="text-[11px] text-[#888] space-y-2 uppercase tracking-wide">
                                    <li>• <span className="text-cyber-cyan">Direct Latent Refinement</span> before the detection head</li>
                                    <li>• <span className="text-white font-bold">1-Step Inference</span> via Consistency Distillation</li>
                                    <li>• Eliminates the need for pre-processing overhead</li>
                                </ul>
                            </div>
                        </div>
                    ),
                    customComponent: <img src={uuvDenoiseImg} alt="Proposed Solution: Denoising Latent Neck Architecture" className="w-full h-full object-contain" />,
                    mediaMaxHeight: "500px"
                }
            ]
        },
        {
            title: "Seeing Sound",
            header: "Seeing Sound - Audio to Image",
            description: (
                <div className="space-y-6">
                    <p className="text-sm text-white/90 font-bold uppercase tracking-tight">Cross-Modal Latent Translation</p>
                    <div className="space-y-4">
                        <p className="text-xs text-[#888] leading-relaxed">
                            Developed a novel framework translating <span className="text-white">CLAP audio embeddings</span> into semantically coherent visual outputs using Stable Diffusion and Generative Adversarial Networks.
                        </p>
                        <ul className="text-[11px] text-[#888] space-y-2 uppercase tracking-wide">
                            <li>• <span className="text-white">0.839 Cosine Similarity</span> achieved via MLP Adapter Mapping</li>
                            <li>• <span className="text-white">Dual-Head Architecture</span> for richer semantic representation</li>
                            <li>• End-to-end training with <span className="text-cyber-cyan">InfoNCE, MSE, and Diffusion</span> losses</li>
                        </ul>
                    </div>
                </div>
            ),
            customComponent: <img src={seeingSoundImg} alt="Seeing Sound Audio-to-Image Pipeline" className="w-full h-full object-contain" />,
            mediaFlex: 3,
            mediaMaxHeight: "600px",
            subItems: ["architecture", "fine-tuning"],
            subContent: [
                {
                    title: "MLP Adapter & Dual-Head Mapping",
                    description: (
                        <div className="space-y-4">
                            <div className="text-sm text-[#ccc] leading-relaxed">
                                Tested different mapping strategies to bridge the modality gap. By forcing the <span className="text-white">MLP mapper</span> through <span className="text-cyber-cyan">two heads</span>, the model learned richer latent representations capturing distinct semantic perspectives from both CLAP and SD.
                            </div>
                        </div>
                    ),
                    customComponent: (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-10 p-12 bg-white/5 backdrop-blur-sm rounded-lg">
                            <div className="text-[10px] text-cyber-cyan font-mono tracking-[0.6em] uppercase opacity-40">Training Objective Logic</div>
                            <div className="font-serif italic text-3xl text-white/90 tracking-widest selection:bg-cyber-cyan/30">
                                L<sub className="text-sm not-italic font-mono ml-1 opacity-50">combo</sub> = 
                                λ<sub className="text-xs not-italic font-mono ml-1 opacity-50">1</sub>L<sub className="text-xs not-italic font-mono ml-1 opacity-50">InfoNCE</sub> + 
                                λ<sub className="text-xs not-italic font-mono ml-1 opacity-50">2</sub>L<sub className="text-xs not-italic font-mono ml-1 opacity-50">MSE</sub> + 
                                λ<sub className="text-xs not-italic font-mono ml-1 opacity-50">3</sub>L<sub className="text-xs not-italic font-mono ml-1 opacity-50">Diffusion</sub>
                            </div>
                            <div className="w-16 h-[1px] bg-cyber-cyan opacity-30 mt-4" />
                        </div>
                    ),
                    mediaStyle: { border: 'none', background: 'transparent' }
                },
                {
                    title: "LoRA vs. U-Net Optimization",
                    description: (
                        <div className="space-y-4">
                            <div className="text-sm text-[#ccc] leading-relaxed">
                                Evaluated multiple fine-tuning strategies. <span className="text-white">LoRA (Low-Rank Adaptation)</span> significantly outperformed the baseline, producing higher-quality domain-specific images. Conversely, full U-Net optimization maintained quality but offered no major statistical gain over the more efficient LoRA approach.
                            </div>
                        </div>
                    ),
                    customComponent: <img src={seeingSoundResults} alt="LoRA vs. U-Net Optimization Results" className="w-full h-full object-contain" />
                }
            ]
        },
        {
            title: "Universal Vision Encoder",
            header: "Universal Vision Encoder (Eagle-Inspired)",
            description: (
                <div className="space-y-6">
                    <p className="text-sm text-white/90 font-bold uppercase tracking-tight">Mixture of Encoders for Precise Object Grounding</p>
                    <div className="space-y-4">
                        <p className="text-xs text-[#888] leading-relaxed">
                            Following the <span className="text-white">Eagle</span> methodology, this encoder fuses <span className="text-cyber-cyan">SigLIP</span> (Semantic Expert) for high-level classification with <span className="text-cyber-cyan">DINOv2</span> (Geometric Expert) for pixel-perfect spatial awareness. 
                        </p>
                        <ul className="text-[11px] text-[#888] space-y-2 uppercase tracking-wide">
                            <li>• <span className="text-white">Complementary Fusion</span>: Semantic "What" (SigLIP) + Geometric "Where" (DINOv2)</li>
                            <li>• <span className="text-white">768 + 768 = 1536</span> feature concatenation for dense token preservation</li>
                            <li>• Massive reduction in <span className="text-white">Hallucinations</span> and improved <span className="text-white">Small Object Detection</span></li>
                        </ul>
                    </div>
                </div>
            ),
            subItems: ["architecture", "distillation", "performance"],
            subContent: [
                {
                    title: "Architecture",
                    description: (
                        <div className="space-y-4">
                            <div className="text-sm text-[#ccc] leading-relaxed">
                                Inspired by NVIDIA’s "Eagle" paper, I discovered that simply <span className="text-white">concatenating tokens</span> from complementary encoders is as effective as complex MoE layers. SigLIP identifies objects, while DINOv2 ensures perfect boundary textures, enabling hyper-accurate <span className="text-cyber-cyan">Object Grounding</span> and <span className="text-cyber-cyan">Counting</span>.
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1 bg-white/5 p-4 border border-white/10">
                                    <span className="text-[9px] text-[#555] block mb-1">SigLIP Base</span>
                                    <span className="text-xs font-bold text-white tracking-widest">768 Dim</span>
                                </div>
                                <div className="flex-1 bg-white/5 p-4 border border-white/10">
                                    <span className="text-[9px] text-[#555] block mb-1">DINOv2 Base</span>
                                    <span className="text-xs font-bold text-white tracking-widest">768 Dim</span>
                                </div>
                                <div className="flex-1 bg-cyber-cyan/10 p-4 border border-cyber-cyan/20 text-center">
                                    <span className="text-[9px] text-cyber-cyan/60 block mb-1">Total Embedding</span>
                                    <span className="text-xs font-black text-white tracking-widest">1536-D</span>
                                </div>
                            </div>
                        </div>
                    ),
                    customComponent: <img src={uniViz1} alt="Eagle-based Mixture of Encoders Architecture" className="w-full h-full object-contain" />
                },
                {
                    title: "Distillation",
                    description: (
                        <div className="space-y-4">
                            <div className="text-sm text-[#ccc] leading-relaxed">
                                To make this high-dimensional model edge-ready, I distilled the <span className="text-white">1536-D joint representation</span> into a lightweight <span className="text-cyber-cyan">MobileNetV3</span>. This ensures the student model retains the grounding capabilities of DINO and the semantic depth of SigLIP at a fraction of the compute cost.
                            </div>
                            <div className="p-4 border border-white/10 bg-white/5 font-mono text-[10px]">
                                <div className="text-white/40 mb-2">// DISTILLATION PIPELINE</div>
                                <div>Teacher: <span className="text-white">Eagle-1536</span></div>
                                <div>Student: <span className="text-cyber-cyan">MobileNetV3-Int8</span></div>
                                <div className="mt-2 text-green-500">{" >> Preserving spatial token distribution via MSE Loss"}</div>
                            </div>
                        </div>
                    ),
                    customComponent: <img src={uniViz2} alt="Knowledge Distillation into MobileNetV3" className="w-full h-full object-contain" />
                },
                {
                    title: "Performance",
                    description: (
                        <div className="space-y-4 text-sm text-[#ccc]">
                            <p>The <span className="text-white">INT8 distilled model</span> was validated across diverse vision tasks. By combining encoders that "see" different worlds (Labels vs. Geometries), the model generalizes across <span className="text-white">Segmentation</span> and <span className="text-white">Detection</span> without task-specific overhead.</p>
                            
                            <div className="grid grid-cols-1 gap-12 pt-8 border-t border-white/5">
                                <div className="space-y-4">
                                    <span className="text-[9px] uppercase font-bold text-cyber-cyan tracking-widest block">Performance Across Tasks</span>
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-xs text-[#888]">Classification</span>
                                            <span className="text-xs text-white font-bold">91.4% Top-1</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span className="text-xs text-[#888]">Segmentation</span>
                                            <span className="text-xs text-white font-bold">87.8% mIoU</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        }
    ];

    const isEnabled = pathsConfig.paths.enhancement_path?.enabled;

    const handleNext = useCallback(() => {
        if (currentSlide === 2) {
            const hasSubItems = projects[currentProject].subItems;
            if (hasSubItems && currentSubItem < projects[currentProject].subItems.length - 1) {
                setCurrentSubItem(prev => prev + 1);
            } else if (currentProject < projects.length - 1) {
                setCurrentProject(prev => prev + 1);
                setCurrentSubItem(-1);
            } else {
                setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
            }
        } else {
            setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
        }
    }, [currentSlide, currentProject, currentSubItem, projects, totalSlides]);

    const handlePrev = useCallback(() => {
        if (currentSlide === 2) {
            const hasSubItems = projects[currentProject].subItems;
            if (hasSubItems && currentSubItem > -1) {
                setCurrentSubItem(prev => prev - 1);
            } else if (currentProject > 0) {
                setCurrentProject(prev => prev - 1);
                const prevProject = projects[currentProject - 1];
                setCurrentSubItem(prevProject.subItems ? prevProject.subItems.length - 1 : -1);
            } else {
                setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
            }
        } else {
            setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
        }
    }, [currentSlide, currentProject, currentSubItem, projects]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const onTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const onTouchEnd = (e) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) handleNext();
        if (isRightSwipe) handlePrev();
        setTouchStart(null);
    };

    if (!isEnabled) {
        return <div className={styles.disabledMessage}>404 | Access Restricted</div>;
    }

    return (
        <div
            className={styles.container}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className={styles.slidesWrapper}
                style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
            >
                {/* Slide 0: About Me */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">01. Identity</div>
                        <div className={`flex flex-col md:flex-row items-center gap-16 ${styles.centeredContent} w-full max-w-6xl`}>
                            {/* Left: Profile Pic */}
                            <div className="relative group">
                                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/10 overflow-hidden relative z-10 transition-colors group-hover:border-cyber-cyan/50">
                                    <img 
                                        src={alexiPFP} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="flex-1 space-y-12">
                                <div className="space-y-1">
                                    <span className="text-cyber-cyan font-mono text-[10px] tracking-[0.4em] uppercase block mb-1">Name</span>
                                    <h1 className="text-6xl font-black text-white uppercase tracking-tighter">Alexi George</h1>
                                </div>

                                <div className="grid grid-cols-2 gap-12 py-10 border-y border-white/5">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-black text-white uppercase tracking-widest">Age</h2>
                                        <p className="text-sm font-mono text-white/50 uppercase tracking-tighter">23 Years Old</p>
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-black text-white uppercase tracking-widest">Academic Major</h2>
                                        <p className="text-sm font-mono text-white/50 uppercase tracking-tighter">BSc(Hons) Applied AI</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-lg font-black text-white uppercase tracking-widest">Technical Focus</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {["Real-time AI", "AI Optimization", "Computer Vision"].map((tag, i) => (
                                            <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white text-xs uppercase tracking-widest font-bold transition-all hover:bg-cyber-cyan hover:text-black">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 1: Career */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">02. Career Timeline</div>
                        <div className={`${styles.timeline} ${styles.centeredContent}`}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTick} />
                                <div className={styles.timelineContentWrapper}>
                                    <div className={styles.timelineDate}>AUG 2021 - JUN 2022</div>
                                    <div className={styles.timelineCompany}>CYNAPSE.AI</div>
                                    <div className={styles.timelineRole}>AI Software Engineer Intern</div>
                                    <div className={styles.timelineFocus}>Vision AI & Synthetic Data Generation</div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTick} />
                                <div className={styles.timelineContentWrapper}>
                                    <div className={styles.timelineDate}>MAY 2024 - OCT 2024</div>
                                    <div className={styles.timelineCompany}>CYNAPSE.AI</div>
                                    <div className={styles.timelineRole}>AI Research Intern</div>
                                    <div className={styles.timelineFocus}>
                                        Generative AI & Spatio-Temporal Models<br />
                                        Multimodal Agents
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTick} />
                                <div className={styles.timelineContentWrapper}>
                                    <div className={styles.timelineDate}>NOV 2024 - AUG 2025</div>
                                    <div className={styles.timelineCompany}>SIT X NVIDIA AI CENTER</div>
                                    <div className={styles.timelineRole}>Research Assistant</div>
                                    <div className={styles.timelineFocus}>
                                        Multimodal Speech Processing<br />
                                        Speech Denoising<br />
                                        Multimodal Optimization
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTick} />
                                <div className={styles.timelineContentWrapper}>
                                    <div className={styles.timelineDate}>NOV 2024 - ONGOING</div>
                                    <div className={styles.timelineCompany}>AIRBORNE LAB</div>
                                    <div className={styles.timelineRole}>Lead Student Engineer</div>
                                    <div className={styles.timelineFocus}>
                                        Hybrid Engine Drone Flight<br />
                                        Unmanned Flight<br />
                                        Unmanned Submarine<br />
                                        High Speed Drone Flocking
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTick} />
                                <div className={styles.timelineContentWrapper}>
                                    <div className={styles.timelineDate}>DEC 2025 - ONGOING</div>
                                    <div className={styles.timelineCompany}>A*STAR</div>
                                    <div className={styles.timelineRole}>AI Research Engineer</div>
                                    <div className={styles.timelineFocus}>
                                        Agents for Humanoid Actuator FEA<br />
                                        PINNs for FEA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 2: Projects */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">03. Core Projects</div>
                        <div className={`${styles.projectLayout} ${styles.centeredContent}`}>
                            {/* Vertical Nav */}
                            <div className={styles.projectNav}>
                                {projects.map((project, index) => (
                                    <React.Fragment key={index}>
                                        <div
                                            className={`${styles.navItem} ${currentProject === index ? (currentSubItem !== -1 ? styles.navItemSubActive : styles.navItemActive) : ''}`}
                                            onClick={() => {
                                                setCurrentProject(index);
                                                setCurrentSubItem(-1);
                                            }}
                                        >
                                            {project.title}
                                        </div>
                                        {currentProject === index && project.subItems && (
                                            <div className={styles.subItemsContainer}>
                                                {project.subItems.map((sub, sIdx) => (
                                                    <div
                                                        key={sIdx}
                                                        className={`${styles.subNavItem} ${currentSubItem === sIdx ? styles.subNavItemActive : ''}`}
                                                        onClick={() => setCurrentSubItem(sIdx)}
                                                    >
                                                        {sub}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Project Details */}
                            <div className={styles.projectDetails}>
                                {(() => {
                                    const project = projects[currentProject];
                                    const isSub = currentSubItem !== -1 && project.subContent && project.subContent[currentSubItem];
                                    const displayContent = isSub ? project.subContent[currentSubItem] : project;

                                    return (
                                        <div key={`${currentProject}-${currentSubItem}`} className={`${styles.slideUpFade} w-full flex flex-col h-full`}>
                                            {!displayContent.fullWidth && (
                                                <div className={styles.projectTitle}>
                                                    {isSub ? (
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-white/20 text-xl font-light">{project.title}</span>
                                                            <span className="text-white">/</span>
                                                            <span>{displayContent.title}</span>
                                                        </div>
                                                    ) : (
                                                        project.header || project.title
                                                    )}
                                                </div>
                                            )}

                                            {displayContent.fullWidth ? (
                                                <div className="flex-grow overflow-hidden pt-0">
                                                    <div className={styles.projectDesc}>{displayContent.description}</div>
                                                </div>
                                            ) : (
                                                <div className={styles.innerDetailSplit}>
                                                    <div
                                                        className={styles.videoSection}
                                                        style={{
                                                            flex: displayContent.mediaFlex || project.mediaFlex || 1.5,
                                                            maxHeight: displayContent.mediaMaxHeight || project.mediaMaxHeight || '400px',
                                                            ...(displayContent.mediaStyle || project.mediaStyle || {})
                                                        }}
                                                    >
                                                        {displayContent.customComponent ? (
                                                            displayContent.customComponent
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-[#333] text-sm tracking-widest uppercase">
                                                                [ Pipeline Visualization ]
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={styles.textSection}>
                                                        <div className={styles.projectDesc}>{displayContent.description}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">04. What I am exploring</div>
                        <div className={`${styles.statsGrid} ${styles.centeredContent} w-full flex-grow flex items-center justify-center px-8`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                                {[
                                    { 
                                        title: "RL-based Image Enhancement", 
                                        desc: "Developing reinforcement learning frameworks for precise style alignment and high-fidelity signal restoration."
                                    },
                                    { 
                                        title: "Universal Extractors", 
                                        desc: "Leveraging EAGLE-based MIX architecture for cross-domain image feature extraction and latent representation."
                                    },
                                    { 
                                        title: "Real-Time Latent Diffusion", 
                                        desc: "Architectural optimization of Diffusion Models for INT8/Edge deployment in high-turbidity subsea vision tasks."
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="group relative">
                                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-lg h-full transition-all duration-500 group-hover:border-cyber-cyan/40">
                                            {/* Accent Bar */}
                                            <div className="absolute top-0 left-0 w-[2px] h-0 bg-cyber-cyan group-hover:h-full transition-all duration-700" />
                                            
                                            <div className="flex flex-col justify-center h-full space-y-4">
                                                <div className="text-2xl font-black text-white tracking-tighter group-hover:text-cyber-cyan transition-colors duration-300 leading-tight">
                                                    {item.title}
                                                </div>
                                                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Background Scanner Effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,186,255,0.01)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none rounded-lg" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEnlarged && (
                <div className={styles.modalOverlay} onClick={() => setIsEnlarged(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsEnlarged(false)}>✕</button>
                        <div className="text-white text-center">Detail Visualization View</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancementPath;

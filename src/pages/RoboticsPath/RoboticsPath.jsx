import React, { useState, useEffect, useCallback } from 'react';
import styles from './RoboticsPath.module.css';
import pathsConfig from '../../config/paths.json';

const VisionGraph = () => (
    <div className="flex flex-col items-center justify-center h-full w-full font-mono p-4 gap-8">
        <div className="flex items-center gap-2 scale-[0.8] xl:scale-95 origin-center">
            {/* Teacher section */}
            <div className="flex flex-col items-center gap-2">
                <div className="px-4 py-3 border border-white/10 bg-white/5 rounded-sm">
                    <span className="text-[9px] text-white/40 block mb-1">TEACHER</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">DINOv2 + SIGLIP</span>
                </div>
            </div>

            {/* Funnel 1: Distillation */}
            <div className="relative w-8 h-16 flex items-center justify-center">
                <svg width="40" height="30" viewBox="0 0 40 30" className="opacity-40 -rotate-90 scale-75">
                    <path
                        d="M 5 0 L 35 0 L 25 30 L 15 30 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <path
                        d="M 10 5 L 30 5 L 22 23 L 18 23 Z"
                        fill="rgba(255,255,255,0.2)"
                    />
                </svg>
                <span className="absolute text-[7px] text-white font-bold tracking-tighter uppercase top-1/2 -translate-y-1/2 -translate-x-7">DISTILL</span>
            </div>

            {/* Student section: INT8 */}
            <div className="flex flex-col items-center gap-2">
                <div className="px-4 py-3 border border-white/30 bg-white/5 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <span className="text-[9px] text-white/40 block mb-1">STUDENT</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">INT8 CNN</span>
                </div>
            </div>

            {/* Autoencoder Section */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 px-2 border-x border-white/5 mx-2 relative">
                    {/* Encoder */}
                    <div className="w-10 h-24 border-l border-white/10 relative">
                        <svg width="40" height="96" viewBox="0 0 40 96">
                            <path d="M 0 0 L 40 35 L 40 61 L 0 96 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
                        </svg>
                    </div>

                    {/* Bottleneck */}
                    <div className="w-12 h-16 border border-white/20 bg-white/5 relative flex items-center justify-center overflow-hidden rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-scan" />
                        <span className="text-[10px] font-black text-white z-10">768D</span>
                    </div>

                    {/* Decoder */}
                    <div className="w-10 h-24 relative">
                        <svg width="40" height="96" viewBox="0 0 40 96">
                            <path d="M 0 35 L 40 0 L 40 96 L 0 61 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
                        </svg>
                        {/* Red Cross */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-8 h-8 relative flex items-center justify-center opacity-60">
                                <div className="absolute w-full h-0.5 bg-red-500 rotate-45" />
                                <div className="absolute w-full h-0.5 bg-red-500 -rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>
                <span className="text-[7px] text-white/60 uppercase tracking-[0.3em] mt-2">Autoencoder</span>
            </div>

            {/* Funnel 2: Squeeze */}
            <div className="relative w-8 h-16 flex items-center justify-center">
                <svg width="40" height="30" viewBox="0 0 40 30" className="opacity-40 -rotate-90 scale-75">
                    <path
                        d="M 5 0 L 35 0 L 25 30 L 15 30 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <path
                        d="M 10 5 L 30 5 L 22 23 L 18 23 Z"
                        fill="rgba(255,255,255,0.2)"
                    />
                </svg>
                <span className="absolute text-[7px] text-white font-bold tracking-tighter uppercase top-1/2 -translate-y-1/2 -translate-x-7">DISTILL</span>
            </div>

            {/* TNN section */}
            <div className="flex flex-col gap-1 ml-1 justify-center items-center">
                <div className="px-3 py-8 border border-white/30 bg-white/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                    <span className="text-sm font-black text-white tracking-[0.2em] vertical-text">TNN</span>
                </div>
                <span className="text-[9px] text-white/70 mt-1 font-extrabold uppercase tracking-widest">Output</span>
            </div>
        </div>

        {/* Technical Legend */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl border-t border-white/5 pt-6">
            <div className="flex flex-col items-center text-center px-2">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Stage 01</span>
                <span className="text-[10px] text-white font-bold uppercase mb-1">Pre-train</span>
                <p className="text-[8px] text-white/60 uppercase leading-tight">
                    DINOv2 + SigLIP<br />
                    KD
                </p>
            </div>
            <div className="flex flex-col items-center text-center px-2 border-x border-white/5">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Stage 02</span>
                <span className="text-[10px] text-white font-bold uppercase mb-1">Insert</span>
                <p className="text-[8px] text-white/60 uppercase leading-tight">768D Autoencoder Bottleneck</p>
            </div>
            <div className="flex flex-col items-center text-center px-2">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Stage 03</span>
                <span className="text-[10px] text-white font-bold uppercase mb-1">Squeeze</span>
                <p className="text-[8px] text-white/60 uppercase leading-tight">QAT 1.58-bit TNN</p>
            </div>
        </div>
    </div>
);

const ArchitectureGraph = () => (
    <div className="flex flex-col items-center justify-center h-full w-full font-mono p-8">
        <div className="flex items-center gap-6 relative">
            {/* Vision Node */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-28 h-28 border border-cyber-cyan/30 flex items-center justify-center bg-cyber-cyan/5 group-hover:bg-cyber-cyan/20 transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(0,186,255,0.1)]">
                    <span className="text-cyber-cyan tracking-[0.2em] font-bold text-xs">VISION</span>
                </div>
                <span className="text-[11px] text-[#888] uppercase tracking-widest font-bold">Depth Inference</span>
            </div>

            {/* Path with arrows */}
            <div className="flex flex-col gap-6 relative px-2">
                {/* To Movement */}
                <div className="relative h-px w-16 bg-gradient-to-r from-cyber-cyan/50 to-white/50">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/50 rotate-45" />
                    <div className="absolute inset-0 bg-cyber-cyan/30 animate-pulse duration-[1.5s]" />
                </div>
                {/* Feedback to Vision */}
                <div className="relative h-px w-16 bg-gradient-to-l from-cyber-cyan/50 to-white/50">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-l border-white/50 -rotate-45" />
                    <div className="absolute inset-0 bg-white/20 animate-pulse duration-[2.5s]" />
                </div>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[8px] text-white/30 whitespace-nowrap tracking-[0.3em] font-bold uppercase">Latent Sync</span>
            </div>

            {/* Movement Node */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-28 h-28 border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-500 rounded-sm">
                    <span className="text-white tracking-[0.2em] font-bold text-xs">GAIT</span>
                </div>
                <span className="text-[11px] text-[#888] uppercase tracking-widest font-bold">PPO Control</span>
            </div>
        </div>
    </div>
);

const RoboticsPath = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentProject, setCurrentProject] = useState(0);
    const [currentSubItem, setCurrentSubItem] = useState(-1);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const totalSlides = 4;

    const projects = [
        {
            title: "3D World Sim",
            description: (
                <div className="space-y-6">
                    <p className="text-lg text-white/90">A custom simulation environment built from scratch with <span className="text-white">Unity</span> in 2022.</p>
                    <div className="space-y-4">
                        <p className="text-sm text-[#888] leading-relaxed">
                            Utilizing <span className="text-white">Coordinate Transformation and Intrinsic Calibration</span>, the system captures synthetic data for AI model training.
                        </p>
                        <p className="text-sm text-[#888] leading-relaxed">
                            Used for training action recognition and detector models to capture human behaviour data.
                        </p>
                    </div>
                </div>
            ),
            image: "assets/robotics_path/3d_worldSim.jpg",
            mediaFlex: 2.5,
            mediaMaxHeight: '500px'
        },
        {
            title: "CyNeuron",
            description: (
                <div className="space-y-6">
                    <p className="text-lg text-white/90">Spatio-Temporal VLM for massive-scale video tracking across 50+ camera streams.</p>
                    <p className="text-sm text-[#888] leading-relaxed">
                        By integrating <span className="text-white">Set-of-Mark (SoM)</span> visual grounding, the system achieves a <span className="text-cyber-cyan">20%</span> increase in response accuracy.
                    </p>
                    <p className="text-sm text-[#888] leading-relaxed">
                        Production-ready APIs utilizing <span className="text-white">Docker, NVIDIA Triton, and TensorRT</span> further boost model performance and latency by over <span className="text-cyber-cyan">500%</span>.
                    </p>
                    <p className="text-sm text-[#888] italic">
                        The product was later showcased at <span className="text-white font-bold">NVIDIA GTC 2025 @ San Jose</span>.
                    </p>
                </div>
            ),
            image: "https://som-gpt4v.github.io/website/img/gpt4v-bake-som.png"
        },
        {
            title: "Cerberus",
            description: "Quadruped robotic platform trained using Proximal Policy Optimization (PPO). Developed with PyBullet for high-fidelity physics simulation and behavior verification.",
            video: "assets/robotics_path/cerberus.mp4",
            subItems: ["architecture", "vision", "movement"],
            subContent: [
                {
                    title: "Architecture",
                    description: "High-fidelity locomotion stack utilizing a decoupled control loop. High-level pathing is separated from the low-level PD motor controller to ensure zero-latency ground reaction force (GRF) adaptation across 12 DOF.",
                    customComponent: <ArchitectureGraph />
                },
                {
                    title: "Vision",
                    description: (
                        <div className="flex flex-col h-full">
                            <div className="space-y-4 flex-grow">
                                <p className="text-white/90">Neural Compressor pipeline optimized for deployment. Utilizing a Teacher-Student distillation framework and Ternary Quantization-Aware Training (QAT) to maintain accuracy while enabling faster inference.</p>
                                <div className="text-sm text-[#888] pt-2 border-t border-white/5">
                                    <p>Able to maintain 90% distribution levels relative to original embeddings.</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500/80 block mb-2 font-bold">
                                    In-Progress Testing
                                </span>
                                <p className="text-xs text-[#666] leading-relaxed italic">
                                    Currently testing with different heads (classifier, detector, depth, etc).
                                </p>
                            </div>
                        </div>
                    ),
                    customComponent: <VisionGraph />
                },
                {
                    title: "Movement",
                    fullWidth: true,
                    description: (
                        <div className="flex flex-col h-full overflow-y-auto pr-4 custom-scrollbar">
                            <div className="space-y-6 pt-0">
                                {/* Task Rewards - "LaTeX" Style */}
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l border-white/10">
                                        <span className="text-[8px] uppercase tracking-[0.1em] text-white block mb-3">Target Velocity Tracking</span>
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                            <div className="font-serif text-white text-base italic tracking-wide min-w-[220px]">
                                                r<sub className="text-[9px] not-italic">lin</sub> = 2.0 &middot; exp(&minus;<div className="inline-flex flex-col align-middle mx-1"><span className="border-b border-white/30 text-[11px] px-1">(v<sub className="text-[8px]">tgt</sub> - v<sub className="text-[8px]">cur</sub>)&sup2;</span><span className="text-[11px] text-center">0.25</span></div>)
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-[8px] text-white/20 leading-tight uppercase origin-left scale-[0.7] whitespace-nowrap lg:whitespace-normal">
                                                    Gaussian kernel provides a smooth differentiable error surface. This ensures the agent receives dense feedback as it approaches the commanded forward velocity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative pl-6 border-l border-white/10">
                                        <span className="text-[8px] uppercase tracking-[0.1em] text-white block mb-3">Yaw Rate Regulation</span>
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                            <div className="font-serif text-white text-base italic tracking-wide min-w-[220px]">
                                                r<sub className="text-[9px] not-italic">yaw</sub> = exp(&minus;<div className="inline-flex flex-col align-middle mx-1"><span className="border-b border-white/30 text-[11px] px-1">(&omega;<sub className="text-[8px]">tgt</sub> - &omega;<sub className="text-[8px]">cur</sub>)&sup2;</span><span className="text-[11px] text-center">0.25</span></div>)
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-[8px] text-white/20 leading-tight uppercase origin-left scale-[0.7] whitespace-nowrap lg:whitespace-normal">
                                                    Regulates turning agility. By penalizing angular error, the system learns to maintain heading stability and eliminates z-axis jitter during locomotion.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Simplified Penalty Table */}
                                <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-6 border-t border-white/5">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 2v20M2 12h20" />
                                            </svg>
                                            <span className="text-[8px] uppercase tracking-[0.1em] text-white block font-bold">Stability Metrics</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-serif italic text-white/60">
                                            <span>Orientation Loss (L<sub className="not-italic">ori</sub>)</span>
                                            <span className="text-white text-[11px]">w = &minus;1.0</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-serif italic text-white/60">
                                            <span>Height Variance (L<sub className="not-italic">hgt</sub>)</span>
                                            <span className="text-white text-[11px]">w = &minus;10.0</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                                <path d="M9 9h6v6H9zM15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
                                            </svg>
                                            <span className="text-[8px] uppercase tracking-[0.1em] text-white block font-bold">Hardware Constraints</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-serif italic text-white/60">
                                            <span>Torque Penalty (&tau;)</span>
                                            <span className="text-white text-[11px]">w = &minus;1e-4</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-serif italic text-white/60">
                                            <span>Action Smoothness (&Delta;a)</span>
                                            <span className="text-white text-[11px]">w = &minus;0.01</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ),
                }
            ]
        },
        {
            title: "Sinew",
            description: (
                <div className="space-y-4">
                    <p>Custom built tentacle, 3D printed and CAD modelled by myself.</p>
                    <p>
                        Learned to develop it after attending{" "}
                        <a
                            href="https://smart.mit.edu/post/m3s-symposiums-2025-charting-the-future-of-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white underline decoration-dotted decoration-gray-500 underline-offset-4 hover:text-cyber-cyan transition-colors"
                        >
                            SMART M3S Symposiums 2025
                        </a>{" "}
                        in August and worked on it in September to October 2025.
                    </p>
                    <p className="text-sm text-[#888]">Built with Raspberry Pi 3 and 3x MG996R motors</p>
                    <div className="text-[#333] tracking-[0.5em] h-px overflow-hidden">......</div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-xs uppercase tracking-widest text-red-500/60 block mb-2 font-bold">Identified Issues</span>
                        <ul className="list-disc list-inside text-sm text-[#666] space-y-1">
                            <li>Weak cables</li>
                            <li>Motor Strength issues</li>
                        </ul>
                    </div>
                </div>
            ),
            video: "assets/robotics_path/soft_rob_testmp4.mp4"
        }
    ];

    const isEnabled = pathsConfig.paths.robotics_path?.enabled;

    const handleNext = useCallback(() => {
        if (currentSlide === 1) {
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
        if (currentSlide === 1) {
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
                style={{ transform: `translateX(-${currentSlide * 95}vw)` }}
            >
                {/* Slide 1: Career */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">01. Path</div>
                        <h1>Career</h1>
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
                                    <div className={styles.timelineRole}>AI Research Engineer (Intern/Lead)</div>
                                    <div className={styles.timelineFocus}>
                                        Agents for Humanoid Actuator FEA<br />
                                        PINNs for FEA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 2: Past Projects */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">02. Projects</div>
                        <h1>Related Projects</h1>
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
                                                    {displayContent.titleComponent ? (
                                                        <div className="flex items-center gap-2">
                                                            {displayContent.titleComponent}
                                                            {isSub && (
                                                                <>
                                                                    <span className="text-white">/</span>
                                                                    <span>{displayContent.title}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : isSub ? (
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
                                                            cursor: (displayContent.image || displayContent.video) ? 'pointer' : 'default'
                                                        }}
                                                        onClick={() => (displayContent.image || displayContent.video) && setIsEnlarged(true)}
                                                    >
                                                        {(displayContent.image || displayContent.video) && (
                                                            <div className={styles.enlargeButton}>Enlarge</div>
                                                        )}
                                                        {displayContent.customComponent ? (
                                                            displayContent.customComponent
                                                        ) : displayContent.image ? (
                                                            <img
                                                                src={displayContent.image}
                                                                alt={displayContent.title}
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        ) : displayContent.video ? (
                                                            <video
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                key={displayContent.video}
                                                                className="w-full h-full object-cover"
                                                            >
                                                                <source src={displayContent.video} type="video/mp4" />
                                                            </video>
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-[#333] text-sm tracking-widest uppercase">
                                                                [ No Signal ]
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

                {/* Slide 3: Current Status */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">03. Current</div>
                        <h1>What I have done</h1>
                        <div className={`${styles.statsGrid} ${styles.centeredContent} w-full`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {[
                                    "Rigid Robotics",
                                    "Multi Legged Robotics",
                                    "Forward and Inverse Kinematics",
                                    "Computer Vision",
                                    "Visual Grounding for VLMs"
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-cyber-cyan/50 transition-colors group">
                                        <div className="text-white text-lg font-light tracking-wide">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 4: Future Roadmap */}
                <div className={styles.slide}>
                    <div className={styles.slideContent}>
                        <div className="text-cyber-cyan font-mono mb-2 text-sm uppercase tracking-widest">04. Future</div>
                        <h1>What I want to learn/implement</h1>
                        <div className={`${styles.statsGrid} ${styles.centeredContent} w-full`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                                {[
                                    { title: "Sim to Real", desc: "Closing the gap between high-fidelity simulations and physical hardware." },
                                    { title: "Reinforcement Learning", desc: "Data-driven control policies for complex robot locomotion." },
                                    { title: "Continuum Theory", desc: "Constant curvature kinematics for soft robotics systems." },
                                    { title: "Deep Simulation", desc: "Gaining exposure to diverse physics engines and simulators." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-cyber-cyan/50 transition-colors group">
                                        <div className="text-white text-xl font-bold mb-2 group-hover:text-cyber-cyan transition-colors">{item.title}</div>
                                        <p className="text-sm text-gray-500 italic leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Overlay */}
            {isEnlarged && (
                <div className={styles.modalOverlay} onClick={() => setIsEnlarged(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsEnlarged(false)}>
                            ✕
                        </button>
                        {projects[currentProject].image ? (
                            <img src={projects[currentProject].image} alt={projects[currentProject].title} />
                        ) : projects[currentProject].video ? (
                            <video autoPlay loop muted playsInline>
                                <source src={projects[currentProject].video} type="video/mp4" />
                            </video>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoboticsPath;

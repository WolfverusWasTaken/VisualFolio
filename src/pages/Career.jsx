import { useState } from 'react';

const Career = () => {
    const [activeMainTab, setActiveMainTab] = useState('experience');
    const [selectedExpId, setSelectedExpId] = useState(1);
    const [selectedEduId, setSelectedEduId] = useState(1);

    const experienceData = [
        {
            id: 1,
            role: 'Lead Student Engineer',
            company: 'AIRBORNE Lab @ SIT',
            period: 'Nov 2024 - Ongoing',
            location: 'Singapore',
            description: 'Leading drone development in collaboration with ASAIL and SIT-DSO research lab.',
            highlights: [
                'Co-lead a team of 62 students developing unmanned aerial flight algorithms',
                'Developing the first hybrid powered 200kg drone in Singapore',
                'Working in an agile environment with research engineers',
            ],
            technologies: ['Flight Algorithms', 'Agile', 'Drone Tech'],
        },
        {
            id: 2,
            role: 'Research Assistant (Multimodal Speech Processing)',
            company: 'SIT x NVIDIA AI Center',
            period: 'Nov 2024 – Aug 2025',
            location: 'Singapore',
            description: 'Researching multimodal speech processing optimization and real-time decision systems.',
            highlights: [
                'Optimized and quantized NISQA to process 20-second clips in <0.03s with 97% accuracy, improving latency by 43%',
                'Validated real-time decision-making systems performance',
                'Work successfully accepted and presented at APSIPA 2025 conference',
            ],
            technologies: ['Speech Processing', 'Optimization', 'Real-time Systems'],
        },
        {
            id: 3,
            role: 'AI Research Intern (Generative AI)',
            company: 'CYNAPSE.AI',
            period: 'May 2024 – Oct 2024',
            location: 'Singapore',
            description: 'Worked on integrating Spatio-Temporal Models and developing production-ready inference services.',
            highlights: [
                'Integrated Spatio-Temporal Models for cyNeuron multimodal scene search (showcased at NVIDIA GTC 2025)',
                'Developed production inference service improving latency by over 400%',
                'Built encoder comparison dashboards for benchmarking Multimodal LLMs and Retrieval pipelines',
            ],
            technologies: ['Docker', 'TensorRT', 'Triton Inference Server', 'Multimodal LLMs'],
        },
        {
            id: 4,
            role: 'AI Software Engineer Intern (Vision AI)',
            company: 'CYNAPSE.AI',
            period: 'Aug 2021 – June 2022',
            location: 'Singapore',
            description: 'Focus on synthetic data generation and computer vision model development.',
            highlights: [
                'Implemented 3D Simulations for Synthetic Human Action Data Generation (95% accuracy on 60% synthetic data)',
                'Developed detectors, classifiers and action recognition models for video analytics',
            ],
            technologies: ['OpenCV', 'Blender', 'Unity', 'TensorFlow', 'PyTorch', 'Darknet'],
        },
        {
            id: 5,
            role: 'Robotics & Automation Engineer Intern',
            company: 'Univac Precision Engineering Pte Ltd',
            period: 'Mar 2021 – Aug 2021',
            location: 'Singapore',
            description: 'Spearheaded IoT development and autonomous robot deployment.',
            highlights: [
                'Developed efficient IoT data transferring system using Raspberry Pi and RESTful APIs',
                'Programmed and launched Autonomous mobile robots for production lines',
            ],
            technologies: ['Python', 'Raspberry Pi', 'RESTful APIs', 'Robotics'],
        },
    ];

    const educationData = [
        {
            id: 1,
            degree: 'BSc in Applied Artificial Intelligence (Hons)',
            institution: 'Singapore Institute of Technology',
            period: 'Aug 2024 – Ongoing',
            location: '13 Punggol Rd, Singapore',
            description: 'Specializing in Applied Artificial Intelligence.',
            highlights: [
                'Focus areas: Deep Learning, Computer Vision, AI Systems',
                'Active in AIRBORNE Lab as EXCO/Lead Student Engineer',
            ],
            technologies: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
        },
        {
            id: 2,
            degree: 'Diploma in Electrical and Electronic Engineering (Robotics and Control)',
            institution: 'Singapore Polytechnic',
            period: 'Apr 2019 – Apr 2021',
            location: '500 Dover Rd, Singapore',
            description: 'Foundation in electrical engineering and electronics systems. Specialization in Robotics and Control.',
            highlights: [
                'Specialized in Robotics and Control',
                'Gained strong fundamentals in hardware and embedded systems',
                'Developed practical engineering skills',
            ],
            technologies: ['Electronics', 'Embedded Systems', 'Robotics', 'Control Systems'],
        },
    ];

    const currentData = activeMainTab === 'experience' ? experienceData : educationData;
    const selectedId = activeMainTab === 'experience' ? selectedExpId : selectedEduId;
    const setSelectedId = activeMainTab === 'experience' ? setSelectedExpId : setSelectedEduId;
    const selectedItem = currentData.find(item => item.id === selectedId) || currentData[0];

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span className="text-gray-500">&lt;</span>
                    Career
                    <span className="text-gray-500">/&gt;</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    <span className="text-cyber-cyan">//</span> My professional journey and educational background
                </p>
            </div>

            {/* Main Tab Buttons - Minimal styling */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveMainTab('experience')}
                    className={`
            px-6 py-2 text-sm font-medium tracking-wide uppercase
            border rounded transition-all duration-300
            ${activeMainTab === 'experience'
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500'
                        }
          `}
                >
                    Experience
                </button>
                <button
                    onClick={() => setActiveMainTab('education')}
                    className={`
            px-6 py-2 text-sm font-medium tracking-wide uppercase
            border rounded transition-all duration-300
            ${activeMainTab === 'education'
                            ? 'bg-white/10 border-white/30 text-white'
                            : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500'
                        }
          `}
                >
                    Education
                </button>
            </div>

            {/* Split Layout: 30% Tabs | 70% Details */}
            <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">

                {/* Left Panel - Vertical Tabs (30%) - Solid background for readability */}
                <div className="bg-glass-dark backdrop-blur-md p-4 rounded-lg border border-glass-border space-y-2">
                    {currentData.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`
                w-full text-left p-4 rounded-lg transition-all duration-300
                ${selectedId === item.id
                                    ? 'bg-white/10 border-l-2 border-l-white/60'
                                    : 'hover:bg-white/5'
                                }
              `}
                        >
                            {/* Role/Degree */}
                            <p className={`font-medium text-sm mb-1 whitespace-pre-line ${selectedId === item.id ? 'text-white' : 'text-gray-300'}`}>
                                {activeMainTab === 'experience'
                                    ? item.role
                                    : item.degree.replace(' (', '\n(')}
                            </p>

                            {/* Company/Institution */}
                            <p className="text-gray-400 text-xs mb-2">
                                {activeMainTab === 'experience' ? item.company : item.institution}
                            </p>

                            {/* Period & Location */}
                            <div className="flex items-center justify-between text-xs">
                                <span className={selectedId === item.id ? 'text-gray-300' : 'text-gray-500'}>
                                    {item.period}
                                </span>
                                <span className="text-gray-500">
                                    {item.location}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Panel - Details (70%) - Clean solid background */}
                <div className="bg-glass-dark backdrop-blur-md p-6 lg:p-8 rounded-lg border border-glass-border">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2 whitespace-pre-line">
                            {activeMainTab === 'experience'
                                ? selectedItem.role
                                : selectedItem.degree.replace(' (', '\n(')}
                        </h3>
                        <p className="text-gray-400">
                            {activeMainTab === 'experience' ? selectedItem.company : selectedItem.institution}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className="text-gray-500">{selectedItem.period}</span>
                            <span className="text-gray-700">•</span>
                            <span className="text-gray-500">{selectedItem.location}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-gray-400 leading-relaxed">
                            {selectedItem.description}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                        <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-3">
                            Key Achievements
                        </h4>
                        <ul className="space-y-2">
                            {selectedItem.highlights.map((highlight, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                                    <span className="text-gray-600 mt-0.5">→</span>
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h4 className="text-xs text-gray-600 uppercase tracking-wider mb-3">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedItem.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 text-xs bg-white/5 text-gray-400 border border-gray-700 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;

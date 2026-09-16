import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  adminPasscode: 'workshop2026',
  profile: {
    name: 'IZAZ AHAMAD',
    title: 'AI/ML Engineer & Full-Stack Systems Craftsman',
    shortIntro: 'Architecting intelligent algorithms and high-performance interactive software with mechanical precision.',
    tagline: 'Ideas are machines. Skills are tools. Projects are what we build.',
    bio: 'I am a passionate software engineer specializing in Artificial Intelligence, Machine Learning, and cutting-edge 3D web engineering. Like a master mechanic who understands every piston, valve, and electrical wire inside an engine, I build software from fundamental algorithmic principles up to fluid, responsive user experiences. Whether optimizing model inference latencies or engineering zero-lag visual systems, I work hard and work smarter.',
    location: 'Bengaluru, India',
    phone: '+91 98765 43210',
    email: 'izazahamad68@gmail.com',
    linkedIn: 'https://linkedin.com/in/izazahamad',
    github: 'https://github.com/izazahamad',
    portfolioUrl: 'https://izazahamad.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    yearsExperience: '3+ Years Dedicated Engineering',
    projectsCompleted: '24+ Production Builds',
    codeEfficiency: '99.4% Latency Optimized',
  },
  about: {
    philosophy: 'Ideas are machines. Skills are tools. Projects are what we build.',
    shortBio: 'Engineering with a mechanic\'s dedication to perfection and an architect\'s ambition for scale.',
    background: 'With a rigorous background in Computer Science and Machine Learning, I have spent years honing the craft of high-throughput distributed systems, deep learning pipelines, and spatial 3D interfaces. I believe software craftsmanship is about relentless curiosity, measured discipline, and building tools that make human capabilities exponential.',
    interests: [
      'Deep Learning & Neural Architectures',
      'Computer Vision & Object Detection',
      'Real-time Three.js & WebGL Shaders',
      'Autonomous Systems & Edge AI',
      'High-Concurrency Distributed Microservices',
      'Automotive Engineering & Performance Dynamics'
    ],
    certifications: [
      {
        name: 'Deep Learning Specialization (DeepLearning.AI)',
        issuer: 'Andrew Ng / Coursera',
        date: '2025',
      },
      {
        name: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: '2025',
      },
      {
        name: 'Professional Cloud Architect & Edge AI',
        issuer: 'Google Cloud Certified',
        date: '2024',
      },
      {
        name: 'Three.js Journey & WebGL Shaders',
        issuer: 'Bruno Simon Technical Lab',
        date: '2025',
      }
    ],
    coreValues: [
      {
        title: 'Work Harder, Build Smarter',
        desc: 'Relentless persistence combined with architectural leverage to eliminate bottlenecks before they occur.'
      },
      {
        title: 'Zero Tolerance for Fluff',
        desc: 'Measurable performance, strict typing, and clean maintainable code over cosmetic gimmicks.'
      },
      {
        title: 'Full-Stack Autonomy',
        desc: 'From training custom PyTorch models to deploying production GPU servers and 60fps frontends.'
      }
    ]
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      institution: 'APJ Abdul Kalam Technological University',
      years: '2021 - 2025',
      specialization: 'Artificial Intelligence & Data Systems',
      grade: 'First Class with Distinction (8.8/10 CGPA)',
      achievements: [
        'President of the AI & Robotics Innovation Club',
        'Published conference paper on real-time edge computer vision',
        'Led university team to 1st place in National Smart Tech Hackathon'
      ]
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary School Certification (Science & Mathematics)',
      institution: 'St. Joseph Higher Secondary Academy',
      years: '2019 - 2021',
      specialization: 'Physics, Chemistry, Mathematics & Computer Science',
      grade: '95.2% Academic Merit',
      achievements: [
        'School topper in Computer Science & Mathematics Olympiad',
        'Built automated library inventory prototype'
      ]
    }
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Python',
      category: 'Core Engineering',
      proficiency: 96,
      iconName: 'Code2',
      toolType: 'wrench',
      description: 'Primary weapon for systems programming, data pipelines, and high-performance AI algorithms.',
      experienceYears: '4+ Yrs',
      highlight: true
    },
    {
      id: 'skill-2',
      name: 'PyTorch & Deep Learning',
      category: 'AI/ML',
      proficiency: 92,
      iconName: 'Cpu',
      toolType: 'gear',
      description: 'Designing custom neural architectures, convolutional backbones, and transfer learning pipelines.',
      experienceYears: '3 Yrs',
      highlight: true
    },
    {
      id: 'skill-3',
      name: 'TensorFlow / Keras',
      category: 'AI/ML',
      proficiency: 88,
      iconName: 'Boxes',
      toolType: 'chip',
      description: 'Production model deployment, quantization, TFLite edge deployment, and model pruning.',
      experienceYears: '3 Yrs'
    },
    {
      id: 'skill-4',
      name: 'OpenCV & Computer Vision',
      category: 'AI/ML',
      proficiency: 90,
      iconName: 'ScanEye',
      toolType: 'meter',
      description: 'Real-time video stream feature extraction, contour analysis, pose estimation, and optical flow.',
      experienceYears: '3 Yrs',
      highlight: true
    },
    {
      id: 'skill-5',
      name: 'Scikit-Learn & Analytics',
      category: 'AI/ML',
      proficiency: 94,
      iconName: 'BarChart3',
      toolType: 'meter',
      description: 'Supervised/unsupervised statistical modeling, hyperparameter search, and feature engineering.',
      experienceYears: '3.5 Yrs'
    },
    {
      id: 'skill-6',
      name: 'Three.js & WebGL',
      category: 'Frameworks',
      proficiency: 89,
      iconName: 'Box',
      toolType: 'wrench',
      description: 'Procedural geometry generation, custom GLSL shaders, camera physics, and spatial lighting.',
      experienceYears: '2.5 Yrs',
      highlight: true
    },
    {
      id: 'skill-7',
      name: 'React 19 & TypeScript',
      category: 'Frameworks',
      proficiency: 95,
      iconName: 'Terminal',
      toolType: 'screwdriver',
      description: 'Strictly typed, reactive frontends with high-fidelity animations and modular state stores.',
      experienceYears: '4 Yrs',
      highlight: true
    },
    {
      id: 'skill-8',
      name: 'Node.js & Express',
      category: 'Frameworks',
      proficiency: 88,
      iconName: 'Server',
      toolType: 'screwdriver',
      description: 'High-throughput async APIs, WebSocket gateways, and microservice orchestration.',
      experienceYears: '3 Yrs'
    },
    {
      id: 'skill-9',
      name: 'PostgreSQL & SQL Systems',
      category: 'Core Engineering',
      proficiency: 87,
      iconName: 'Database',
      toolType: 'hammer',
      description: 'Relational schema indexing, ACID transactions, complex CTE queries, and connection pooling.',
      experienceYears: '3 Yrs'
    },
    {
      id: 'skill-10',
      name: 'Linux & Bash Tooling',
      category: 'Tools & Cloud',
      proficiency: 93,
      iconName: 'TerminalSquare',
      toolType: 'wrench',
      description: 'Server administration, systemd daemons, SSH tunneling, memory profiling, and automated scripting.',
      experienceYears: '4 Yrs'
    },
    {
      id: 'skill-11',
      name: 'Docker & Microservices',
      category: 'Tools & Cloud',
      proficiency: 86,
      iconName: 'Layers',
      toolType: 'gear',
      description: 'Multi-stage container builds, docker-compose staging, and cloud cluster deployment.',
      experienceYears: '2.5 Yrs'
    },
    {
      id: 'skill-12',
      name: 'Git & CI/CD Pipelines',
      category: 'Tools & Cloud',
      proficiency: 94,
      iconName: 'GitBranch',
      toolType: 'wrench',
      description: 'Git flow, trunk-based releases, GitHub Actions automation, and automated test runners.',
      experienceYears: '4 Yrs'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Glass Shatter Game & Physics Engine',
      category: 'WebGL & Graphics',
      shortDesc: 'Real-time 3D projectile fracture simulation using Voronoi dynamic mesh slicing and spatial collision audio.',
      detailedDesc: 'An interactive browser-based physics benchmark engine built with Three.js and custom Voronoi tesselation algorithms. Real-time dynamic rigid-body impulse mechanics calculate precise impact fractures on glass panes, dispersing shards with individual momentum vectors, reflection shaders, and realistic acoustic reverb.',
      tech: ['Three.js', 'WebGL', 'TypeScript', 'Web Audio API', 'Cannon.js'],
      githubUrl: 'https://github.com/izazahamad/glass-shatter-engine',
      demoUrl: 'https://glass-shatter-sim.vercel.app',
      date: '2026',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      stats: [
        { key: 'Frame Rate', value: '60 FPS locked' },
        { key: 'Shards Calc', value: '< 2.4ms per break' },
        { key: 'Physics Iterations', value: '120 Hz Substepping' }
      ]
    },
    {
      id: 'proj-2',
      title: 'Neural Vision Industrial Defect Detector',
      category: 'AI/ML',
      shortDesc: 'Edge-deployed computer vision model detecting microscopic automotive engine component anomalies in 18ms.',
      detailedDesc: 'Trained a customized lightweight Convolutional Backbone on a dataset of 45,000+ mechanical assembly scans. Integrated TensorRT for edge inference on NVIDIA Jetson modules, achieving a 99.1% F1 score in identifying micro-cracks, thread misalignments, and surface corrosion under variable factory lighting.',
      tech: ['PyTorch', 'OpenCV', 'TensorRT', 'Python', 'FastAPI', 'Docker'],
      githubUrl: 'https://github.com/izazahamad/neural-vision-inspector',
      demoUrl: 'https://vision-defect-demo.vercel.app',
      date: '2025',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      stats: [
        { key: 'Inference Time', value: '18ms latency' },
        { key: 'F1 Accuracy', value: '99.1%' },
        { key: 'Edge Model Size', value: '14.2 MB' }
      ]
    },
    {
      id: 'proj-3',
      title: 'Multi-Agent Autonomous Diagnostic Workshop',
      category: 'AI/ML',
      shortDesc: 'Generative AI collaborative agent network diagnosing mechanical & code failures with live tool routing.',
      detailedDesc: 'Architected an autonomous multi-agent orchestration service utilizing Gemini 2.5 Flash and Function Calling. Agents verify code diffs, cross-examine hardware sensor telemetry, and formulate executable repair steps with full audit trails.',
      tech: ['Gemini API', 'TypeScript', 'Express', 'Vector DB', 'TailwindCSS'],
      githubUrl: 'https://github.com/izazahamad/agentic-workshop-engine',
      demoUrl: 'https://agentic-mechanic.vercel.app',
      date: '2026',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      stats: [
        { key: 'Tool Routing', value: '< 450ms' },
        { key: 'Benchmark Accuracy', value: '94.8%' }
      ]
    },
    {
      id: 'proj-4',
      title: 'Autonomous Mobile Rover SLAM Telemetry',
      category: 'Robotics & IoT',
      shortDesc: 'Simultaneous Localization and Mapping system running on embedded Linux with real-time 3D web dashboard.',
      detailedDesc: 'Built a 2D/3D LiDAR sensor fusion pipeline paired with extended Kalman filtering (EKF) to construct real-time room occupancy grids. Telemetry is streamed over binary WebSockets to an interactive browser HUD visualizing motor RPM, battery heatmaps, and obstacle vectors.',
      tech: ['ROS 2', 'Python', 'C++', 'WebSockets', 'Three.js', 'Linux'],
      githubUrl: 'https://github.com/izazahamad/rover-slam-telemetry',
      demoUrl: 'https://rover-telemetry-demo.vercel.app',
      date: '2025',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      stats: [
        { key: 'Map Precision', value: '±1.2 cm' },
        { key: 'Telemetry Rate', value: '50 Hz' }
      ]
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Lead AI / Machine Learning Systems Engineer',
      company: 'Apex Autotech & Intelligent Systems',
      duration: '2024 - Present',
      location: 'Bengaluru, India',
      companyUrl: 'https://github.com/izazahamad/apex-autotech-systems',
      link: 'https://github.com/izazahamad/apex-autotech-systems',
      description: 'Spearheading production computer vision models, distributed inference microservices, and automated telemetry inspection pipelines.',
      responsibilities: [
        'Architected real-time visual inspection pipelines processing over 300 camera feeds concurrently',
        'Quantized PyTorch deep learning models into TensorRT formats, reducing cloud compute latency by 42%',
        'Engineered high-throughput streaming bridges using FastAPI, Redis, and WebSockets for real-time telemetry',
        'Authored robust unit and regression test suites maintaining 99.4% pipeline uptime and zero false-pass slips'
      ],
      achievements: [
        'Cut production inspection cycle time from 14s down to 2.1s per component',
        'Recognized with the Annual High-Impact Engineering Innovation Award 2025'
      ],
      technologies: ['PyTorch', 'TensorRT', 'FastAPI', 'Python 3.12', 'Docker', 'PostgreSQL', 'Three.js'],
      carMilestone: 'Production Edge Inference & 42% Latency Reduction'
    },
    {
      id: 'exp-2',
      role: 'Full-Stack Software Craftsman & Architecture Lead',
      company: 'Vanguard Digital Labs',
      duration: '2023 - 2024',
      location: 'Bengaluru, India',
      companyUrl: 'https://github.com/izazahamad/vanguard-digital-labs',
      link: 'https://github.com/izazahamad/vanguard-digital-labs',
      description: 'Engineered high-performance client applications, data streaming bridges, and complex visual analytics tools.',
      responsibilities: [
        'Developed reactive enterprise dashboards in React and TypeScript handling 50k+ real-time tick updates per minute',
        'Created custom 3D web visualizers for spatial telemetry datasets using Three.js and custom GLSL shaders',
        'Designed decoupled RESTful and GraphQL APIs with strict TypeScript contracts and automated validation',
        'Mentored 4 junior engineers on clean architecture patterns, typing disciplines, and memory profiling'
      ],
      achievements: [
        'Delivered 6 enterprise client deliverables ahead of scheduled sprint cycles',
        'Reduced frontend bundle sizes by 35% through dynamic code splitting and tree-shaking'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Three.js', 'TailwindCSS', 'Redis', 'Docker'],
      carMilestone: 'High-Concurrency Telemetry Engine & 60 FPS Acceleration'
    },
    {
      id: 'exp-3',
      role: 'Spatial 3D & Graphics Research Engineer',
      company: 'Quantum Core Innovations',
      duration: '2022 - 2023',
      location: 'Bengaluru, India',
      companyUrl: 'https://github.com/izazahamad/quantum-core-graphics',
      link: 'https://github.com/izazahamad/quantum-core-graphics',
      description: 'Pioneered browser-based WebGL simulation frameworks, procedural geometry generators, and physics-driven interaction layers.',
      responsibilities: [
        'Built real-time Voronoi fracture and mesh slicing algorithms executing in under 2.4ms per simulation step',
        'Engineered custom GLSL PBR shader pipelines for photorealistic metallic and refractive glass materials',
        'Integrated Cannon.js rigid-body physics substepping with multi-threaded Web Workers for zero-jank UI threads',
        'Authored open-source shader utility libraries adopted by over 1,200 developers across the WebGL community'
      ],
      achievements: [
        'Achieved sustained 60 FPS performance on resource-constrained mobile and tablet browser engines',
        'Selected to demonstrate interactive simulation tech at university technical symposium'
      ],
      technologies: ['WebGL', 'Three.js', 'GLSL Shaders', 'TypeScript', 'Web Audio API', 'Blender'],
      carMilestone: 'Sub-3ms Collision Physics Engine & Custom GLSL Shaders'
    }
  ],
  team: [
    {
      id: 'team-1',
      name: 'Izaz Ahamad',
      role: 'Principal Systems & AI Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Architecting end-to-end intelligent models, WebGL graphics pipelines, and resilient distributed microservices.',
      company: 'Apex Autotech / Vanguard Labs',
      email: 'izazahamad68@gmail.com',
      linkedin: 'https://linkedin.com/in/izazahamad',
      github: 'https://github.com/izazahamad',
      software: ['Python', 'PyTorch', 'TypeScript', 'React', 'Three.js', 'Docker'],
      status: 'Lead Contributor'
    },
    {
      id: 'team-2',
      name: 'Dr. Sarah Chen',
      role: 'Principal ML Research Collaborator',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Co-collaborating on edge neural network quantization, vision transformers, and automated anomaly classification models.',
      company: 'AI Research Institute',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      software: ['PyTorch', 'TensorRT', 'CUDA', 'OpenCV', 'Jupyter'],
      status: 'Research Partner'
    },
    {
      id: 'team-3',
      name: 'Marcus Vance',
      role: 'Senior Distributed Systems & Cloud Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Collaborating on high-throughput microservices, Kubernetes orchestrations, and zero-downtime CI/CD automation.',
      company: 'Cloud Scale Systems',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      software: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
      status: 'Infrastructure Partner'
    },
    {
      id: 'team-4',
      name: 'Elena Rostova',
      role: 'Lead UI/UX & Creative Technology Collaborator',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Partnering on spatial interaction design, visual ergonomics, and polished responsive web design systems.',
      company: 'Pixel Precision Studio',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      software: ['Figma', 'TypeScript', 'TailwindCSS', 'Three.js', 'Blender'],
      status: 'Design Partner'
    }
  ],
  software: [
    {
      id: 'soft-1',
      name: 'PyTorch & TorchVision',
      category: 'AI & Machine Learning',
      proficiency: 95,
      purpose: 'Deep neural network design, computer vision backbones, and custom loss formulations.',
      experienceYears: '3.5 Yrs',
      iconName: 'Cpu',
      featured: true
    },
    {
      id: 'soft-2',
      name: 'NVIDIA TensorRT & CUDA',
      category: 'AI & Machine Learning',
      proficiency: 90,
      purpose: 'High-throughput model quantization, engine serialization, and low-latency edge inference.',
      experienceYears: '2.5 Yrs',
      iconName: 'Zap',
      featured: true
    },
    {
      id: 'soft-3',
      name: 'OpenCV & Computer Vision',
      category: 'AI & Machine Learning',
      proficiency: 92,
      purpose: 'Real-time video stream feature extraction, contour detection, and optical flow estimation.',
      experienceYears: '3+ Yrs',
      iconName: 'Scan',
      featured: true
    },
    {
      id: 'soft-4',
      name: 'TypeScript & JavaScript (ESNext)',
      category: 'Languages & Full-Stack',
      proficiency: 96,
      purpose: 'Type-safe distributed client applications, strict domain schemas, and runtime validations.',
      experienceYears: '4+ Yrs',
      iconName: 'Code',
      featured: true
    },
    {
      id: 'soft-5',
      name: 'Python 3.12 & FastAPI',
      category: 'Languages & Full-Stack',
      proficiency: 95,
      purpose: 'High-concurrency async REST/WebSocket APIs, scientific computing, and background workers.',
      experienceYears: '4+ Yrs',
      iconName: 'Terminal',
      featured: true
    },
    {
      id: 'soft-6',
      name: 'React 18/19 & Next.js',
      category: 'Languages & Full-Stack',
      proficiency: 94,
      purpose: 'Modular state-driven web interfaces, SSR optimization, and reactive component systems.',
      experienceYears: '3.5 Yrs',
      iconName: 'Layout',
      featured: true
    },
    {
      id: 'soft-7',
      name: 'Three.js & WebGL 2.0',
      category: '3D & Graphics',
      proficiency: 93,
      purpose: 'Real-time 3D spatial simulation, mesh manipulation, and browser-based graphics engines.',
      experienceYears: '3 Yrs',
      iconName: 'Box',
      featured: true
    },
    {
      id: 'soft-8',
      name: 'Custom GLSL Shaders',
      category: '3D & Graphics',
      proficiency: 88,
      purpose: 'Fragment/vertex shaders, physical lighting models, and dynamic particle effects.',
      experienceYears: '2.5 Yrs',
      iconName: 'Sparkles',
      featured: true
    },
    {
      id: 'soft-9',
      name: 'Docker & Containerization',
      category: 'Cloud, DevOps & Databases',
      proficiency: 92,
      purpose: 'Multi-stage deterministic builds, local orchestration, and isolated runtime environments.',
      experienceYears: '3 Yrs',
      iconName: 'Container',
      featured: true
    },
    {
      id: 'soft-10',
      name: 'Linux (Ubuntu/Debian) & Bash',
      category: 'Cloud, DevOps & Databases',
      proficiency: 94,
      purpose: 'Server administration, systemd service management, networking, and automated cron pipelines.',
      experienceYears: '4 Yrs',
      iconName: 'TerminalSquare',
      featured: true
    },
    {
      id: 'soft-11',
      name: 'PostgreSQL & Redis',
      category: 'Cloud, DevOps & Databases',
      proficiency: 90,
      purpose: 'Relational ACID persistence, connection pooling, and sub-millisecond in-memory caching.',
      experienceYears: '3 Yrs',
      iconName: 'Database',
      featured: true
    },
    {
      id: 'soft-12',
      name: 'Git, GitHub Actions & CI/CD',
      category: 'Cloud, DevOps & Databases',
      proficiency: 95,
      purpose: 'Trunk-based workflow, automated linting, test runners, and continuous deployment.',
      experienceYears: '4 Yrs',
      iconName: 'GitBranch',
      featured: true
    }
  ],
  events: [
    {
      id: 'event-1',
      name: 'Google Build with AI Conclave 2026',
      date: '21 June 2026',
      location: 'Bengaluru Convention Center',
      category: 'Google',
      shortDesc: 'Presented technical demonstration on building autonomous tool-using agents with Gemini 2.5.',
      fullDesc: 'Honored to be an invited participant and live speaker at Google Build with AI 2026. Demonstrated an end-to-end multi-agent orchestration architecture capable of diagnosing software faults and compiling automated test patches in seconds.',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      photos: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
      ],
      externalLink: 'https://developers.google.com/events',
      tags: ['Google AI', 'Gemini', 'Keynote', 'Agentic Workflows']
    },
    {
      id: 'event-2',
      name: 'TCS Tech Expo & National Innovation Showcase',
      date: '14 February 2026',
      location: 'TCS Siruseri Campus, Chennai',
      category: 'TCS Expo',
      shortDesc: 'Exhibited edge computer vision anomaly detection device to enterprise architects and engineering leaders.',
      fullDesc: 'Presented our hardware-accelerated computer vision defect detection rig running live on simulated factory conveyor feeds. Received accolades for architectural robustness and low power consumption at the edge.',
      coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      photos: [
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
      ],
      externalLink: 'https://tcs.com/innovation',
      tags: ['TCS Expo', 'Computer Vision', 'Edge AI', 'Industrial IoT']
    },
    {
      id: 'event-3',
      name: 'National Smart India Hackathon (Grand Finale)',
      date: '18 November 2025',
      location: 'New Delhi',
      category: 'Hackathon',
      shortDesc: 'Secured 1st Place National Trophy for developing automated disaster response route optimization system.',
      fullDesc: '36-hour non-stop hackathon sprint. Led a team of 4 engineers to develop an AI-powered offline GIS routing tool utilizing real-time drone imagery to detect flooded terrain and establish safe transit corridors.',
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      photos: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
      ],
      tags: ['National 1st Place', '36hr Hackathon', 'Autonomous Routing']
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Google Build with AI Live Prototype Stage',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      caption: 'Live demonstration of generative agent tool routing to an audience of 600+ developers.',
      date: '2026'
    },
    {
      id: 'gal-2',
      title: 'Mechanical Workshop & Embedded Testbench',
      category: 'Projects',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      caption: 'Calibrating optical sensors and high-speed strobe cameras for edge defect detection.',
      date: '2026'
    },
    {
      id: 'gal-3',
      title: 'TCS Innovation Expo Presentation Booth',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
      caption: 'Demonstrating real-time edge AI inference to industry leaders.',
      date: '2026'
    },
    {
      id: 'gal-4',
      title: 'Late Night Hackathon Sprint Lab',
      category: 'Workshops',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      caption: '3am debugging session where breakthroughs happen: pure focus, caffeine, and clean algorithms.',
      date: '2025'
    },
    {
      id: 'gal-5',
      title: 'Autonomous Rover Hardware Assembly',
      category: 'Projects',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Wiring LiDAR sensors, motor controllers, and onboard compute modules.',
      date: '2025'
    },
    {
      id: 'gal-6',
      title: 'AI Lab Team & Campus Robotics Sprint',
      category: 'College',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      caption: 'Collaborative code review with the college engineering robotics team.',
      date: '2025'
    }
  ],
  resume: {
    fileName: 'IZAZ_AHAMAD_AI_SYSTEMS_ENGINEER_RESUME.pdf',
    lastUpdated: 'March 2026 (Updated by Izaz)',
    summary: 'High-caliber AI/ML and Full-Stack Systems Engineer with proven success building sub-20ms computer vision pipelines, multi-agent LLM reasoning workflows, and interactive 60 FPS WebGL engines. Recognized winner of the National Smart India Hackathon and invited speaker at Google Build with AI 2026.',
    downloadUrl: '#',
    skillsSummary: [
      'Artificial Intelligence: PyTorch, TensorFlow, OpenCV, Scikit-Learn, TensorRT, LLM Agents',
      'Web & Systems: React 19, TypeScript, Three.js, WebGL, Node.js, Express, PostgreSQL',
      'Engineering Disciplines: Linux Kernel tools, Docker, Git CI/CD, Algorithmic Optimization'
    ],
    keyHighlights: [
      'Engineered sub-20ms edge defect detector with 99.1% F1 classification rate',
      'Architected 3D WebGL physics simulations rendering with zero frame drop at 60 FPS',
      'Spearheaded multi-agent orchestrator utilizing Google Gemini API with automated tool routing',
      'First Place Champion at National Smart India Hackathon'
    ]
  },
  recentActivities: [
    {
      id: 'act-1',
      type: 'event',
      title: 'Google Build with AI 2026 Keynote Delivered',
      timestamp: '21 June 2026',
      description: 'Showcased multi-agent architecture and autonomous tool routing with Gemini 2.5 Flash.'
    },
    {
      id: 'act-2',
      type: 'project',
      title: 'Glass Shatter Game & Physics Engine Released',
      timestamp: '14 May 2026',
      description: 'Deployed Three.js Voronoi dynamic mesh fracture simulation benchmark.'
    },
    {
      id: 'act-3',
      type: 'resume',
      title: 'Updated Technical Resume & Systems Dossier',
      timestamp: 'March 2026',
      description: 'Incorporated latest TensorRT latency benchmarks and Google Build with AI credentials.'
    },
    {
      id: 'act-4',
      type: 'event',
      title: 'TCS Tech Expo Demonstration',
      timestamp: '14 February 2026',
      description: 'Exhibited edge computer vision anomaly detection device to enterprise delegates.'
    }
  ]
};

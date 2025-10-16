"use client";

import Particles from '@/components/Particles';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import TextType from '@/components/TextType';

const MEDITATION_SOUND_URL = "/audio/AXIS1195_15_The Passage_Full.mp3";
const SESSION_DURATION = 5 * 60;

const meditationSteps = [
    {
        id: 1,
        title: "Choose Your Intention",
        description: "What do you hope to achieve from today's meditation session?",
        options: ["Focus", "Calmness", "Deep Sleep", "Stress Relief"],
        nextStep: 2
    },
    {
        id: 2,
        title: "Observe Your Sitting Position",
        description: "Find a comfortable position. Straighten your back, relax your shoulders, and place your hands comfortably.",
        options: ["Already Comfortable", "Adjust Position"],
        nextStep: 3
    },
    {
        id: 3,
        title: "Session Started",
        description: "Focus on your breath. Allow thoughts to come and go without judgment.",
        isFinal: true
    },
];

export default function MeditationView() {
    const [step, setStep] = useState(0);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const currentStep = meditationSteps[step - 1];
    const [timer, setTimer] = useState(SESSION_DURATION);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        audio.loop = true;

        if (isAudioPlaying) {
            audio.play().catch(e => console.warn("Autoplay attempt failed (expected).", e));
        } else {
            audio.pause();
        }

        audio.muted = isMuted;

    }, [isAudioPlaying, isMuted]);

    useEffect(() => {
        let interval = null;

        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerActive, timer]);

    const startSession = () => {
        setStep(1);
    };

    const togglePlayPause = () => {
        if (step === 0) {
            startSession();
        } else {
            setIsAudioPlaying(prev => !prev);
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const handleOptionClick = (nextStepId) => {
        if (nextStepId) {
            if (nextStepId === 3) {
                setTimer(SESSION_DURATION);
                setTimerActive(true);
            }
            setStep(nextStepId);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const goToPreviousStep = () => {
        setStep(0);
        setIsMuted(false);
        setIsAudioPlaying(true);
    };

    const renderContent = () => {
        if (step === 0) {
            return (
                <div className="flex flex-col gap-4 items-center justify-center text-center backdrop-blur-2xl p-6 rounded-xl opacity-90">
                    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl relative z-20 font-bold tracking-tight">
                        Your Peace Center
                    </h2>
                    <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                        Silence the world, feel connected. Discover inner warmth and deep calm, designed especially for you and your little one.
                    </p>
                    <Button
                        variant="ghost"
                        onClick={togglePlayPause}
                        className="text-white bg-primary text-lg px-10 py-7 rounded-full border w-full transition-transform transform hover:scale-105"
                    >
                        Start Meditation
                    </Button>
                </div>
            );
        }

        return (
            <div className="w-full max-w-3xl h-auto mx-auto backdrop-blur-2xl p-6 opacity-90 rounded-2xl text-center">
                <div className="p-0 space-y-6 relative">
                    {currentStep.isFinal ? (
                        <div className="max-w-md mx-auto text-center">
                            <TextType
                                text={["Text typing effect", "for your websites", "Happy coding!"]}
                                typingSpeed={75}
                                pauseDuration={1000}
                                showCursor={false}
                                cursorCharacter="|"
                                loop={true}
                                className="text-3xl md:text-2xl text-white/90 leading-relaxed font-semibold"
                            />
                        </div>
                    ) : (
                        <>
                            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl relative z-20 font-bold tracking-tight">
                                {currentStep.title}
                            </h2>
                            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                                {currentStep.description}
                            </p>
                        </>
                    )}

                    <div className="flex flex-col gap-3 pt-4">
                        {currentStep.isFinal ? (
                            <div className="space-y-6">
                                <p className="text-6xl font-extrabold text-[#E78E8D]">
                                    {formatTime(timer)}
                                </p>
                                {timer < 0 ? (
                                    <>
                                        <span className='bg-green-100 opacity-80 text-green-500 p-2 rounded-full'>Session Finished</span>
                                        <Button
                                            onClick={goToPreviousStep}
                                            variant="ghost"
                                            className="text-white bg-primary text-lg px-10 py-7 rounded-full border w-full transition-transform transform hover:scale-105 opacity-80"
                                        >
                                            Back
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={goToPreviousStep}
                                            variant="ghost"
                                            className="text-white bg-primary text-lg mt-5 px-10 py-7 rounded-full border w-full transition-transform transform hover:scale-105 opacity-80"
                                        >
                                            Back
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <React.Fragment>
                                {currentStep.options?.map((option, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleOptionClick(currentStep.nextStep)}
                                        variant="ghost"
                                        className="text-white bg-primary text-lg px-10 py-7 rounded-full border w-full transition-transform transform hover:scale-105 opacity-80"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className="relative overflow-hidden w-auto h-screen bg-gradient-to-b from-[#FDE8E7] to-[#fea8a5] flex items-center justify-center"
        >
            <audio ref={audioRef} src={MEDITATION_SOUND_URL} loop muted={isMuted} preload="auto"></audio>

            <div className="absolute inset-0">
                <Particles
                    particleColors={['#E78E8D', '#E78E8D', '#E78E8D']}
                    particleCount={1000}
                    particleSpread={10}
                    speed={0.4}
                    particleBaseSize={200}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={true}
                    cameraDistance={20}
                />
            </div>

            <div className="relative z-10 w-full h-auto flex flex-col gap-3 items-center justify-center">
                {isMuted && (
                    <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 flex items-center justify-center">
                        <VolumeX className="w-4 h-4 mr-2" /> Press the volume icon in the top right corner to turn on the sound.
                    </div>
                )}
                {renderContent()}
            </div>

            <div className="absolute top-4 left-8 z-20 space-x-2">
                <Button
                    onClick={toggleMute}
                    variant="secondary"
                    size="icon"
                    className="bg-white/90 hover:bg-white text-[#E78E8D] shadow-md"
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                {step > 0 && (
                    <Button
                        onClick={() => setIsAudioPlaying(prev => !prev)}
                        className="bg-[#E78E8D] hover:bg-[#D57B7C] text-white shadow-md"
                    >
                        {isAudioPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                )}
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useTheme } from 'next-themes';

interface ProductTourProps {
  runTour: boolean;
  onComplete: () => void;
}

export function ProductTour({ runTour, onComplete }: ProductTourProps) {
  const { theme } = useTheme();
  const { completeTour } = useOnboarding();

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-xl font-bold mb-2">Welcome to 3BI.AI! 🚀</h2>
          <p>Let's take a quick tour to show you the powerful AI features available.</p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.sidebar-trigger',
      content: (
        <div>
          <h3 className="font-bold mb-2">Navigation Sidebar</h3>
          <p>Access all AI tools from the sidebar. Click this button to toggle it.</p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-feature="grok-chat"]',
      content: (
        <div>
          <h3 className="font-bold mb-2">Grok AI Chat</h3>
          <p>Chat with Grok, X's advanced AI with real-time knowledge and witty responses.</p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-feature="claude-chat"]',
      content: (
        <div>
          <h3 className="font-bold mb-2">Claude 4</h3>
          <p>Access Anthropic's most capable reasoning model for complex analysis.</p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: '[data-feature="multi-modal-memory"]',
      content: (
        <div>
          <h3 className="font-bold mb-2">Multi-Modal Memory</h3>
          <p>Store and search conversations across all AI interactions with semantic search.</p>
        </div>
      ),
      placement: 'right',
    },
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-xl font-bold mb-2">You're All Set! 🎉</h2>
          <p>Explore the dashboard and start creating with AI. Press K for keyboard shortcuts.</p>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      completeTour();
      onComplete();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          textColor: theme === 'dark' ? '#f3f4f6' : '#111827',
          arrowColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 8,
        },
        buttonNext: {
          backgroundColor: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
          borderRadius: 6,
        },
        buttonBack: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      }}
    />
  );
}

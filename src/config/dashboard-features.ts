export const CATEGORY_LABELS = {
  enterprise: 'Enterprise Features',
  'advanced-ai': 'Advanced AI',
  'ai-tools': 'AI Tools',
  utilities: 'Utilities',
} as const;

export const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABELS> = [
  'enterprise',
  'advanced-ai',
  'ai-tools',
  'utilities'
];

export const CATEGORY_ICONS = {
  enterprise: '🏢',
  'advanced-ai': '🧠',
  'ai-tools': '🤖',
  utilities: '🛠️',
};

export const EMPTY_STATES = {
  search: {
    title: "No features found",
    description: "Try a different search",
  },
  recent: {
    title: "No recent features",
    description: "Features you use will appear here",
  },
  favorites: {
    title: "No favorites yet",
    description: "Tap the star icon to save features",
  },
};

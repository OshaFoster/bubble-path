export const games = [
  {
    id: 'pink-to-red',
    name: 'Pink to Red',
    background: {
      type: 'gradient',
      colors: ['#0D1321', '#1D2951', '#3E1065']
    },
    hintColor: '#00F5FF', // Dreamy cyan for hints
    bubbles: [
      { content: '●', color: '#FFB3E6', size: 75, sequence: 0 }, // Light Pink
      { content: '●', color: '#FF80CC', size: 75, sequence: 1 }, // Medium Pink  
      { content: '●', color: '#FF4DB3', size: 75, sequence: 2 }, // Hot Pink
      { content: '●', color: '#FF1A99', size: 75, sequence: 3 }, // Deep Pink
      { content: '●', color: '#E6007A', size: 75, sequence: 4 }, // Pink-Red
      { content: '●', color: '#CC0066', size: 75, sequence: 5 }, // Red-Pink
      { content: '●', color: '#990033', size: 75, sequence: 6 }, // Dark Red
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'prime-numbers',
    name: 'Prime Numbers', 
    background: {
      type: 'gradient',
      colors: ['#0F0F23', '#16213E', '#1E3A8A']
    },
    hintColor: '#7C3AED', // Dreamy purple for hints
    bubbles: [
      { content: '7', color: '#60A5FA', size: 75, sequence: 3 }, // Sky Blue
      { content: '3', color: '#60A5FA', size: 75, sequence: 1 }, // Sky Blue  
      { content: '13', color: '#60A5FA', size: 75, sequence: 5 }, // Sky Blue
      { content: '2', color: '#60A5FA', size: 75, sequence: 0 }, // Sky Blue
      { content: '11', color: '#60A5FA', size: 75, sequence: 4 }, // Sky Blue
      { content: '5', color: '#60A5FA', size: 75, sequence: 2 }, // Sky Blue
      { content: '17', color: '#60A5FA', size: 75, sequence: 6 }, // Sky Blue
    ],
    hint: { bubbleIndex: 3, text: 'start' } // The bubble containing "2"
  },
  {
    id: 'rainbow-order',
    name: 'Rainbow Order',
    background: {
      type: 'gradient',
      colors: ['#1A1A2E', '#16213E', '#0F172A']
    },
    hintColor: '#F59E0B', // Golden hint
    bubbles: [
      { content: '●', color: '#FF0080', size: 75, sequence: 0 }, // Neon Red
      { content: '●', color: '#FF6B35', size: 75, sequence: 1 }, // Electric Orange  
      { content: '●', color: '#FFD700', size: 75, sequence: 2 }, // Golden Yellow
      { content: '●', color: '#00FF9F', size: 75, sequence: 3 }, // Neon Green
      { content: '●', color: '#0080FF', size: 75, sequence: 4 }, // Electric Blue
      { content: '●', color: '#8000FF', size: 75, sequence: 5 }, // Neon Purple
      { content: '●', color: '#FF00FF', size: 75, sequence: 6 }, // Magenta
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'growing-dots',
    name: 'Growing Dots',
    background: {
      type: 'gradient',
      colors: ['#0C4A6E', '#075985', '#0369A1']
    },
    hintColor: '#06B6D4', // Cyan hint
    bubbles: [
      { content: '●', color: '#14B8A6', innerDot: { size: 8, color: '#F0FDFA' }, size: 75, sequence: 0 }, // Teal with mint dot
      { content: '●', color: '#14B8A6', innerDot: { size: 14, color: '#F0FDFA' }, size: 75, sequence: 1 }, // Teal with mint dot  
      { content: '●', color: '#14B8A6', innerDot: { size: 20, color: '#F0FDFA' }, size: 75, sequence: 2 }, // Teal with mint dot
      { content: '●', color: '#14B8A6', innerDot: { size: 26, color: '#F0FDFA' }, size: 75, sequence: 3 }, // Teal with mint dot
      { content: '●', color: '#14B8A6', innerDot: { size: 32, color: '#F0FDFA' }, size: 75, sequence: 4 }, // Teal with mint dot
      { content: '●', color: '#14B8A6', innerDot: { size: 38, color: '#F0FDFA' }, size: 75, sequence: 5 }, // Teal with mint dot
      { content: '●', color: '#14B8A6', innerDot: { size: 44, color: '#F0FDFA' }, size: 75, sequence: 6 }, // Teal with mint dot
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'divisible-by-3',
    name: 'Divisible by 3',
    background: {
      type: 'gradient',
      colors: ['#4C1D95', '#5B21B6', '#6D28D9']
    },
    hintColor: '#F472B6', // Pink hint
    bubbles: [
      { content: '12', color: '#A855F7', size: 75, sequence: 3 }, // Purple
      { content: '6', color: '#A855F7', size: 75, sequence: 1 }, // Purple  
      { content: '18', color: '#A855F7', size: 75, sequence: 5 }, // Purple
      { content: '3', color: '#A855F7', size: 75, sequence: 0 }, // Purple
      { content: '15', color: '#A855F7', size: 75, sequence: 4 }, // Purple
      { content: '9', color: '#A855F7', size: 75, sequence: 2 }, // Purple
      { content: '21', color: '#A855F7', size: 75, sequence: 6 }, // Purple
    ],
    hint: { bubbleIndex: 3, text: 'start' } // The bubble containing "3"
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    background: {
      type: 'gradient',
      colors: ['#1A1A2E', '#2D1B69', '#422006']
    },
    hintColor: '#F59E0B', // Golden hint
    bubbles: [
      { content: '●', color: '#FB7BA2', size: 75, sequence: 0 }, // Start Pink
      { content: '●', color: '#FC8A8B', size: 75, sequence: 1 }, // Pink-Coral
      { content: '●', color: '#FC9974', size: 75, sequence: 2 }, // Coral
      { content: '●', color: '#FCA85D', size: 75, sequence: 3 }, // Orange-Coral
      { content: '●', color: '#FCB746', size: 75, sequence: 4 }, // Orange
      { content: '●', color: '#FCC62F', size: 75, sequence: 5 }, // Orange-Yellow
      { content: '●', color: '#FCE043', size: 75, sequence: 6 }, // End Yellow
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'ocean-gradient-bubbles',
    name: 'Ocean Dreams',
    background: {
      type: 'gradient',
      colors: ['#0F172A', '#1E293B', '#334155']
    },
    hintColor: '#38BDF8', // Sky blue hint
    bubbles: [
      { content: '●', gradient: { colors: ['#1E40AF', '#1E40AF'] }, size: 75, sequence: 0 }, // Pure deep blue
      { content: '●', gradient: { colors: ['#1E40AF', '#3B82F6'] }, size: 75, sequence: 1 }, // Mostly deep blue
      { content: '●', gradient: { colors: ['#1E40AF', '#60A5FA'] }, size: 75, sequence: 2 }, // Blue to light blue
      { content: '●', gradient: { colors: ['#3B82F6', '#7DD3FC'] }, size: 75, sequence: 3 }, // Blue to sky
      { content: '●', gradient: { colors: ['#60A5FA', '#BAE6FD'] }, size: 75, sequence: 4 }, // Light blue to pale
      { content: '●', gradient: { colors: ['#7DD3FC', '#E0F2FE'] }, size: 75, sequence: 5 }, // Sky to very pale
      { content: '●', gradient: { colors: ['#E0F2FE', '#E0F2FE'] }, size: 75, sequence: 6 }, // Pure pale blue
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'cyan-purple-dreams',
    name: 'Mystic Flow',
    background: {
      type: 'gradient',
      colors: ['#0F0F0F', '#1A1A1A', '#2D2D2D']
    },
    hintColor: '#A855F7', // Purple hint
    bubbles: [
      { content: '●', gradient: { colors: ['#B58ECC', '#B58ECC'] }, size: 75, sequence: 0 }, // Pure purple
      { content: '●', gradient: { colors: ['#B58ECC', '#A89CCE'] }, size: 75, sequence: 1 }, // Mostly purple
      { content: '●', gradient: { colors: ['#B58ECC', '#9BAAD0'] }, size: 75, sequence: 2 }, // Purple to lavender
      { content: '●', gradient: { colors: ['#A89CCE', '#8EB8D2'] }, size: 75, sequence: 3 }, // Lavender to blue-gray
      { content: '●', gradient: { colors: ['#9BAAD0', '#81C6D4'] }, size: 75, sequence: 4 }, // Blue-gray to aqua
      { content: '●', gradient: { colors: ['#8EB8D2', '#74D4D6'] }, size: 75, sequence: 5 }, // Aqua to cyan
      { content: '●', gradient: { colors: ['#5DE6DE', '#5DE6DE'] }, size: 75, sequence: 6 }, // Pure cyan
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  },
  {
    id: 'counting-dots',
    name: 'Counting Dots',
    background: {
      type: 'gradient',
      colors: ['#2D1B69', '#1A1A2E', '#0F0F23']
    },
    hintColor: '#34D399', // Green hint
    bubbles: [
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 33.5, y: 33.5 }], size: 75, sequence: 0 }, // 1 dot (centered)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 26, y: 33.5 }, { size: 8, color: '#F1F5F9', x: 41, y: 33.5 }], size: 75, sequence: 1 }, // 2 dots (horizontal)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 33.5, y: 26 }, { size: 8, color: '#F1F5F9', x: 26, y: 41 }, { size: 8, color: '#F1F5F9', x: 41, y: 41 }], size: 75, sequence: 2 }, // 3 dots (triangle)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 26, y: 26 }, { size: 8, color: '#F1F5F9', x: 41, y: 26 }, { size: 8, color: '#F1F5F9', x: 26, y: 41 }, { size: 8, color: '#F1F5F9', x: 41, y: 41 }], size: 75, sequence: 3 }, // 4 dots (square)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 26, y: 24 }, { size: 8, color: '#F1F5F9', x: 41, y: 24 }, { size: 8, color: '#F1F5F9', x: 33.5, y: 33.5 }, { size: 8, color: '#F1F5F9', x: 26, y: 43 }, { size: 8, color: '#F1F5F9', x: 41, y: 43 }], size: 75, sequence: 4 }, // 5 dots (X pattern)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 22, y: 26 }, { size: 8, color: '#F1F5F9', x: 33.5, y: 26 }, { size: 8, color: '#F1F5F9', x: 45, y: 26 }, { size: 8, color: '#F1F5F9', x: 22, y: 41 }, { size: 8, color: '#F1F5F9', x: 33.5, y: 41 }, { size: 8, color: '#F1F5F9', x: 45, y: 41 }], size: 75, sequence: 5 }, // 6 dots (rectangle)
      { content: '●', color: '#6366F1', innerDots: [{ size: 8, color: '#F1F5F9', x: 20, y: 22 }, { size: 8, color: '#F1F5F9', x: 33.5, y: 22 }, { size: 8, color: '#F1F5F9', x: 47, y: 22 }, { size: 8, color: '#F1F5F9', x: 26.5, y: 33.5 }, { size: 8, color: '#F1F5F9', x: 40.5, y: 33.5 }, { size: 8, color: '#F1F5F9', x: 20, y: 45 }, { size: 8, color: '#F1F5F9', x: 47, y: 45 }], size: 75, sequence: 6 }, // 7 dots
    ],
    hint: { bubbleIndex: 0, text: 'start' }
  }
];
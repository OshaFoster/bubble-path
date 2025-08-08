import { StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const rainbowColors = [
  '#dc3a3a', // Deep Red
  '#F28C38', // Rich Orange
  '#F2D14B', // Warm Yellow
  '#4FB06D', // Vibrant Green
  '#3F82C4', // Strong Blue
  '#6A4FAF', // Deep Indigo
  '#A44CC6', // Bright Violet
];


// Calculate responsive sizing for bottom row
const bottomMargin = 10; // Margin from screen edges
const availableBottomWidth = width - bottomMargin * 2;
const bottomBubbleSize = Math.floor(
  availableBottomWidth / (rainbowColors.length + 0.5)
); // +1 for extra spacing
const bottomSpacing = availableBottomWidth / rainbowColors.length;

let cornerCounter = 0;
let nextExpectedColorIndex = 0;

const DriftingBubble = ({ index, colorIndex }) => {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const [init, setInit] = useState(null);
  const [color] = useState(rainbowColors[colorIndex]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isMovingToCorner, setIsMovingToCorner] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);
  const velocity = useRef({ x: 0, y: 0 });
  const animationRef = useRef();
  const cornerIndex = useRef(null);

  useEffect(() => {
    const size = 75;
    const safeWidth = width - insets.left - insets.right;
    const safeHeight = height - insets.top - insets.bottom;
    const posX = insets.left + Math.random() * (safeWidth - size);
    const posY = insets.top + Math.random() * (safeHeight - size);
    const velX = (Math.random() - 0.5) * 1.2;
    const velY = (Math.random() - 0.5) * 1.2;

    setInit({ size, posX, posY });
    velocity.current = { x: velX, y: velY };
    setPosition({ x: posX, y: posY });
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!init || !mounted || isMovingToCorner || isJiggling) return;

    const animate = () => {
      const minX = insets.left;
      const maxX = width - insets.right - init.size;
      const minY = insets.top;
      const maxY = height - insets.bottom - init.size;

      setPosition((prev) => {
        let newX = prev.x + velocity.current.x;
        let newY = prev.y + velocity.current.y;

        if (newX <= minX || newX >= maxX) {
          velocity.current.x *= -1;
          newX = Math.max(minX, Math.min(maxX, newX));
        }

        if (newY <= minY || newY >= maxY) {
          velocity.current.y *= -1;
          newY = Math.max(minY, Math.min(maxY, newY));
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [init, mounted, isMovingToCorner, isJiggling]);

  const handlePress = () => {
    if (isMovingToCorner) return;

    if (colorIndex === nextExpectedColorIndex) {
      // Correct order
      setIsPressed(true);
      setIsMovingToCorner(true);
      cornerIndex.current = cornerCounter;
      cornerCounter++;
      nextExpectedColorIndex++;
      setTimeout(() => setIsPressed(false), 300);
    } else {
      // Wrong order - jiggle
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 800);
    }
  };

  if (!mounted || !init) return null;

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <MotiView
        animate={{
          scale: isJiggling
            ? [1, 1.02, 0.98, 1.02, 0.98, 1]
            : isPressed
            ? 1.3
            : 1,
          translateX: isJiggling
            ? [
                position.x,
                position.x - 5,
                position.x + 5,
                position.x - 5,
                position.x + 5,
                position.x,
              ]
            : isMovingToCorner
            ? bottomMargin +
              cornerIndex.current * bottomSpacing +
              (bottomSpacing - bottomBubbleSize) / 2
            : position.x,
          translateY: isJiggling
            ? position.y
            : isMovingToCorner
            ? height - bottomBubbleSize - insets.bottom - 80
            : position.y,
        }}
        transition={{
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
          translateX: {
            type: 'spring',
            damping: 30,
            stiffness: 40,
            duration: 3500,
          },
          translateY: {
            type: 'spring',
            damping: 30,
            stiffness: 40,
            duration: 3500,
          },
        }}
        style={[
          styles.bubble,
          {
            width: isMovingToCorner ? bottomBubbleSize : init.size,
            height: isMovingToCorner ? bottomBubbleSize : init.size,
            borderRadius: isMovingToCorner
              ? bottomBubbleSize / 2
              : init.size / 2,
            backgroundColor: color,
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {colorIndex === 0 && !isMovingToCorner && (
          <Text style={styles.startText}>start</Text>
        )}
      </MotiView>
    </Pressable>
  );
};

export default function HomeScreen() {
  const bubbleCount = rainbowColors.length;

  return (
    <LinearGradient
      colors={['#1B102C', '#3C245B', '#6D55A1', '#f19a21']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.container}
    >
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <DriftingBubble key={i} index={i} colorIndex={i} />
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    position: 'absolute',
  },
  bubble: {
    position: 'relative',
  },
  startText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },
});

import { StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { games } from '../../data/gameConfigs';

const { width, height } = Dimensions.get('window');

// Calculate responsive sizing for bottom row - will be dynamic per game
const bottomMargin = 10; // Margin from screen edges
const getBottomConfig = (bubbleCount) => {
  const availableBottomWidth = width - bottomMargin * 2;
  const bottomBubbleSize = Math.floor(availableBottomWidth / (bubbleCount + 0.5));
  const bottomSpacing = availableBottomWidth / bubbleCount;
  return { bottomBubbleSize, bottomSpacing };
};

// Game state will be managed by React state

const DriftingBubble = ({ index, colorIndex, gameConfig, isTransitioning, onGameComplete, victoryWave, victoryDelay, onActivity, shouldAutoComplete, cornerCounter, nextExpectedColorIndex, onBubbleComplete }) => {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const [init, setInit] = useState(null);
  const bubble = gameConfig.bubbles[colorIndex];
  const [color] = useState(bubble.color);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [isMovingToCorner, setIsMovingToCorner] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [isAutoCompleting, setIsAutoCompleting] = useState(false);
  const velocity = useRef({ x: 0, y: 0 });
  const animationRef = useRef();
  const cornerIndex = useRef(null);
  
  // Get dynamic sizing for current game
  const { bottomBubbleSize, bottomSpacing } = getBottomConfig(gameConfig.bubbles.length);

  useEffect(() => {
    const size = bubble.size;
    const safeWidth = width - insets.left - insets.right;
    const safeHeight = height - insets.top - insets.bottom;
    const posX = insets.left + Math.random() * (safeWidth - size);
    const posY = insets.top + Math.random() * (safeHeight - size);
    const startY = posY - 50; // Start slightly above final position
    const velX = (Math.random() - 0.5) * 1.2;
    const velY = (Math.random() - 0.5) * 1.2;

    setInit({ size, posX, posY });
    velocity.current = { x: velX, y: velY };
    setPosition({ x: posX, y: startY }); // Start from above
    
    // Gently settle to final position
    setTimeout(() => {
      setPosition({ x: posX, y: posY });
    }, index * 100 + 300);
    setMounted(true);
    
    // Gentle fade in for new game
    setTimeout(() => {
      setFadeIn(true);
    }, index * 100 + 200); // Staggered gentle appearance
  }, [gameConfig.id]); // Reset when game changes

  // Gentle completion effect
  useEffect(() => {
    if (victoryWave && !shouldExit) {
      setTimeout(() => {
        setShouldExit(true);
      }, victoryDelay * 300); // Slow, gentle wave
    }
  }, [victoryWave, victoryDelay]);

  // Auto-complete effect from hint
  useEffect(() => {
    if (shouldAutoComplete && bubble.sequence === nextExpectedColorIndex && !isMovingToCorner && !isAutoCompleting) {
      setTimeout(() => {
        setIsAutoCompleting(true);
        // Gentle highlight first
        setTimeout(() => {
          // Then auto-move to corner
          setIsAutoCompleting(false);
          setIsMovingToCorner(true);
          cornerIndex.current = cornerCounter;
          onBubbleComplete();
        }, 1000); // 1 second gentle highlight
      }, 200); // Brief delay after hint bubble fades
    }
  }, [shouldAutoComplete, bubble.sequence, nextExpectedColorIndex, isMovingToCorner, isAutoCompleting]);

  useEffect(() => {
    if (!init || !mounted || isMovingToCorner || isJiggling || shouldExit) return;

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
  }, [init, mounted, isMovingToCorner, isJiggling, shouldExit]);

  const handlePress = () => {
    if (isMovingToCorner || isAutoCompleting) return; // Prevent manual press during auto-complete
    
    onActivity(); // Reset hint timer on any bubble press

    if (bubble.sequence === nextExpectedColorIndex) {
      // Correct order
      setIsPressed(true);
      setIsMovingToCorner(true);
      cornerIndex.current = cornerCounter;
      setTimeout(() => setIsPressed(false), 300);
      onBubbleComplete();
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
            : isAutoCompleting
            ? [1, 1.1, 1.05, 1.1, 1.05, 1] // Gentle pulsing highlight
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
            : shouldExit
            ? position.x + (Math.random() - 0.5) * 50 // Very subtle drift
            : isMovingToCorner
            ? bottomMargin +
              cornerIndex.current * bottomSpacing +
              (bottomSpacing - bottomBubbleSize) / 2
            : position.x,
          translateY: isJiggling
            ? position.y
            : shouldExit
            ? height + 100 // Gentle fade down
            : isMovingToCorner
            ? (isTransitioning ? height + 100 : height - bottomBubbleSize - insets.bottom - 80)
            : position.y,
          opacity: shouldExit ? 0 : fadeIn ? 1 : 0, // Fade in/out smoothly
        }}
        transition={{
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
          translateX: shouldExit ? {
            type: 'timing',
            duration: 3000, // Very slow drift
          } : {
            type: 'spring',
            damping: 30,
            stiffness: 40,
            duration: 3500,
          },
          translateY: shouldExit ? {
            type: 'timing',
            duration: 4000, // Very slow descent
          } : {
            type: 'spring',
            damping: 30,
            stiffness: 40,
            duration: 3500,
          },
          opacity: shouldExit ? {
            type: 'timing',
            duration: 4000, // Very slow fade out
          } : {
            type: 'timing',
            duration: 2000, // Gentle fade in
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
            backgroundColor: bubble.gradient ? 'transparent' : color,
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
        ]}
      >
        {/* Gradient background if present */}
        {bubble.gradient && (
          <LinearGradient
            colors={bubble.gradient.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: isMovingToCorner
                ? bottomBubbleSize / 2
                : init.size / 2,
            }}
          />
        )}
        
        {/* Inner dot(s) if present */}
        {bubble.innerDot && !bubble.innerDots && (
          <MotiView
            style={{
              width: bubble.innerDot.size,
              height: bubble.innerDot.size,
              borderRadius: bubble.innerDot.size / 2,
              backgroundColor: bubble.innerDot.color,
              position: 'absolute',
            }}
          />
        )}
        
        {/* Multiple inner dots if present */}
        {bubble.innerDots && bubble.innerDots.map((dot, index) => {
          const currentSize = isMovingToCorner ? bottomBubbleSize : init.size;
          const scale = currentSize / 75; // Scale factor from original 75px size
          const scaledX = dot.x * scale;
          const scaledY = dot.y * scale;
          const scaledDotSize = dot.size * scale;
          
          return (
            <MotiView
              key={index}
              style={{
                width: scaledDotSize,
                height: scaledDotSize,
                borderRadius: scaledDotSize / 2,
                backgroundColor: dot.color,
                position: 'absolute',
                left: scaledX,
                top: scaledY,
              }}
            />
          );
        })}
        
        {bubble.content !== '●' && (
          <Text style={styles.startText}>
            {bubble.content}
          </Text>
        )}
      </MotiView>
    </Pressable>
  );
};

const HintBubble = ({ gameConfig, onHintAction }) => {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const velocity = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const size = 75; // Same size as other bubbles
    const safeWidth = width - insets.left - insets.right;
    const safeHeight = height - insets.top - insets.bottom;
    const posX = insets.left + Math.random() * (safeWidth - size);
    const posY = insets.top + Math.random() * (safeHeight - size);
    const startY = posY - 50; // Start slightly above
    const velX = (Math.random() - 0.5) * 1.2;
    const velY = (Math.random() - 0.5) * 1.2;

    velocity.current = { x: velX, y: velY };
    setPosition({ x: posX, y: startY });
    setMounted(true);
    
    // Gentle fade in
    setTimeout(() => {
      setFadeIn(true);
      setPosition({ x: posX, y: posY });
    }, 300);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animate = () => {
      const minX = insets.left;
      const maxX = width - insets.right - 75;
      const minY = insets.top;
      const maxY = height - insets.bottom - 75;

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
  }, [mounted]);

  if (!mounted) return null;

  const handlePress = () => {
    setFadeOut(true);
    setTimeout(() => {
      onHintAction();
    }, 500); // Fade out for 500ms then trigger action
  };

  return (
    <Pressable onPress={handlePress} style={styles.pressable}>
      <MotiView
        animate={{
          translateX: position.x,
          translateY: position.y,
          opacity: fadeOut ? 0 : fadeIn ? 1 : 0,
        }}
        transition={{
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
          opacity: {
            type: 'timing',
            duration: fadeOut ? 500 : 2000,
          },
        }}
        style={[
          styles.bubble,
          {
            width: 75,
            height: 75,
            borderRadius: 37.5,
            backgroundColor: gameConfig.hintColor,
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.startText}>hint</Text>
      </MotiView>
    </Pressable>
  );
};

export default function HomeScreen() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [victoryWave, setVictoryWave] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [autoCompleteNext, setAutoCompleteNext] = useState(false);
  const [isProcessingHint, setIsProcessingHint] = useState(false);
  const [cornerCounter, setCornerCounter] = useState(0);
  const [nextExpectedColorIndex, setNextExpectedColorIndex] = useState(0);
  const hintTimerRef = useRef();
  const lastActivityRef = useRef(Date.now());
  const currentGame = games[currentGameIndex];
  const nextGame = games[(currentGameIndex + 1) % games.length];
  
  const bubbleCount = currentGame.bubbles.length;

  // Hint timer logic
  const resetHintTimer = () => {
    lastActivityRef.current = Date.now();
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
    }
    setShowHint(false);
    
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
    }, 30000); // 30 seconds
  };

  const handleHintAction = () => {
    if (isProcessingHint) return; // Prevent multiple hints
    
    setShowHint(false);
    setIsProcessingHint(true);
    setAutoCompleteNext(true);
    resetHintTimer();
    
    // Reset auto-complete flag immediately after one bubble processes it
    // (the bubble will call this when it starts auto-completing)
  };

  const handleBubbleComplete = () => {
    setCornerCounter(prev => prev + 1);
    setNextExpectedColorIndex(prev => prev + 1);
    
    // Reset hint flags when any bubble completes
    setAutoCompleteNext(false);
    setIsProcessingHint(false);
    
    // Check if game is complete
    if (nextExpectedColorIndex + 1 >= currentGame.bubbles.length) {
      setTimeout(() => {
        // Reset game state and complete
        setCornerCounter(0);
        setNextExpectedColorIndex(0);
        handleGameComplete();
      }, 1000); // Delay to let final bubble settle
    }
  };

  // Reset timer and game state when game changes
  useEffect(() => {
    setIsProcessingHint(false);
    setCornerCounter(0);
    setNextExpectedColorIndex(0);
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
      }
    };
  }, [currentGameIndex]);

  const handleGameComplete = () => {
    setVictoryWave(true); // Start gentle completion
    
    // Start background crossfade midway through bubble exit
    setTimeout(() => {
      setBackgroundOpacity(0);
    }, 3000); // Halfway through the 6-second transition
    
    // Switch games after slow, peaceful exit
    setTimeout(() => {
      const nextIndex = (currentGameIndex + 1) % games.length;
      setCurrentGameIndex(nextIndex);
      setVictoryWave(false);
      setBackgroundOpacity(1);
      setIsTransitioning(false);
    }, 6000); // Allow time for slow, zen-like transition
  };

  const skipGame = () => {
    const nextIndex = (currentGameIndex + 1) % games.length;
    setCurrentGameIndex(nextIndex);
    setCornerCounter(0);
    setNextExpectedColorIndex(0);
    setVictoryWave(false);
    setIsTransitioning(false);
    resetHintTimer();
  };

  const renderBackground = () => {
    if (currentGame.background.type === 'gradient') {
      return (
        <LinearGradient
          colors={currentGame.background.colors}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      );
    }
    return null;
  };

  return (
    <MotiView style={[styles.container, { backgroundColor: currentGame.background.color || '#000000' }]}>
      {renderBackground()}
      
      {/* Testing skip button - remove later */}
      <Pressable 
        onPress={skipGame}
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          zIndex: 1000,
          width: 40,
          height: 40,
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>→</Text>
      </Pressable>
      
      {/* Bubbles on top */}
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <DriftingBubble 
          key={`${currentGame.id}-${i}`} 
          index={i} 
          colorIndex={i} 
          gameConfig={currentGame}
          isTransitioning={isTransitioning}
          onGameComplete={handleGameComplete}
          victoryWave={victoryWave}
          victoryDelay={i} // Stagger the wave across bubbles
          onActivity={resetHintTimer}
          shouldAutoComplete={autoCompleteNext}
          cornerCounter={cornerCounter}
          nextExpectedColorIndex={nextExpectedColorIndex}
          onBubbleComplete={handleBubbleComplete}
        />
      ))}
      
      {/* Hint bubble */}
      {showHint && (
        <HintBubble 
          gameConfig={currentGame}
          onHintAction={handleHintAction}
        />
      )}
    </MotiView>
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

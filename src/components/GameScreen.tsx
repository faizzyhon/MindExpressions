import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Timer, Award } from "lucide-react";

interface GameScreenProps {
  gameMode?: "classic" | "emoji" | "mirror";
  onGameOver?: (score: number) => void;
  onBackToMenu?: () => void;
}

interface Emotion {
  label: string;
  emoji?: string;
}

const emotions: Emotion[] = [
  { label: "Happy", emoji: "😀" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😠" },
  { label: "Surprised", emoji: "😮" },
  { label: "Fearful", emoji: "😨" },
  { label: "Disgusted", emoji: "🤢" },
  { label: "Neutral", emoji: "😐" },
  { label: "Contempt", emoji: "😒" },
];

const GameScreen: React.FC<GameScreenProps> = ({
  gameMode = "classic",
  onGameOver = () => {},
  onBackToMenu = () => {},
}) => {
  const [currentFace, setCurrentFace] = useState<string>("");
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(emotions[0]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(100);
  const [options, setOptions] = useState<Emotion[]>([]);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);

  // Generate a new face and set up options
  const generateNewRound = () => {
    // In a real implementation, this would call an API to get a generated face
    // For now, we'll use a placeholder image
    const randomIndex = Math.floor(Math.random() * emotions.length);
    const correctEmotion = emotions[randomIndex];
    setCurrentEmotion(correctEmotion);

    // Generate a random seed for the avatar
    const seed = Math.floor(Math.random() * 1000);
    setCurrentFace(
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&mouth=${getRandomMouthType(correctEmotion.label)}`,
    );

    // Create options including the correct one
    const shuffledEmotions = [...emotions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    if (!shuffledEmotions.includes(correctEmotion)) {
      shuffledEmotions.pop();
      shuffledEmotions.push(correctEmotion);
    }

    setOptions(shuffledEmotions.sort(() => 0.5 - Math.random()));
    setTimeLeft(100);
  };

  // Helper function to map emotion to mouth type for the avatar API
  const getRandomMouthType = (emotion: string): string => {
    const mouthTypes: Record<string, string[]> = {
      Happy: ["smile", "twinkle"],
      Sad: ["sad", "concerned"],
      Angry: ["screamOpen", "serious"],
      Surprised: ["open", "disbelief"],
      Fearful: ["concerned", "screamOpen"],
      Disgusted: ["disbelief", "vomit"],
      Neutral: ["serious", "default"],
      Contempt: ["grimace", "serious"],
    };

    const options = mouthTypes[emotion] || ["default"];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Handle user selection
  const handleSelection = (selectedEmotion: Emotion) => {
    if (selectedEmotion.label === currentEmotion.label) {
      // Correct match
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Apply streak multiplier
      const multiplier = Math.floor(newStreak / 3) + 1;
      const pointsEarned = 10 * multiplier;

      setScore(score + pointsEarned);
      generateNewRound();
    } else {
      // Incorrect match
      setStreak(0);
      setLives(lives - 1);

      if (lives <= 1) {
        // Game over
        setIsGameActive(false);
        onGameOver(score);
      } else {
        generateNewRound();
      }
    }
  };

  // Timer effect
  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setLives(lives - 1);

          if (lives <= 1) {
            setIsGameActive(false);
            onGameOver(score);
            return 0;
          } else {
            generateNewRound();
            return 100;
          }
        }
        return prev - 2; // Decrease by 2% each tick for a 3-second timer (50 ticks)
      });
    }, 60); // 60ms * 50 ticks = ~3 seconds

    return () => clearInterval(timer);
  }, [isGameActive, lives, score, onGameOver]);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, [gameMode]);

  return (
    <div className="bg-background w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Game header with score, lives, and timer */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-3 py-1">
              <Award className="mr-1 h-4 w-4" />
              {score}
            </Badge>
            {streak > 0 && (
              <Badge variant="secondary" className="text-sm">
                {streak}x Streak
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart key={i} className="h-5 w-5 text-red-500 fill-red-500" />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Timer className="h-4 w-4" />
            <span className="text-sm">Time remaining</span>
          </div>
          <Progress value={timeLeft} className="h-2" />
        </div>

        {/* Face display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square w-full max-h-[300px] flex items-center justify-center bg-muted">
                {gameMode === "mirror" ? (
                  <div className="text-center p-4">
                    <div className="bg-black/10 rounded-lg p-8 mb-4">
                      <p className="text-lg font-medium">
                        Webcam feed would appear here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try to match the expression: {currentEmotion.label}
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentFace}
                    alt="AI generated face"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emotion options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {options.map((emotion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Button
                variant="outline"
                className="w-full h-16 text-lg flex flex-col items-center justify-center"
                onClick={() => handleSelection(emotion)}
              >
                {gameMode === "emoji" ? (
                  <span className="text-2xl">{emotion.emoji}</span>
                ) : (
                  <span>{emotion.label}</span>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={onBackToMenu}>
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import GameScreen from "./GameScreen";
import GameOver from "./GameOver";
import { Heart, Trophy, Gamepad2 } from "lucide-react";

// Game states
enum GameState {
  MENU = "menu",
  PLAYING = "playing",
  GAME_OVER = "game_over",
}

// Game modes
enum GameMode {
  CLASSIC = "classic",
  EMOJI = "emoji",
  MIRROR = "mirror",
}

interface GameContainerProps {
  gameMode?: "classic" | "emoji" | "mirror";
  onGameOver?: (score: number) => void;
  onReturnToMenu?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  gameMode: initialGameMode = GameMode.CLASSIC,
  onGameOver = () => {},
  onReturnToMenu = () => {},
}) => {
  // Game state management
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [gameMode, setGameMode] = useState<GameMode>(
    initialGameMode as GameMode,
  );
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(100);
  const [highScore, setHighScore] = useState<number>(0);

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("mindmorph_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Start a new game
  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState(GameState.PLAYING);
    setScore(0);
    setLives(3);
    setStreak(0);
    setTimeRemaining(100);
  };

  // Handle correct answer
  const handleCorrectAnswer = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);

    // Calculate score with streak multiplier
    const multiplier = Math.min(3, 1 + newStreak / 10);
    const pointsEarned = Math.round(10 * multiplier);

    setScore((prevScore) => prevScore + pointsEarned);
    setTimeRemaining(100); // Reset timer for next round
  };

  // Handle incorrect answer
  const handleIncorrectAnswer = () => {
    setStreak(0);
    setLives((prevLives) => prevLives - 1);
    setTimeRemaining(100); // Reset timer for next round

    // Check if game over
    if (lives <= 1) {
      endGame();
    }
  };

  // Handle time expired
  const handleTimeExpired = () => {
    setStreak(0);
    setLives((prevLives) => prevLives - 1);

    // Check if game over
    if (lives <= 1) {
      endGame();
    } else {
      setTimeRemaining(100); // Reset timer for next round
    }
  };

  // End the game
  const endGame = () => {
    setGameState(GameState.GAME_OVER);

    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("mindmorph_highscore", score.toString());
    }

    onGameOver(score);
  };

  // Return to main menu
  const returnToMenu = () => {
    setGameState(GameState.MENU);
    onReturnToMenu();
  };

  // Update timer
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 30); // Update every 30ms for smooth progress bar

    return () => clearInterval(timer);
  }, [gameState, lives]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <AnimatePresence mode="wait">
        {gameState === GameState.MENU && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">MindMorph</h1>
              <p className="text-muted-foreground">
                Match emotions before time runs out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Classic Mode</h2>
                  <p className="text-sm text-center text-muted-foreground">
                    Match faces to emotion labels
                  </p>
                  <Button
                    className="w-full mt-2"
                    onClick={() => startGame(GameMode.CLASSIC)}
                  >
                    Play
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">😀</span>
                  </div>
                  <h2 className="text-xl font-semibold">Emoji Mode</h2>
                  <p className="text-sm text-center text-muted-foreground">
                    Match faces to emojis
                  </p>
                  <Button
                    className="w-full mt-2"
                    onClick={() => startGame(GameMode.EMOJI)}
                  >
                    Play
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">🪞</span>
                  </div>
                  <h2 className="text-xl font-semibold">Mirror Mode</h2>
                  <p className="text-sm text-center text-muted-foreground">
                    Use webcam to match expressions
                  </p>
                  <Button
                    className="w-full mt-2"
                    variant="outline"
                    onClick={() => startGame(GameMode.MIRROR)}
                    disabled
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">High Score: {highScore}</span>
            </div>
          </motion.div>
        )}

        {gameState === GameState.PLAYING && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1">
                {[...Array(lives)].map((_, i) => (
                  <Heart
                    key={i}
                    className="h-5 w-5 text-red-500 fill-red-500"
                  />
                ))}
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold">{score}</h2>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Streak: {streak}</span>
                {streak >= 5 && <span className="text-lg">🔥</span>}
              </div>
            </div>

            <Progress value={timeRemaining} className="h-2 mb-6" />

            <GameScreen
              gameMode={gameMode}
              onGameOver={handleTimeExpired}
              onBackToMenu={returnToMenu}
            />

            <div className="text-center mt-4">
              <Button variant="ghost" onClick={returnToMenu}>
                Quit Game
              </Button>
            </div>
          </motion.div>
        )}

        {gameState === GameState.GAME_OVER && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameOver
              score={score}
              highScore={highScore}
              onPlayAgain={() => startGame(gameMode)}
              onMainMenu={returnToMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developer info */}
      <div className="text-center text-xs text-muted-foreground mt-8">
        Developed by <strong>FaizzyHon</strong> 💻{" "}
        <a
          href="https://github.com/faizzyhon"
          className="underline hover:text-primary"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://linkedin.com/in/mfaizanai"
          className="underline hover:text-primary"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://calendly.com/faizzyhon"
          className="underline hover:text-primary"
        >
          Book a Call
        </a>
      </div>
    </div>
  );
};

export default GameContainer;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Smile, Brain, Camera, Trophy, Info, Heart } from "lucide-react";
import GameContainer from "./GameContainer";

const Home = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameOver">(
    "menu",
  );
  const [gameMode, setGameMode] = useState<"classic" | "emoji" | "mirror">(
    "classic",
  );
  const [score, setScore] = useState(0);

  const handleStartGame = (mode: "classic" | "emoji" | "mirror") => {
    setGameMode(mode);
    setGameState("playing");
    setScore(0);
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameState("gameOver");
  };

  const handleReturnToMenu = () => {
    setGameState("menu");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <header className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            MindMorph
          </motion.h1>
          <motion.p
            className="text-xl text-slate-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Emotion Matcher Game
          </motion.p>
        </header>

        {gameState === "menu" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Select Game Mode
              </CardTitle>
              <CardDescription className="text-center text-slate-400">
                Match emotions quickly to earn points and beat your high score!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="classic" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="emoji">Emoji</TabsTrigger>
                  <TabsTrigger value="mirror">Mirror</TabsTrigger>
                </TabsList>
                <TabsContent value="classic" className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2">Classic Mode</h3>
                    <p className="text-slate-300 mb-4">
                      Match AI-generated facial expressions to the correct
                      emotion label.
                    </p>
                    <Button
                      onClick={() => handleStartGame("classic")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      size="lg"
                    >
                      Start Classic Mode
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="emoji" className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <Smile className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-xl font-semibold mb-2">Emoji Mode</h3>
                    <p className="text-slate-300 mb-4">
                      Match AI-generated facial expressions to the correct
                      emoji.
                    </p>
                    <Button
                      onClick={() => handleStartGame("emoji")}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      size="lg"
                    >
                      Start Emoji Mode
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="mirror" className="space-y-4">
                  <div className="bg-slate-700 rounded-lg p-6 text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2">Mirror Mode</h3>
                    <p className="text-slate-300 mb-4">
                      Use your webcam to mirror the facial expressions shown on
                      screen.
                    </p>
                    <Button
                      onClick={() => handleStartGame("mirror")}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      size="lg"
                    >
                      Start Mirror Mode
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-4 w-full">
                <Button variant="outline" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  How to Play
                </Button>
              </div>
              <div className="text-center text-xs text-slate-400 mt-4">
                Developed by <strong>FaizzyHon</strong> 💻{" "}
                <a
                  href="https://github.com/faizzyhon"
                  className="underline hover:text-white"
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a
                  href="https://linkedin.com/in/mfaizanai"
                  className="underline hover:text-white"
                >
                  LinkedIn
                </a>{" "}
                |{" "}
                <a
                  href="https://calendly.com/faizzyhon"
                  className="underline hover:text-white"
                >
                  Book a Call
                </a>
              </div>
            </CardFooter>
          </Card>
        )}

        {gameState === "playing" && (
          <GameContainer
            gameMode={gameMode}
            onGameOver={handleGameOver}
            onReturnToMenu={handleReturnToMenu}
          />
        )}

        {gameState === "gameOver" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Game Over!</CardTitle>
              <CardDescription className="text-center text-slate-400">
                You scored {score} points in {gameMode} mode.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <motion.div
                className="text-6xl font-bold text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {score}
              </motion.div>

              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                <Button
                  onClick={() => handleStartGame(gameMode)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  size="lg"
                >
                  Play Again
                </Button>
                <Button
                  onClick={handleReturnToMenu}
                  variant="outline"
                  size="lg"
                >
                  Return to Menu
                </Button>
              </div>

              <div className="w-full max-w-md bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Leaderboard
                </h3>
                <div className="space-y-2">
                  {/* Placeholder leaderboard entries */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2 bg-slate-800 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{i + 1}.</span>
                        <span>Player{i + 1}</span>
                      </div>
                      <span className="font-semibold">{1000 - i * 150}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="flex items-center gap-1 text-pink-400">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-sm">Thanks for playing!</span>
              </div>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Home;

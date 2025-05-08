import React from "react";
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
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trophy, Medal, Star, ArrowRight, RotateCcw } from "lucide-react";

interface GameOverProps {
  score: number;
  highScore: number;
  achievements?: Achievement[];
  leaderboard?: LeaderboardEntry[];
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isNew?: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

const GameOver = ({
  score = 0,
  highScore = 0,
  achievements = [],
  leaderboard = [
    { rank: 1, name: "EmotionMaster", score: 1250 },
    { rank: 2, name: "FacialGenius", score: 1100 },
    { rank: 3, name: "MoodReader", score: 950 },
    { rank: 4, name: "ExpressionPro", score: 800 },
    { rank: 5, name: "You", score: 750, isCurrentUser: true },
  ],
  onPlayAgain = () => {},
  onMainMenu = () => {},
}: GameOverProps) => {
  const isNewHighScore = score > highScore;

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto p-6 bg-background rounded-xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isNewHighScore ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 2 }}
                className="text-primary"
              >
                New High Score!
              </motion.div>
            ) : (
              "Game Over"
            )}
          </CardTitle>
          <CardDescription className="text-xl mt-2">
            Your Score: <span className="font-bold text-2xl">{score}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Achievements Section */}
          {achievements.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Medal className="h-5 w-5 text-yellow-500" />
                Achievements Unlocked
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                    initial={
                      achievement.isNew ? { opacity: 0, y: 20 } : { opacity: 1 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {achievement.icon === "trophy" ? (
                        <Trophy className="h-5 w-5 text-primary" />
                      ) : (
                        <Star className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {achievement.title}
                        {achievement.isNew && (
                          <Badge variant="secondary" className="text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboard
            </h3>
            <div className="overflow-hidden rounded-lg border">
              <div className="bg-muted/50 p-3 grid grid-cols-12 font-medium text-sm">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-6">Player</div>
                <div className="col-span-4 text-right">Score</div>
              </div>
              <div className="divide-y">
                {leaderboard.map((entry) => (
                  <motion.div
                    key={entry.rank}
                    className={`p-3 grid grid-cols-12 text-sm ${entry.isCurrentUser ? "bg-primary/10" : ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: entry.rank * 0.1 }}
                  >
                    <div className="col-span-2 text-center font-medium">
                      {entry.rank <= 3 ? (
                        <span
                          className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                            entry.rank === 1
                              ? "bg-yellow-500"
                              : entry.rank === 2
                                ? "bg-gray-300"
                                : "bg-amber-700"
                          } text-white font-bold`}
                        >
                          {entry.rank}
                        </span>
                      ) : (
                        entry.rank
                      )}
                    </div>
                    <div className="col-span-6 font-medium flex items-center">
                      {entry.name}
                      {entry.isCurrentUser && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="col-span-4 text-right">{entry.score}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={onPlayAgain}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </Button>
          <Button
            onClick={onMainMenu}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
          >
            Main Menu
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Developer Info */}
      <div className="text-center text-xs text-muted-foreground mt-4">
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
    </motion.div>
  );
};

export default GameOver;

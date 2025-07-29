import { Card, CardContent } from "@/components/ui/card";
import { Clock, Zap } from "lucide-react";

interface Workout {
  id: number;
  title: string;
  duration: string;
  difficulty: string;
  image: string;
  category: string;
}

interface WorkoutCardProps {
  workout?: Workout;
}

const WorkoutCard = ({
  workout = {
    id: 1,
    title: "Sample Workout",
    duration: "30 min",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    category: "Fitness",
  },
}: WorkoutCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card className="min-w-[280px] bg-white border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}
          >
            {workout.difficulty}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{workout.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>{workout.category}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;

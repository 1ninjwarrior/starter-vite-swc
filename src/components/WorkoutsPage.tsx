import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BottomNavigation from "./BottomNavigation";
import { Calendar, Clock, Zap, CheckCircle2 } from "lucide-react";

interface WorkoutSession {
  id: number;
  name: string;
  duration: string;
  exercises: number;
  difficulty: string;
  completed: boolean;
  image: string;
}

interface DayWorkout {
  day: string;
  date: string;
  workouts: WorkoutSession[];
  restDay?: boolean;
}

const WorkoutsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState("strength-builder");

  const programs = [
    { value: "strength-builder", label: "Strength Builder (8 weeks)" },
    { value: "cardio-blast", label: "Cardio Blast (6 weeks)" },
    { value: "full-body", label: "Full Body Transformation (12 weeks)" },
    { value: "beginner-friendly", label: "Beginner Friendly (4 weeks)" },
  ];

  const weeklyWorkouts: DayWorkout[] = [
    {
      day: "Monday",
      date: "Dec 16",
      workouts: [
        {
          id: 1,
          name: "Upper Body Power",
          duration: "45 min",
          exercises: 8,
          difficulty: "Intermediate",
          completed: true,
          image:
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
        },
      ],
    },
    {
      day: "Tuesday",
      date: "Dec 17",
      workouts: [
        {
          id: 2,
          name: "HIIT Cardio Blast",
          duration: "30 min",
          exercises: 6,
          difficulty: "Advanced",
          completed: true,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        },
      ],
    },
    {
      day: "Wednesday",
      date: "Dec 18",
      workouts: [
        {
          id: 3,
          name: "Lower Body Strength",
          duration: "50 min",
          exercises: 10,
          difficulty: "Intermediate",
          completed: false,
          image:
            "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
        },
      ],
    },
    {
      day: "Thursday",
      date: "Dec 19",
      restDay: true,
      workouts: [],
    },
    {
      day: "Friday",
      date: "Dec 20",
      workouts: [
        {
          id: 4,
          name: "Core & Flexibility",
          duration: "35 min",
          exercises: 7,
          difficulty: "Beginner",
          completed: false,
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
        },
      ],
    },
    {
      day: "Saturday",
      date: "Dec 21",
      workouts: [
        {
          id: 5,
          name: "Full Body Circuit",
          duration: "40 min",
          exercises: 9,
          difficulty: "Advanced",
          completed: false,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        },
      ],
    },
    {
      day: "Sunday",
      date: "Dec 22",
      restDay: true,
      workouts: [],
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header Section */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Workouts</h1>

        {/* Program Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Program
          </label>
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl shadow-sm">
              <SelectValue placeholder="Choose a workout program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program.value} value={program.value}>
                  {program.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="px-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">This Week</h2>

        {weeklyWorkouts.map((dayWorkout, index) => (
          <Card
            key={index}
            className="bg-white border-0 shadow-md rounded-2xl overflow-hidden"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg text-gray-800">
                      {dayWorkout.day}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{dayWorkout.date}</p>
                  </div>
                </div>
                {dayWorkout.restDay && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    Rest Day
                  </span>
                )}
              </div>
            </CardHeader>

            {!dayWorkout.restDay && (
              <CardContent className="pt-0">
                {dayWorkout.workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                          {workout.name}
                        </h3>
                        {workout.completed && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>{workout.exercises}</span>
                        </div>
                      </div>

                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}
                      >
                        {workout.difficulty}
                      </span>
                    </div>

                    <div className="flex-shrink-0">
                      {workout.completed ? (
                        <span className="text-green-600 font-medium text-xs">
                          Done
                        </span>
                      ) : (
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}

            {dayWorkout.restDay && (
              <CardContent className="pt-0">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">
                    Take a well-deserved rest!
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Recovery is just as important as training
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="Workouts" />
    </div>
  );
};

export default WorkoutsPage;

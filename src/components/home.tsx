import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardMetrics from "./DashboardMetrics";
import WorkoutCardList from "./WorkoutCardList";
import BottomNavigation from "./BottomNavigation";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";

function Home() {
  const motivationalQuotes = [
    "Your only limit is your mind!",
    "Push yourself because no one else will!",
    "Great things never come from comfort zones!",
    "Don't stop when you're tired, stop when you're done!",
  ];

  const todayQuote =
    motivationalQuotes[new Date().getDay() % motivationalQuotes.length];
  const userName = "Alex"; // This would come from user data

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header Section */}
      <div className="px-6 pt-12 pb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Good morning, {userName}! 👋
          </h1>
          <p className="text-purple-600 font-medium italic">"{todayQuote}"</p>
        </div>

        {/* Ask AI Button */}
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg mb-6"
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Ask AI for Workout Ideas
        </Button>
      </div>

      {/* Dashboard Metrics */}
      <div className="px-6 mb-6">
        <DashboardMetrics />
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Today's Plan</p>
              <p className="text-xs text-blue-600">Upper Body</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">This Week</p>
              <p className="text-xs text-green-600">4/5 workouts</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Workout Recommendations */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recommended for You
        </h2>
        <WorkoutCardList />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

export default Home;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Target, Trophy } from "lucide-react";

const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-0 shadow-md">
        <CardContent className="p-4 text-center">
          <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-700">7</p>
          <p className="text-xs text-orange-600 font-medium">Day Streak</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-100 to-indigo-100 border-0 shadow-md">
        <CardContent className="p-4 text-center">
          <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-700">12</p>
          <p className="text-xs text-purple-600 font-medium">This Week</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-0 shadow-md">
        <CardContent className="p-4 text-center">
          <Trophy className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-700">45</p>
          <p className="text-xs text-yellow-600 font-medium">Total Hours</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;

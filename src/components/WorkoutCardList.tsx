import WorkoutCard from "./WorkoutCard";

const WorkoutCardList = () => {
  const workouts = [
    {
      id: 1,
      title: "Morning HIIT",
      duration: "20 min",
      difficulty: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      category: "Cardio",
    },
    {
      id: 2,
      title: "Upper Body Blast",
      duration: "35 min",
      difficulty: "Advanced",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80",
      category: "Strength",
    },
    {
      id: 3,
      title: "Yoga Flow",
      duration: "45 min",
      difficulty: "Beginner",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      category: "Flexibility",
    },
    {
      id: 4,
      title: "Core Crusher",
      duration: "15 min",
      difficulty: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      category: "Core",
    },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutCardList;

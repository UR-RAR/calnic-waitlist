export interface WorkoutCard {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  level: string;
  color: string; // Tailwind hex or rgb prefix
  glowColor: string; // e.g., 'shadow-red-500/20'
  accentClass: string; // e.g., 'text-red-500'
  borderClass: string; // e.g., 'border-red-500/30'
  bgGlowClass: string; // e.g., 'bg-red-500'
  steps: {
    id: string;
    text: string;
  }[];
  muscles: string[];
  reps: string;
  sets: string;
  rest: string;
  imageAlt: string;
  illustrationType: 'pushup' | 'decline' | 'archer';
  imageUrl: string;
}

export const WORKOUTS: WorkoutCard[] = [
  {
    id: "pushup",
    number: "01",
    name: "PUSH UP",
    subtitle: "PUSHUP",
    level: "BEGINNER",
    color: "#ff3333",
    glowColor: "rgba(255, 51, 51, 0.4)",
    accentClass: "text-red-500",
    borderClass: "border-red-500/30",
    bgGlowClass: "bg-red-500",
    steps: [
      { id: "01", text: "Place your hands slightly wider than shoulder width apart." },
      { id: "02", text: "Lower your body until your chest nearly touches the ground." },
      { id: "03", text: "Push back up and repeat." }
    ],
    muscles: ["Chest", "Triceps", "Shoulders", "Core"],
    reps: "8 - 15",
    sets: "3 - 4",
    rest: "45 - 60 SEC",
    imageAlt: "Calisthenics warrior performing a flawless classic push up",
    illustrationType: "pushup",
    imageUrl: "/2.png"
  },
  {
    id: "decline",
    number: "21",
    name: "DECLINE PUSH UP",
    subtitle: "DECLINE PUSH UP",
    level: "ATHLETIC CONTROL",
    color: "#3388ff",
    glowColor: "rgba(51, 136, 255, 0.4)",
    accentClass: "text-blue-500",
    borderClass: "border-blue-500/30",
    bgGlowClass: "bg-blue-500",
    steps: [
      { id: "01", text: "Place your feet on an elevated surface and hands slightly wider than shoulder-width apart on the floor." },
      { id: "02", text: "Lower your body until your chest nearly touches the ground." },
      { id: "03", text: "Push through your hands to return to the starting position." }
    ],
    muscles: ["Chest (Lower)", "Triceps", "Shoulders (Front)", "Core"],
    reps: "6 - 12",
    sets: "3 - 5",
    rest: "60 - 90 SEC",
    imageAlt: "Calisthenics warrior performing a decline push up on an athletic bench",
    illustrationType: "decline",
    imageUrl: "/21.png"
  },
  {
    id: "archer",
    number: "22",
    name: "ARCHER PUSH UP",
    subtitle: "ARCHER PUSH UP",
    level: "ATHLETIC CONTROL",
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    accentClass: "text-emerald-500",
    borderClass: "border-emerald-500/30",
    bgGlowClass: "bg-emerald-500",
    steps: [
      { id: "01", text: "Start in a push up position with your hands wider than shoulder-width apart." },
      { id: "02", text: "Shift your weight to one side, bending that arm while keeping the other arm straight." },
      { id: "03", text: "Lower your chest toward the bent arm, then push back up to the starting position. Alternate sides." }
    ],
    muscles: ["Chest (Inner)", "Shoulders", "Triceps", "Core"],
    reps: "6 - 12",
    sets: "3 - 5",
    rest: "60 - 90 SEC",
    imageAlt: "Calisthenics warrior performing an archer push up shifting bodyweight horizontally",
    illustrationType: "archer",
    imageUrl: "/22.png"
  }
];

export interface WeeklyActivity {
  id: string;
  title: string;
  duration: string;
  calories: number;
  imageFallbackType: 'hiit' | 'push' | 'mobility';
}

export const ACTIVITIES: WeeklyActivity[] = [
  {
    id: "act-1",
    title: "7 Min. HIIT Workout",
    duration: "7 minutes",
    calories: 105,
    imageFallbackType: "hiit"
  },
  {
    id: "act-2",
    title: "Push Day Routine",
    duration: "30 minutes",
    calories: 320,
    imageFallbackType: "push"
  },
  {
    id: "act-3",
    title: "Mobility & Stretching",
    duration: "15 minutes",
    calories: 120,
    imageFallbackType: "mobility"
  }
];

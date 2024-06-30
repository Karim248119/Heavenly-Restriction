export async function fetchDiets() {
  try {
    const response = await fetch("https://hr-crud-1.onrender.com/api/diets");
    const data = await response.json();
    return data.data.Diets;
  } catch (error) {
    console.error("Error fetching diets:", error);
    return null;
  }
}

export async function fetchTraining() {
  try {
    const response = await fetch(
      "https://hr-crud-1.onrender.com/api/trainings"
    );
    const data = await response.json();
    return data.data.trainings;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return null;
  }
}

export async function fetchWorkouts() {
  try {
    const response = await fetch("https://hr-crud-1.onrender.com/api/workouts");
    const data = await response.json();
    return data.data.workouts;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return null;
  }
}

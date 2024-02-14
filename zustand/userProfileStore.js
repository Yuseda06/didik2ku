import { create } from "zustand";

// Create a store with Zustand for user profile
const useProfileStore = create((set) => ({
  userProfile: {
    // Your initial user state
    profileUrl: "", // Add other profile properties as needed
    username: "", // Add other profile properties as needed
    staffId: "",
  },
  updateProfile: (newUserData) =>
    set((state) => ({ userProfile: { ...state.userProfile, ...newUserData } })),
}));

const usePictureStore = create((set) => ({
  isPictureTaken: false,
  takePicture: () => set({ isPictureTaken: true }),
  resetPicture: () => set({ isPictureTaken: false }),
}));

const useUsernameStore = create((set) => ({
  isUsernameUpdated: false,
  updateUsername: () => set({ isUsernameUpdated: true }),
  resetUpdatedUsername: () => set({ isUsernameUpdated: false }),
}));

export { useProfileStore, usePictureStore, useUsernameStore }; // Export the stores for other components

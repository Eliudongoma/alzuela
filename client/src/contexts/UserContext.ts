import { createContext } from "react";
import User from "../components/interfaces/UserLogin";

interface CurrentUser {
  currentUser: User | null;
  setCurrentUser: (currentUser: User) => void;
}

export const CurrentUserContext = createContext<CurrentUser>({
  currentUser: null,
  setCurrentUser: () => {},
});

CurrentUserContext.displayName = "Users Context";

export default CurrentUserContext;

import { createContext } from 'react';
import UserLogin from '../components/interfaces/UserLogin'

interface CurrentUser {
  currentUser: UserLogin | null;
  setCurrentUser: (currentUser: UserLogin) => void;
}

export const CurrentUserContext = createContext<CurrentUser>({
  currentUser: null,
  setCurrentUser: () => {},
})

CurrentUserContext.displayName = "Users Context";

export default CurrentUserContext;

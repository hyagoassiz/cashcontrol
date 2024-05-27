import { ReactNode, createContext, useEffect, useState } from "react";

interface IUserContextProps {
  children: ReactNode;
}

interface IUserContexttData {
  userName: string;
  userSurname: string
  userEmail: string;
  userId: string;
  logged: boolean
}

export const UserContext = createContext({} as IUserContexttData);

export function UserContextProvider({
  children,
}: IUserContextProps): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [userSurname, setUserSurname] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);

  const handleUser = () => {
    setUserName("Hyago");
    setUserSurname("Assiz")
    setUserEmail("hyagosouza@hotmail.com");
    setUserId("DxARypJQGMZeb1fMT4ft4BI4S2D2");
    setLogged(true)
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userName,
        userSurname,
        userEmail,
        userId,
        logged
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

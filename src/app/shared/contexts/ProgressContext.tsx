import { ReactNode, createContext, useState } from "react";

interface IProgressContextProps {
  children: ReactNode;
}

interface IProgressContextData {
  loading: boolean;
  setLoading: (setLoading: boolean) => void;
}

export const ProgressContext = createContext({} as IProgressContextData);

export function ProgressProvider({
  children,
}: IProgressContextProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ProgressContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

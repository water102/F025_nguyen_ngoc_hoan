import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Token } from "./helpers";

export interface IAppContext {
  isLoading: boolean,
  tokensData: Token[],
  fetchTokensData: () => void,
  token1: Token | undefined,
  setToken1: React.Dispatch<React.SetStateAction<Token | undefined>>,
  token2: Token | undefined,
  setToken2: React.Dispatch<React.SetStateAction<Token | undefined>>,

  amount1: number | null, setAmount1: React.Dispatch<React.SetStateAction<number | null>>,
  amount2: number | null, setAmount2: React.Dispatch<React.SetStateAction<number | null>>,
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({
  children
}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokensData, setTokensData] = useState<Token[]>([]);

  const [token1, setToken1] = useState<Token | undefined>();
  const [token2, setToken2] = useState<Token | undefined>();

  const [amount1, setAmount1] = useState<number | null>(null);
  const [amount2, setAmount2] = useState<number | null>(null);

  const fetchTokensData = useCallback(async () => {
    setIsLoading(true)
    const data: Token[] = await fetch('https://interview.switcheo.com/prices.json')
      .then(res => res.json())

    const newTokensData = data.reduce((previousValue: Token[], currentValue) => {
      if (!previousValue.some(item => item.currency === currentValue.currency)) {
        currentValue.iconUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currentValue.currency}.svg`
        previousValue.push(currentValue)
      }
      return previousValue
    }, [])

    setTokensData(newTokensData)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchTokensData()
  }, [])

  const appContextValue = useMemo(() => ({
    isLoading,
    tokensData,
    fetchTokensData,
    token1,
    setToken1,
    token2,
    setToken2,
    amount1, setAmount1,
    amount2, setAmount2
  }), [
    isLoading,
    tokensData,
    token1,
    token2,
    amount1,
    amount2,
  ]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const withAppProvider = (Component: React.FC<any>) => (props: any) => {
  return (
    <AppProvider>
      <Component {...props} />
    </AppProvider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      'useAppContext must be used within a AppContext',
    );
  }
  return context;
}
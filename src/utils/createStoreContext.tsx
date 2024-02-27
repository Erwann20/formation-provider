import { createContext, useContext } from "react";

interface ManualStoreProviderProps<TStoreShape> {
  children: React.ReactNode;
  store: TStoreShape;
}

interface ManualStoreValues<TStoreShape> {
  StoreProvider: React.FC<ManualStoreProviderProps<TStoreShape>>;
  useStore: () => TStoreShape;
}

export function createManualStoreContext<TStoreShape, TStoreParams>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _useCreateStore: (params: TStoreParams) => TStoreShape // only used for typing purposes
): ManualStoreValues<TStoreShape> {
  const StoreContext = createContext<TStoreShape>({} as TStoreShape);

  const StoreProvider = ({ children, store }: ManualStoreProviderProps<TStoreShape>) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  };

  const useStore = () => useContext(StoreContext);

  return {
    StoreProvider,
    useStore,
  };
}

interface AutoStoreProviderProps<TStoreShape, TStoreParams> {
  children: React.ReactNode | ((store: TStoreShape) => JSX.Element);

  //Todo: allow optional param if TStoreParams empty
  params: TStoreParams;
}

export interface AutoStoreValues<TStoreShape, TStoreParams> {
  StoreProvider: React.FC<AutoStoreProviderProps<TStoreShape, TStoreParams>>;
  useStore: () => TStoreShape;
}

export function createAutoStoreContext<TStoreShape, TStoreParams>(
  useCreateStore: (params: TStoreParams) => TStoreShape
): AutoStoreValues<TStoreShape, TStoreParams> {
  const StoreContext = createContext<TStoreShape>({} as TStoreShape);

  const StoreProvider = ({
    children,
    params,
  }: AutoStoreProviderProps<TStoreShape, TStoreParams>) => {
    // TODO: [important, not urgent] remove useCreateStore call
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = useCreateStore(params);
    const isChildrenFunction = typeof children === "function";

    return (
      <StoreContext.Provider value={store}>
        {isChildrenFunction ? children(store) : children}
      </StoreContext.Provider>
    );
  };

  const useStore = () => useContext(StoreContext);

  return {
    StoreProvider,
    useStore,
  };
}

import { createManualStoreContext } from "../../utils/createStoreContext";
import { getCountries } from "./counter.api"
import { useQuery } from "react-query";

const useCounterStore = () => {
    const getCountriesQuery = useQuery([], () => getCountries())
    return {
        getCountriesQuery
    }
}

const { StoreProvider, useStore } = createManualStoreContext(useCounterStore);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
    const store = useCounterStore();
    return <StoreProvider store={store}>
        {children}
    </StoreProvider>
}


export const useCounterContext = useStore;
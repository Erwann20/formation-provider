import { useCounterContext } from "./data/counter.provider"

export const Countries = () => {
    const {getCountriesQuery} = useCounterContext()
    return (
        <>
            {
                getCountriesQuery.data?.map((country) =>(
                    <div key={country.code}>
                        <h2>{country.name}</h2>
                        <h3>{country.capital}</h3>
                        <h3>{country.code}</h3>
                    </div>
                ))
            }
        </>
    )
}
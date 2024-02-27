import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import { Countries } from './Countries/Countries'
import { CounterProvider } from './Countries/data/counter.provider'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CounterProvider>
        <Countries />
      </CounterProvider>
     </QueryClientProvider>
  )
}

export default App

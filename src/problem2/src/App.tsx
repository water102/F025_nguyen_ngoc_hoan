import { SwapForm } from './swap-form'
import { useAppContext, withAppProvider } from './app-context'
import './App.css'

function App() {
  const {
    isLoading,
  } = useAppContext()

  return (
    <div className='h-full w-full flex items-center justify-center'>
      {isLoading ? <div>Loading, please wait...</div> : <SwapForm />}
    </div>
  )
}

export default withAppProvider(App)

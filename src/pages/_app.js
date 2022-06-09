import 'tailwindcss/tailwind.css'
import '../../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const App = ({ Component, pageProps }) => <Provider store={store}><Component {...pageProps} /></Provider>

export default App

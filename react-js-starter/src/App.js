import './App.css';
import { memo } from 'react';
import { GlobalProvider } from './context/GlobalState';
import PokeApp from './components/PokeApp';

function App() {
  return (
    <GlobalProvider>
        <div className="container mx-auto">
          <PokeApp />
        </div>
    </GlobalProvider>
  );
}

export default memo(App);

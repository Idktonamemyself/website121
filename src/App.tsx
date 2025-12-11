import { HomePage } from '@/pages/HomePage';
import { useAuth } from '@/hooks/useAuth';

function App() {
  useAuth();
  return <HomePage />;
}

export default App;

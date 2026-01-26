import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { ProblemList } from './components/ProblemList';

function AppContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-mesh transition-colors duration-300">
      <Header />
      
      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <ProblemList />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

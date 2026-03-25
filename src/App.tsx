import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { GroupProvider } from './context/GroupContext';
import { Header } from './components/Header';
import { ProblemList } from './components/ProblemList';

function AppContent() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] bg-mesh transition-colors duration-300">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <ProblemList />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <GroupProvider>
          <AppContent />
        </GroupProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { RecipeList } from './components/RecipeList';
import { SuggestionsBanner } from './components/SuggestionsBanner';
import { RegionDebugger } from './components/RegionDebugger';
import { useRecipes } from './hooks/useRecipes';
import type { RecipeSearchParams } from './types';
import './App.css';

function App() {
  const { recipes, suggestions, source, loading, error, fetchRecipes, fetchRandomRecipes } = useRecipes();

  const handleSearch = (params: RecipeSearchParams) => {
    fetchRecipes(params);
  };

  const handleRandomSearch = () => {
    fetchRandomRecipes(5);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <SearchForm
            onSearch={handleSearch}
            onRandomSearch={handleRandomSearch}
            loading={loading}
          />
          {suggestions && !loading && !error && (
            <SuggestionsBanner suggestions={suggestions} source={source} />
          )}
          <RecipeList recipes={recipes} loading={loading} error={error} />
        </div>
      </main>
      <footer className="footer">
        <p>
          Powered by{' '}
          <a
            href="https://github.com/Ashy6/food-eat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Food Eat API
          </a>{' '}
          & Mastra Agents
        </p>
      </footer>
      {/* 地区调试器 - 按 Ctrl+Shift+D 显示 */}
      <RegionDebugger />
    </div>
  );
}

export default App;

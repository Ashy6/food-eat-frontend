import { ChefHat } from 'lucide-react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <ChefHat size={32} />
          <h1>Food Eat</h1>
        </div>
        <p className="tagline">AI 美食推荐助手 - 今天吃什么？让 AI 帮你决定！</p>
      </div>
    </header>
  );
};

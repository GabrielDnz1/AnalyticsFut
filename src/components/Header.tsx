const Header = () => {
  return (
    <header className="border-b bg-background">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a
              href="/"
              className="flex items-center px-4 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-4xl font-bold">AnalyticsFut</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
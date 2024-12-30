import AuthForm from "@/components/AuthForm";

function Landing() {
  return (
    <div className="min-h-screen flex bg-primary">
      {/* Hero Section */}
      <div className="hidden md:flex md:w-2/3 items-center justify-center p-8">
        <div className="max-w-2xl text-primary-foreground">
          <h1 className="text-5xl font-bold mb-6">
            Take Control of Your Finances
          </h1>
          <p className="text-xl mb-8">
            Track your spending, analyze your habits, and achieve your financial
            goals with our powerful finance tracking tool.
          </p>
          <div className="grid grid-cols-2 gap-8 text-lg">
            <div>
              <h3 className="font-semibold mb-2">✓ Easy Tracking</h3>
              <p>Monitor your income and expenses effortlessly</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Smart Analytics</h3>
              <p>Get insights into your spending patterns</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Secure Platform</h3>
              <p>Your financial data is always protected</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Real-time Updates</h3>
              <p>Stay on top of your finances instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-8">
        <AuthForm />
        <div />
      </div>
    </div>
  );
}

export default Landing;

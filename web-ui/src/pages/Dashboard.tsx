function Dashboard() {
  return (
    <div className="min-h-screen max-h-screen flex w-full">
      <main className="flex-1 p-8 bg-background">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="col-span-2 space-y-8"></div>

          {/* Right Column */}
          <div className="col-span-1 space-y-8"></div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

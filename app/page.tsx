export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Welcome to Your Next.js App
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Custom Theme
            </h2>
            <p className="text-muted-foreground">
              Your application is now set up with a custom color theme and ready for development.
            </p>
          </div>
          <div className="bg-modules-pink p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-modules-beige-foreground mb-4">
              Module Colors
            </h2>
            <p className="text-modules-beige-foreground">
              All your module-specific colors are configured and ready to use.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
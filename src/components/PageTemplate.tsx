interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "AI-Powered",
      desc: "Generate blog outlines and content suggestions using advanced AI",
    },
    {
      title: "Rich Editor",
      desc: "Full-featured text editor with formatting tools and live preview",
    },
    {
      title: "Export Ready",
      desc: "Export your finished articles in multiple formats",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 md:pb-24 pt-12 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-bold text-foreground mb-2 tracking-tight text-black dark:text-white">
          AI Blog Generator
        </h1>
        <p className="text-gray-500 dark:text-white/70 text-[20px] max-w-2xl mx-auto leading-relaxed font-normal">
          Transform your ideas into compelling blog posts with AI assistance. <br />
          Generate outlines, write content, and export beautiful articles.
        </p>
      </div>

      {/* Feature Cards Group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-[1rem] border border-gray-200 dark:border-white shadow-sm bg-white dark:bg-zinc-900 text-center flex flex-col items-center justify-center transition-colors duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
            <p className="text-gray-400 dark:text-white/70 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      <Link
        href="/edit"
        className="bg-[#111] text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl font-medium text-sm hover:bg-black dark:hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
      >
        Start Writing
      </Link>
    </div>
  );
}
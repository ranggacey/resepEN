import Link from "next/link";

export default function StoryCard({ story }) {
  return (
    <div className="bg-cardLight dark:bg-cardDark border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300">
      <img
        src={story.thumbnail}
        alt={story.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="text-2xl font-pixel text-black dark:text-white mb-2">
          {story.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {story.description}
        </p>
        <Link 
          href={`/story/${story.id}`} 
          className="block text-center py-2 bg-neon text-black dark:text-black rounded font-bold hover:bg-neon/80 transition-colors"
        >
          Mulai Cerita
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function CardStory({ story }) {
  return (
    <div className="bg-cardLight dark:bg-cardDark border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow hover:shadow-2xl transition-shadow duration-300">
      <img
        src={story.thumbnail}
        alt={story.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-pixel text-black dark:text-white mb-2">
          {story.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {story.description}
        </p>
        <Link
          href={`/story/${story.id}`}
          className="block text-center py-2 bg-neon text-black rounded font-bold hover:bg-neon/80 transition-colors"
        >
          Mulai Cerita
        </Link>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export function BlogCard({
  slug,
  title,
  description,
  author,
  date,
  readTime,
  tags,
  image,
  featured = false,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (featured) {
    return (
      <article className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="md:flex">
          {image && (
            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/blog/images/placeholder.jpg';
                }}
              />
            </div>
          )}
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-certfast-100 text-certfast-700">
                Featured
              </span>
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-certfast-600 transition-colors">
              <Link to={`/blog/${slug}`} className="focus:outline-none">
                {title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime}
              </div>
            </div>
            <Link
              to={`/blog/${slug}`}
              className="inline-flex items-center gap-2 text-certfast-600 font-medium hover:text-certfast-700 transition-colors"
            >
              Read article
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/blog/images/placeholder.jpg';
            }}
          />
        </div>
      )}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-certfast-600 transition-colors line-clamp-2">
          <Link to={`/blog/${slug}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </div>
        </div>
      </div>
    </article>
  );
}

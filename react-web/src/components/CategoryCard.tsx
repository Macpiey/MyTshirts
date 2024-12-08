import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  description: string;
}

export default function CategoryCard({ name, image, description }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${name.toLowerCase()}`}
      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-w-3 aspect-h-2">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 transition-opacity group-hover:opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
            {name}
          </h3>
          <p className="text-white/80 transform transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
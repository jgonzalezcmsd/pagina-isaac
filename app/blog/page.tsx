'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt: string;
  author?: { name: string };
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts?published=true');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog de Construcción y Arquitectura
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las últimas tendencias, técnicas y proyectos en
              construcción, arquitectura y fotogrametría con drones.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.slug}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time>{new Date(post.publishedAt).toLocaleDateString('es-ES')}</time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  ¡Próximamente contenido increíble!
                </h3>
                <p className="text-gray-700">
                  Estamos preparando artículos fascinantes sobre construcción,
                  arquitectura y las últimas tendencias del sector. ¡Vuelve
                  pronto!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

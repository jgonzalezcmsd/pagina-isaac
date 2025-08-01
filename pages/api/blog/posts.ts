import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPosts(req, res);
    case 'POST':
      return createPost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { published, limit, page, category, tag } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;
    const skip = page && limit ? (parseInt(page as string) - 1) * parseInt(limit as string) : undefined;

    const where: any = {};
    if (published === 'true') where.published = true;
    if (category) where.categories = { some: { slug: category } };
    if (tag) where.tags = { some: { slug: tag } };

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: { select: { name: true, email: true } },
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });

    const total = await prisma.blogPost.count({ where });

    res.status(200).json({ posts, total });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Creating blog post with data:', JSON.stringify(req.body, null, 2));
    
    const { title, content, excerpt, featuredImage, metaTitle, metaDescription, keywords, published, categories, tags } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        featuredImage,
        metaTitle,
        metaDescription,
        keywords,
        published,
        publishedAt: published ? new Date() : null,
        ...(categories && categories.length > 0 && {
          categories: {
            connect: categories.map((id: number) => ({ id }))
          }
        }),
        ...(tags && tags.length > 0 && {
          tags: {
            connect: tags.map((id: number) => ({ id }))
          }
        })
      },
      include: {
        categories: true,
        tags: true,
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    console.error('Request body:', JSON.stringify(req.body, null, 2));
    res.status(500).json({ 
      error: 'Error creating blog post', 
      details: error.message,
      code: error.code 
    });
  }
}
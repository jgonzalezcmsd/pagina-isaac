import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  switch (req.method) {
    case 'GET':
      return getPost(req, res, slug as string);
    case 'PUT':
      return updatePost(req, res, slug as string);
    case 'DELETE':
      return deletePost(req, res, slug as string);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getPost(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, email: true } },
        categories: true,
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Error fetching blog post' });
  }
}

async function updatePost(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    const { title, content, excerpt, featuredImage, metaTitle, metaDescription, keywords, published, categories, tags } = req.body;
    
    const newSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
    
    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...(title && { title, slug: newSlug }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(keywords !== undefined && { keywords }),
        ...(published !== undefined && { 
          published, 
          publishedAt: published ? new Date() : null 
        }),
        ...(categories && {
          categories: {
            set: [],
            connect: categories.map((id: number) => ({ id }))
          }
        }),
        ...(tags && {
          tags: {
            set: [],
            connect: tags.map((id: number) => ({ id }))
          }
        })
      },
      include: {
        categories: true,
        tags: true,
      }
    });

    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Error updating blog post' });
  }
}

async function deletePost(req: NextApiRequest, res: NextApiResponse, slug: string) {
  try {
    await prisma.blogPost.delete({
      where: { slug },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Error deleting blog post' });
  }
}
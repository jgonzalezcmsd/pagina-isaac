# Setup Blog and Drones Features

## Database Migration

Run the following commands to set up the new database tables:

```bash
# Generate Prisma client with new schema
npx prisma generate

# Apply the migration
npx prisma migrate deploy

# Or if you want to reset and apply all migrations
npx prisma migrate reset
```

## MinIO Buckets

Create the following buckets in your MinIO instance:

1. `blog-images` - For blog post images
2. `drone-services` - For drone service images
3. `drone-projects` - For drone project galleries

## Features Added

### Blog System
- **SEO-optimized blog posts** with meta tags, structured data
- **Categories and tags** for content organization
- **Featured images** and rich content support
- **Admin interface** for content management
- **API endpoints** for CRUD operations
- **Automatic sitemap generation**

### Drones Photogrammetry
- **Services showcase** with pricing and details
- **Project portfolio** with case studies
- **Image galleries** using MinIO storage
- **SEO optimization** for service pages
- **Admin management** interface

### SEO Enhancements
- **Structured data** for better search engine understanding
- **Meta tags optimization** for social sharing
- **Sitemap integration** with dynamic content
- **Canonical URLs** and proper heading structure
- **Mobile-responsive** design

## API Endpoints

### Blog
- `GET /api/blog/posts` - List blog posts
- `GET /api/blog/[slug]` - Get single post
- `POST /api/blog/posts` - Create post
- `PUT /api/blog/[slug]` - Update post
- `DELETE /api/blog/[slug]` - Delete post
- `POST /api/blog/upload` - Upload images

### Drones
- `GET /api/drones/services` - List services
- `GET /api/drones/projects` - List projects
- `POST /api/drones/services` - Create service
- `POST /api/drones/projects` - Create project

## Pages Added

### Public Pages
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog posts
- `/drones` - Drones services and projects showcase

### Admin Pages
- `/admin/blog` - Blog management
- `/admin/drones` - Drones content management

## Next Steps

1. Run the database migration
2. Create MinIO buckets
3. Add some sample content through the admin interface
4. Test the SEO features with Google Search Console
5. Consider adding more advanced features like:
   - Blog comments system
   - Newsletter subscription
   - Advanced search and filtering
   - Content analytics
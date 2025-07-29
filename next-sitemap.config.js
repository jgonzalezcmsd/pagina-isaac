module.exports = {
    siteUrl: 'https://projectbim.cl',
    generateRobotsTxt: true,
    additionalPaths: async (config) => {
      const result = [];
      
      // Add blog posts
      try {
        const blogResponse = await fetch(`${config.siteUrl}/api/blog/posts?published=true`);
        const blogData = await blogResponse.json();
        blogData.posts?.forEach((post) => {
          result.push({
            loc: `/blog/${post.slug}`,
            lastmod: post.updatedAt,
            priority: 0.7,
            changefreq: 'weekly'
          });
        });
      } catch (error) {
        console.log('Error fetching blog posts for sitemap:', error);
      }
      
      // Add drone services
      try {
        const servicesResponse = await fetch(`${config.siteUrl}/api/drones/services?active=true`);
        const servicesData = await servicesResponse.json();
        servicesData?.forEach((service) => {
          result.push({
            loc: `/drones/servicios/${service.slug}`,
            lastmod: service.updatedAt,
            priority: 0.8,
            changefreq: 'monthly'
          });
        });
      } catch (error) {
        console.log('Error fetching drone services for sitemap:', error);
      }
      
      // Add drone projects
      try {
        const projectsResponse = await fetch(`${config.siteUrl}/api/drones/projects?active=true`);
        const projectsData = await projectsResponse.json();
        projectsData?.forEach((project) => {
          result.push({
            loc: `/drones/proyectos/${project.slug}`,
            lastmod: project.updatedAt,
            priority: 0.6,
            changefreq: 'monthly'
          });
        });
      } catch (error) {
        console.log('Error fetching drone projects for sitemap:', error);
      }
      
      return result;
    },
    transform: async (config, path) => {
      // Custom priority for specific pages
      if (path === '/blog') {
        return {
          loc: path,
          lastmod: new Date().toISOString(),
          priority: 0.9,
          changefreq: 'daily'
        };
      }
      
      if (path === '/drones') {
        return {
          loc: path,
          lastmod: new Date().toISOString(),
          priority: 0.9,
          changefreq: 'weekly'
        };
      }
      
      return {
        loc: path,
        lastmod: new Date().toISOString(),
        priority: 0.7,
        changefreq: 'weekly'
      };
    }
  }
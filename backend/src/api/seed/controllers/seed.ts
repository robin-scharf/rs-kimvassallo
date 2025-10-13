import path from 'path';
import fs from 'fs-extra';
import mimeTypes from 'mime-types';

export default {
  async run(ctx) {
    // Security check - require a secret token
    const token = ctx.request.header['x-seed-token'];
    const expectedToken = process.env.SEED_TOKEN || 'change-me-in-production';
    
    if (token !== expectedToken) {
      return ctx.unauthorized('Invalid seed token');
    }

    try {
      // Import and run the seed script logic
      const seedData = require('../../../../data/kim-vassallo-data.json');
      
      // Helper functions from seed script
      const getFileData = async (fileName: string) => {
        const filePath = path.join(__dirname, '../../../../data/uploads', fileName);
        const buffer = await fs.readFile(filePath);
        const mimeType = mimeTypes.lookup(filePath);
        
        return {
          path: filePath,
          name: fileName,
          type: mimeType || 'application/octet-stream',
          size: buffer.length,
        };
      };

      const uploadFile = async (fileName: string) => {
        const fileData = await getFileData(fileName);
        const existingFiles = await strapi.plugins.upload.services.upload.findMany({
          filters: { name: fileData.name },
        });

        if (existingFiles.length > 0) {
          return existingFiles[0];
        }

        const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
          data: {},
          files: fileData,
        });

        return uploadedFiles[0];
      };

      // Create Home
      await strapi.documents('api::home.home').create({
        data: {
          ...seedData.home,
          publishedAt: Date.now(),
        },
      });

      // Create About
      await strapi.documents('api::about.about').create({
        data: {
          ...seedData.about,
          publishedAt: Date.now(),
        },
      });

      // Create Approach
      await strapi.documents('api::approach.approach').create({
        data: {
          ...seedData.approach,
          publishedAt: Date.now(),
        },
      });

      // Create Contact
      await strapi.documents('api::contact.contact').create({
        data: {
          ...seedData.contact,
          publishedAt: Date.now(),
        },
      });

      // Create Global
      await strapi.documents('api::global.global').create({
        data: {
          ...seedData.global,
          publishedAt: Date.now(),
        },
      });

      // Create Services
      for (const service of seedData.services) {
        await strapi.documents('api::service.service').create({
          data: {
            ...service,
            publishedAt: Date.now(),
          },
        });
      }

      // Create Approach Items
      for (const item of seedData.approachItems) {
        await strapi.documents('api::approach-item.approach-item').create({
          data: {
            ...item,
            publishedAt: Date.now(),
          },
        });
      }

      // Create Insurance Providers
      for (const provider of seedData.insuranceProviders) {
        await strapi.documents('api::insurance-provider.insurance-provider').create({
          data: {
            ...provider,
            publishedAt: Date.now(),
          },
        });
      }

      // Set public permissions
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const contentTypes = [
          'api::about.about',
          'api::approach.approach',
          'api::approach-item.approach-item',
          'api::contact.contact',
          'api::global.global',
          'api::home.home',
          'api::insurance-provider.insurance-provider',
          'api::service.service',
        ];

        for (const contentType of contentTypes) {
          const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
            where: { role: publicRole.id },
          });

          for (const action of ['find', 'findOne']) {
            const permission = permissions.find((p) => p.action === `${contentType}.${action}`);
            if (permission && !permission.enabled) {
              await strapi.query('plugin::users-permissions.permission').update({
                where: { id: permission.id },
                data: { enabled: true },
              });
            }
          }
        }
      }

      ctx.body = {
        success: true,
        message: 'Database seeded successfully!',
      };
    } catch (error) {
      strapi.log.error('Seeding error:', error);
      ctx.throw(500, `Seeding failed: ${error.message}`);
    }
  },
};

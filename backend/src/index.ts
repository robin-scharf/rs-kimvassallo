import type { Core } from '@strapi/strapi'

// Helper function to trigger Next.js revalidation
async function triggerRevalidation(model: string, path?: string) {
  const revalidationUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const revalidationSecret = process.env.REVALIDATION_SECRET;

  if (!revalidationSecret) {
    console.warn('REVALIDATION_SECRET not set. Skipping revalidation.');
    return;
  }

  try {
    const url = `${revalidationUrl}/api/revalidate?secret=${revalidationSecret}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, path }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Revalidation triggered for ${model}:`, data);
    } else {
      console.error(`❌ Revalidation failed for ${model}:`, response.status, response.statusText);
    }
  } catch (error) {
    console.error(`❌ Error triggering revalidation for ${model}:`, error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set permissions for public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type: 'public' },
      })

    if (publicRole) {
      const contentTypes = [
        'api::about.about',
        'api::approach.approach',
        'api::approach-item.approach-item',
        'api::contact.contact',
        'api::global.global',
        'api::home.home',
        'api::insurance-provider.insurance-provider',
        'api::privacy-policy.privacy-policy',
        'api::service.service',
        'api::terms-of-service.terms-of-service',
        'api::article.article',
        'api::author.author',
        'api::category.category',
      ]

      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: {
            role: publicRole.id,
          },
        })

      // Enable find and findOne for all content types
      for (const contentType of contentTypes) {
        const actions = ['find', 'findOne']

        for (const action of actions) {
          const existingPermission = permissions.find(
            (p) => p.action === `${contentType}.${action}`
          )

          if (existingPermission && !existingPermission.enabled) {
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: existingPermission.id },
              data: { enabled: true },
            })
          }
        }
      }
    }

    // Set up revalidation webhooks for content changes
    const contentTypesToWatch = [
      'api::home.home',
      'api::about.about',
      'api::approach.approach',
      'api::approach-item.approach-item',
      'api::service.service',
      'api::contact.contact',
      'api::global.global',
      'api::insurance-provider.insurance-provider',
      'api::privacy-policy.privacy-policy',
      'api::terms-of-service.terms-of-service',
    ]

    // Subscribe to lifecycle events for each content type
    contentTypesToWatch.forEach((uid) => {
      strapi.db.lifecycles.subscribe({
        models: [uid],
        async afterCreate(event) {
          const modelName = uid.split('::')[1].split('.')[0]
          console.log(`📝 Content created: ${modelName}`)
          await triggerRevalidation(modelName)
        },
        async afterUpdate(event) {
          const modelName = uid.split('::')[1].split('.')[0]
          console.log(`📝 Content updated: ${modelName}`)
          await triggerRevalidation(modelName)
        },
        async afterDelete(event) {
          const modelName = uid.split('::')[1].split('.')[0]
          console.log(`🗑️ Content deleted: ${modelName}`)
          await triggerRevalidation(modelName)
        },
      })
    })

    console.log('🔗 Next.js revalidation webhooks configured')
  },
}

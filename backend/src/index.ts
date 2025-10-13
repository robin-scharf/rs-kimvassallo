import type { Core } from '@strapi/strapi'

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
  },
}

'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { home, about, approach, services, contact, global } = require('../data/kim-vassallo-data.json');

async function seedKimVassalloSite() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up Kim Vassallo website...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats['size'];
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join('data', 'uploads', fileName);
  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop();
  const mimeType = mime.lookup(ext || '') || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry }) {
  try {
    // Actually create the entry in Strapi
    await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    // Check if the file already exists in Strapi
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      // File exists, don't upload it
      existingFiles.push(fileWhereName);
    } else {
      // File doesn't exist, upload it
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }
  const allFiles = [...existingFiles, ...uploadedFiles];
  // If only one file then return only that file
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function updateBlocks(blocks) {
  const updatedBlocks = [];
  for (const block of blocks) {
    if (block.__component === 'shared.media') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.file]);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file name on the block with the actual file
      blockCopy.file = uploadedFiles;
      updatedBlocks.push(blockCopy);
    } else if (block.__component === 'shared.slider') {
      // Get files already uploaded to Strapi or upload new files
      const existingAndUploadedFiles = await checkFileExistsBeforeUpload(block.files);
      // Copy the block to not mutate directly
      const blockCopy = { ...block };
      // Replace the file names on the block with the actual files
      blockCopy.files = existingAndUploadedFiles;
      // Push the updated block
      updatedBlocks.push(blockCopy);
    } else {
      // Just push the block as is
      updatedBlocks.push(block);
    }
  }

  return updatedBlocks;
}

async function importHome() {
  // Optional: Upload hero image if provided
  let heroImage = null;
  if (home.heroImage) {
    heroImage = await checkFileExistsBeforeUpload([home.heroImage]);
  }

  await createEntry({
    model: 'home',
    entry: {
      ...home,
      ...(heroImage && { heroImage }),
      publishedAt: Date.now(),
    },
  });
}

async function importAbout() {
  const updatedBlocks = await updateBlocks(about.blocks);

  await createEntry({
    model: 'about',
    entry: {
      ...about,
      blocks: updatedBlocks,
      publishedAt: Date.now(),
    },
  });
}

async function importApproach() {
  await createEntry({
    model: 'approach',
    entry: {
      ...approach,
      publishedAt: Date.now(),
    },
  });
}

async function importServices() {
  for (const service of services) {
    await createEntry({ 
      model: 'service', 
      entry: {
        ...service,
        publishedAt: Date.now(),
      }
    });
  }
}

async function importContact() {
  await createEntry({
    model: 'contact',
    entry: {
      ...contact,
      publishedAt: Date.now(),
    },
  });
}

async function importGlobal() {
  let favicon = null;
  if (global.favicon) {
    favicon = await checkFileExistsBeforeUpload([global.favicon]);
  }

  let shareImage = null;
  if (global.defaultSeo && global.defaultSeo.shareImage) {
    shareImage = await checkFileExistsBeforeUpload([global.defaultSeo.shareImage]);
  }

  return createEntry({
    model: 'global',
    entry: {
      ...global,
      ...(favicon && { favicon }),
      publishedAt: Date.now(),
      ...(global.defaultSeo && {
        defaultSeo: {
          ...global.defaultSeo,
          ...(shareImage && { shareImage }),
        },
      }),
    },
  });
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    home: ['find'],
    about: ['find'],
    approach: ['find'],
    service: ['find', 'findOne'],
    contact: ['find'],
    global: ['find'],
  });

  // Create all entries
  await importGlobal();
  await importHome();
  await importAbout();
  await importApproach();
  await importServices();
  await importContact();
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedKimVassalloSite();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

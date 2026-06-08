import { config, fields, collection } from '@keystatic/core';

// Keystatic CMS configuration.
//
// This file ONLY powers the visual editor at /keystatic. The 77 static content
// pages are generated from src/content.config.ts (Astro content collections) and
// are completely independent of this file.
//
// We define one Keystatic collection per (content type x locale) so the editor
// reads/writes the exact same markdown files that Astro builds from.

// --- Reusable field builders -------------------------------------------------

const titleField = fields.slug({
  name: { label: 'Title', validation: { length: { min: 1 } } },
});

const body = fields.markdoc({ label: 'Body' });

// services: title, description, name, order + body
function servicesCollection(locale: 'id' | 'en') {
  return collection({
    label: `Services (${locale.toUpperCase()})`,
    path: `src/content/services/${locale}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    schema: {
      title: titleField,
      description: fields.text({ label: 'Description', multiline: true }),
      name: fields.text({ label: 'Name' }),
      order: fields.integer({ label: 'Order', defaultValue: 0 }),
      content: body,
    },
  });
}

// equipment: title, description, name, category, pricePerDay, specs[], image, sku + body
function equipmentCollection(locale: 'id' | 'en') {
  return collection({
    label: `Equipment (${locale.toUpperCase()})`,
    path: `src/content/equipment/${locale}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    schema: {
      title: titleField,
      description: fields.text({ label: 'Description', multiline: true }),
      name: fields.text({ label: 'Name' }),
      category: fields.text({ label: 'Category' }),
      pricePerDay: fields.integer({ label: 'Price per day (IDR)' }),
      specs: fields.array(
        fields.object({
          label: fields.text({ label: 'Label' }),
          value: fields.text({ label: 'Value' }),
        }),
        {
          label: 'Specs',
          itemLabel: (props) => props.fields.label.value || 'Spec',
        }
      ),
      image: fields.text({ label: 'Image path' }),
      sku: fields.text({ label: 'SKU' }),
      content: body,
    },
  });
}

// eventTypes: title, description, name, image + body
function eventTypesCollection(locale: 'id' | 'en') {
  return collection({
    label: `Event Types (${locale.toUpperCase()})`,
    path: `src/content/eventTypes/${locale}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    schema: {
      title: titleField,
      description: fields.text({ label: 'Description', multiline: true }),
      name: fields.text({ label: 'Name' }),
      image: fields.text({ label: 'Image path' }),
      content: body,
    },
  });
}

// articles: title, description, datePublished, cover, excerpt + body
function articlesCollection(locale: 'id' | 'en') {
  return collection({
    label: `Articles (${locale.toUpperCase()})`,
    path: `src/content/articles/${locale}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    schema: {
      title: titleField,
      description: fields.text({ label: 'Description', multiline: true }),
      datePublished: fields.date({ label: 'Date published' }),
      cover: fields.text({ label: 'Image path' }),
      excerpt: fields.text({ label: 'Excerpt', multiline: true }),
      content: body,
    },
  });
}

export default config({
  storage: { kind: 'local' },
  ui: {
    navigation: {
      Services: ['servicesId', 'servicesEn'],
      Equipment: ['equipmentId', 'equipmentEn'],
      'Event Types': ['eventTypesId', 'eventTypesEn'],
      Articles: ['articlesId', 'articlesEn'],
    },
  },
  collections: {
    servicesId: servicesCollection('id'),
    servicesEn: servicesCollection('en'),
    equipmentId: equipmentCollection('id'),
    equipmentEn: equipmentCollection('en'),
    eventTypesId: eventTypesCollection('id'),
    eventTypesEn: eventTypesCollection('en'),
    articlesId: articlesCollection('id'),
    articlesEn: articlesCollection('en'),
  },
});

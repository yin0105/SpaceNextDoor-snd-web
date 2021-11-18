/* eslint-disable @typescript-eslint/naming-convention */
import XML from 'xml';
import { getSites } from '../resolvers';
import { getCountry, getTranslatedName } from '../../../../utilities/market';

export default async (req, res) => {
  const { __nextDefaultLocale, __nextLocale } = req.query;
  const { id } = getCountry(__nextDefaultLocale);
  const sites = await getSites(id);
  const listings = [];
  if (sites?.length) {
    sites.forEach((site) => {
      const image = site.images.map((item) => ({ image: [{ url: item }] }))?.[0];
      const { price_per_month, currency } = site.spaces?.[0];
      listings.push({
        listing: [
          { home_listing_id: site.id },
          { name: getTranslatedName(site, 'name', __nextLocale) },
          { availability: 'for_rent' },
          { description: getTranslatedName(site, 'description', __nextLocale) },
          {
            address: [
              { _attr: { format: 'simple' } },
              { component: [{ _attr: { name: 'addr1' } }, site.address.street] },
              { component: [{ _attr: { name: 'city' } }, getTranslatedName(site.address.city, 'name', __nextLocale)] },
              { component: [{ _attr: { name: 'region' } }, getTranslatedName(site.address.city, 'name', __nextLocale)] },
              { component: [{ _attr: { name: 'country' } }, getTranslatedName(site.address.country, 'name', __nextLocale)] },
              { component: [{ _attr: { name: 'postal_code' } }, site.address.postal_code] },
            ],
          },
          { latitude: site.address.lat },
          { longitude: site.address.lng },
          { neighborhood: '' },
          image,
          { listing_type: 'for_rent_by_agent' },
          { price: `${price_per_month} ${currency}` },
          { url: `https://${req.headers.host}/details/${site.id}` },
        ],
      });
    });
  }
  const temp = [
    {
      listings: [
        { title: 'Space Next Door self-storage listing Feed' },
        { link: { _attr: { href: `https://${req.headers.host}`, rel: 'self' } } },
        ...listings,
      ],
    },
  ];
  res.send(XML(temp, { declaration: { encoding: 'UTF-8' } }));
};

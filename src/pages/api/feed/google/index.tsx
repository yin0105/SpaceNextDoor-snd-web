import { Parser } from 'json2csv';
import { getSites } from '../resolvers';
import { getCountry, getTranslatedName } from '../../../../utilities/market';

export default async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { __nextDefaultLocale, __nextLocale } = req.query;
  const { id } = getCountry(__nextDefaultLocale);
  const sites = await getSites(id);

  const data = [];
  if (sites && sites?.length) {
    sites.forEach((site) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { price_per_month, currency } = site.spaces?.[0];
      data.push({
        'Listing ID': site.id,
        'Listing name': getTranslatedName(site, 'name', __nextLocale),
        'Final URL': `https://${req.headers.host}/details/${site.id}`,
        'Image URL': site.images?.[0],
        'City name': `${getTranslatedName(site.address.city, 'name', __nextLocale)}`,
        Description: getTranslatedName(site, 'description', __nextLocale),
        Price: `${price_per_month} ${currency}`,
        'Property type': 'House',
        'Listing type': 'For rent',
        Address: `${site.address.lat}, ${site.address.lng}`,
      });
    });
  }
  const fields = new Parser({ header: true, withBOM: true });
  const csv = fields.parse(data);

  res.send(csv);
};

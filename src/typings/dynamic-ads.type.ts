export interface IDynamicAdsParam {
  content_type: string | string [];
  content_ids: string | string [];
  currency?: string;
  property_type?: string;
  listing_type?: string;
  availability?: string;
  city?: string;
  neighborhood?: string;
  region?: string;
  country?: string;
  lease_start_date?: string;
  lease_end_date?: string;
  preferred_price_range?: [number, number];
}

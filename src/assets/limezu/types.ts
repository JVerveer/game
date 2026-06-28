export type LimeZuRuntimeAsset = {
  id: string;
  sourceAssetId: string;
  label: string;
  src: string;
  tags: string[];
  source: string;
  width: number;
  height: number;
};

export const assetMatches = (asset: LimeZuRuntimeAsset, terms: string[]) => {
  const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
  return terms.some(term => haystack.includes(term));
};

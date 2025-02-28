export interface Location {
  latitude: number | null;
  longitude: number | null;
}

export interface KakaoAddress {
  regionDepth1: string | undefined;
  regionDepth2: string | undefined;
}

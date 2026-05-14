import * as turf from '@turf/turf';

export const calculateArea = (feature) => {
  try {
    const areaSqMeters = turf.area(feature);
    if (areaSqMeters > 10000) {
      return `${(areaSqMeters / 1000000).toFixed(2)} sq km`;
    }
    return `${areaSqMeters.toFixed(2)} sq m`;
  } catch (error) {
    return 'N/A';
  }
};

export const getCenter = (feature) => {
  try {
    const center = turf.center(feature);
    return center.geometry.coordinates; // [lng, lat]
  } catch (error) {
    return [0, 0];
  }
};

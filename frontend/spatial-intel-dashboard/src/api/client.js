import axios from 'axios';
import * as turf from '@turf/turf';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const assetTypes = ['Buildings', 'Water', 'Trees', 'Roads', 'Drains', 'Railway'];
const statusTypes = ['added', 'removed', 'unchanged', 'unchanged', 'unchanged']; // Bias towards unchanged

// Mock API calls for now
export const analyzeArea = async (bounds) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Analyzing bounds:", bounds);
  
  // Dynamically generate features within the bounds!
  // bbox: [minX, minY, maxX, maxY]
  const bbox = [bounds.west, bounds.south, bounds.east, bounds.north];
  
  // Calculate size of area to determine how many assets to generate
  const areaSqKm = turf.area(turf.bboxPolygon(bbox)) / 1000000;
  const numFeatures = Math.max(10, Math.min(200, Math.floor(areaSqKm * 500))); 
  
  // max_radial_length in degrees (~111km per degree) -> ~0.0001 is about 10 meters
  const maxRadialLength = 0.0002; 
  
  const generatedFeatures = turf.randomPolygon(numFeatures, {
    bbox: bbox,
    num_vertices: 4,
    max_radial_length: maxRadialLength
  });

  // Assign random properties to each polygon
  generatedFeatures.features.forEach(feature => {
    const assetType = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
    
    feature.properties = {
      assetType,
      confidence: 0.75 + (Math.random() * 0.24), // 75% to 99%
      area: Math.floor(turf.area(feature)),
      timestamp: new Date().toISOString(),
      status
    };
  });

  return generatedFeatures;
};

export const getHistory = async (date) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return empty collection for now if just getting history
  return { type: "FeatureCollection", features: [] };
};

export const compareDates = async (date1, date2, bounds) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // To mock compare, we just generate a new random set with status changes
  let bbox = [77.2, 28.6, 77.22, 28.62]; // fallback bbox
  if (bounds) {
    bbox = [bounds.west, bounds.south, bounds.east, bounds.north];
  }
  
  const generatedFeatures = turf.randomPolygon(50, {
    bbox: bbox,
    num_vertices: 4,
    max_radial_length: 0.0002
  });

  generatedFeatures.features.forEach(feature => {
    feature.properties = {
      assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
      confidence: 0.8 + (Math.random() * 0.15),
      area: Math.floor(turf.area(feature)),
      timestamp: new Date().toISOString(),
      status: statusTypes[Math.floor(Math.random() * statusTypes.length)]
    };
  });

  return generatedFeatures;
};

export default api;

export const mockGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        assetType: "Buildings",
        confidence: 0.95,
        area: 450,
        timestamp: "2023-05-20T10:30:00Z",
        status: "added" // for comparison mode
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.2080, 28.6140],
            [77.2085, 28.6140],
            [77.2085, 28.6145],
            [77.2080, 28.6145],
            [77.2080, 28.6140]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        assetType: "Water",
        confidence: 0.88,
        area: 12000,
        timestamp: "2023-05-20T10:30:00Z",
        status: "unchanged"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.2100, 28.6120],
            [77.2120, 28.6120],
            [77.2120, 28.6135],
            [77.2100, 28.6135],
            [77.2100, 28.6120]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        assetType: "Trees",
        confidence: 0.92,
        area: 300,
        timestamp: "2023-05-20T10:30:00Z",
        status: "removed"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.2090, 28.6150],
            [77.2095, 28.6150],
            [77.2095, 28.6155],
            [77.2090, 28.6155],
            [77.2090, 28.6150]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        assetType: "Railway",
        confidence: 0.99,
        area: 1500,
        timestamp: "2023-05-20T10:30:00Z",
        status: "unchanged"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.2110, 28.6150],
            [77.2140, 28.6140],
            [77.2145, 28.6145],
            [77.2115, 28.6155],
            [77.2110, 28.6150]
          ]
        ]
      }
    }
  ]
};

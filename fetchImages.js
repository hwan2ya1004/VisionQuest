// fetchImages.js
const axios = require('axios');
const fs = require('fs');

const apiKey = process.env.PIXABAY_API_KEY;

const brands = [
  { id: 'gentlemonster', searchTerm: 'Gentle Monster glasses' },
  { id: 'iaanoptical', searchTerm: 'Iaan Optical glasses' },
  // 필요한 브랜드 목록 추가
];

async function fetchImages() {
  const results = {};
  for (const brand of brands) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      brand.searchTerm
    )}&image_type=photo&per_page=1&safesearch=true&category=fashion`;

    try {
      const response = await axios.get(url);
      results[brand.id] = response.data.hits[0]
        ? response.data.hits[0].webformatURL
        : 'default-image.jpg';
    } catch (error) {
      console.error(`Error fetching image for ${brand.id}:`, error);
      results[brand.id] = 'default-image.jpg';
    }
  }

  fs.writeFileSync('./data/brandImages.json', JSON.stringify(results, null, 2));
}

fetchImages();

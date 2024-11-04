// fetchImages.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.PIXABAY_API_KEY;

if (!apiKey) {
  console.error('Error: PIXABAY_API_KEY is not defined in environment variables');
  process.exit(1); // 환경 변수가 없으면 종료
}

// 브랜드 목록
const brands = [
  { id: 'gentlemonster', searchTerm: 'Gentle Monster glasses' },
  { id: 'iaanoptical', searchTerm: 'Iaan Optical glasses' },
  // 필요한 브랜드 목록을 여기에 추가
];

async function fetchImages() {
  const results = {};

  for (const brand of brands) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      brand.searchTerm
    )}&image_type=photo&per_page=1&safesearch=true&category=fashion`;

    try {
      const response = await axios.get(url);
      const imageUrl =
        response.data.hits && response.data.hits[0]
          ? response.data.hits[0].webformatURL
          : 'default-image.jpg';
      results[brand.id] = imageUrl;
    } catch (error) {
      console.error(`Error fetching image for ${brand.id}:`, error.message);
      results[brand.id] = 'default-image.jpg';
    }
  }

  // 결과 JSON 파일로 저장
  const outputDir = path.resolve(__dirname, 'data');
  const outputPath = path.join(outputDir, 'brandImages.json');

  try {
    fs.mkdirSync(outputDir, { recursive: true }); // data 폴더가 없으면 생성
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Image data saved to ${outputPath}`);
  } catch (error) {
    console.error('Error writing JSON file:', error.message);
  }
}

fetchImages();

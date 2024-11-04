document.addEventListener('DOMContentLoaded', () => {
  const productModal = document.getElementById('product-modal');
  const closeButton = document.querySelector('.close-button');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar a');
  const contentArea = document.querySelector('main.content');
  
  const oneDayInMillis = 24 * 60 * 60 * 1000; // 24시간
  const usedImageUrls = new Set(); // 이미 사용된 이미지 URL을 추적하기 위한 집합

  // Brands and search terms for fetching images
  const brands = [
    // 국산 브랜드
    {
      id: 'gentlemonster',
      name: '젠틀몬스터',
      searchTerm: 'Gentle Monster glasses sunglasses eyewear',
    },
    {
      id: 'iaanoptical',
      name: '이안옵티칼',
      searchTerm: 'Iaan Optical glasses eyewear',
    },
    { id: 'karin', name: '카린', searchTerm: 'Karin glasses eyewear' },
    {
      id: 'projectproduct',
      name: '프로젝트 프로덕트',
      searchTerm: 'Project Product sunglasses eyewear',
    },
    { id: 'muzik', name: '뮤지크', searchTerm: 'Muzik glasses sunglasses' },
    { id: 'stealer', name: '스틸러', searchTerm: 'Stealer glasses eyewear' },
    {
      id: 'vedivero',
      name: '베디베로',
      searchTerm: 'Vedivero sunglasses glasses',
    },
    {
      id: 'lapizsensible',
      name: '라피스 센시블레',
      searchTerm: 'Lapiz Sensible glasses eyewear',
    },
    { id: 'maska', name: '마스카', searchTerm: 'Maska glasses eyewear' },
    { id: 'hazzys', name: '헤지스', searchTerm: 'Hazzys sunglasses eyewear' },
    {
      id: 'blancandeker',
      name: '블랑 앤 에클레어',
      searchTerm: 'Blanc and Eclare glasses sunglasses eyewear',
    },
    {
      id: 'nineaccord',
      name: '나인어코드',
      searchTerm: 'Nine Accord glasses eyewear',
    },
    { id: 'manomos', name: '마노모스', searchTerm: 'Manomos glasses eyewear' },
    { id: 'bbm', name: '비비엠', searchTerm: 'BBM glasses eyewear' },
    { id: 'lash', name: '래쉬', searchTerm: 'Lash glasses eyewear' },
    { id: 'bycause', name: '바이코즈', searchTerm: 'Bycause glasses eyewear' },
    {
      id: 'frankcustom',
      name: '프랭크커스텀',
      searchTerm: 'Frank Custom glasses eyewear',
    },
    {
      id: 'ashcroft',
      name: '애쉬크로프트',
      searchTerm: 'Ashcroft glasses eyewear',
    },
    { id: 'carven', name: '까르뱅', searchTerm: 'Carven glasses eyewear' },
    { id: 'langola', name: '랭골라', searchTerm: 'Langola glasses eyewear' },
    {
      id: 'blackmonster',
      name: '블랙몬스터',
      searchTerm: 'Black Monster glasses eyewear',
    },
    {
      id: 'tomatoglasses',
      name: '토마토안경',
      searchTerm: 'Tomato glasses eyewear',
    },
    // 새로 추가된 국산 브랜드
    {
      id: 'blueelephant',
      name: '블루엘리펀트',
      searchTerm: 'Blue Elephant glasses eyewear',
    },
    { id: 'fakeme', name: '페이크미', searchTerm: 'Fakeme glasses eyewear' },
    { id: 'lowro', name: '로우로우', searchTerm: 'Lowro glasses eyewear' },
    { id: 'leclow', name: '리끌로우', searchTerm: 'Leclow glasses eyewear' },
    {
      id: 'laurencepaul',
      name: '로렌스폴',
      searchTerm: 'Laurence Paul glasses eyewear',
    },
    {
      id: 'lookoptical',
      name: '룩옵티컬',
      searchTerm: 'Look Optical glasses eyewear',
    },
    // 추가된 국산 브랜드
    { id: 'akru', name: '어크루', searchTerm: 'Akru glasses eyewear' },
    { id: 'alpen', name: '알펜', searchTerm: 'Alpen glasses eyewear' },
    {
      id: 'graphicplastic',
      name: '그라픽플라스틱',
      searchTerm: 'Graphic Plastic glasses eyewear',
    },
    {
      id: 'gingereyewear',
      name: '진저아이웨어',
      searchTerm: 'Ginger Eyewear glasses eyewear',
    },
    {
      id: 'publicbeacon',
      name: '퍼블릭비컨',
      searchTerm: 'Public Beacon glasses eyewear',
    },
    { id: 'yellowv', name: '옐로우비', searchTerm: 'Yellow V glasses eyewear' },
    {
      id: 'ashcompact',
      name: '애쉬컴팩트',
      searchTerm: 'Ash Compact glasses eyewear',
    },
    {
      id: 'museumbybeacon',
      name: '뮤지엄바이비컨',
      searchTerm: 'Museum by Beacon glasses eyewear',
    },
    {
      id: 'TAGEYEWEAR',
      name: 'TAG EYEWEAR',
      searchTerm: 'TAGEYEWEAR glasses eyewear',
    },
    {
      id: 'otree',
      name: '오트리',
      searchTerm: 'otree glasses eyewear',
    },
    {
      id: 'Bartoli',
      name: '바르톨리',
      searchTerm: 'Bartoli glasses eyewear',
    },

    // 수입 브랜드
    // 기존에 있던 모스콧, 톰포드, 레이밴을 제거했습니다.
    // 새로운 수입 브랜드를 추가합니다.
    {
      id: 'annavalentine',
      name: '안네발렌틴',
      searchTerm: 'Anne Valentine glasses eyewear',
    },
    {
      id: 'cutlerandgross',
      name: '커틀러앤그로스',
      searchTerm: 'Cutler Gross glasses eyewear',
    },
    {
      id: 'efecter',
      name: '이펙터',
      searchTerm: 'Efecter glasses eyewear',
    },
    {
      id: 'ivan7285',
      name: '아이반7285',
      searchTerm: 'Ivan7285 glasses eyewear',
    },
    {
      id: 'highcala',
      name: '하이칼라',
      searchTerm: 'Highcala glasses eyewear',
    },
    {
      id: 'jacquemarimaji',
      name: '자크마리마지',
      searchTerm: 'Jacquemarimaji glasses eyewear',
    },
    {
      id: 'gamenannen',
      name: '가메만넨',
      searchTerm: 'Gamenannen glasses eyewear',
    },
    {
      id: 'geumja',
      name: '금자안경',
      searchTerm: 'Geumja glasses eyewear',
    },
    {
      id: 'lindapearow',
      name: '린다페로우',
      searchTerm: 'Linda Feroow glasses eyewear',
    },
    {
      id: 'matsuda',
      name: '마츠다',
      searchTerm: 'Matsuda glasses eyewear',
    },
    {
      id: 'monterosa',
      name: '몬테로사',
      searchTerm: 'Monterosa glasses eyewear',
    },
    {
      id: 'myikita',
      name: '마이키타',
      searchTerm: 'Myikita glasses eyewear',
    },
    {
      id: 'nishidekazuo',
      name: '니시데카즈오',
      searchTerm: 'Nishide Kazuo glasses eyewear',
    },
    {
      id: 'oliverpeoples',
      name: '올리버피플스',
      searchTerm: 'Oliver Peoples glasses eyewear',
    },
    {
      id: 'oakley',
      name: '오클리',
      searchTerm: 'Oakley glasses sunglasses eyewear',
    },
    {
      id: 'rayban',
      name: '레이밴',
      searchTerm: 'rayban glasses sunglasses eyewear',
    },
    {
      id: 'tartoptical',
      name: '타르트옵티컬',
      searchTerm: 'Tart Optical glasses eyewear',
    },
    {
      id: 'tavat',
      name: '타밧',
      searchTerm: 'Tavat glasses eyewear',
    },
    {
      id: 'kyupad',
      name: '규파드',
      searchTerm: 'Kyupad glasses eyewear',
    },
    {
      id: 'nativezones',
      name: '네이티브선즈',
      searchTerm: 'Native Zones glasses eyewear',
    },
    {
      id: 'traction',
      name: '트락션',
      searchTerm: 'Traction glasses eyewear',
    },
    {
      id: 'yellowsplus',
      name: '옐로우즈플러스',
      searchTerm: 'Yellows Plus glasses eyewear',
    },

    {
      id: 'shadycharacter',
      name: '쉐이디캐릭터',
      searchTerm: 'Shady Character glasses eyewear',
    },
    {
      id: 'bjclassic',
      name: '비제이클래식',
      searchTerm: 'BJ Classic glasses eyewear',
    },
    {
      id: 'harmanoptical',
      name: '하만옵티컬',
      searchTerm: 'Harman Optical glasses eyewear',
    },
    {
      id: 'factory900',
      name: '팩토리900',
      searchTerm: 'Factory900 glasses eyewear',
    },

    {
      id: 'rigaze',
      name: '리가즈',
      searchTerm: 'Rigaze glasses eyewear',
    },

    {
      id: 'prada',
      name: '프라다',
      searchTerm: 'Prada glasses eyewear',
    },
    {
      id: 'garrelight',
      name: '가렛라이트',
      searchTerm: 'Garrelight glasses eyewear',
    },
    {
      id: 'retrosuperfuture',
      name: '레트로슈퍼퓨처',
      searchTerm: 'Retro Super Future glasses eyewear',
    },
    {
      id: 'hfusion',
      name: '에이치퓨전',
      searchTerm: 'HFusion glasses eyewear',
    },
    {
      id: 'feragamo',
      name: '페라가모',
      searchTerm: 'Ferragamo glasses eyewear',
    },

    {
      id: 'tenivan',
      name: '텐아이반',
      searchTerm: 'Ten Ivan glasses eyewear',
    },
    {
      id: 'americanoptical',
      name: '아메리칸옵티컬',
      searchTerm: 'American Optical glasses eyewear',
    },

    {
      id: 'porttangher',
      name: '포트탕헤르',
      searchTerm: 'Porttangher glasses eyewear',
    },
    { id: 'tvr', name: 'TVR', searchTerm: 'TVR glasses eyewear' },

    { id: 'ijp', name: '이지피지', searchTerm: 'IJP glasses eyewear' },
    {
      id: 'kuboraum',
      name: '쿠보라움',
      searchTerm: 'Kuboraum glasses eyewear',
    },
    {
      id: 'versace',
      name: '베르사체',
      searchTerm: 'Versace glasses eyewear',
    },
    { id: 'steady', name: '스테디', searchTerm: 'Steady glasses eyewear' },
    {
      id: 'giparts',
      name: '지파츠',
      searchTerm: 'Giparts glasses eyewear',
    },
    { id: 'gucci', name: '구찌', searchTerm: 'Gucci glasses eyewear' },
    {
      id: 'burberry',
      name: '버버리',
      searchTerm: 'Burberry glasses eyewear',
    },
    {
      id: 'balenciaga',
      name: '발렌시아가',
      searchTerm: 'Balenciaga glasses eyewear',
    },
    {
      id: 'saintlaurent',
      name: '생로랑',
      searchTerm: 'Saint Laurent glasses eyewear',
    },
    {
      id: 'botegaberneta',
      name: '보테가베네타',
      searchTerm: 'Bottega Veneta glasses eyewear',
    },
    {
      id: 'specsmonatana',
      name: '스펙스몬타나',
      searchTerm: 'Specs Montana glasses eyewear',
    },
    {
      id: 'groover',
      name: '그루버',
      searchTerm: 'Groover glasses eyewear',
    },
    { id: 'ujikjo', name: '우직조', searchTerm: 'Ujikjo glasses eyewear' },
    {
      id: 'dolcegabbana',
      name: '돌체앤가바나',
      searchTerm: 'Dolce Gabbana glasses eyewear',
    },
    {
      id: 'gernothlindner',
      name: '제르놋린드너',
      searchTerm: 'Gernoth Lindner glasses eyewear',
    },
    { id: 'aconi', name: '아코니', searchTerm: 'Aconi glasses eyewear' },
    {
      id: 'lazarstudio',
      name: '라자르스튜디오',
      searchTerm: 'Lazar Studio glasses eyewear',
    },
    {
      id: 'lunetabadah',
      name: '루네타바다',
      searchTerm: 'Luneta Bada glasses eyewear',
    },

    {
      id: 'nike',
      name: '나이키',
      searchTerm: 'Nike glasses sunglasses eyewear',
    },
    { id: 'fila', name: '휠라', searchTerm: 'Fila glasses sunglasses eyewear' },

    { id: 'ayame', name: '아야메', searchTerm: 'Ayame glasses eyewear' },
    {
      id: 'albaoptics',
      name: '알바옵틱스',
      searchTerm: 'Alba Optics glasses eyewear',
    },
    {
      id: 'districtvision',
      name: '디스트릭트 비전',
      searchTerm: 'District Vision glasses eyewear',
    },
    {
      id: 'RudyProject',
      name: '루디프로젝트',
      searchTerm: 'RudyProject glasses eyewear',
    },

    {
      id: 'e5ivan',
      name: 'E5 아이반',
      searchTerm: 'E5 Ivan glasses eyewear',
    },
    {
      id: 'lindberg',
      name: '린드버그',
      searchTerm: 'lindberg glasses eyewear',
    },
    {
      id: 'CAZAL',
      name: '카잘',
      searchTerm: 'CAZAL glasses eyewear',
    },
    {
      id: 'JFRay',
      name: '제이에프레이',
      searchTerm: 'JFRay glasses eyewear',
    },
    {
      id: 'Limark',
      name: '림락',
      searchTerm: 'Limark glasses eyewear',
    },
    {
      id: 'Hamburg',
      name: '함브루크',
      searchTerm: 'Hamburg glasses eyewear',
    },
    {
      id: 'Silhouette',
      name: '실루엣',
      searchTerm: 'Silhouette glasses eyewear',
    },
    {
      id: 'FOURNINES',
      name: '포나인즈',
      searchTerm: 'FOURNINES glasses eyewear',
    },
    {
      id: 'ByWP',
      name: '울프강 프록쉐',
      searchTerm: 'ByWP glasses eyewear',
    },
    {
      id: 'Zegna',
      name: '제냐',
      searchTerm: 'Zegna glasses eyewear',
    },
    {
      id: 'NIRO',
      name: '니로',
      searchTerm: 'NIRO glasses eyewear',
    },
    {
      id: 'SteelBrown',
      name: '스틸브라운',
      searchTerm: 'SteelBrown glasses eyewear',
    },
    {
      id: 'Jillstuart',
      name: '질스튜어트',
      searchTerm: 'Jillstuart glasses eyewear',
    },
    {
      id: 'Denova',
      name: '디노바',
      searchTerm: 'Denova glasses eyewear',
    },
    {
      id: 'Dormann',
      name: '도르만',
      searchTerm: 'Dormann glasses eyewear',
    },
    {
      id: 'AgnesB',
      name: '아네스베',
      searchTerm: 'AgnesB glasses eyewear',
    },


  ]

  // 로컬 스토리지에서 이미지와 시간 확인
  async function loadBrandImages() {
    for (const brand of brands) {
      const lastFetchTime = localStorage.getItem(`${brand.id}-fetchTime`);
      const currentTime = new Date().getTime();

      if (lastFetchTime && currentTime - lastFetchTime < oneDayInMillis) {
        const storedImage = localStorage.getItem(`${brand.id}-image`);
        if (storedImage) {
          const brandElement = document.querySelector(`#${brand.id} .brand-image`);
          if (brandElement) {
            brandElement.src = storedImage;
          }
          continue;
        }
      }

      const imageUrl = await fetchBrandImage(brand.searchTerm);
      if (imageUrl) {
        localStorage.setItem(`${brand.id}-image`, imageUrl);
        localStorage.setItem(`${brand.id}-fetchTime`, currentTime.toString());

        const brandElement = document.querySelector(`#${brand.id} .brand-image`);
        if (brandElement) {
          brandElement.src = imageUrl;
        }
      }
    }
  }

  // Pixabay API에서 이미지 가져오기
  async function fetchBrandImage(searchTerm) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      searchTerm
    )}&image_type=photo&per_page=200&safesearch=true&category=fashion`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        const unusedImages = data.hits.filter(
          (hit) => !usedImageUrls.has(hit.webformatURL)
        );

        if (unusedImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * unusedImages.length);
          const imageUrl = unusedImages[randomIndex].webformatURL;
          usedImageUrls.add(imageUrl);
          return imageUrl;
        } else {
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const imageUrl = data.hits[randomIndex].webformatURL;
          usedImageUrls.add(imageUrl);
          return imageUrl;
        }
      } else {
        return 'default-image.jpg';
      }
    } catch (error) {
      console.error('Pixabay API Error:', error);
      return 'default-image.jpg';
    }
  }

  // 페이지 콘텐츠 로드 함수
  async function loadPageContent(page) {
    try {
      const response = await fetch(`${page}.html`);
      if (!response.ok) throw new Error('페이지를 불러오는 데 실패했습니다.');
      const html = await response.text();
      contentArea.innerHTML = html;
      window.scrollTo(0, 0);
      initializeHamburgerMenu();
      loadBrandImages();
    } catch (error) {
      console.error('콘텐츠 로드 오류:', error);
      contentArea.innerHTML = `<p>페이지를 불러오는 데 문제가 발생했습니다.</p>`;
    }
  }

  // 초기 실행
  loadBrandImages();

  // 모달 닫기 처리
  closeButton?.addEventListener('click', closeModal);

  // 모달 외부 클릭 시 닫기 처리
  window.addEventListener('click', (event) => {
    if (event.target === productModal) closeModal();
  });

  // 모달 닫기 함수
  function closeModal() {
    productModal.style.display = 'none';
  }

  // 햄버거 메뉴 열기/닫기
  hamburger.addEventListener('click', toggleMenu);

  // 메뉴 항목 클릭 시 메뉴 닫기
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // 메뉴 열기/닫기 함수
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
  }

  // 메뉴 닫기 함수
  function closeMenu() {
    hamburger.classList.remove('active');
    navbar.classList.remove('active');
  }

  // 페이지 로드 후 햄버거 메뉴 초기화 함수
  function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    hamburger.addEventListener('click', toggleMenu);
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 페이지 로드 후 햄버거 메뉴 초기화
  initializeHamburgerMenu();
});

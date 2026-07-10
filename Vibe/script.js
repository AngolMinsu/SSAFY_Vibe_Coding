/**
 * I AM | 토박이가 말해주는 진짜 광주 사용설명서
 * Vanilla JS 기반 인터랙션 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. 스크롤 애니메이션 (Fade-in 효과)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const checkScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            // 요소가 화면 안으로 85% 들어오면 클래스 추가하여 등장시킴
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };
    
    // 스크롤 이벤트 리스너 등록 및 초기 실행
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 첫 화면에 이미 진입해 있는 요소 처리

    // ==========================================
    // 2. 히어로 버튼 스무스 스크롤 효과
    // ==========================================
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const introSection = document.getElementById('intro');
            if (introSection) {
                introSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==========================================
    // 3. Leaflet 대한민국 기반 광주 지도 연동 및 핀 제어
    // ==========================================
    // 광주광역시 중심 좌표 (위도, 경도)
    const gwangjuCoords = [35.1595, 126.8526]; 
    
    // Leaflet 지도 객체 생성 (id가 'map'인 요소에 바인딩)
    const map = L.map('map', {
        scrollWheelZoom: true // 마우스 휠 스크롤을 통한 줌인/줌아웃 활성화
    }).setView(gwangjuCoords, 11); // 초기 줌 레벨을 11로 설정

    // 오픈스트리트맵(Voyager 테마) 타일 레이어 추가 (웜톤 무드에 매칭)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 📍 광주 로컬 4대 명소 데이터 큐레이션 리스트
    const spots = [
        {
            name: "무등산 국립공원",
            tag: "자연/힐링",
            coords: [35.1341, 126.9890],
            desc: "광주의 영산. 등산 후 내려와서 먹는 보리밥 뷔페와 도토리묵은 타 지역에서 흉내 낼 수 없는 극락의 맛!"
        },
        {
            name: "양동시장 통닭거리",
            tag: "로컬맛집",
            coords: [35.1555, 126.9032],
            desc: "한 마리를 시키면 닭발과 모래주머니까지 양 대야에 고스란히 튀겨주는 압도적인 양! 가마솥 바삭함의 근본입니다."
        },
        {
            name: "동명동 카페거리",
            tag: "핫플레이스",
            coords: [35.1492, 126.9248],
            desc: "과거 학원가 골목이 주택 개조형 감성 카페와 독립서점으로 변신! 광주의 트렌디한 청춘들이 모두 모이는 쉼터."
        },
        {
            name: "1913송정역시장",
            tag: "전통/먹거리",
            coords: [35.1378, 126.7905],
            desc: "광주송정역 바로 앞! 100년 역사의 유서 깊은 골목 정취와 입에서 살살 녹는 송정 떡갈비 골목이 이어집니다."
        }
    ];

    // 마우스 오버 시 나타날 동적 카드 UI 요소 선택
    const infoCard = document.getElementById('infoCard');
    const cardTitle = document.getElementById('cardTitle');
    const cardTag = document.getElementById('cardTag');
    const cardDesc = document.getElementById('cardDesc');

    // 지도 위에 고정될 핀(마커) 순회 배치
    spots.forEach(spot => {
        // 지도 줌 상태에 따라 연동되는 동그라미 형태의 마커 생성
        const marker = L.circleMarker(spot.coords, {
            radius: 10,
            fillColor: '#d9534f', // 핀 기본 색상
            color: '#fff',       // 테두리 색상
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // 핀에 마우스 올렸을 때 (카드 활성화 및 데이터 매핑)
        marker.on('mouseover', () => {
            if (cardTitle && cardTag && cardDesc && infoCard) {
                cardTitle.textContent = spot.name;
                cardTag.textContent = spot.tag;
                cardDesc.textContent = spot.desc;
                infoCard.classList.add('active');
            }
        });

        // 핀에서 마우스 뗐을 때 (카드 숨김)
        marker.on('mouseout', () => {
            if (infoCard) {
                infoCard.classList.remove('active');
            }
        });
    });

    // ==========================================
    // 4. 모달 팝업창 상호작용 (꿀팁 확인)
    // ==========================================
    const tipBtn = document.getElementById('tipBtn');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');

    // 생존 팁 버튼 클릭 시 팝업 열기
    if (tipBtn && popup) {
        tipBtn.addEventListener('click', () => {
            popup.classList.add('show');
        });
    }

    // 닫기 버튼 클릭 시 팝업 닫기
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    }

    // 어두운 배경 영역 클릭 시에도 팝업 닫기
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('show');
            }
        });
    }
});
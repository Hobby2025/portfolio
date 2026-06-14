// =====================================================
//  content.js — 사이트 전체 내용 관리 파일
//  이 파일만 수정하면 모든 영역에 자동 반영됩니다.
//  projects.js 는 프로젝트 카드 내용을 별도 관리합니다.
// =====================================================

const CONTENT = {

  // ---------------------------------------------------
  // 브라우저 탭 제목
  // ---------------------------------------------------
  pageTitle: "EunJin Seo | 데이터 기반 운영 기획자",

  // ---------------------------------------------------
  // 상단 네비게이션
  // ---------------------------------------------------
  nav: {
    logo: "EUNJIN SEO",
    links: [
      { label: "About",   href: "#about" },
      { label: "Work",    href: "#work" },
      { label: "Skills",  href: "#skills" },
      { label: "Contact", href: "#contact", button: true },
    ],
  },

  // ---------------------------------------------------
  // 히어로 (첫 화면)
  // ---------------------------------------------------
  hero: {
    label:   "데이터 기반 운영 기획자",
    title:   "안녕하세요,",
    name:    "서은진",
    suffix:  "입니다.",
    desc:    "데이터를 읽고 전략을 세우고, 직접 자동화까지 구현하는\n운영 기획자입니다.",
    bgText:  "OPS",
    cta: [
      { label: "프로젝트 보기", href: "#work",    style: "primary" },
      { label: "연락하기",      href: "#contact", style: "outline" },
    ],
  },

  // ---------------------------------------------------
  // About 소개
  // ---------------------------------------------------
  about: {
    sectionLabel: "01 / About",
    title:        "데이터로",
    titleEm:      "운영을 설계합니다.",
    paragraphs: [
      "콘텐츠 플랫폼(웹툰·웹소설·숏드라마) 도메인에서 프로모션 전략, BM 정책, 대시보드 구축까지 데이터 기반 운영 전반을 담당했습니다.",
      "기획에 그치지 않고 Python·API를 활용해 운영 자동화 시스템을 직접 구현하며, 분석→전략→실행의 전 과정을 주도합니다.",
    ],
    stats: [
      { num: "4",  suffix: "+", label: "Years Exp." },
      { num: "5",  suffix: "+", label: "Projects"   },
      { num: "95", suffix: "%", label: "업무 단축"   },
    ],
    avatarLetter: "E",
    tags: [
      { label: "데이터 분석",    style: "orange" },
      { label: "운영 자동화",    style: "white"  },
      { label: "프로모션 전략",  style: "orange" },
      { label: "BM 기획",       style: "white"  },
      { label: "Python / API",  style: "orange" },
    ],
  },

  // ---------------------------------------------------
  // Work 섹션 레이블 (카드 내용은 projects.js 에서 관리)
  // ---------------------------------------------------
  work: {
    sectionLabel: "02 / Work",
    title:        "주요 프로젝트",
  },

  // ---------------------------------------------------
  // Skills 역량 & 도구
  // ---------------------------------------------------
  skills: {
    sectionLabel: "03 / Skills",
    title:        "역량 & 도구",
    groups: [
      {
        icon:  "◈",
        title: "Operations Strategy",
        items: [
          "프로모션 기획 및 성과 분석",
          "BM 정책 설계 (코인·정산·계약)",
          "콘텐츠 노출 전략 수립",
          "운영 프로세스 표준화",
        ],
      },
      {
        icon:  "◈",
        title: "Data & Analytics",
        items: [
          "운영 지표 대시보드 설계",
          "A/B 테스트 설계 & 분석",
          "유입·활성·매출 데이터 분석",
          "SQLD / ADsP",
        ],
      },
      {
        icon:  "◈",
        title: "Automation & Dev",
        items: [
          "Python / Playwright 자동화",
          "Google Sheets API / Apps Script",
          "Slack API 연동",
          "운영 예외 처리 로직 설계",
        ],
      },
      {
        icon:  "◈",
        title: "Tools",
        items: [
          "Notion / Figma / Jira",
          "Looker Studio / Tableau",
          "Slack / Confluence",
          "Miro / FigJam",
        ],
      },
    ],
  },

  // ---------------------------------------------------
  // Contact 연락처
  // ---------------------------------------------------
  contact: {
    sectionLabel: "04 / Contact",
    title:        "함께 일해요.",
    desc:         "새로운 기회나 협업 제안을 언제든 환영합니다.\n메일로 편하게 연락 주세요.",
    email:        "seo1004es@naver.com",
    emailLabel:   "이메일 보내기",
    links: [
    //  { label: "LinkedIn →",   href: "#" },
    //  { label: "GitHub →",     href: "#" },
      { label: "포트폴리오", href: "#" },
    ],
  },

  // ---------------------------------------------------
  // Footer
  // ---------------------------------------------------
  footer: {
    left:  "© 2026 EunJin Seo. All rights reserved.",
    right: "Designed & Built by EunJin Seo",
  },
};

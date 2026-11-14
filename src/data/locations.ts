export interface VerifiedFact {
  text: string;
  status: 'disahkan' | 'perlu_disemak';
}

export interface StoryStep {
  stepNumber: number;
  label: string;
  content: string;
}

export interface QuizItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
  fit?: 'cover' | 'contain';
}

export interface LocationData {
  id: string;
  cardTitle: string;
  fullTitle: string;
  imageLabel: string;
  defaultImageUrl?: string;
  galleryImages?: GalleryImage[];
  imageSourceNote?: string;
  hasVerifiedContent: boolean;
  verifiedFacts: VerifiedFact[];
  notesToVerify: string[];
  story60s: StoryStep[];
  keywords: string[];
  quiz: QuizItem[];
  sourceUrl: string | null;
  sourceLabel: string | null;
}

export const LABUAN_LOCATIONS: LocationData[] = [
  {
    id: 'dataran-labuan',
    cardTitle: 'Dataran Labuan',
    fullTitle: 'Dataran Labuan',
    imageLabel: 'Ruang Gambar: Dataran Labuan',
    hasVerifiedContent: false,
    verifiedFacts: [],
    notesToVerify: ['Maklumat belum dimasukkan'],
    story60s: [],
    keywords: [],
    quiz: [],
    sourceUrl: null,
    sourceLabel: null,
  },
  {
    id: 'muzium-marin',
    cardTitle: 'Muzium Marin',
    fullTitle: 'Muzium Marin Labuan',
    imageLabel: 'Ruang Gambar: Muzium Marin Labuan',
    hasVerifiedContent: true,
    verifiedFacts: [
      {
        text: 'Muzium memfokuskan pameran hidupan marin.',
        status: 'disahkan',
      },
      {
        text: 'Antara objektifnya ialah memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan.',
        status: 'disahkan',
      },
      {
        text: 'Muzium memupuk kesedaran menjaga warisan semula jadi.',
        status: 'disahkan',
      },
      {
        text: 'Menurut JMM, rangka paus yang dipamerkan ditemui di Pantai Sebatu, Melaka.',
        status: 'disahkan',
      },
    ],
    notesToVerify: [],
    story60s: [
      {
        stepNumber: 1,
        label: 'Tarikan pembuka',
        content:
          'Selamat datang ke Muzium Marin Labuan. Di sinilah kita dapat melihat pameran yang memfokuskan dunia hidupan marin.',
      },
      {
        stepNumber: 2,
        label: 'Fakta disahkan',
        content:
          'Antara objektif utama muzium ini ialah memberi pengetahuan tentang hidupan marin perairan Borneo, khususnya Labuan. Menurut Jabatan Muzium Malaysia (JMM), rangka paus yang dipamerkan di sini ditemui di Pantai Sebatu, Melaka.',
      },
      {
        stepNumber: 3,
        label: 'Makna tempat',
        content:
          'Selain menjadi tempat pameran, muzium ini wujud untuk memupuk kesedaran kita semua tentang kepentingan menjaga warisan semula jadi.',
      },
      {
        stepNumber: 4,
        label: 'Hubungan dengan pelawat',
        content:
          'Sebagai pelawat, kita berpeluang mengenali hidupan marin di perairan sekitar Borneo dan menghargai khazanah laut yang perlu dipelihara bersama.',
      },
      {
        stepNumber: 5,
        label: 'Soalan atau ajakan',
        content:
          'Sambil kita melangkah masuk untuk melihat pameran hidupan marin dan rangka paus tersebut, apakah satu tindakan mudah yang boleh kita lakukan untuk menjaga warisan semula jadi laut? Mari kita terokai bersama-sama.',
      },
    ],
    keywords: [
      'Hidupan marin',
      'Perairan Borneo & Labuan',
      'Warisan semula jadi',
      'Rangka paus',
      'Pantai Sebatu, Melaka',
    ],
    quiz: [
      {
        id: 'mm-q1',
        question: 'Apakah fokus utama pameran di Muzium Marin Labuan?',
        answer: 'Muzium ini memfokuskan pameran hidupan marin.',
      },
      {
        id: 'mm-q2',
        question:
          'Apakah dua objektif atau peranan utama Muzium Marin Labuan berdasarkan bahan rujukan JMM?',
        answer:
          'Memberi pengetahuan tentang hidupan marin perairan Borneo (khususnya Labuan) dan memupuk kesedaran menjaga warisan semula jadi.',
      },
      {
        id: 'mm-q3',
        question:
          'Menurut JMM, di manakah rangka paus yang dipamerkan di muzium ini ditemui?',
        answer: 'Di Pantai Sebatu, Melaka.',
      },
    ],
    sourceUrl: 'https://www.jmm.gov.my/en/content/labuan-marine-museum',
    sourceLabel: 'Jabatan Muzium Malaysia (JMM) — Muzium Marin Labuan',
  },
  {
    id: 'tanjung-batu',
    cardTitle: 'Tanjung Batu',
    fullTitle: 'Tanjung Batu',
    imageLabel: 'Ruang Gambar: Tanjung Batu',
    hasVerifiedContent: false,
    verifiedFacts: [],
    notesToVerify: ['Maklumat belum dimasukkan'],
    story60s: [],
    keywords: [],
    quiz: [],
    sourceUrl: null,
    sourceLabel: null,
  },
  {
    id: 'tugu-peringatan-perang',
    cardTitle: 'Tugu Peringatan Perang',
    fullTitle: 'Tugu Peringatan Perang Labuan',
    imageLabel: 'Ruang Gambar: Tugu Peringatan Perang Labuan',
    defaultImageUrl: '/assets/aistudio/Labuan-War-Cemetery-Uwe-Aranas_5a4cb839.jpg',
    galleryImages: [
      {
        url: '/assets/aistudio/Labuan-War-Cemetery-Uwe-Aranas_5a4cb839.jpg',
        caption: 'Gambar 1 — Kawasan batu tanda & monumen tengah',
        fit: 'cover',
      },
      {
        url: '/assets/aistudio/labuan-war-cemetery3_0a31b213.jpg',
        caption: 'Gambar 2 — Monumen batu peringatan',
        fit: 'contain',
      },
      {
        url: '/assets/aistudio/Labuan-war-cemetery_79b76294.jpg',
        caption: 'Gambar 3 — Pandangan landskap & taman',
        fit: 'cover',
      },
    ],
    imageSourceNote:
      '3 gambar dibekalkan oleh pengguna (Labuan-War-Cemetery-Uwe-Aranas_5a4cb839.jpg, labuan-war-cemetery3_0a31b213.jpg, Labuan-war-cemetery_79b76294.jpg).',
    hasVerifiedContent: true,
    verifiedFacts: [
      {
        text: 'Tugu Peringatan Perang Labuan lebih dikenali sebagai Labuan War Cemetery & Memorial.',
        status: 'disahkan',
      },
      {
        text: 'Terletak di Jalan Tanjung Batu.',
        status: 'disahkan',
      },
      {
        text: 'Merupakan tanah perkuburan perang terbesar di Malaysia.',
        status: 'disahkan',
      },
      {
        text: 'Menempatkan lebih 3,900 wira Perang Dunia Kedua.',
        status: 'disahkan',
      },
    ],
    notesToVerify: [
      'Pautan sumber rujukan rasmi (URL) belum dibekalkan.',
      'Butiran tambahan seperti tahun atau tarikh pembinaan, pihak pengelola dan pecahan negara atau pasukan wira tidak mencukupi dalam bahan semasa dan masih perlu disemak sebelum disampaikan.',
    ],
    story60s: [
      {
        stepNumber: 1,
        label: 'Tarikan pembuka',
        content:
          'Selamat datang ke Tugu Peringatan Perang Labuan, yang lebih dikenali sebagai Labuan War Cemetery & Memorial, terletak di Jalan Tanjung Batu.',
      },
      {
        stepNumber: 2,
        label: 'Fakta disahkan',
        content:
          'Tempat ini merupakan tanah perkuburan perang terbesar di Malaysia dan menempatkan lebih 3,900 wira Perang Dunia Kedua.',
      },
      {
        stepNumber: 3,
        label: 'Makna tempat',
        content:
          'Kawasan ini menjadi ruang peringatan bagi mengenang lebih 3,900 wira Perang Dunia Kedua yang disemadikan di sini. (Butiran sejarah lanjut masih perlu disemak daripada sumber rasmi.)',
      },
      {
        stepNumber: 4,
        label: 'Hubungan dengan pelawat',
        content:
          'Sebagai pelawat, kita dapat menghargai nilai keamanan serta mengekalkan ketenangan dan adab menghormati wira Perang Dunia Kedua sepanjang berada di sini.',
      },
      {
        stepNumber: 5,
        label: 'Soalan atau ajakan',
        content:
          'Sebelum kita melangkah masuk memerhati kawasan tanah perkuburan perang terbesar di Malaysia ini, apakah satu nilai keamanan yang ingin kita ingat daripada lawatan hari ini? Mari kita melawat dengan penuh hormat.',
      },
    ],
    keywords: [
      'Labuan War Cemetery & Memorial',
      'Jalan Tanjung Batu',
      'Tanah perkuburan perang terbesar di Malaysia',
      'Lebih 3,900 wira',
      'Perang Dunia Kedua',
    ],
    quiz: [
      {
        id: 'tpp-q1',
        question:
          'Apakah nama lain bagi Tugu Peringatan Perang Labuan dan di manakah ia terletak?',
        answer: 'Labuan War Cemetery & Memorial, terletak di Jalan Tanjung Batu.',
      },
      {
        id: 'tpp-q2',
        question:
          'Apakah kedudukan Tugu Peringatan Perang Labuan berbanding tanah perkuburan perang lain di Malaysia?',
        answer: 'Ia merupakan tanah perkuburan perang terbesar di Malaysia.',
      },
      {
        id: 'tpp-q3',
        question:
          'Berapakah bilangan wira Perang Dunia Kedua yang ditempatkan di lokasi ini mengikut bahan yang dibekalkan?',
        answer: 'Lebih 3,900 wira Perang Dunia Kedua.',
      },
    ],
    sourceUrl: null,
    sourceLabel:
      'Sumber bertulis: Bahan yang dibekalkan peserta/pengguna (pautan sumber rujukan rasmi belum dimasukkan).',
  },
];

import gisMapImg from '~/assets/gis-map.svg'
import mlImg from '~/assets/ml.jpg'
import owallaPosImg from '~/assets/owalla-pos-thumbnail.svg'
import psImg from '~/assets/ps.png'

export interface Education {
  school: string
  major: string
  period: string
}

export interface Project {
  title: string
  description: string
  image?: string
  imageAlt?: string
  technologies: string[]
  category?: string
  location?: string
}

export interface Experience {
  place: string
  role: string
  period: string
  points: string[]
}

export const profile = {
  name: 'Farrel Octanov R.G.',
  role: 'Mahasiswa Teknik Informatika',
  focus: 'Pengembangan Web • Multimedia • Machine Learning • Microsoft Office',
  location: 'Jember, Indonesia',
  birthInfo: 'Jember, 16 Oktober 2003',
  school: 'Universitas Muhammadiyah Jember',
  major: 'S1 Teknik Informatika'
}

export const aboutParagraphs: string[] = [
  'Saya merupakan lulusan S1 Teknik Informatika Universitas Muhammadiyah Jember dengan ketertarikan pada pengembangan teknologi, multimedia, dan pengelolaan sistem informasi. Memiliki pengalaman dalam pengembangan sistem berbasis web, desain grafis, serta pemetaan digital menggunakan Quantum GIS. Saya juga memiliki pengalaman dalam kegiatan operasional, pengelolaan administrasi, dan pelayanan pelanggan yang membentuk kemampuan saya dalam bekerja secara sistematis, teliti, dan bertanggung jawab.',
  'Saya terbiasa mempelajari hal baru, menganalisis permasalahan, serta menyelesaikan pekerjaan secara mandiri maupun kolaboratif. Dengan kombinasi kemampuan teknis dan pengalaman lintas bidang, saya berkomitmen untuk terus mengembangkan kompetensi serta memberikan kontribusi yang efektif dan sesuai dengan kebutuhan pekerjaan maupun proyek.'
]

/**
 * Konversi string ke decimal HTML character entities untuk perlindungan terhadap scraper sederhana.
 * Contoh: 'a@b.com' -> '&#97;&#64;&#98;&#46;&#99;&#111;&#109;'
 * Browser me-render normal, pengguna tetap dapat membaca dan menyalin (copy),
 * tetapi scraper berbasis regex teks biasa tidak menemukan karakter '@' langsung.
 */
export const toHtmlEntities = (str: string): string =>
  str.split('').map((c) => `&#${c.charCodeAt(0)};`).join('')

/**
 * Mailto link berstandar RFC 6068 dengan percent-encoding pada karakter '@' (%40).
 * Menghilangkan karakter '@' mentah dari atribut HTML tanpa merusak fungsi mailto native.
 */
export const toMailtoHref = (email: string): string =>
  `mailto:${email.replace('@', '%40')}`

const emailAddress = 'foctamov@gmail.com'

export const contact = {
  email: emailAddress,
  emailHtml: toHtmlEntities(emailAddress),
  emailHref: toMailtoHref(emailAddress),
  emailSubject: 'Kontak dari Portfolio',
  whatsappNumber: '6282232425084',
  whatsappDisplay: '082232425084',
  whatsappText: 'Halo Farrel, saya ingin menghubungi Anda mengenai portfolio.',
  instagram: 'https://www.instagram.com/_farrel.16/',
  kitalulus: 'https://kerja.kitalulus.com/id/u/farrel-octanov-pfka'
}

export const education: Education[] = [
  {
    school: 'Universitas Muhammadiyah Jember',
    major: 'S1 Teknik Informatika',
    period: 'September 2022 – Oktober 2026'
  },
  {
    school: 'SMK Negeri 1 Jember',
    major: 'Jurusan Multimedia',
    period: '2019 – 2022'
  }
]

export const projects: Project[] = [
  {
    title: 'Perancangan Peta Administrasi Desa Sumberejo',
    category: 'Geographic Information System / Digital Mapping',
    location: 'Desa Sumberejo, Kecamatan Ambulu, Kabupaten Jember, Jawa Timur',
    description:
      'Perancangan peta administrasi Desa Sumberejo menggunakan Quantum GIS (QGIS) untuk menyajikan informasi batas wilayah dan pembagian administrasi desa dalam bentuk visual spasial yang informatif. Project ini berfokus pada pengolahan data geospasial, penyusunan batas administrasi, serta visualisasi informasi wilayah guna mendukung kebutuhan dokumentasi dan pemetaan desa.',
    image: gisMapImg,
    imageAlt: 'Peta Administrasi Desa Sumberejo hasil perancangan Quantum GIS',
    technologies: [
      'Quantum GIS (QGIS)',
      'Geographic Information System (GIS)',
      'Spatial Data Processing',
      'Cartographic Visualization'
    ]
  },
  {
    title: 'Machine Learning',
    description:
      'Project machine learning yang berfokus pada klasifikasi data, mencakup preprocessing data, TF-IDF, pembagian dataset, Random Oversampling, Multinomial Naive Bayes, dan evaluasi model.',
    image: mlImg,
    imageAlt: 'Ilustrasi alur Machine Learning Klasifikasi',
    technologies: ['Python', 'NLP', 'TF-IDF', 'Multinomial Naive Bayes', 'Scikit-Learn']
  },
  {
    title: 'Sistem Kasir dan Stok Barang Laravel',
    category: 'Web Application & POS',
    location: 'OWALLA.ID',
    description:
      'Pengembangan sistem kasir dan pengelolaan stok barang berbasis Laravel.',
    image: owallaPosImg,
    imageAlt: 'Ilustrasi sistem kasir POS dan manajemen stok barang OWALLA.ID',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Web System']
  },
  {
    title: 'Simple Tools',
    description:
      'Kumpulan tools sederhana, seperti QR Generator, Comment Scraper, dan utilitas lainnya.',
    image: psImg,
    imageAlt: 'Ilustrasi developer tools dan utilitas',
    technologies: ['JavaScript', 'Web Utilities', 'Automation']
  }
]

export const softSkills: string[] = [
  'Problem Solving',
  'Analytical Thinking',
  'Communication',
  'Teamwork',
  'Adaptability',
  'Time Management',
  'Attention to Detail',
  'Research'
]

export const experience: Experience[] = [
  {
    place: 'Saury Motor',
    role: 'Staf Pendukung Operasional (Part-time)',
    period: 'Januari 2026 – Sekarang',
    points: [
      'Mendukung proses jual-beli sepeda motor melalui inspeksi awal kondisi fisik dan kelayakan unit.',
      'Membantu perbaikan dasar dan detailing kendaraan sebelum dipasarkan.',
      'Melakukan perawatan kendaraan dengan teliti untuk menjaga kualitas unit.'
    ]
  },
  {
    place: 'Owalla.id',
    role: 'Mahasiswa Praktik Kerja Lapangan (PKL)',
    period: '26 Maret 2025 – 12 Juli 2025',
    points: [
      'Merancang sistem invoice berbasis web untuk membantu efisiensi administrasi transaksi.',
      'Mendesain alur sistem untuk pengelolaan invoice, data, dan riwayat transaksi.',
      'Menyusun dokumentasi teknis, rancangan sistem, dan laporan akhir.'
    ]
  },
  {
    place: 'Arena Bordir',
    role: 'Siswa Magang',
    period: 'Januari – Juli 2021',
    points: [
      'Mengoperasikan mesin bordir digital dan perangkat lunak pendukung.',
      'Membantu pengelolaan pesanan hingga proses pengiriman.',
      'Memberikan pelayanan kepada pelanggan secara responsif dan ramah.'
    ]
  }
]

export const organizations: Experience[] = [
  {
    place: 'Palang Merah Remaja (PMR)',
    role: 'Anggota Inti',
    period: '2020 – 2022',
    points: [
      'Membantu kegiatan pertolongan pertama di lingkungan sekolah.',
      'Membantu pelatihan dan peningkatan keterampilan anggota baru.'
    ]
  },
  {
    place: 'Forkafest 4.0',
    role: 'Relawan Kepanitiaan',
    period: '5 – 23 Juli 2024',
    points: [
      'Membantu persiapan dan penataan fasilitas acara.',
      'Memberikan dukungan teknis backstage.',
      'Membantu kebutuhan operasional lintas divisi.'
    ]
  }
]

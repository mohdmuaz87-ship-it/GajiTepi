/* ------------------------------------------------------------------
   GajiTepi — affiliate programme directory
   One source of truth for every programme we track and for the blog
   posts attached to it. The directory page (#programs) lists all of
   them; each programme page (#program/:id) shows the posts tied to it.
   ------------------------------------------------------------------ */

export type ProgramGroup = 'Marketplace' | 'Network' | 'Produk digital' | 'Iklan & content'

export type ProgramStatus = 'Disyorkan' | 'Layak' | 'Kondisional'

export type RelatedPost = {
  id: string
  type: string
  title: string
  read: string
  date: string
  color: string
  mark: string
  excerpt: string
}

export type Program = {
  id: string
  name: string
  category: string
  description: string
  score: number
  accent: string
  logo: string
  initials: string
  tag: string
  payout: string
  capital: string
  followers: string
  commission: string
  group: ProgramGroup
  status: ProgramStatus
  bestFor: string
  since: string
  approval: string
  difficulty: 'Mudah' | 'Sederhana' | 'Menantang'
  featured: boolean
  highlights: string[]
  watchOuts: string[]
  verdict: string
  review: { label: string; value: number }[]
  posts: RelatedPost[]
}

const post = (
  id: string,
  type: string,
  title: string,
  read: string,
  date: string,
  color: string,
  mark: string,
  excerpt: string,
): RelatedPost => ({ id, type, title, read, date, color, mark, excerpt })

export const programs: Program[] = [
  {
    id: 'shopee',
    name: 'Shopee Affiliate',
    category: 'Marketplace',
    description: 'Promote produk yang orang Malaysia memang cari setiap hari.',
    score: 4.6,
    accent: '#f45b35',
    logo: 'S',
    initials: 'SH',
    tag: 'Paling beginner-friendly',
    payout: 'RM15',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: '1% - 12%',
    group: 'Marketplace',
    status: 'Disyorkan',
    bestFor: 'Berniaga dari rumah, guna telefon sahaja',
    since: 'Disemak sejak 2023',
    approval: 'Kelulusan serta-merta',
    difficulty: 'Mudah',
    featured: true,
    highlights: [
      'Katalog paling luas, jadi sentiasa ada produk untuk promote',
      'Komisen Shopee Live automatik bila anda stream',
      'Payout RM15, jadi kumpul order dulu sebelum cashout',
    ],
    watchOuts: [
      'Minimum payout RM15 cepat terkumpul, jadi jangan tunggu bulan depan untuk cashout.',
      'Katalog besar membuat orang cenderung promote produk tanpa understanding yang betul.',
      'Cookie attribution pendek, jadi link perlu dikongsi segera selepas dibuka.',
    ],
    verdict: 'Sesuai untuk beginner yang mahu mula dengan RM0 modal.',
    review: [
      { label: 'Ease of start', value: 4.8 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 3.9 },
      { label: 'Payout speed', value: 4.2 },
      { label: 'Support & community', value: 4.4 },
    ],
    posts: [
      post('shopee-1', 'Panduan', 'Cara daftar Shopee Affiliate Malaysia: panduan lengkap 2026', '8 min baca', '26 Sep 2026', '#f8e6da', 'SH', 'Langkah sebenar dari membuka akaun sampai payout pertama masuk, termasuk senarai menu yang betul dan kesilapan yang paling kerap berlaku.'),
      post('shopee-2', 'Nisbah komisen', 'Shopee Affiliate berbanding TikTok Shop: mana lebih untung bulan pertama?', '6 min baca', '18 Sep 2026', '#fbe3dc', '12', 'Kami bandingkan kadar komisen, tempoh payout dan purata nilai order supaya anda tahu program mana yang lebih cepat menghasilkan.'),
      post('shopee-3', 'Strategi', '7 produk Shopee yang paling laku bulan ini, dan kenapa', '5 min baca', '11 Sep 2026', '#f4e7dd', '07', 'Tiga kategori yang konsisten berputar: rumah, ibu dan gadget. Termasuk cara mencari produk tanpa data dalam.'),
      post('shopee-4', 'Kesilapan', '5 kesilapan Shopee Affiliate yang membuat komisen tertahan', '7 min baca', '2 Sep 2026', '#f0e2e8', '05', 'Kebanyakan komisen tertahan bukan sebab platform, tetapi kerana cookie tamat tempoh atau link tidak dikongsi dengan betul.'),
      post('shopee-5', 'Real talk', 'RM412 dalam 30 hari: satu bulan Shopee Affiliate yang jujur', '9 min baca', '24 Ogo 2026', '#e6efe4', 'RM', 'Rekod sebenar seorang reader selepas tiga bulan promote, termasuk apa yang langsung tidak berkesan.'),
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    category: 'Social commerce',
    description: 'Video pendek, live dan content yang terus menjadi jualan.',
    score: 4.3,
    accent: '#171717',
    logo: '♪',
    initials: 'TT',
    tag: 'Potensi viral',
    payout: 'RM10',
    capital: 'RM0',
    followers: '1,000+ untuk LIVE',
    commission: '1% - 10%',
    group: 'Marketplace',
    status: 'Disyorkan',
    bestFor: 'Suka kamera dan selesa di hadapan kamera',
    since: 'Disemak sejak 2024',
    approval: 'Kelulusan 24 - 72 jam',
    difficulty: 'Menantang',
    featured: true,
    highlights: [
      'Video pendek, jadi tak perlu keluar banyak duit untuk equipment',
      'Pembeli Malaysia sudah biasa membeli terus dalam app',
      'Komisen LIVE lebih tinggi berbanding video biasa',
    ],
    watchOuts: [
      'Syarat 1,000 pengikut mengecualikan ramai yang baru bermula.',
      'Akaun boleh turun naik apabila video melanggar alap platform.',
      'Komisen bergantung pada engagement, bukan jumlah views semata.',
    ],
    verdict: 'Berbaloi kalau anda selesa di hadapan kamera, atau ada partner yang boleh handle LIVE.',
    review: [
      { label: 'Ease of start', value: 4.2 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 3.6 },
      { label: 'Payout speed', value: 4.4 },
      { label: 'Support & community', value: 3.9 },
    ],
    posts: [
      post('tiktok-1', 'Panduan', 'Cara daftar TikTok Shop Affiliate di Malaysia, lengkap dengan syarat LIVE', '9 min baca', '21 Sep 2026', '#e0e9dd', 'TT', 'Syarat 1,000 pengikut, cara menghubungi akaun Seller Centre dan apa yang berlaku kalau akaun ditolak.'),
      post('tiktok-2', 'Kiraan sebenar', 'Berapa boleh dapat dengan TikTok Shop Affiliate? Kiraan sebenar', '11 min baca', '14 Sep 2026', '#dce8de', 'RM', 'Kami pecahkan bagaimana komisen dikira untuk video, LIVE dan Affiliate Collab, dengan contoh order sebenar.'),
      post('tiktok-3', 'Kandungan', '5 idea video TikTok Shop yang biasanya mendapat order', '6 min baca', '7 Sep 2026', '#e4eee5', '05', 'Unboxing pantas, menyelesaikan satu masalah, before dan after, serta dua lagi yang tidak perlu alat khas.'),
      post('tiktok-4', 'Risiko', 'Akaun TikTok Shop turun naik: sebab dan cara elak', '8 min baca', '29 Ogo 2026', '#e8e2e0', '!', 'Paparan video yang melanggar alap membawa akaun turun sekali dan tempoh advertise menjadi lebih panjang.'),
    ],
  },
  {
    id: 'involve',
    name: 'Involve Asia',
    category: 'Affiliate network',
    description: 'Satu akaun untuk ratusan jenama dan kempen tempatan.',
    score: 4.1,
    accent: '#6954d9',
    logo: 'i',
    initials: 'IA',
    tag: 'Banyak pilihan jenama',
    payout: 'RM80',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: 'Berbeza ikut jenama',
    group: 'Network',
    status: 'Disyorkan',
    bestFor: 'Tak mahu bergantung pada satu marketplace sahaja',
    since: 'Disemak sejak 2023',
    approval: 'Kelulusan 1 - 3 hari',
    difficulty: 'Sederhana',
    featured: true,
    highlights: [
      'Satu akaunquet relentlesslyconnecting ratusan jenama tempatan',
      'Kadar komisen ditetapkan oleh jenama, jadi ada yang lebih tinggi',
      'Minimum payout tinggi, jadi perlu kumpul sales sebelum cashout',
    ],
    watchOuts: [
      'Minimum payout RM80 lebih tinggi berbanding marketplace.',
      'Kadar komisen berbeza mengikut jenama, jadi perlu semak satu per satu.',
      'Kelulusan mengambil 1 hingga 3 hari, bukan serta-merta.',
    ],
    verdict: 'Pilihan paling fleksibel, tetapi kena disiplin kumpul sales sebelum payout.',
    review: [
      { label: 'Ease of start', value: 4 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 4.1 },
      { label: 'Payout speed', value: 3.4 },
      { label: 'Support & community', value: 4.3 },
    ],
    posts: [
      post('involve-1', 'Panduan', 'Cara daftar Involve Asia dan memilih kempen yang berbaloi', '8 min baca', '19 Sep 2026', '#e3e0f5', 'IA', 'Cara mengisi borang, memilih kategori kempen dan mencari yang mana yang perlu dielakkan kerana minimum sales tinggi.'),
      post('involve-2', 'Strategi', 'Kempen Involve Asia yang paling mudah untuk pendatang baru', '6 min baca', '9 Sep 2026', '#e6e2f7', '06', 'Habiskan masa dengan tiga kempen ini sebelum mencuba kempen yang susah dengan target 50 jualan.'),
      post('involve-3', 'Nisbah komisen', 'Perbandingan komisen: Involve Asia berbanding marketplace', '7 min baca', '1 Sep 2026', '#ded9f2', 'VS', 'Network menang apabila jenama unik, marketplace menang apabila produk dicari dengan tinggi.'),
    ],
  },
  {
    id: 'lazada',
    name: 'Lazada Affiliate',
    category: 'Marketplace',
    description: 'Sesuai kalau content anda fokus gadget, rumah dan lifestyle.',
    score: 3.8,
    accent: '#263bda',
    logo: 'L',
    initials: 'LZ',
    tag: 'Untuk niche reviewer',
    payout: 'RM30',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: '2% - 10%',
    group: 'Marketplace',
    status: 'Kondisional',
    bestFor: 'Reviewer gadget dan rumah',
    since: 'Disemak sejak 2024',
    approval: 'Kelulusan 1 - 2 hari',
    difficulty: 'Sederhana',
    featured: true,
    highlights: [
      'Trafik tinggi dari orang yang memang mencari barang dalam Bahasa Melayu',
      'Komisen gadget lebih tinggi berbanding barangan rumah',
      'Tools review dan banner jenama membantu meningkatkan conversion',
    ],
    watchOuts: [
      'Kadar komisen gadget lebih tinggi, tetapi barangan rumah cepat berkahwin.',
      'Trafik tinggi tidak menjamin conversion tinggi.',
      'Alat review platform menambah masa sebelum sesuatu artikel boleh publish.',
    ],
    verdict: 'Baik untuk niche gadget, tetapi jangan bergantung pada satu marketplace sahaja.',
    review: [
      { label: 'Ease of start', value: 3.9 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 3.7 },
      { label: 'Payout speed', value: 3.8 },
      { label: 'Support & community', value: 3.6 },
    ],
    posts: [
      post('lazada-1', 'Panduan', 'Cara daftar Lazada Affiliate Malaysia dan mula mendapat komisen', '8 min baca', '17 Sep 2026', '#e2e5f7', 'LZ', 'Langkah daftar, cara mencari Product Feed ID dan memastikan link anda direkodkan dengan betul.'),
      post('lazada-2', 'Niche', 'Niche terbaik untuk Lazada Affiliate: gadget, rumah atau parenting?', '6 min baca', '5 Sep 2026', '#e4e7f9', '03', 'Data konversi bagi tiga niche, termasuk purata nilai order dan kadar click to cart.'),
      post('lazada-3', 'Kesilapan', 'Kenapa komisen Lazada tidak masuk ke akaun anda', '5 min baca', '27 Ogo 2026', '#e0e3f5', '?', 'Cookie tamat tempoh, pesanan dibatalkan selepas pembayaran, dan cara menyemak tracker.'),
    ],
  },
  {
    id: 'blogr',
    name: 'Blogr',
    category: 'Affiliate network',
    description: 'Rangkaian pengiklan Malaysia dengan program rewards.',
    score: 3.9,
    accent: '#1f7a5c',
    logo: 'b',
    initials: 'BL',
    tag: 'Bonus RM200',
    payout: 'RM200',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: '5% - 30%',
    group: 'Network',
    status: 'Layak',
    bestFor: 'Blog dan content dalam Bahasa Melayu',
    since: 'Disemak sejak 2025',
    approval: 'Kelulusan 2 - 5 hari',
    difficulty: 'Sederhana',
    featured: false,
    highlights: [
      'Kadar komisen dalam network memang tinggi, ada yang sampai 30%',
      'Program rewards tambah RM200 apabila capai target bulanan',
      'Pengiklan pelbagai skop, termasuk jenama tempatan',
    ],
    watchOuts: [
      'Minimum payout RM200 paling tinggi dalam senarai ini.',
      'Rewards perlu capai target bulanan, jadi kurang sesuai untuk orang yang jarang publish.',
      'Kebanyakan pengiklan fokus Bahasa Melayu, jadi niche yang sesuai lebih sempit.',
    ],
    verdict: 'Sangat berbaloi kalau ada trafik dalam Bahasa Melayu dan fokus pada pengiklan tempatan.',
    review: [
      { label: 'Ease of start', value: 3.8 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 4 },
      { label: 'Payout speed', value: 3.5 },
      { label: 'Support & community', value: 4.2 },
    ],
    posts: [
      post('blogr-1', 'Panduan', 'Cara daftar Blogr sebagai publisher dan mula mendapat kempen', '7 min baca', '16 Sep 2026', '#dff0e7', 'BL', 'Borang publisher, cara memilih niche dan bagaimana rewards diuruskan dalam program.'),
      post('blogr-2', 'Rewards', 'Program rewards Blogr: bagaimana RM200 boleh dicapai', '5 min baca', '4 Sep 2026', '#e2f1e9', 'RM', 'Breakdown tier rewards dan contoh untuk mencapai target dengan trafik sederhana.'),
      post('blogr-3', 'Strategi', 'Trafik Bahasa Melayu dan kelantingan: hubungannya dengan jualan', '6 min baca', '22 Ogo 2026', '#dceee4', 'BM', 'Mengapa halaman Bahasa Melayu dengan trafik sederhana boleh memberi keputusan lebih baik berbanding halaman dalam Bahasa Inggeris yang menerima trafik lebih besar.'),
    ],
  },
  {
    id: 'ios2u',
    name: 'iOS 2u',
    category: 'Produk digital',
    description: 'Kursus dan produk digital tempatan dengan komisen berulang.',
    score: 3.7,
    accent: '#2f6fd0',
    logo: 'i2',
    initials: 'I2',
    tag: 'Komersial berulang',
    payout: 'RM50',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: '20% - 40%',
    group: 'Produk digital',
    status: 'Layak',
    bestFor: 'Menjual produk digital dan kursus',
    since: 'Disemak sejak 2025',
    approval: 'Kelulusan 1 - 3 hari',
    difficulty: 'Sederhana',
    featured: false,
    highlights: [
      'Kadar komisen paling tinggi dalam senarai ini, sampai 40%',
      'Tiada kos fulfilment, produk dihantar secara digital terus',
      'Jualan berulang, jadi komisen tetap jalan selepas jualan pertama',
    ],
    watchOuts: [
      'Memerlukan audience yang sudah tahu nilai kursus tersebut.',
      'Tiada penghantaran fizikal, jadi semuanya bergantung pada marketing sendiri.',
      'Kadar 40% biasanya datang dengan terma payout yang lebih ketat.',
    ],
    verdict: 'Kadar komisen terbaik, tetapi perlukan audience yang sudah memahami nilainya.',
    review: [
      { label: 'Ease of start', value: 3.6 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 3.4 },
      { label: 'Payout speed', value: 3.6 },
      { label: 'Support & community', value: 3.7 },
    ],
    posts: [
      post('ios2u-1', 'Panduan', 'Cara menjual kursus digital dengan iOS 2u sebagai affiliate', '8 min baca', '13 Sep 2026', '#dfeaf6', 'i2', 'Cara memilih produk yang sesuai untuk niche anda dan membina halaman jualan yang bukan sekadar pautan.'),
      post('ios2u-2', 'Nisbah komisen', 'Kadar komisen 40%: betul ke atau ada catch?', '5 min baca', '30 Ogo 2026', '#e3edf8', '40', 'Kami semak terma sebenar dan kadar jualan enam bulan bagi setiap kategori kursus.'),
      post('ios2u-3', 'Strategi', 'Bina halaman jualan digital yang tidak kelihatan seperti iklan', '7 min baca', '15 Ogo 2026', '#dbe8f5', '07', 'Empat elemen yang membuat reader percaya, termasuk satu yang paling ramai tertinggal.'),
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon Associates MY',
    category: 'Marketplace global',
    description: 'Akses marketplace terbesar di dunia serta produk yang sukar didapat di Malaysia.',
    score: 3.4,
    accent: '#ff9900',
    logo: 'a',
    initials: 'AM',
    tag: 'Produk global',
    payout: 'RM15',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: '1% - 10%',
    group: 'Marketplace',
    status: 'Kondisional',
    bestFor: 'Mencari produk yang sukar didapat di Malaysia',
    since: 'Disemak sejak 2025',
    approval: 'Kelulusan serta-merta',
    difficulty: 'Mudah',
    featured: false,
    highlights: [
      'Katalog hampir tiada had, apa sahaja boleh dijumpai',
      'Program membayar 24 jam selepas jualan selesai',
      'Boleh digabungkan dengan tag Amazon dan storefront sendiri',
    ],
    watchOuts: [
      'Kadar komisen rendah berbanding program tempatan.',
      'Payout mengambil kitaran 14 hari, dan retur boleh membatalkan pesanan.',
      'Produk dihantar dari luar negara, jadi masa sampai lebih lama.',
    ],
    verdict: 'Bagus sebagai tambahan, tetapi jangan bergantung pada program ini sahaja.',
    review: [
      { label: 'Ease of start', value: 4.5 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 3 },
      { label: 'Payout speed', value: 3.2 },
      { label: 'Support & community', value: 3.4 },
    ],
    posts: [
      post('amazon-1', 'Panduan', 'Cara daftar Amazon Associates Malaysia dan menghubungkan akaun', '7 min baca', '12 Sep 2026', '#fae9d0', 'AM', 'Langkah daftar, cara mengesahkan identiti dan menyemak tracker selepas jualan pertama.'),
      post('amazon-2', 'Strategi', 'Produk Amazon yang sukar didapat di Malaysia', '6 min baca', '28 Ogo 2026', '#fbecd6', '??', 'Empat produk yang dicari dengan tinggi di Malaysia tetapi hanya ada di marketplace global.'),
      post('amazon-3', 'Real talk', 'Amazon Associates: kenapa payout mengambil masa lebih lama', '5 min baca', '12 Ogo 2026', '#f6e4cb', '24', 'Cycle payout 14 hari, retur yang membatalkan pesanan dan cara menyemak status transaksi.'),
    ],
  },
  {
    id: 'adsense',
    name: 'Google AdSense Malaysia',
    category: 'Iklan & content',
    description: 'Jualan ruang iklan, sesuai apabila trafik sudah ada.',
    score: 3.2,
    accent: '#4285f4',
    logo: 'G',
    initials: 'AD',
    tag: 'Perlu trafik',
    payout: 'RM80',
    capital: 'RM0',
    followers: 'Tiada minimum',
    commission: 'Bergantung RPM halaman',
    group: 'Iklan & content',
    status: 'Kondisional',
    bestFor: 'Selepas trafik stabil, bukan untuk beginner',
    since: 'Disemak sejak 2025',
    approval: 'Kelulusan 2 - 4 minggu',
    difficulty: 'Menantang',
    featured: false,
    highlights: [
      'Pendapatan bergantung pada RPM, bukan sekadar jumlah views',
      'Bayaran tetap setiap bulan selepas kelulusan',
      'Sesuai digabungkan dengan affiliate supaya income lebih stabil',
    ],
    watchOuts: [
      'Kelulusan mengambil 2 hingga 4 minggu selepas memohon kali pertama.',
      'Pendapatan bergantung pada RPM, jadi trafik besar tidak menjamin hasil besar.',
      'Tidak sesuai sebagai sumber pendapatan pertama.',
    ],
    verdict: 'Bukan untuk permulaan. Tunggu trafik dahulu, baru mula iklankan.',
    review: [
      { label: 'Ease of start', value: 2.4 },
      { label: 'Modal', value: 5 },
      { label: 'Product knowledge', value: 2.9 },
      { label: 'Payout speed', value: 3.3 },
      { label: 'Support & community', value: 3.1 },
    ],
    posts: [
      post('adsense-1', 'Panduan', 'Cara daftar Google AdSense dan langkah ke arah kelulusan', '9 min baca', '10 Sep 2026', '#dfe8f7', 'G', 'Apa yang perlu ada pada blog sebelum memohon, dan sebab majoriti ditolak pada pusingan pertama.'),
      post('adsense-2', 'Pendapatan', 'RPM AdSense di Malaysia: berapa yang realistis?', '7 min baca', '25 Ogo 2026', '#e3ebf8', 'RM', 'Angka sebenar bagi niche teknologi, perjalanan dan kewangan, supaya jangkaan anda kekal munasabah.'),
      post('adsense-3', 'Strategi', 'Gandukan AdSense dengan affiliate: strategi yang kami guna', '8 min baca', '8 Ogo 2026', '#dce7f6', '2x', 'Bagaimana membina dua sumber pendapatan pada halaman yang sama tanpa menambah kerja penulisan.'),
    ],
  },
]

/** The subset we have personally tested, used by the homepage and compare matrix. */
export const featuredPrograms = programs.filter((item) => item.featured)

export const programGroups: (ProgramGroup | 'Semua')[] = [
  'Semua',
  'Marketplace',
  'Network',
  'Produk digital',
  'Iklan & content',
]

export const findProgram = (id: string) => programs.find((item) => item.id === id)

export const postsForProgram = (id: string) => findProgram(id)?.posts ?? []

/** Newest first, across every programme. */
export const allPosts = programs
  .flatMap((item) => item.posts.map((entry) => ({ ...entry, program: item })))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

import { IMG } from './company.js'

export const categories = [
  {
    id: 'corrugated', folder: 'corrugated-cardboard-production-line', code: 'CRG',
    name: { vi: 'Dây chuyền sản xuất carton sóng', en: 'Corrugated Cardboard Production Line' },
    short: { vi: 'Dây chuyền sóng', en: 'Corrugated Line' },
    desc: { vi: 'Dây chuyền 3/5/7 lớp hoàn chỉnh, từ cuộn giấy đến tấm thành phẩm — tốc độ cao, sóng đồng đều.', en: 'Complete 3/5/7-ply lines from mill roll to finished sheet — high speed, consistent flutes.' }
  },
  {
    id: 'flexo', folder: 'flexo-printer', code: 'FLX',
    name: { vi: 'Máy in Flexo xẻ rãnh bế', en: 'Flexo Printer Slotter Die-Cutter' },
    short: { vi: 'Máy in Flexo', en: 'Flexo Printer' },
    desc: { vi: 'In Flexo inline kết hợp xẻ rãnh và bế, servo toàn phần, chuyển phôi chân không.', en: 'Inline flexo printing with slotting & die-cutting, full servo, vacuum transfer.' }
  },
  {
    id: 'laminator', folder: 'flute-lamination-machine', code: 'LAM',
    name: { vi: 'Máy cán bồi sóng', en: 'Flute Lamination Machine' },
    short: { vi: 'Máy bồi sóng', en: 'Flute Laminator' },
    desc: { vi: 'Bồi giấy in offset lên tấm sóng cho hộp cao cấp và kệ trưng bày.', en: 'Laminates printed liners onto board for premium boxes and displays.' }
  },
  {
    id: 'diecut', folder: 'die-cutting-and-creasing-machine', code: 'DCT',
    name: { vi: 'Máy bế & cấn lằn phẳng', en: 'Flatbed Die Cutting & Creasing' },
    short: { vi: 'Máy bế phẳng', en: 'Flatbed Die Cutter' },
    desc: { vi: 'Bế và cấn lằn chính xác cho hộp phức tạp, đơn hàng ngắn đến trung bình.', en: 'Precise die-cutting and creasing for complex shapes, short-to-medium runs.' }
  },
  {
    id: 'folder', folder: 'folder-gluer-machine', code: 'FGS',
    name: { vi: 'Máy gấp dán & đóng ghim thùng', en: 'Folder Gluer & Stitcher' },
    short: { vi: 'Máy gấp dán', en: 'Folder Gluer' },
    desc: { vi: 'Gấp và dán phôi thành thùng hoàn chỉnh tốc độ cao, mép vuông chuẩn.', en: 'High-speed folding and gluing of blanks into square-jointed boxes.' }
  },
  {
    id: 'other', folder: 'other-packaging-machines', code: 'AUX',
    name: { vi: 'Máy đóng gói khác', en: 'Other Packaging Machines' },
    short: { vi: 'Thiết bị phụ trợ', en: 'Auxiliary' },
    desc: { vi: 'Băng tải, máy xếp chồng, máy bó và thiết bị tự động hóa phụ trợ.', en: 'Conveyors, stackers, bundlers and auxiliary automation.' }
  }
]

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const raw = {
  corrugated: [
    'Advanced 3/5/7 Ply Corrugated Cardboard Production Line',
    'High End 3/5/7 Ply Corrugated Cardboard Production Line',
    'Eco 3/5/7 Ply Corrugated Cardboard Production Line',
    'Cassette Single Facer Double Roller Model NDCSF-410/420DR',
    'Cassette Single Facer Model NDCSF-405/420',
    'Cassette Single Facer Model NDCSF-360/380',
    'Fingerless Single Facer NDSF-320S/360S/380S',
    'Single Facer Double Roller Model NDSF-410/420DR',
    'Double Facer Model NDDF-HE',
    'Double Facer Model NDDF-E',
    'Automatic Splicer Machine Model ND-ASM',
    'Hydraulic Mill Roll Stand Model NDRS-410/420',
    'Hydraulic Mill Roll Stand Model NDRS-V5B-280/320',
    'Electric Mill Roll Stand Model NDRS-F',
    'Preheater Model NDPH-1100T',
    'Gluing Machine Model NDGM2/3-2200',
    'Gluing Machine Model NDGM-E',
    'Automatic Gluing Making Machine',
    'Thin Blade Slitter Scorer Model NDNC-ZQS',
    'Computer Thin Blade Machine Model NDNC',
    'Helical Knives NC Cutting Machine Model NDHNC-250/300',
    'Helical Knives NC Cutting Machine Model NDHNC-120/150',
    'Automatic Stacking Up Machine',
    'Overbridge Conveyor Model NDBC',
    'Computer 2 Ply Corrugated Cutter and Stacker',
    'Computer 2 Ply Sheet Cutter Model NDNC-1800',
    '2 Ply Sheet Stacker Model NDSK-1800'
  ],
  flexo: [
    'High Speed Vacuum Transfer Fully Automatic Servo Flexo Slotter Die Cutter Printing Machine',
    'Vacuum Transfer Fully Automatic Servo Flexo Printer Folder Gluer Box Line',
    'HD High Speed Flexo Slotter Die Cutter Printing Machine',
    'Fully Automatic High Speed Flexo Slotter Die Cutter Printing Machine',
    'Lead Edge Flexo Slotter Die Cutter Printing Machine - Type I',
    'Lead Edge Flexo Slotter Die Cutter Printing Machine - Type II',
    'Chain Feed Flexo Slotter Die Cutter Printing Machine'
  ],
  laminator: [
    '5 ply 3 in 1 Automatic Flute Laminator Machine',
    'High Speed Servo Flute Laminator Machine',
    'A Type Servo Automatic Flute Laminator',
    'H-I Type Servo Semi-Automatic Flute Laminator',
    'H-II Type Servo Semi-Automatic Flute Laminator',
    'H-III Type Semi-Automatic Flute Laminator'
  ],
  diecut: [
    'Automatic Flatbed Creasing and Die Cutting Machine for Duplex Paper',
    'Fully Automatic Flatbed Creasing and Die Cutting Machine',
    'Automatic Feeding Flat Die Cutter Creasing Machine Type II',
    'Semi-Automatic Flatbed Creasing and Die Cutting Machine',
    'Creasing Machine'
  ],
  folder: [
    'Auto Set Automatic Folder Gluer And Stitcher Machine',
    'High Speed Automatic Folder Gluer And Stitcher Machine',
    'Eco Automatic Folder Gluer And Stitcher Machine',
    'Semi-Automatic Pressure Folder Gluer Machine',
    'Semi-Automatic Gluing Machine Single Piece',
    'Semi-Automatic Stitcher Machine Double Pieces',
    'Semi-Automatic Stitcher Machine Single Piece'
  ],
  other: [
    'Automatic Carton Box Making Machine',
    'Automatic Feeding Flat Die Cutter Creasing Machine'
  ]
}

/* Detailed data for flagship models (from bmcpack.com product pages) */
const details = {
  'advanced-3-5-7-ply-corrugated-cardboard-production-line': {
    featured: true,
    tagline: { vi: 'Dây chuyền sóng đa năng, khổ 1,4–2,5 m', en: 'Versatile corrugator, 1.4–2.5 m widths' },
    summary: {
      vi: 'Dây chuyền 3/5/7 lớp linh hoạt, chạy sóng A, B, C, E, BC. Sản xuất nhiều lớp bằng cách bật/tắt các cụm tạo sóng đơn; đổi trục sóng khoảng 20 phút bằng xe đổi trục điện.',
      en: 'Flexible 3/5/7-ply line running A, B, C, E and BC flutes. Multi-ply production by engaging or bypassing single-facer units; corrugating rolls swap in about 20 minutes with an electric roll-change cart.'
    },
    keys: [['200', 'm/min'], ['2.5', 'm'], ['3/5/7', 'ply']],
    gallery: ['main', 'gallery-2', 'gallery-3', 'gallery-4', 'render', 'schematic'],
    specs: [
      [{ vi: 'Khổ làm việc', en: 'Working width' }, '1,400 / 1,600 / 1,800 / 2,200 / 2,500 mm'],
      [{ vi: 'Tốc độ thiết kế', en: 'Design speed' }, '≤ 200 m/min'],
      [{ vi: 'Tốc độ làm việc', en: 'Working speed' }, '≤ 180 m/min'],
      [{ vi: 'Số lớp', en: 'Ply' }, '3 / 5 / 7'],
      [{ vi: 'Loại sóng', en: 'Flute types' }, 'A, B, C, E, BC'],
      [{ vi: 'Đường kính trục sóng', en: 'Corrugating roll Ø' }, '360 / 380 mm'],
      [{ vi: 'Chiều dài dây chuyền', en: 'Total line length' }, '50–100 m'],
      [{ vi: 'Chiều dài bàn sấy', en: 'Drying section length' }, '7.8 m'],
      [{ vi: 'Số khoang gia nhiệt', en: 'Heating sections' }, '9–18'],
      [{ vi: 'Gia nhiệt', en: 'Heating' }, { vi: 'Hơi nước / dầu tải nhiệt', en: 'Steam / thermal oil' }],
      [{ vi: 'Tổng công suất', en: 'Total power' }, '100–200 kW'],
      [{ vi: 'Điều khiển', en: 'Control' }, { vi: 'PLC + servo, bàn điều khiển trung tâm', en: 'PLC + servo, central console' }]
    ],
    features: [
      { vi: 'Giá đỡ cuộn giấy dạng điện hoặc thủy lực', en: 'Electric or hydraulic mill roll stands' },
      { vi: 'Máy tráng keo hai trục', en: 'Double-roll glue machine' },
      { vi: 'Hai cấu hình tốc độ: 200/180 m/min (Ø380) hoặc 180/150 m/min (Ø360)', en: 'Two speed packages: 200/180 m/min (Ø380) or 180/150 m/min (Ø360)' },
      { vi: 'Chia khổ dao thường hoặc dao siêu mỏng', en: 'Common or super-thin knife slitter' },
      { vi: 'Bao gồm lắp đặt, chạy thử và đào tạo vận hành', en: 'Installation, commissioning & operator training included' }
    ]
  },
  'high-end-3-5-7-ply-corrugated-cardboard-production-line': {
    featured: true,
    tagline: { vi: 'Dòng cao cấp nhất — 300 m/min', en: 'Top-spec line — 300 m/min' },
    summary: {
      vi: 'Dòng flagship với máy tạo sóng Cassette HE405/HE420, máy dán kép HE, điều khiển PLC + servo toàn tuyến, hệ thống quản lý sản xuất NDPMS và nối giấy tự động không dừng máy.',
      en: 'Flagship line with Cassette HE405/HE420 single facers, HE double facer, PLC + servo throughout, NDPMS production management and zero-stop automatic splicing.'
    },
    keys: [['300', 'm/min'], ['2.2', 'm'], ['99%', 'splice']],
    gallery: ['main', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6', 'render', 'schematic'],
    specsTable: {
      head: ['Model', 'Ply', { vi: 'Khổ', en: 'Width' }, { vi: 'TK / LV (m/min)', en: 'Design / Work (m/min)' }, { vi: 'Máy sóng đơn', en: 'Single facer' }, { vi: 'Bàn nhiệt', en: 'Heating plates' }, { vi: 'Dài', en: 'Length' }],
      rows: [
        ['ND3WJ250-2200', '3', '2,200', '250 / 200', 'HE405 ×1', '18', '45–50 m'],
        ['ND3WJ300-2200', '3', '2,200', '300 / 250', 'HE420 ×1', '20', '45–50 m'],
        ['ND5WJ250-2200', '5', '2,200', '250 / 200', 'HE405 ×2', '22', '73–85 m'],
        ['ND5WJ300-2200', '5', '2,200', '300 / 250', 'HE420 ×2', '22', '73–85 m'],
        ['ND7WJ120-1800', '7', '1,800', '120 / 100', 'NDSF-280 ×3', '16', '100–110 m'],
        ['ND7WJ250-2200', '7', '2,200', '250 / 200', 'HE405 ×3', '22', '100–110 m'],
        ['ND7WJ300-2200', '7', '2,200', '300 / 250', 'HE420 ×3', '22', '100–110 m']
      ]
    },
    features: [
      { vi: 'Cassette HE405/HE420: hút chân không trong, trục sóng phun tungsten carbide, đổi sóng không cần dụng cụ ~20 phút', en: 'Cassette HE405/HE420: inner vacuum, tungsten-carbide rolls, tool-free flute change in ~20 min' },
      { vi: 'Máy dán kép HE: bàn nhiệt nâng thủy lực, tự động chỉnh biên khí nén', en: 'HE double facer: hydraulic plate lift, automatic pneumatic edge correction' },
      { vi: 'Nối giấy tự động NDASM: không dừng máy, tỷ lệ thành công 99%', en: 'NDASM auto splicer: zero-stop changeover, 99% success rate' },
      { vi: 'NDPMS: giám sát thời gian thực, đổi đơn và cảnh báo tự động', en: 'NDPMS: real-time monitoring, automatic order change & alarms' },
      { vi: 'Xếp chồng servo NDAUS theo số lượng đặt trước', en: 'NDAUS servo offset stacking with preset batches' }
    ]
  },
  'high-speed-vacuum-transfer-fully-automatic-servo-flexo-slotter-die-cutter-printing-machine': {
    featured: true,
    tagline: { vi: 'Servo toàn phần · chuyển phôi chân không', en: 'Full servo · vacuum transfer' },
    summary: {
      vi: 'Máy in Flexo xẻ rãnh bế tự động hoàn toàn: nạp phôi chân không, cụm in, xẻ rãnh, bế và đếm xếp. Pha servo đồng bộ mọi cụm — đổi đơn trên màn hình cảm ứng, chồng màu ±0,3 mm.',
      en: 'Fully automatic flexo slotter die-cutter: vacuum transfer feeder, print units, slotter, die-cutter and counter-ejector. Servo phase control syncs every unit — touch-screen job changes and ±0.3 mm registration.'
    },
    keys: [['350', 'pcs/min'], ['±0.3', 'mm'], ['1–8', 'colors']],
    gallery: ['main', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6', 'gallery-7', 'gallery-8', 'gallery-9'],
    specsTable: {
      head: [{ vi: 'Thông số', en: 'Specification' }, 'NDVT-920FSDCH', 'NDVT-1224FSDCH'],
      rows: [
        [{ vi: 'Tốc độ thiết kế (tờ/phút)', en: 'Design speed (pcs/min)' }, '350', '300'],
        [{ vi: 'Tốc độ làm việc (tờ/phút)', en: 'Working speed (pcs/min)' }, '300', '250'],
        [{ vi: 'Khổ phôi tối đa (mm)', en: 'Max. feeding size (mm)' }, '900 × 2000', '1200 × 2400'],
        [{ vi: 'Khổ phôi tối thiểu (mm)', en: 'Min. feeding size (mm)' }, '250 × 600', '350 × 650'],
        [{ vi: 'Nạp cách tờ (mm)', en: 'Skip-feeding size (mm)' }, '1200 × 2000', '1400 × 2400'],
        [{ vi: 'Độ sâu xẻ rãnh tối đa (mm)', en: 'Max. slot depth (mm)' }, '300', '320'],
        [{ vi: 'Độ chính xác in (mm)', en: 'Print precision (mm)' }, '±0.3', '±0.3'],
        [{ vi: 'Độ chính xác xẻ rãnh / bế (mm)', en: 'Slot / die-cut precision (mm)' }, '±1.0', '±1.0'],
        [{ vi: 'Độ dày bản in (mm)', en: 'Plate thickness (mm)' }, '3.94', '3.94'],
        [{ vi: 'Độ dày carton (mm)', en: 'Board thickness (mm)' }, '1–12', '1–12'],
        [{ vi: 'Thành máy (mm)', en: 'Wall board (mm)' }, '60', '60']
      ]
    },
    features: [
      { vi: 'Nạp phôi chân không thích ứng nhiều độ cứng carton', en: 'Vacuum feeder adapts to different board stiffness' },
      { vi: 'Cấu hình 1–8 màu in, carton 3/5/7 lớp', en: 'Configurable 1–8 print units, 3/5/7-ply board' },
      { vi: 'Đổi đơn bằng pha servo, không chỉnh cơ khí thủ công', en: 'Servo-phase job changes, no manual mechanical setting' },
      { vi: 'Hỗ trợ nạp cách tờ cho thùng khổ lớn', en: 'Skip-feeding for oversized cartons' },
      { vi: 'Kỹ sư ở lại đến khi đạt sản lượng mục tiêu', en: 'Engineers stay on site until target output is reached' }
    ]
  }
}

export const products = Object.entries(raw).flatMap(([catId, names]) => {
  const cat = categories.find((c) => c.id === catId)
  return names.map((name) => {
    const slug = slugify(name)
    const d = details[slug] || {}
    const base = `${IMG}/products/${cat.folder}/${slug}`
    return {
      slug,
      name,
      category: catId,
      image: `${base}/main.webp`,
      gallery: (d.gallery || ['main']).map((g) => `${base}/${g}.webp`),
      source: `https://bmcpack.com/${slug}.html`,
      ...d
    }
  })
})

export const featuredProducts = products.filter((p) => p.featured)

export const categoryCover = (catId) => {
  const map = {
    corrugated: 'advanced-3-5-7-ply-corrugated-cardboard-production-line',
    flexo: 'high-speed-vacuum-transfer-fully-automatic-servo-flexo-slotter-die-cutter-printing-machine',
    laminator: '5-ply-3-in-1-automatic-flute-laminator-machine',
    diecut: 'automatic-flatbed-creasing-and-die-cutting-machine-for-duplex-paper',
    folder: 'auto-set-automatic-folder-gluer-and-stitcher-machine',
    other: 'automatic-carton-box-making-machine'
  }
  return products.find((p) => p.slug === map[catId])?.image
}

/* Extract a model code like "NDCSF-410/420DR" for HUD labels */
export const modelCode = (name) => {
  const m = name.match(/(?:Model\s+)?\b(N?D[A-Z0-9]*-[A-Z0-9/\-]+)\b/)
  return m ? m[1] : null
}

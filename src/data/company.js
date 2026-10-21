export const IMG = 'https://bmcpack.com/images'

export const company = {
  name: 'BMC PACK',
  legal: 'Hainan BaoMingCheng Carton Printing Machinery Co., Ltd.',
  phone: '+86 199 8918 6328',
  phoneRaw: '+8619989186328',
  email: 'info@bmcpack.com',
  whatsapp: 'https://wa.me/8619989186328',
  zalo: 'https://zalo.me/8619989186328',
  facebook: 'https://www.facebook.com/BMCPack/',
  logo: 'https://bmcpack.com/Logo.webp',
  locations: [
    {
      tag: 'FAB-01',
      title: { vi: 'Nhà máy Quảng Đông', en: 'Guangdong Factory' },
      address: { vi: 'KCN Lanlong, quận Đoan Châu, TP. Triệu Khánh, Quảng Đông, Trung Quốc', en: 'Lanlong Industrial Park, Duanzhou District, Zhaoqing, Guangdong, China' },
      note: { vi: '20.000 m² · thành lập 1999', en: '20,000 m² · est. 1999' }
    },
    {
      tag: 'FAB-02',
      title: { vi: 'Nhà máy Hà Bắc', en: 'Hebei Factory' },
      address: { vi: 'Khu phát triển phía Đông huyện Đông Quang, TP. Thương Châu, Hà Bắc, Trung Quốc', en: 'Dongguang County East Development Zone, Cangzhou, Hebei, China' },
      note: { vi: 'Cơ sở sản xuất thứ hai', en: 'Second production base' }
    },
    {
      tag: 'HCM-VN',
      title: { vi: 'Văn phòng Việt Nam', en: 'Vietnam Office' },
      address: { vi: '18 Lê Thị Trung, phường An Phú, TP. Hồ Chí Minh', en: '18 Le Thi Trung Street, An Phu Ward, Ho Chi Minh City' },
      note: { vi: 'Kinh doanh & hỗ trợ kỹ thuật', en: 'Sales & technical support' }
    }
  ]
}

export const stats = [
  { value: 25, suffix: '+', label: { vi: 'Năm kinh nghiệm', en: 'Years of experience' } },
  { value: 500, suffix: '+', label: { vi: 'Dây chuyền đã lắp đặt', en: 'Lines installed' } },
  { value: 40, suffix: '+', label: { vi: 'Quốc gia phục vụ', en: 'Countries served' } },
  { value: 24, suffix: '/7', label: { vi: 'Hỗ trợ kỹ thuật', en: 'Technical support' } }
]

export const lineStages = [
  { code: '01', name: { vi: 'Giá đỡ cuộn giấy', en: 'Mill Roll Stand' }, desc: { vi: 'Thủy lực / điện, nối giấy tự động không dừng máy', en: 'Hydraulic / electric, zero-stop auto splicing' } },
  { code: '02', name: { vi: 'Lô sấy sơ bộ', en: 'Preheater' }, desc: { vi: 'Kiểm soát nhiệt và độ ẩm giấy', en: 'Controls paper temperature & moisture' } },
  { code: '03', name: { vi: 'Máy tạo sóng đơn', en: 'Single Facer' }, desc: { vi: 'Cassette HE405/420, đổi sóng ~20 phút', en: 'Cassette HE405/420, ~20 min flute change' } },
  { code: '04', name: { vi: 'Máy tráng keo', en: 'Glue Machine' }, desc: { vi: 'Hai trục, lớp keo đồng đều', en: 'Double-roll, uniform glue film' } },
  { code: '05', name: { vi: 'Máy dán kép', en: 'Double Facer' }, desc: { vi: '16–22 bàn nhiệt, nâng hạ thủy lực', en: '16–22 heating plates, hydraulic lift' } },
  { code: '06', name: { vi: 'Chia khổ & cấn lằn', en: 'Slitter Scorer' }, desc: { vi: 'Dao mỏng NC, đổi đơn tự động', en: 'NC thin-blade, auto order change' } },
  { code: '07', name: { vi: 'Cắt ngang & xếp chồng', en: 'Cut-off & Stacker' }, desc: { vi: 'Dao xoắn NC, xếp chồng servo', en: 'Helical NC knife, servo stacking' } }
]

export const whyUs = [
  { icon: 'shield', title: { vi: 'Độ tin cậy đã được chứng minh', en: 'Proven Reliability' }, desc: { vi: 'Máy được chế tạo cho sản xuất liên tục, sản lượng lớn — đánh giá bằng độ bền vận hành qua nhiều năm.', en: 'Machines built for continuous, high-volume production — judged by how dependably they run over years.' } },
  { icon: 'cube', title: { vi: 'Lắp đặt trọn gói', en: 'Turnkey Installation' }, desc: { vi: 'Từ thiết kế mặt bằng, sản xuất, chạy thử tại xưởng đến lắp đặt và vận hành tại nhà máy của bạn.', en: 'From layout planning and factory testing to on-site installation and commissioning.' } },
  { icon: 'globe', title: { vi: 'Phụ tùng toàn cầu', en: 'Global Spare Parts' }, desc: { vi: 'Linh kiện chính hãng Siemens, Schneider, NSK, Omron — giao nhanh tới hơn 40 quốc gia.', en: 'Genuine Siemens, Schneider, NSK and Omron components, shipped fast to 40+ countries.' } },
  { icon: 'chip', title: { vi: 'Đào tạo & hỗ trợ tại chỗ', en: 'On-site Training & Support' }, desc: { vi: 'Kỹ sư ở lại nhà máy đến khi đạt sản lượng mục tiêu, hỗ trợ kỹ thuật 24/7.', en: 'Engineers stay on site until target output is reached, with 24/7 technical support.' } }
]

export const techHighlights = [
  { k: '300', u: 'm/min', label: { vi: 'Tốc độ thiết kế dây chuyền sóng High-End', en: 'High-End corrugator design speed' } },
  { k: '350', u: 'pcs/min', label: { vi: 'Máy in Flexo servo chuyển phôi chân không', en: 'Vacuum-transfer servo flexo printer' } },
  { k: '±0.3', u: 'mm', label: { vi: 'Độ chính xác chồng màu', en: 'Print registration precision' } },
  { k: '99', u: '%', label: { vi: 'Tỷ lệ nối giấy thành công (NDASM)', en: 'Auto-splice success rate (NDASM)' } }
]

export const projects = [
  {
    country: { vi: 'Việt Nam', en: 'Vietnam' }, code: 'VN',
    title: { vi: 'Dây chuyền sóng 2 lớp sóng khổ 2,5 m', en: '2.5 m Double-Wall Corrugator Line' },
    desc: { vi: 'Dây chuyền carton 2 lớp sóng (5 lớp) khổ rộng 2,5 m, lắp đặt và chạy thử tại nhà máy.', en: 'Wide 2.5 m double-wall (5-ply) corrugator line, installed and commissioned on site.' },
    img: `${IMG}/projects/vietnam-corrugator-1.webp`
  },
  {
    country: { vi: 'Mexico', en: 'Mexico' }, code: 'MX',
    title: { vi: 'Nâng cấp máy in Flexo 4 màu', en: '4-Color Flexo Printing Upgrade' },
    desc: { vi: 'Nâng cấp khâu in bằng máy in Flexo xẻ rãnh bế 4 màu cho nhà máy thùng carton.', en: 'Print-stage upgrade with a 4-color flexo slotter die-cutter for a corrugated box plant.' },
    img: `${IMG}/projects/mexico-flexo-1.webp`
  },
  {
    country: { vi: 'Indonesia', en: 'Indonesia' }, code: 'ID',
    title: { vi: 'Nhà máy bao bì trọn gói', en: 'Full Plant Turnkey Project' },
    desc: { vi: 'Toàn bộ nhà máy: dây chuyền sóng, in Flexo, bế và gấp dán — từ cuộn giấy đến thùng thành phẩm.', en: 'Complete plant: corrugator, flexo, die-cutting and folder-gluing — mill roll to finished box.' },
    img: `${IMG}/projects/indonesia-plant-1.webp`
  }
]

export const solutions = [
  { code: 'S1', title: { vi: 'Xây nhà máy bao bì mới', en: 'Start a new box plant' }, desc: { vi: 'Dây chuyền trọn gói từ cuộn giấy đến thùng thành phẩm, kèm thiết kế mặt bằng và chạy thử.', en: 'Complete turnkey line from mill roll to finished box, with layout planning and commissioning.' }, cat: 'corrugated' },
  { code: 'S2', title: { vi: 'Tăng công suất', en: 'Increase capacity' }, desc: { vi: 'Dây chuyền sóng tốc độ cao và gói nâng cấp giúp tăng sản lượng, ổn định chất lượng sóng.', en: 'Higher-speed corrugators and upgrades to raise throughput and flute consistency.' }, cat: 'corrugated' },
  { code: 'S3', title: { vi: 'Nâng chất lượng in', en: 'Improve print quality' }, desc: { vi: 'Máy in Flexo xẻ rãnh bế servo, chuyển phôi chân không, chồng màu ±0,3 mm.', en: 'Servo flexo printer-slotter-die-cutters with vacuum transfer and ±0.3 mm registration.' }, cat: 'flexo' },
  { code: 'S4', title: { vi: 'Tự động hóa khâu hoàn thiện', en: 'Automate finishing' }, desc: { vi: 'Máy gấp dán, máy bế và thiết bị phụ trợ tự động giảm thao tác thủ công.', en: 'Automatic folder-gluers, die-cutters and auxiliary equipment to cut manual handling.' }, cat: 'folder' }
]

export const process = [
  { n: '01', title: { vi: 'Xác định mục tiêu', en: 'Set the target' }, desc: { vi: 'Bạn chia sẻ sản lượng, loại thùng và diện tích xưởng.', en: 'You share output goals, box types and floor space.' } },
  { n: '02', title: { vi: 'Thiết kế mặt bằng', en: 'Design the layout' }, desc: { vi: 'Kỹ sư BMC đề xuất cấu hình và bố trí dây chuyền.', en: 'BMC engineers recommend a configuration and plan the line.' } },
  { n: '03', title: { vi: 'Chế tạo & chạy thử', en: 'Build & factory test' }, desc: { vi: 'Máy được sản xuất và chạy thử tại xưởng trước khi giao.', en: 'Machines are manufactured and run-tested before shipping.' } },
  { n: '04', title: { vi: 'Lắp đặt & đào tạo', en: 'Install, train, support' }, desc: { vi: 'Lắp đặt, đào tạo vận hành, hỗ trợ 24/7 và phụ tùng chính hãng.', en: 'On-site commissioning, operator training, 24/7 support and genuine parts.' } }
]

export const partnerBenefits = [
  { title: { vi: 'Lãnh thổ được bảo hộ', en: 'Protected Territory' }, desc: { vi: 'Quyền phân phối độc quyền tại khu vực của bạn.', en: 'Exclusive distribution rights in your region.' } },
  { title: { vi: 'Hỗ trợ bán hàng & marketing', en: 'Sales & Marketing Support' }, desc: { vi: 'Catalogue, tài liệu demo và hỗ trợ khách hàng tiềm năng.', en: 'Catalogues, demo materials and lead support.' } },
  { title: { vi: 'Đào tạo kỹ thuật & phụ tùng', en: 'Technical Training & Parts' }, desc: { vi: 'Đào tạo sản phẩm và ưu tiên cung cấp phụ tùng.', en: 'Product training and priority spare-parts access.' } }
]

export const values = [
  { title: { vi: 'Độ tin cậy trên hết', en: 'Reliability above all' }, desc: { vi: 'Một cỗ máy được đánh giá bằng việc nó chạy ổn định bao lâu.', en: 'A machine is judged by how dependably it runs over time.' } },
  { title: { vi: 'Kỹ thuật trung thực', en: 'Honest engineering' }, desc: { vi: 'Nhà sản xuất Trung Quốc, vận hành bằng công nghệ Ý và tiêu chuẩn châu Âu.', en: 'A Chinese manufacturer powered by Italian technology and European standards.' } },
  { title: { vi: 'Bền bỉ hàng thập kỷ', en: 'Built to last' }, desc: { vi: 'Độ bền được tính từ bản vẽ đầu tiên.', en: 'Durability designed in from the very first drawing.' } },
  { title: { vi: 'Đồng hành lâu dài', en: 'Long-term partnership' }, desc: { vi: 'Phụ tùng, dịch vụ và con người luôn sẵn sàng sau lắp đặt.', en: 'Parts, service and people long after installation.' } }
]

export const timeline = [
  { year: '1999', title: { vi: 'Thành lập', en: 'Founded' }, desc: { vi: 'Ra đời tại Quảng Đông, tập trung vào máy móc bao bì carton.', en: 'Founded in Guangdong, focused on carton packaging machinery.' } },
  { year: '2000s', title: { vi: 'Mở rộng', en: 'Growth' }, desc: { vi: 'Từ máy đơn lẻ đến dây chuyền sóng 3/5/7 lớp hoàn chỉnh và thiết bị hoàn thiện.', en: 'From single machines to complete 3/5/7-ply lines and finishing equipment.' } },
  { year: '2010s', title: { vi: 'Vươn ra toàn cầu', en: 'Going global' }, desc: { vi: 'Hơn 500 nhà máy tại 40+ quốc gia, đội ngũ 100+ kỹ sư.', en: '500+ factories in 40+ countries, 100+ engineers and technicians.' } },
  { year: 'NOW', title: { vi: 'Hiện tại', en: 'Today' }, desc: { vi: 'Văn phòng TP.HCM hỗ trợ khách hàng quốc tế và mạng lưới đối tác.', en: 'Ho Chi Minh City office supports global customers and partners.' } }
]

Cari data akomodasi nyata (homestay, villa, surf camp, guesthouse) di area "{LOCATION_AREA}", Kabupaten Pangandaran, Indonesia.

Target: minimal 15 properti. Sumber yang dipercaya: Booking.com, Agoda, Airbnb, Traveloka, website resmi properti, Google Maps, TripAdvisor. JANGAN mengarang data — kalau field tidak ditemukan, isi null (jangan tebak).

Output: array JSON. Setiap objek WAJIB mengikuti skema berikut secara persis:

{
  "name": string,                    // nama resmi properti
  "slug": string,                    // kebab-case dari name, unik, ASCII only (cth: "villa-monyet-batu-karas")
  "type": "homestay" | "villa" | "surf_camp" | "guesthouse",
  "location_area": "batu_karas" | "pangandaran_beach" | "cijulang" | "karapyak" | "madasari" | "batu_hiu" | "parigi",
  "location_zone": "core" | "extended",   // "core" = Batu Karas & Pangandaran Beach; "extended" = sisanya
  "price_min_usd": number,           // harga termurah per malam (USD), 2 desimal. Konversi dari IDR pakai kurs 1 USD = 16.000 IDR
  "price_max_usd": number,           // harga tertinggi per malam (USD), 2 desimal
  "wifi_speed_mbps": number | null,  // integer Mbps kalau disebut, kalau tidak null
  "has_desk": boolean,               // true jika ada meja kerja di kamar (penting untuk digital nomad)
  "has_pool": boolean,
  "distance_to_beach_m": number,     // integer meter, ukur via Google Maps dari properti ke garis pantai terdekat
  "google_maps_url": string | null,  // URL Google Maps yang men-pin properti
  "booking_affiliate_url": string | null,  // URL Booking.com / Agoda / Airbnb properti (tanpa parameter affiliate, biar nanti ditambah)
  "description": string,             // 2-3 kalimat, bahasa Inggris, gaya "honest local friend" (casual, second person, specific bukan generik). Sebutkan vibe, jarak ke spot utama, untuk siapa cocok. Honest negatives diperbolehkan.
  "images": string[]                 // 1-5 URL gambar publik dari listing resmi. Kalau ragu, kosongkan []
}

Aturan tambahan:
- type=homestay: dikelola keluarga lokal, biasanya < $30/malam
- type=surf_camp: paket include surf lesson/board rental, biasanya area Batu Karas
- type=villa: private unit dengan dapur, biasanya > $40/malam
- type=guesthouse: small hotel / losmen, 5-20 kamar
- description WAJIB English, tone casual (boleh contractions "you'll", "won't"), tanpa hyperbole marketing ("paradise", "stunning", "world-class" DILARANG)
- Urutkan output dari price_min_usd termurah ke termahal
- Validasi: price_max_usd >= price_min_usd; distance_to_beach_m >= 0

Output HANYA array JSON valid, tanpa markdown fences, tanpa komentar, tanpa teks pengantar.

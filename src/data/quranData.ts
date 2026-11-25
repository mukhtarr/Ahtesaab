export interface QuranAyah {
  number: number;
  arabic: string;
  english: string;
  urdu: string;
}

export interface QuranSurahMeta {
  id: number;
  nameEnglish: string;
  nameArabic: string;
  meaning: string;
  revelation: 'Meccan' | 'Medinan';
  totalAyahs: number;
  juz: string;
}

export interface QuranSurah extends QuranSurahMeta {
  note?: string;
  ayahs: QuranAyah[];
}

export const ALL_QURAN_SURAHS: QuranSurahMeta[] = [
  { id: 1, nameEnglish: 'Al-Fatihah', nameArabic: 'الفاتحة', meaning: 'The Opening', revelation: 'Meccan', totalAyahs: 7, juz: '1' },
  { id: 2, nameEnglish: 'Al-Baqarah', nameArabic: 'البقرة', meaning: 'The Cow', revelation: 'Medinan', totalAyahs: 286, juz: '1–3' },
  { id: 3, nameEnglish: 'Ali \'Imran', nameArabic: 'آل عمران', meaning: 'Family of Imran', revelation: 'Medinan', totalAyahs: 200, juz: '3–4' },
  { id: 4, nameEnglish: 'An-Nisa', nameArabic: 'النساء', meaning: 'The Women', revelation: 'Medinan', totalAyahs: 176, juz: '4–6' },
  { id: 5, nameEnglish: 'Al-Ma\'idah', nameArabic: 'المائدة', meaning: 'The Table Spread', revelation: 'Medinan', totalAyahs: 120, juz: '6–7' },
  { id: 6, nameEnglish: 'Al-An\'am', nameArabic: 'الأنعام', meaning: 'The Cattle', revelation: 'Meccan', totalAyahs: 165, juz: '7–8' },
  { id: 7, nameEnglish: 'Al-A\'raf', nameArabic: 'الأعراف', meaning: 'The Heights', revelation: 'Meccan', totalAyahs: 206, juz: '8–9' },
  { id: 8, nameEnglish: 'Al-Anfal', nameArabic: 'الأنفال', meaning: 'The Spoils of War', revelation: 'Medinan', totalAyahs: 75, juz: '9–10' },
  { id: 9, nameEnglish: 'At-Tawbah', nameArabic: 'التوبة', meaning: 'The Repentance', revelation: 'Medinan', totalAyahs: 129, juz: '10–11' },
  { id: 10, nameEnglish: 'Yunus', nameArabic: 'يونس', meaning: 'Jonah', revelation: 'Meccan', totalAyahs: 109, juz: '11' },
  { id: 11, nameEnglish: 'Hud', nameArabic: 'هود', meaning: 'Hud', revelation: 'Meccan', totalAyahs: 123, juz: '11–12' },
  { id: 12, nameEnglish: 'Yusuf', nameArabic: 'يوسف', meaning: 'Joseph', revelation: 'Meccan', totalAyahs: 111, juz: '12–13' },
  { id: 13, nameEnglish: 'Ar-Ra\'d', nameArabic: 'الرعد', meaning: 'The Thunder', revelation: 'Medinan', totalAyahs: 43, juz: '13' },
  { id: 14, nameEnglish: 'Ibrahim', nameArabic: 'إبراهيم', meaning: 'Abraham', revelation: 'Meccan', totalAyahs: 52, juz: '13' },
  { id: 15, nameEnglish: 'Al-Hijr', nameArabic: 'الحجر', meaning: 'The Rocky Tract', revelation: 'Meccan', totalAyahs: 99, juz: '14' },
  { id: 16, nameEnglish: 'An-Nahl', nameArabic: 'النحل', meaning: 'The Bee', revelation: 'Meccan', totalAyahs: 128, juz: '14' },
  { id: 17, nameEnglish: 'Al-Isra', nameArabic: 'الإسراء', meaning: 'The Night Journey', revelation: 'Meccan', totalAyahs: 111, juz: '15' },
  { id: 18, nameEnglish: 'Al-Kahf', nameArabic: 'الكهف', meaning: 'The Cave', revelation: 'Meccan', totalAyahs: 110, juz: '15–16' },
  { id: 19, nameEnglish: 'Maryam', nameArabic: 'مريم', meaning: 'Mary', revelation: 'Meccan', totalAyahs: 98, juz: '16' },
  { id: 20, nameEnglish: 'Taha', nameArabic: 'طه', meaning: 'Ta-Ha', revelation: 'Meccan', totalAyahs: 135, juz: '16' },
  { id: 21, nameEnglish: 'Al-Anbya', nameArabic: 'الأنبياء', meaning: 'The Prophets', revelation: 'Meccan', totalAyahs: 112, juz: '17' },
  { id: 22, nameEnglish: 'Al-Hajj', nameArabic: 'الحج', meaning: 'The Pilgrimage', revelation: 'Medinan', totalAyahs: 78, juz: '17' },
  { id: 23, nameEnglish: 'Al-Mu\'minun', nameArabic: 'المؤمنون', meaning: 'The Believers', revelation: 'Meccan', totalAyahs: 118, juz: '18' },
  { id: 24, nameEnglish: 'An-Nur', nameArabic: 'النور', meaning: 'The Light', revelation: 'Medinan', totalAyahs: 64, juz: '18' },
  { id: 25, nameEnglish: 'Al-Furqan', nameArabic: 'الفرقان', meaning: 'The Criterion', revelation: 'Meccan', totalAyahs: 77, juz: '18–19' },
  { id: 26, nameEnglish: 'Ash-Shu\'ara', nameArabic: 'الشعراء', meaning: 'The Poets', revelation: 'Meccan', totalAyahs: 227, juz: '19' },
  { id: 27, nameEnglish: 'An-Naml', nameArabic: 'النمل', meaning: 'The Ant', revelation: 'Meccan', totalAyahs: 93, juz: '19–20' },
  { id: 28, nameEnglish: 'Al-Qasas', nameArabic: 'القصص', meaning: 'The Stories', revelation: 'Meccan', totalAyahs: 88, juz: '20' },
  { id: 29, nameEnglish: 'Al-\'Ankabut', nameArabic: 'العنكبوت', meaning: 'The Spider', revelation: 'Meccan', totalAyahs: 69, juz: '20–21' },
  { id: 30, nameEnglish: 'Ar-Rum', nameArabic: 'الروم', meaning: 'The Romans', revelation: 'Meccan', totalAyahs: 60, juz: '21' },
  { id: 31, nameEnglish: 'Luqman', nameArabic: 'لقمان', meaning: 'Luqman', revelation: 'Meccan', totalAyahs: 34, juz: '21' },
  { id: 32, nameEnglish: 'As-Sajdah', nameArabic: 'السجدة', meaning: 'The Prostration', revelation: 'Meccan', totalAyahs: 30, juz: '21' },
  { id: 33, nameEnglish: 'Al-Ahzab', nameArabic: 'الأحزاب', meaning: 'The Combined Forces', revelation: 'Medinan', totalAyahs: 73, juz: '21–22' },
  { id: 34, nameEnglish: 'Saba', nameArabic: 'سبأ', meaning: 'Sheba', revelation: 'Meccan', totalAyahs: 54, juz: '22' },
  { id: 35, nameEnglish: 'Fatir', nameArabic: 'فاطر', meaning: 'Originator', revelation: 'Meccan', totalAyahs: 45, juz: '22' },
  { id: 36, nameEnglish: 'Ya-Sin', nameArabic: 'يس', meaning: 'Ya Sin', revelation: 'Meccan', totalAyahs: 83, juz: '22–23' },
  { id: 37, nameEnglish: 'As-Saffat', nameArabic: 'الصافات', meaning: 'Those Who Set the Ranks', revelation: 'Meccan', totalAyahs: 182, juz: '23' },
  { id: 38, nameEnglish: 'Sad', nameArabic: 'ص', meaning: 'The Letter Saad', revelation: 'Meccan', totalAyahs: 88, juz: '23' },
  { id: 39, nameEnglish: 'Az-Zumar', nameArabic: 'الزمر', meaning: 'The Troops', revelation: 'Meccan', totalAyahs: 75, juz: '23–24' },
  { id: 40, nameEnglish: 'Ghafir', nameArabic: 'غافر', meaning: 'The Forgiver', revelation: 'Meccan', totalAyahs: 85, juz: '24' },
  { id: 41, nameEnglish: 'Fussilat', nameArabic: 'فصلت', meaning: 'Explained in Detail', revelation: 'Meccan', totalAyahs: 54, juz: '24–25' },
  { id: 42, nameEnglish: 'Ash-Shuraa', nameArabic: 'الشورى', meaning: 'The Consultation', revelation: 'Meccan', totalAyahs: 53, juz: '25' },
  { id: 43, nameEnglish: 'Az-Zukhruf', nameArabic: 'الزخرف', meaning: 'The Ornaments of Gold', revelation: 'Meccan', totalAyahs: 89, juz: '25' },
  { id: 44, nameEnglish: 'Ad-Dukhan', nameArabic: 'الدخان', meaning: 'The Smoke', revelation: 'Meccan', totalAyahs: 59, juz: '25' },
  { id: 45, nameEnglish: 'Al-Jathiyah', nameArabic: 'الجاثية', meaning: 'The Crouching', revelation: 'Meccan', totalAyahs: 37, juz: '25' },
  { id: 46, nameEnglish: 'Al-Ahqaf', nameArabic: 'الأحقاف', meaning: 'The Wind-Curved Sandhills', revelation: 'Meccan', totalAyahs: 35, juz: '26' },
  { id: 47, nameEnglish: 'Muhammad', nameArabic: 'محمد', meaning: 'Muhammad', revelation: 'Medinan', totalAyahs: 38, juz: '26' },
  { id: 48, nameEnglish: 'Al-Fath', nameArabic: 'الفتح', meaning: 'The Victory', revelation: 'Medinan', totalAyahs: 29, juz: '26' },
  { id: 49, nameEnglish: 'Al-Hujurat', nameArabic: 'الحجرات', meaning: 'The Rooms', revelation: 'Medinan', totalAyahs: 18, juz: '26' },
  { id: 50, nameEnglish: 'Qaf', nameArabic: 'ق', meaning: 'The Letter Qaf', revelation: 'Meccan', totalAyahs: 45, juz: '26' },
  { id: 51, nameEnglish: 'Adh-Dhariyat', nameArabic: 'الذاريات', meaning: 'The Winnowing Winds', revelation: 'Meccan', totalAyahs: 60, juz: '26–27' },
  { id: 52, nameEnglish: 'At-Tur', nameArabic: 'الطور', meaning: 'The Mount', revelation: 'Meccan', totalAyahs: 49, juz: '27' },
  { id: 53, nameEnglish: 'An-Najm', nameArabic: 'النجم', meaning: 'The Star', revelation: 'Meccan', totalAyahs: 62, juz: '27' },
  { id: 54, nameEnglish: 'Al-Qamar', nameArabic: 'القمر', meaning: 'The Moon', revelation: 'Meccan', totalAyahs: 55, juz: '27' },
  { id: 55, nameEnglish: 'Ar-Rahman', nameArabic: 'الرحمن', meaning: 'The Beneficent', revelation: 'Medinan', totalAyahs: 78, juz: '27' },
  { id: 56, nameEnglish: 'Al-Waqi\'ah', nameArabic: 'الواقعة', meaning: 'The Inevitable', revelation: 'Meccan', totalAyahs: 96, juz: '27' },
  { id: 57, nameEnglish: 'Al-Hadid', nameArabic: 'الحديد', meaning: 'The Iron', revelation: 'Medinan', totalAyahs: 29, juz: '27' },
  { id: 58, nameEnglish: 'Al-Mujadila', nameArabic: 'المجادلة', meaning: 'The Pleading Woman', revelation: 'Medinan', totalAyahs: 22, juz: '28' },
  { id: 59, nameEnglish: 'Al-Hashr', nameArabic: 'الحشر', meaning: 'The Exile', revelation: 'Medinan', totalAyahs: 24, juz: '28' },
  { id: 60, nameEnglish: 'Al-Mumtahanah', nameArabic: 'الممتحنة', meaning: 'She That Is Examined', revelation: 'Medinan', totalAyahs: 13, juz: '28' },
  { id: 61, nameEnglish: 'As-Saf', nameArabic: 'الصف', meaning: 'The Ranks', revelation: 'Medinan', totalAyahs: 14, juz: '28' },
  { id: 62, nameEnglish: 'Al-Jumu\'ah', nameArabic: 'الجمعة', meaning: 'The Congregation (Friday)', revelation: 'Medinan', totalAyahs: 11, juz: '28' },
  { id: 63, nameEnglish: 'Al-Munafiqun', nameArabic: 'المنافقون', meaning: 'The Hypocrites', revelation: 'Medinan', totalAyahs: 11, juz: '28' },
  { id: 64, nameEnglish: 'At-Taghabun', nameArabic: 'التغابن', meaning: 'The Mutual Disillusion', revelation: 'Medinan', totalAyahs: 18, juz: '28' },
  { id: 65, nameEnglish: 'At-Talaq', nameArabic: 'الطلاق', meaning: 'The Divorce', revelation: 'Medinan', totalAyahs: 12, juz: '28' },
  { id: 66, nameEnglish: 'At-Tahrim', nameArabic: 'التحريم', meaning: 'The Prohibition', revelation: 'Medinan', totalAyahs: 12, juz: '28' },
  { id: 67, nameEnglish: 'Al-Mulk', nameArabic: 'الملك', meaning: 'The Sovereignty', revelation: 'Meccan', totalAyahs: 30, juz: '29' },
  { id: 68, nameEnglish: 'Al-Qalam', nameArabic: 'القلم', meaning: 'The Pen', revelation: 'Meccan', totalAyahs: 52, juz: '29' },
  { id: 69, nameEnglish: 'Al-Haqqah', nameArabic: 'الحاقة', meaning: 'The Reality', revelation: 'Meccan', totalAyahs: 52, juz: '29' },
  { id: 70, nameEnglish: 'Al-Ma\'arij', nameArabic: 'المعارج', meaning: 'The Ascending Stairways', revelation: 'Meccan', totalAyahs: 44, juz: '29' },
  { id: 71, nameEnglish: 'Nuh', nameArabic: 'نوح', meaning: 'Noah', revelation: 'Meccan', totalAyahs: 28, juz: '29' },
  { id: 72, nameEnglish: 'Al-Jinn', nameArabic: 'الجن', meaning: 'The Jinn', revelation: 'Meccan', totalAyahs: 28, juz: '29' },
  { id: 73, nameEnglish: 'Al-Muzzammil', nameArabic: 'المزمل', meaning: 'The Enshrouded One', revelation: 'Meccan', totalAyahs: 20, juz: '29' },
  { id: 74, nameEnglish: 'Al-Muddaththir', nameArabic: 'المدثر', meaning: 'The Cloaked One', revelation: 'Meccan', totalAyahs: 56, juz: '29' },
  { id: 75, nameEnglish: 'Al-Qiyamah', nameArabic: 'القيامة', meaning: 'The Resurrection', revelation: 'Meccan', totalAyahs: 40, juz: '29' },
  { id: 76, nameEnglish: 'Al-Insan', nameArabic: 'الإنسان', meaning: 'The Man', revelation: 'Medinan', totalAyahs: 31, juz: '29' },
  { id: 77, nameEnglish: 'Al-Mursalat', nameArabic: 'المرسلات', meaning: 'The Emissaries', revelation: 'Meccan', totalAyahs: 50, juz: '29' },
  { id: 78, nameEnglish: 'An-Naba', nameArabic: 'النبأ', meaning: 'The Tidings', revelation: 'Meccan', totalAyahs: 40, juz: '30' },
  { id: 79, nameEnglish: 'An-Nazi\'at', nameArabic: 'النازعات', meaning: 'Those Who Drag Forth', revelation: 'Meccan', totalAyahs: 46, juz: '30' },
  { id: 80, nameEnglish: '\'Abasa', nameArabic: 'عبس', meaning: 'He Frowned', revelation: 'Meccan', totalAyahs: 42, juz: '30' },
  { id: 81, nameEnglish: 'At-Takwir', nameArabic: 'التكوير', meaning: 'The Overthrowing', revelation: 'Meccan', totalAyahs: 29, juz: '30' },
  { id: 82, nameEnglish: 'Al-Infitar', nameArabic: 'الانفطار', meaning: 'The Cleaving', revelation: 'Meccan', totalAyahs: 19, juz: '30' },
  { id: 83, nameEnglish: 'Al-Mutaffifin', nameArabic: 'المطففين', meaning: 'The Defrauding', revelation: 'Meccan', totalAyahs: 36, juz: '30' },
  { id: 84, nameEnglish: 'Al-Inshiqaq', nameArabic: 'الانشقاق', meaning: 'The Sundering', revelation: 'Meccan', totalAyahs: 25, juz: '30' },
  { id: 85, nameEnglish: 'Al-Buruj', nameArabic: 'البروج', meaning: 'The Mansions of the Stars', revelation: 'Meccan', totalAyahs: 22, juz: '30' },
  { id: 86, nameEnglish: 'At-Tariq', nameArabic: 'الطارق', meaning: 'The Nightcomer', revelation: 'Meccan', totalAyahs: 17, juz: '30' },
  { id: 87, nameEnglish: 'Al-A\'la', nameArabic: 'الأعلى', meaning: 'The Most High', revelation: 'Meccan', totalAyahs: 19, juz: '30' },
  { id: 88, nameEnglish: 'Al-Ghashiyah', nameArabic: 'الغاشية', meaning: 'The Overwhelming', revelation: 'Meccan', totalAyahs: 26, juz: '30' },
  { id: 89, nameEnglish: 'Al-Fajr', nameArabic: 'الفجر', meaning: 'The Dawn', revelation: 'Meccan', totalAyahs: 30, juz: '30' },
  { id: 90, nameEnglish: 'Al-Balad', nameArabic: 'البلد', meaning: 'The City', revelation: 'Meccan', totalAyahs: 20, juz: '30' },
  { id: 91, nameEnglish: 'Ash-Shams', nameArabic: 'الشمس', meaning: 'The Sun', revelation: 'Meccan', totalAyahs: 15, juz: '30' },
  { id: 92, nameEnglish: 'Al-Layl', nameArabic: 'الليل', meaning: 'The Night', revelation: 'Meccan', totalAyahs: 21, juz: '30' },
  { id: 93, nameEnglish: 'Ad-Duhaa', nameArabic: 'الضحى', meaning: 'The Morning Hours', revelation: 'Meccan', totalAyahs: 11, juz: '30' },
  { id: 94, nameEnglish: 'Ash-Sharh', nameArabic: 'الشرح', meaning: 'The Relief', revelation: 'Meccan', totalAyahs: 8, juz: '30' },
  { id: 95, nameEnglish: 'At-Tin', nameArabic: 'التين', meaning: 'The Fig', revelation: 'Meccan', totalAyahs: 8, juz: '30' },
  { id: 96, nameEnglish: 'Al-\'Alaq', nameArabic: 'العلق', meaning: 'The Clot', revelation: 'Meccan', totalAyahs: 19, juz: '30' },
  { id: 97, nameEnglish: 'Al-Qadr', nameArabic: 'القدر', meaning: 'The Power', revelation: 'Meccan', totalAyahs: 5, juz: '30' },
  { id: 98, nameEnglish: 'Al-Bayyinah', nameArabic: 'البينة', meaning: 'The Clear Proof', revelation: 'Medinan', totalAyahs: 8, juz: '30' },
  { id: 99, nameEnglish: 'Az-Zalzalah', nameArabic: 'الزلزلة', meaning: 'The Earthquake', revelation: 'Medinan', totalAyahs: 8, juz: '30' },
  { id: 100, nameEnglish: 'Al-\'Adiyat', nameArabic: 'العاديات', meaning: 'The Courser', revelation: 'Meccan', totalAyahs: 11, juz: '30' },
  { id: 101, nameEnglish: 'Al-Qari\'ah', nameArabic: 'القارعة', meaning: 'The Calamity', revelation: 'Meccan', totalAyahs: 11, juz: '30' },
  { id: 102, nameEnglish: 'At-Takathur', nameArabic: 'التكاثر', meaning: 'The Rivalry in Worldly Increase', revelation: 'Meccan', totalAyahs: 8, juz: '30' },
  { id: 103, nameEnglish: 'Al-\'Asr', nameArabic: 'العصر', meaning: 'The Declining Day', revelation: 'Meccan', totalAyahs: 3, juz: '30' },
  { id: 104, nameEnglish: 'Al-Humazah', nameArabic: 'الهمزة', meaning: 'The Traducer', revelation: 'Meccan', totalAyahs: 9, juz: '30' },
  { id: 105, nameEnglish: 'Al-Fil', nameArabic: 'الفيل', meaning: 'The Elephant', revelation: 'Meccan', totalAyahs: 5, juz: '30' },
  { id: 106, nameEnglish: 'Quraysh', nameArabic: 'قريش', meaning: 'Quraysh', revelation: 'Meccan', totalAyahs: 4, juz: '30' },
  { id: 107, nameEnglish: 'Al-Ma\'un', nameArabic: 'الماعون', meaning: 'The Small Kindnesses', revelation: 'Meccan', totalAyahs: 7, juz: '30' },
  { id: 108, nameEnglish: 'Al-Kawthar', nameArabic: 'الكوثر', meaning: 'The Abundance', revelation: 'Meccan', totalAyahs: 3, juz: '30' },
  { id: 109, nameEnglish: 'Al-Kafirun', nameArabic: 'الكافرون', meaning: 'The Disbelievers', revelation: 'Meccan', totalAyahs: 6, juz: '30' },
  { id: 110, nameEnglish: 'An-Nasr', nameArabic: 'النصر', meaning: 'The Divine Support', revelation: 'Medinan', totalAyahs: 3, juz: '30' },
  { id: 111, nameEnglish: 'Al-Masad', nameArabic: 'المسد', meaning: 'The Palm Fiber', revelation: 'Meccan', totalAyahs: 5, juz: '30' },
  { id: 112, nameEnglish: 'Al-Ikhlas', nameArabic: 'الإخلاص', meaning: 'The Sincerity', revelation: 'Meccan', totalAyahs: 4, juz: '30' },
  { id: 113, nameEnglish: 'Al-Falaq', nameArabic: 'الفلق', meaning: 'The Daybreak', revelation: 'Meccan', totalAyahs: 5, juz: '30' },
  { id: 114, nameEnglish: 'An-Nas', nameArabic: 'الناس', meaning: 'Mankind', revelation: 'Meccan', totalAyahs: 6, juz: '30' },
];

export const OFFLINE_SURAH_AYAHS: Record<number, QuranAyah[]> = {
  1: [
    { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', urdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔' },
    { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', english: 'All praise is due to Allah, Lord of the worlds.', urdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے۔' },
    { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', english: 'The Entirely Merciful, the Especially Merciful.', urdu: 'بڑا مہربان، نہایت رحم فرمانے والا۔' },
    { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', english: 'Sovereign of the Day of Recompense.', urdu: 'بدلے کے دن (قیامت) کا مالک ہے۔' },
    { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', english: 'It is You we worship and You we ask for help.', urdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھی سے مدد مانگتے ہیں۔' },
    { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', english: 'Guide us to the straight path.', urdu: 'ہمیں سیدھا راستہ دکھا۔' },
    { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', english: 'The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.', urdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر تیرا غضب ہوا اور نہ گمراہوں کا۔' },
  ],
  103: [
    { number: 1, arabic: 'وَالْعَصْرِ', english: 'By time,', urdu: 'زمانے کی قسم،' },
    { number: 2, arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', english: 'Indeed, mankind is in loss,', urdu: 'بے شک انسان خسارے میں ہے،' },
    { number: 3, arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', english: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.', urdu: 'سوائے ان لوگوں کے جو ایمان لائے اور نیک عمل کیے اور آپس میں حق کی نصیحت کی اور صبر کی وصیت کی۔' },
  ],
  108: [
    { number: 1, arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', english: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.', urdu: 'بے شک ہم نے آپ کو (حوض) کوثر عطا فرمایا ہے۔' },
    { number: 2, arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', english: 'So pray to your Lord and sacrifice [to Him alone].', urdu: 'پس اپنے رب کے لیے نماز پڑھیں اور قربانی کریں۔' },
    { number: 3, arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', english: 'Indeed, your enemy is the one cut off.', urdu: 'بے شک آپ کا دشمن ہی بے نام و نشان رہے گا۔' },
  ],
  110: [
    { number: 1, arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', english: 'When the victory of Allah has come and the conquest,', urdu: 'جب اللہ کی مدد اور فتح آ جائے،' },
    { number: 2, arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', english: 'And you see the people entering into the religion of Allah in multitudes,', urdu: 'اور آپ لوگوں کو دیکھیں کہ وہ اللہ کے دین میں فوج در فوج داخل ہو رہے ہیں،' },
    { number: 3, arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا', english: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.', urdu: 'تو اپنے رب کی حمد کے ساتھ تسبیح کریں اور اس سے بخشش مانگیں، بے شک وہ بڑا توبہ قبول کرنے والا ہے۔' },
  ],
  112: [
    { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', english: 'Say, "He is Allah, who is One,', urdu: 'کہہ دیجئے وہ اللہ ایک ہے۔' },
    { number: 2, arabic: 'اللَّهُ الصَّمَدُ', english: 'Allah, the Eternal Refuge.', urdu: 'اللہ بے نیاز ہے۔' },
    { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', english: 'He neither begets nor is born,', urdu: 'نہ اس نے کسی کو جنا اور نہ وہ جنا گیا۔' },
    { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', english: 'Nor is there to Him any equivalent."', urdu: 'اور کوئی اس کا ہمسر نہیں۔' },
  ],
  113: [
    { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', english: 'Say, "I seek refuge in the Lord of daybreak', urdu: 'کہہ دیجئے میں صبح کے رب کی پناہ مانگتا ہوں،' },
    { number: 2, arabic: 'مِن شَرِّ مَا خَلَقَ', english: 'From the evil of that which He created', urdu: 'ہر اس چیز کے شر سے جو اس نے پیدا کی،' },
    { number: 3, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', english: 'And from the evil of darkness when it settles', urdu: 'اور اندھیری رات کے شر سے جب وہ چھا جائے،' },
    { number: 4, arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', english: 'And from the evil of the blowers in knots', urdu: 'اور گرہوں میں پھونکنے والیوں کے شر سے،' },
    { number: 5, arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', english: 'And from the evil of an envier when he envies."', urdu: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔' },
  ],
  114: [
    { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', english: 'Say, "I seek refuge in the Lord of mankind,', urdu: 'کہہ دیجئے میں لوگوں کے رب کی پناہ مانگتا ہوں،' },
    { number: 2, arabic: 'مَلِكِ النَّاسِ', english: 'The Sovereign of mankind,', urdu: 'لوگوں کے بادشاہ کی،' },
    { number: 3, arabic: 'إِلَٰهِ النَّاسِ', english: 'The God of mankind,', urdu: 'لوگوں کے معبود کی،' },
    { number: 4, arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', english: 'From the evil of the retreating whisperer —', urdu: 'وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے،' },
    { number: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', english: 'Who whispers evil into the breasts of mankind —', urdu: 'جو لوگوں کے سینوں میں وسوسے ڈالتا ہے،' },
    { number: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', english: 'From among the jinn and mankind."', urdu: 'جنوں میں سے اور انسانوں میں سے۔' },
  ],
};

const surahMemoryCache = new Map<number, QuranAyah[]>();

interface AlQuranEditionResponse {
  code: number;
  data: Array<{
    ayahs: Array<{
      numberInSurah: number;
      text: string;
    }>;
  }>;
}

export async function fetchFullSurahAyahs(surahId: number): Promise<QuranAyah[]> {
  const cached = surahMemoryCache.get(surahId);
  if (cached) return cached;

  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(`noor-surah-v1-${surahId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as QuranAyah[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          surahMemoryCache.set(surahId, parsed);
          return parsed;
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.sahih,ur.jalandhry`,
      { signal: controller.signal },
    );
    if (!res.ok) {
      throw new Error(`Quran service returned ${res.status}`);
    }
    const json = (await res.json()) as AlQuranEditionResponse;
    const [arabicEdition, englishEdition, urduEdition] = json.data || [];
    if (!arabicEdition?.ayahs?.length) {
      throw new Error('Surah text unavailable.');
    }

    const ayahs: QuranAyah[] = arabicEdition.ayahs.map((a, idx) => ({
      number: a.numberInSurah ?? idx + 1,
      arabic: a.text,
      english: englishEdition?.ayahs?.[idx]?.text || '',
      urdu: urduEdition?.ayahs?.[idx]?.text || '',
    }));

    surahMemoryCache.set(surahId, ayahs);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(`noor-surah-v1-${surahId}`, JSON.stringify(ayahs));
      } catch {
        // Ignore storage quota errors for large surahs
      }
    }
    return ayahs;
  } catch (err) {
    const offlineFallback = OFFLINE_SURAH_AYAHS[surahId];
    if (offlineFallback) {
      return offlineFallback;
    }
    throw err;
  } finally {
    window.clearTimeout(timeout);
  }
}

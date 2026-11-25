export type AzkaarCategory = 'morning' | 'evening' | 'both' | 'salah' | 'sleep' | 'dua';

export type MasnoonDuaGroup =
  | 'All Duas'
  | 'Home & Family'
  | 'Travel & Masjid'
  | 'Food & Dress'
  | 'Distress & Istikhara'
  | 'Forgiveness & Guidance';

export interface AzkaarItem {
  id: string;
  title: string;
  period: AzkaarCategory;
  duaGroup?: Exclude<MasnoonDuaGroup, 'All Duas'>;
  targetCount: number;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  virtue: string;
}

export const MASNOON_DUA_GROUPS: MasnoonDuaGroup[] = [
  'All Duas',
  'Home & Family',
  'Travel & Masjid',
  'Food & Dress',
  'Distress & Istikhara',
  'Forgiveness & Guidance',
];

export const AZKAAR_LIST: AzkaarItem[] = [
  // Morning & Evening Core Fortress (Hisn-ul-Muslim)
  {
    id: 'ayat-kursi',
    title: 'Ayat-ul-Kursi',
    period: 'both',
    targetCount: 1,
    arabic:
      'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration:
      'Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta’khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard...',
    english:
      'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...',
    urdu: 'اللہ وہ ہے جس کے سوا کوئی معبود نہیں، زندہ ہے، سب کا تھامنے والا ہے، اسے نہ اونگھ آتی ہے نہ نیند، آسمانوں اور زمین میں جو کچھ ہے سب اسی کا ہے۔',
    virtue: 'Protection from all harm until evening/morning (Al-Hakim).',
  },
  {
    id: 'three-quls',
    title: 'Surah Al-Ikhlas, Al-Falaq & An-Nas',
    period: 'both',
    targetCount: 3,
    arabic:
      'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration:
      'Qul HuwAllahu Ahad · Qul a’udhu bi Rabbil-Falaq · Qul a’udhu bi Rabbin-Nas (3 times each)',
    english:
      'Recite Surah Al-Ikhlas, Al-Falaq, and An-Nas three times each morning and evening.',
    urdu: 'صبح و شام تین تین مرتبہ سورہ اخلاص، سورہ فلق اور سورہ ناس پڑھیں۔',
    virtue: 'Sufficient for protection against every harm (Abu Dawud & Tirmidhi).',
  },
  {
    id: 'sayyid-istighfar',
    title: 'Sayyid-ul-Istighfar (Master Supplication)',
    period: 'both',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration:
      'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana abduka, wa ana ala ahdika wa wa’dika mastata’tu...',
    english:
      'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your favor upon me and my sin, so forgive me.',
    urdu: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، مجھ پر تیری نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے۔',
    virtue: 'Whoever recites this with certainty and passes away enters Paradise (Bukhari).',
  },
  {
    id: 'asbahna-morning',
    title: 'Morning Declaration of Praise (Asbahna)',
    period: 'morning',
    targetCount: 1,
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ala kulli shay’in Qadir.',
    english:
      'We have reached the morning and all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner.',
    urdu: 'ہم نے صبح کی اور تمام بادشاہی اللہ ہی کے لیے ہے، اور سب تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں۔',
    virtue: 'Recited after Fajr to renew gratitude and reliance upon Allah (Muslim).',
  },
  {
    id: 'amsayna-evening',
    title: 'Evening Declaration of Praise (Amsayna)',
    period: 'evening',
    targetCount: 1,
    arabic:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ala kulli shay’in Qadir.',
    english:
      'We have reached the evening and all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone, without partner.',
    urdu: 'ہم نے شام کی اور تمام بادشاہی اللہ ہی کے لیے ہے، اور سب تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں۔',
    virtue: 'Recited after Asr to begin the evening in remembrance of Allah (Muslim).',
  },
  {
    id: 'bika-asbahna',
    title: 'Allahumma Bika Asbahna (Morning Trust)',
    period: 'morning',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration:
      'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur.',
    english:
      'O Allah, by Your leave we have reached the morning and by Your leave we reach the evening; by You we live and by You we die, and to You is the resurrection.',
    urdu: 'اے اللہ! تیری ہی قدرت سے ہم نے صبح کی اور تیری ہی قدرت سے شام کرتے ہیں، تیری ہی طرف سے جیتے ہیں اور مرتے ہیں اور تیری ہی طرف لوٹ کر جانا ہے۔',
    virtue: 'Daily Sunnah morning supplication (Abu Dawud & Tirmidhi).',
  },
  {
    id: 'bika-amsayna',
    title: 'Allahumma Bika Amsayna (Evening Trust)',
    period: 'evening',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    transliteration:
      'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir.',
    english:
      'O Allah, by Your leave we have reached the evening and by Your leave we reach the morning; by You we live and by You we die, and to You is the final return.',
    urdu: 'اے اللہ! تیری ہی قدرت سے ہم نے شام کی اور تیری ہی قدرت سے صبح کرتے ہیں، تیرے ہی حکم سے جیتے اور مرتے ہیں اور تیری ہی طرف لوٹ کر جانا ہے۔',
    virtue: 'Daily Sunnah evening supplication (Abu Dawud & Tirmidhi).',
  },
  {
    id: 'ush-hiduka',
    title: 'Witnessing the Oneness of Allah (4x)',
    period: 'both',
    targetCount: 4,
    arabic:
      'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
    transliteration:
      'Allahumma inni asbahtu (amsaytu) ush-hiduka wa ush-hidu hamalata Arshika wa mala’ikataka wa jami’a khalqika annaka AntAllahu la ilaha illa Anta...',
    english:
      'O Allah, I call You, the bearers of Your Throne, Your angels, and all creation to witness that You are Allah, none has the right to be worshipped except You alone, and Muhammad is Your servant and Messenger.',
    urdu: 'اے اللہ! میں تجھے، تیرے عرش کو اٹھانے والے فرشتوں اور تمام مخلوق کو گواہ بناتا ہوں کہ تو ہی اللہ ہے، تیرے سوا کوئی معبود نہیں اور محمد ﷺ تیرے بندے اور رسول ہیں۔',
    virtue: 'Reciting four times frees the servant from the Fire (Abu Dawud).',
  },
  {
    id: 'ni-matin',
    title: 'Gratitude for All Blessings of the Day/Night',
    period: 'both',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
    transliteration:
      'Allahumma ma asbaha (amsa) bi min ni’matin aw bi ahadin min khalqika faminka wahdaka la sharika laka, falakal-hamdu wa lakash-shukr.',
    english:
      'O Allah, whatever blessing I or any of Your creation have entered the morning/evening with is from You alone without partner; so for You is all praise and all thanks.',
    urdu: 'اے اللہ! مجھ پر یا تیری مخلوق میں سے کسی پر جو بھی نعمت آئی ہے وہ صرف تیری ہی طرف سے ہے، پس تمام تعریف اور شکر تیرے ہی لیے ہے۔',
    virtue: 'Fulfills the thanks due for the day/night (Abu Dawud).',
  },
  {
    id: 'afini-fi-badani',
    title: 'Dua for Health, Hearing & Sight (3x)',
    period: 'both',
    targetCount: 3,
    arabic:
      'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
    transliteration:
      'Allahumma afini fi badani, Allahumma afini fi sam’i, Allahumma afini fi basari, la ilaha illa Anta.',
    english:
      'O Allah, grant health to my body. O Allah, grant health to my hearing. O Allah, grant health to my sight. None has the right to be worshipped except You.',
    urdu: 'اے اللہ! میرے بدن کو عافیت دے، اے اللہ! میری سماعت کو عافیت دے، اے اللہ! میری بینائی کو عافیت دے، تیرے سوا کوئی معبود نہیں۔',
    virtue: 'Prophetic Sunnah prayer for well-being three times morning & evening (Abu Dawud).',
  },
  {
    id: 'hasbiyallahu',
    title: 'Sufficiency in Allah (HasbiyAllahu 7x)',
    period: 'both',
    targetCount: 7,
    arabic:
      'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration:
      'HasbiyAllahu la ilaha illa Huwa, alayhi tawakkaltu wa Huwa Rabbul-Arshil-Azim.',
    english:
      'Allah is sufficient for me; there is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.',
    urdu: 'میرے لیے اللہ ہی کافی ہے، اس کے سوا کوئی معبود نہیں، میں نے اسی پر بھروسہ کیا اور وہ عرش عظیم کا مالک ہے۔',
    virtue: 'Allah suffices him against whatever concerns him in this life and the next (Abu Dawud).',
  },
  {
    id: 'al-afwa-wal-afiyah',
    title: 'Dua for Pardon & Well-being (Al-Afiyah)',
    period: 'both',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي',
    transliteration:
      'Allahumma inni as’alukal-afwa wal-afiyata fid-dunya wal-akhirah, Allahumma inni as’alukal-afwa wal-afiyata fi dini wa dunyaya wa ahli wa mali...',
    english:
      'O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, worldly affairs, family, and wealth. Conceal my faults and calm my fears.',
    urdu: 'اے اللہ! میں تجھ سے دنیا اور آخرت میں معافی اور عافیت مانگتا ہوں، میرے دین، دنیا، گھر والوں اور مال میں عافیت عطا فرما اور میرے عیبوں پر پردہ ڈال۔',
    virtue: 'The Prophet (SAW) never left reciting this in morning & evening (Abu Dawud & Ibn Majah).',
  },
  {
    id: 'alimal-ghayb',
    title: 'Refuge from Evil of Self & Shaytan',
    period: 'both',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ',
    transliteration:
      'Allahumma Alimal-ghaybi wash-shahadah, Fatiras-samawati wal-ard, Rabba kulli shay’in wa malikahu, a’udhu bika min sharri nafsi wa min sharrish-shaytani wa shirkih.',
    english:
      'O Allah, Knower of the unseen and the seen, Creator of the heavens and earth, Lord and Sovereign of all things, I seek refuge in You from the evil of my own soul and from the evil of Shaytan and his snares.',
    urdu: 'اے غیب و حاضر کے جاننے والے، آسمانوں اور زمین کے پیدا کرنے والے، میں اپنے نفس کے شر سے اور شیطان کے شر اور اس کے شرک سے تیری پناہ مانگتا ہوں۔',
    virtue: 'Taught by the Prophet (SAW) to Abu Bakr (RA) for morning, evening & sleep (Tirmidhi).',
  },
  {
    id: 'bismillah-yadurru',
    title: 'In the Name of Allah (Protection 3x)',
    period: 'both',
    targetCount: 3,
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration:
      'Bismillahilladhi la yadurru ma’asmihi shay’un fil-ardi wa la fis-sama’i wa Huwas-Sami’ul-Alim.',
    english:
      'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
    urdu: 'اس اللہ کے نام سے جس کے نام کی برکت سے زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، سب کچھ جاننے والا ہے۔',
    virtue: 'Nothing will harm the one who recites it three times (Abu Dawud & Tirmidhi).',
  },
  {
    id: 'raditu-billahi',
    title: 'Contentment with Allah, Islam & Muhammad (3x)',
    period: 'both',
    targetCount: 3,
    arabic:
      'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration:
      'Raditu billahi Rabban, wa bil-Islami dinan, wa bi Muhammadin (SAW) nabiyya.',
    english:
      'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (SAW) as my Prophet.',
    urdu: 'میں اللہ کے رب ہونے پر، اسلام کے دین ہونے پر، اور حضرت محمد ﷺ کے نبی ہونے پر دل سے راضی ہوں۔',
    virtue: 'Allah guarantees to please the reciter on the Day of Resurrection (Ahmad & Tirmidhi).',
  },
  {
    id: 'ya-hayyu-ya-qayyum',
    title: 'Ya Hayyu Ya Qayyum (Aid in All Affairs)',
    period: 'both',
    targetCount: 1,
    arabic:
      'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    transliteration:
      'Ya Hayyu ya Qayyumu bi rahmatika astaghith, aslih li sha’ni kullahu wa la takilni ila nafsi tarfata ayn.',
    english:
      'O Ever-Living, O Sustainer, in Your mercy I seek relief; rectify all of my affairs and do not leave me to myself even for the blink of an eye.',
    urdu: 'اے زندہ و جاوید اور سب کو تھامنے والے! تیری رحمت کے وسیلے سے فریاد کرتا ہوں، میرے تمام کام سنوار دے اور پلک جھپکنے کے برابر بھی مجھے میرے نفس کے حوالے نہ کر۔',
    virtue: 'Advised by the Prophet (SAW) to Fatimah (RA) for morning & evening (Nasa’i).',
  },
  {
    id: 'fitratil-islam',
    title: 'Declaration on the Natural Religion of Islam',
    period: 'morning',
    targetCount: 1,
    arabic:
      'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    transliteration:
      'Asbahna ala fitratil-Islam, wa ala kalimatil-ikhlas, wa ala dini nabiyyina Muhammadin (SAW), wa ala millati abina Ibrahima hanifan musliman...',
    english:
      'We have entered the morning upon the natural religion of Islam, upon the word of pure faith, upon the religion of our Prophet Muhammad (SAW), and upon the way of our forefather Ibrahim, upright and submitting.',
    urdu: 'ہم نے اسلام کی فطرت، کلمہ اخلاص، اپنے نبی محمد ﷺ کے دین اور اپنے باپ ابراہیمؑ کی ملتِ حنیف پر صبح کی۔',
    virtue: 'Authentic morning Sunnah remembrance (Ahmad 15367).',
  },
  {
    id: 'adada-khalqihi',
    title: 'Tasbeeh Equal to Creation (Morning 3x)',
    period: 'morning',
    targetCount: 3,
    arabic:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    transliteration:
      'SubhanAllahi wa bihamdihi: adada khalqihi, wa rida nafsihi, wa zinata arshihi, wa midada kalimatih.',
    english:
      'Glory and praise be to Allah: as much as the number of His creation, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words.',
    urdu: 'اللہ پاک ہے اپنی حمد کے ساتھ، اپنی مخلوق کی تعداد کے برابر، اپنی رضا کے برابر، اپنے عرش کے وزن کے برابر اور اپنے کلمات کی سیاہی کے برابر۔',
    virtue: 'Outweighs hours of morning dhikr (Sahih Muslim 2726).',
  },
  {
    id: 'ilman-nafian',
    title: 'Morning Prayer for Beneficial Knowledge & Rizq',
    period: 'morning',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration:
      'Allahumma inni as’aluka ilman nafi’an, wa rizqan tayyiban, wa amalan mutaqabbalan.',
    english:
      'O Allah, I ask You for beneficial knowledge, pure wholesome provision, and deeds that are accepted.',
    urdu: 'اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور مقبول عمل کا سوال کرتا ہوں۔',
    virtue: 'Recited immediately after Fajr Salaam (Sunan Ibn Majah 925).',
  },
  {
    id: 'kalimatillahit-tammat',
    title: 'Refuge in Perfect Words of Allah (Evening 3x)',
    period: 'evening',
    targetCount: 3,
    arabic:
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration:
      'A’udhu bi kalimatillahit-tammati min sharri ma khalaq.',
    english:
      'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    urdu: 'میں اللہ کے کامل کلمات کی پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا کی۔',
    virtue: 'Protects from venomous creatures and nighttime harm (Sahih Muslim 2709).',
  },
  {
    id: 'subhanallahi-bihamdihi',
    title: 'SubhanAllahi wa bihamdihi (100x)',
    period: 'both',
    targetCount: 100,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'SubhanAllahi wa bihamdihi.',
    english: 'Glory be to Allah and praise Him.',
    urdu: 'اللہ پاک ہے اپنی تمام خوبیوں اور حمد کے ساتھ۔',
    virtue: 'Sins are forgiven even if they are like the foam of the sea (Bukhari & Muslim).',
  },
  {
    id: 'tahlil-100',
    title: 'La ilaha illAllahu Wahdahu (10x / 100x)',
    period: 'both',
    targetCount: 10,
    arabic:
      'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ala kulli shay’in Qadir.',
    english:
      'None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise, and He is over all things omnipotent.',
    urdu: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے، اسی کے لیے حمد ہے اور وہ ہر چیز پر قادر ہے۔',
    virtue: '100 rewards, 100 sins erased, and a shield from Shaytan all day (Bukhari & Muslim).',
  },
  {
    id: 'istighfar-100',
    title: 'Astaghfirullah wa Atubu Ilayh (100x)',
    period: 'both',
    targetCount: 100,
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atubu ilayh.',
    english: 'I seek Allah’s forgiveness and turn to Him in repentance.',
    urdu: 'میں اللہ سے بخشش مانگتا ہوں اور اسی کی طرف توبہ کرتا ہوں۔',
    virtue: 'The Messenger of Allah (SAW) sought forgiveness 100 times daily (Sahih Muslim).',
  },
  {
    id: 'durood-sharif',
    title: 'Durood Sharif — Blessings on the Prophet (10x)',
    period: 'both',
    targetCount: 10,
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    transliteration: 'Allahumma salli wa sallim ala nabiyyina Muhammad.',
    english: 'O Allah, send peace and blessings upon our Prophet Muhammad (SAW).',
    urdu: 'اے اللہ! ہمارے نبی حضرت محمد ﷺ پر درود و سلام نازل فرما۔',
    virtue: 'Ten blessings morning & evening secure the Prophet’s intercession (Tabarani).',
  },

  // After Farz Salah Azkaar
  {
    id: 'salah-istighfar-salam',
    title: 'Istighfar (3x) & Allahumma Antas-Salam',
    period: 'salah',
    targetCount: 3,
    arabic:
      'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) ۝ اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration:
      'Astaghfirullah (3x) · Allahumma Antas-Salam wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.',
    english:
      'I seek Allah’s forgiveness (3x). O Allah, You are Peace and from You comes peace; blessed are You, O Possessor of Majesty and Honor.',
    urdu: 'میں اللہ سے معافی مانگتا ہوں (3 بار)۔ اے اللہ! تو ہی سلامتی والا ہے اور تیری ہی طرف سے سلامتی ہے، تو بڑی برکت والا ہے اے بزرگی اور اکرام والے۔',
    virtue: 'First words spoken by the Prophet (SAW) after concluding Salah (Sahih Muslim).',
  },
  {
    id: 'salah-a-inni',
    title: 'Dua for Gratitude & Excellence in Worship',
    period: 'salah',
    targetCount: 1,
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    transliteration: 'Allahumma a’inni ala dhikrika, wa shukrika, wa husni ibadatik.',
    english:
      'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
    urdu: 'اے اللہ! اپنے ذکر، اپنے شکر اور اپنی بہترین عبادت پر میری مدد فرما۔',
    virtue: 'Taught with love by the Prophet (SAW) to Muadh ibn Jabal (RA) after every prayer.',
  },
  {
    id: 'salah-subhanallah-33',
    title: 'Tasbeeh Fatimah — SubhanAllah (33x)',
    period: 'salah',
    targetCount: 33,
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah (33 times after Salah)',
    english: 'Glory be to Allah.',
    urdu: 'اللہ ہر عیب سے پاک ہے۔',
    virtue: 'Part 1 of Tasbeeh Fatimah after every Farz Namaz (Sahih Muslim 597).',
  },
  {
    id: 'salah-alhamdulillah-33',
    title: 'Tasbeeh Fatimah — Alhamdulillah (33x)',
    period: 'salah',
    targetCount: 33,
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah (33 times after Salah)',
    english: 'All praise is due to Allah.',
    urdu: 'تمام تعریفیں اللہ ہی کے لیے ہیں۔',
    virtue: 'Part 2 of Tasbeeh Fatimah after every Farz Namaz (Sahih Muslim 597).',
  },
  {
    id: 'salah-allahuakbar-34',
    title: 'Tasbeeh Fatimah — Allahu Akbar (34x)',
    period: 'salah',
    targetCount: 34,
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar (34 times after Salah)',
    english: 'Allah is the Greatest.',
    urdu: 'اللہ سب سے بڑا ہے۔',
    virtue: 'Completes 100 remembrances; sins forgiven even like sea foam (Sahih Muslim 597).',
  },

  // Before Sleep Azkaar
  {
    id: 'sleep-bismika',
    title: 'Bismika Allahumma Amutu wa Ahya',
    period: 'sleep',
    targetCount: 1,
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    english: 'In Your name, O Allah, I die and I live.',
    urdu: 'اے اللہ! تیرے ہی نام سے میں سوتا (مرتا) ہوں اور تیرے ہی نام سے جاگتا (جیتا) ہوں۔',
    virtue: 'Recited upon lying down to sleep (Sahih al-Bukhari 6324).',
  },
  {
    id: 'sleep-qini-adhabak',
    title: 'Dua for Safety on Day of Resurrection (3x)',
    period: 'sleep',
    targetCount: 3,
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: 'Allahumma qini adhabaka yawma tab’athu ibadak.',
    english: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    urdu: 'اے اللہ! جس دن تو اپنے بندوں کو اٹھائے اس دن مجھے اپنے عذاب سے بچا لینا۔',
    virtue: 'The Prophet (SAW) recited this placing his right hand under his cheek (Abu Dawud).',
  },
  {
    id: 'sleep-baqarah-last2',
    title: 'Last Two Ayahs of Surah Al-Baqarah (2:285–286)',
    period: 'sleep',
    targetCount: 1,
    arabic:
      'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا...',
    transliteration:
      'Amanar-rasulu bima unzila ilayhi mir-Rabbihi wal-mu’minun... Rabbana la tu’akhidhna in nasina aw akhta’na...',
    english:
      'The Messenger has believed in what was revealed to him from his Lord, and so have the believers... Our Lord, do not impose blame upon us if we have forgotten or erred, and pardon us, forgive us, and have mercy upon us.',
    urdu: 'رسول ایمان لائے اس پر جو ان کے رب کی طرف سے نازل ہوا اور مومن بھی... اے ہمارے رب اگر ہم بھول جائیں یا غلطی کریں تو ہماری گرفت نہ فرما اور ہمیں معاف فرما کر رحم فرما۔',
    virtue: 'Whoever recites these two verses at night, they will suffice him (Bukhari & Muslim).',
  },

  // =========================================================================
  // ALL MASNOON DUAS (Hisn-ul-Muslim Daily Sunnah Supplications)
  // =========================================================================

  // Home & Family
  {
    id: 'dua-waking-up',
    title: 'Dua Upon Waking Up from Sleep',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdulillahilladhi ahyana ba’da ma amatana wa ilayhin-nushur.',
    english:
      'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت (نیند) کے بعد زندگی عطا فرمائی اور اسی کی طرف لوٹ کر جانا ہے۔',
    virtue: 'First Masnoon Dua recited upon opening one’s eyes (Sahih al-Bukhari 6312).',
  },
  {
    id: 'dua-enter-washroom',
    title: 'Dua Before Entering the Washroom',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Bismillah, Allahumma inni a’udhu bika minal-khubuthi wal-khaba’ith.',
    english:
      'In the name of Allah. O Allah, I seek refuge in You from male and female evil spirits.',
    urdu: 'اللہ کے نام سے، اے اللہ! میں ناپاک جنوں (نر و مادہ) کے شر سے تیری پناہ مانگتا ہوں۔',
    virtue: 'Recited before stepping into the washroom (Bukhari 142 & Muslim 375).',
  },
  {
    id: 'dua-leave-washroom',
    title: 'Dua Upon Leaving the Washroom',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufranaka.',
    english: 'I seek Your forgiveness (O Allah).',
    urdu: 'اے اللہ! میں تیری بخشش چاہتا ہوں۔',
    virtue: 'Sunnah upon stepping out of the washroom (Abu Dawud 30 & Tirmidhi 7).',
  },
  {
    id: 'dua-before-wudu',
    title: 'Dua Before Performing Wudu (Ablution)',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah.',
    english: 'In the name of Allah.',
    urdu: 'اللہ کے نام سے شروع کرتا ہوں۔',
    virtue: 'There is no complete Wudu without mentioning the name of Allah (Abu Dawud 101).',
  },
  {
    id: 'dua-after-wudu',
    title: 'Dua After Completing Wudu',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic:
      'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ۝ اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration:
      'Ash-hadu an la ilaha illAllahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan abduhu wa rasuluh. Allahummaj’alni minat-tawwabina waj’alni minal-mutatahhirin.',
    english:
      'I bear witness that none has the right to be worshipped except Allah alone, and Muhammad is His servant and Messenger. O Allah, make me among those who repent and purify themselves.',
    urdu: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے، اور محمد ﷺ اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے توبہ کرنے والوں اور پاک صاف رہنے والوں میں شامل فرما۔',
    virtue: 'All eight gates of Paradise are opened for the one who recites it (Muslim 234 & Tirmidhi 55).',
  },
  {
    id: 'dua-leave-home',
    title: 'Dua When Leaving the House',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic:
      'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi, tawakkaltu alAllahi, wa la hawla wa la quwwata illa billah.',
    english:
      'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
    urdu: 'اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا، اور نیکی کرنے کی طاقت و برائی سے بچنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔',
    virtue: 'Angels declare: "You are guided, defended, and protected," and Shaytan retreats (Abu Dawud & Tirmidhi).',
  },
  {
    id: 'dua-enter-home',
    title: 'Dua When Entering the House',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic:
      'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa alAllahi Rabbina tawakkalna.',
    english:
      'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust. Then greet the family with Salam.',
    urdu: 'اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے نکلے اور اپنے رب اللہ پر ہم نے بھروسہ کیا (پھر گھر والوں کو سلام کریں)۔',
    virtue: 'Prevents Shaytan from spending the night or sharing meals in your home (Abu Dawud 5096).',
  },
  {
    id: 'dua-for-parents',
    title: 'Dua for Parents (Mercy & Compassion)',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani saghira.',
    english: 'My Lord, have mercy upon them (my parents) as they brought me up when I was small.',
    urdu: 'اے میرے رب! ان دونوں (والدین) پر رحم فرما جیسا کہ انہوں نے بچپن میں میری پرورش کی۔',
    virtue: 'Quranic supplication commanded in Surah Al-Isra (17:24).',
  },
  {
    id: 'dua-righteous-family',
    title: 'Dua for Righteous Spouse & Children',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration:
      'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a’yunin waj’alna lil-muttaqina imama.',
    english:
      'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.',
    urdu: 'اے ہمارے رب! ہمیں ہماری بیویوں اور اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔',
    virtue: 'Quranic supplication of the servants of Ar-Rahman (Surah Al-Furqan 25:74).',
  },
  {
    id: 'dua-mirror',
    title: 'Dua When Looking in the Mirror',
    period: 'dua',
    duaGroup: 'Home & Family',
    targetCount: 1,
    arabic: 'اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    transliteration: 'Allahumma anta hassanta khalqi fa hassin khuluqi.',
    english: 'O Allah, just as You made my physical form good, make my character good as well.',
    urdu: 'اے اللہ! جس طرح تو نے میری صورت خوبصورت بنائی ہے اسی طرح میرے اخلاق بھی عمدہ بنا دے۔',
    virtue: 'Authentic Prophetic supplication (Musnad Ahmad 24392 & Sahih Ibn Hibban).',
  },

  // Travel & Masjid
  {
    id: 'dua-going-masjid',
    title: 'Dua While Walking to the Masjid',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا وَمِنْ أَمَامِي نُورًا',
    transliteration:
      'Allahummaj’al fi qalbi nuran, wa fi lisani nuran, wa fi sam’i nuran, wa fi basari nuran...',
    english:
      'O Allah, place light in my heart, light upon my tongue, light in my hearing, light in my sight, light behind me, and light in front of me.',
    urdu: 'اے اللہ! میرے دل میں نور، میری زبان میں نور، میری سماعت میں نور، میری بصارت میں نور، اور میرے آگے پیچھے نور عطا فرما۔',
    virtue: 'Recited by the Prophet (SAW) when heading out for Fajr prayer (Sahih Muslim 763).',
  },
  {
    id: 'dua-enter-masjid',
    title: 'Dua When Entering the Masjid (Right Foot First)',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahummaftah li abwaba rahmatik.',
    english: 'O Allah, open for me the doors of Your mercy.',
    urdu: 'اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    virtue: 'Sunnah upon stepping into the Masjid after sending Durood (Sahih Muslim 713).',
  },
  {
    id: 'dua-leave-masjid',
    title: 'Dua When Leaving the Masjid (Left Foot First)',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allahumma inni as’aluka min fadlik.',
    english: 'O Allah, I ask You from Your bounty and grace.',
    urdu: 'اے اللہ! میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔',
    virtue: 'Sunnah when stepping out of the Masjid (Sahih Muslim 713).',
  },
  {
    id: 'dua-after-azaan',
    title: 'Dua After Hearing the Azaan',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration:
      'Allahumma Rabba hadhihid-da’watit-tammah, was-salatil-qa’imah, ati Muhammadanil-wasilata wal-fadilah, wab’ath-hu maqaman mahmudanilladhi wa’adtah.',
    english:
      'O Allah, Lord of this perfect call and established prayer, grant Muhammad (SAW) Al-Wasilah and excellence, and raise him to the praised station that You promised him.',
    urdu: 'اے اللہ! اس مکمل پکار اور قائم ہونے والی نماز کے رب! حضرت محمد ﷺ کو وسیلہ اور فضیلت عطا فرما، اور انہیں مقامِ محمود پر فائز فرما جس کا تو نے ان سے وعدہ فرمایا ہے۔',
    virtue: 'Guarantees the Prophet’s intercession on the Day of Judgment (Sahih al-Bukhari 614).',
  },
  {
    id: 'dua-travel-vehicle',
    title: 'Dua When Boarding a Vehicle or Travelling',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ',
    transliteration:
      'Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.',
    english:
      'Glory be to Him who has subjected this to us, for we could never have accomplished it ourselves, and surely to our Lord we shall return.',
    urdu: 'پاک ہے وہ ذات جس نے اسے ہمارے تابع کر دیا ورنہ ہم اسے قابو کرنے کی طاقت نہ رکھتے تھے، اور بے شک ہمیں اپنے رب ہی کی طرف لوٹ کر جانا ہے۔',
    virtue: 'Sunnah upon sitting in any car, train, plane, or mount (Surah Az-Zukhruf 43:13–14 & Muslim 1342).',
  },
  {
    id: 'dua-enter-city',
    title: 'Dua Upon Entering a New Town or City',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا',
    transliteration:
      'Allahumma Rabbas-samawatis-sab’i wa ma azlalna, wa Rabbal-aradinas-sab’i wa ma aqlalna, as’aluka khayra hadhihil-qaryati wa khayra ahliha...',
    english:
      'O Allah, Lord of the seven heavens and all they shade, and Lord of the seven earths and all they carry, I ask You for the good of this town and the good of its people, and seek refuge from its evil.',
    urdu: 'اے ساتوں آسمانوں اور ساتوں زمینوں کے رب! میں تجھ سے اس شہر اور اس کے رہنے والوں کی بھلائی مانگتا ہوں اور اس کے شر سے تیری پناہ مانگتا ہوں۔',
    virtue: 'Authentic travel Sunnah when arriving in a new town (Nasa’i & Ibn Hibban).',
  },
  {
    id: 'dua-marketplace',
    title: 'Dua Upon Entering a Market or Shopping Area',
    period: 'dua',
    duaGroup: 'Travel & Masjid',
    targetCount: 1,
    arabic:
      'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, yuhyi wa yumitu wa Huwa Hayyun la yamut, bi yadihil-khayru wa Huwa ala kulli shay’in Qadir.',
    english:
      'None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise. He gives life and causes death, and He is Ever-Living and never dies. In His hand is all goodness and He is over all things omnipotent.',
    urdu: 'اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے، اسی کی بادشاہی اور حمد ہے، وہی زندہ کرتا اور مارتا ہے اور وہ ہمیشہ زندہ رہنے والا ہے، اسی کے ہاتھ میں خیر ہے اور وہ ہر چیز پر قادر ہے۔',
    virtue: 'A million good deeds written, a million sins erased, and a house built in Paradise (Tirmidhi 3428).',
  },

  // Food & Dress
  {
    id: 'dua-before-eating',
    title: 'Dua Before Eating or Drinking',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa ala barakatillah.',
    english: 'In the name of Allah and upon the blessing of Allah.',
    urdu: 'اللہ کے نام سے اور اللہ کی برکت کے ساتھ۔',
    virtue: 'Brings barakah into the meal and keeps Shaytan away (Bukhari & Abu Dawud).',
  },
  {
    id: 'dua-forgot-bismillah',
    title: 'Dua If You Forget Bismillah Before Eating',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic: 'بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ',
    transliteration: 'Bismillahi fi awwalihi wa akhirihi.',
    english: 'In the name of Allah at its beginning and at its end.',
    urdu: 'اس کے شروع اور آخر میں اللہ کا نام لیتا ہوں۔',
    virtue: 'Causes Shaytan to give up anything he shared of the meal (Abu Dawud 3767 & Tirmidhi 1858).',
  },
  {
    id: 'dua-after-eating',
    title: 'Dua After Finishing a Meal',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration:
      'Alhamdulillahilladhi at’amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.',
    english:
      'All praise is due to Allah who has fed me this and provided it for me without any might or power from myself.',
    urdu: 'تمام تعریفیں اس اللہ کے لیے ہیں جس نے مجھے یہ کھانا کھلایا اور میری کسی طاقت و قوت کے بغیر مجھے یہ رزق عطا فرمایا۔',
    virtue: 'All previous minor sins are forgiven (Abu Dawud 4023 & Tirmidhi 3458).',
  },
  {
    id: 'dua-drinking-milk',
    title: 'Dua Upon Drinking Milk',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
    transliteration: 'Allahumma barik lana fihi wa zidna minh.',
    english: 'O Allah, bless us in it (milk) and grant us more of it.',
    urdu: 'اے اللہ! ہمارے لیے اس میں برکت عطا فرما اور ہمیں اس میں سے مزید عطا فرما۔',
    virtue: 'Nothing suffices for both food and drink except milk (Tirmidhi 3455 & Abu Dawud 3730).',
  },
  {
    id: 'dua-for-host',
    title: 'Dua for Whoever Feeds or Hosts You',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
    transliteration: 'Allahumma barik lahum fima razaqtahum, waghfir lahum warhamhum.',
    english:
      'O Allah, bless them in what You have provided them, forgive them, and have mercy upon them.',
    urdu: 'اے اللہ! جو رزق تو نے انہیں دیا ہے اس میں برکت عطا فرما، ان کی مغفرت فرما اور ان پر رحم فرما۔',
    virtue: 'Prophetic gratitude prayer taught for dinner hosts (Sahih Muslim 2042).',
  },
  {
    id: 'dua-iftar',
    title: 'Dua When Breaking the Fast (Iftar)',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic:
      'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabaz-zama’u wabtallatil-uruqu, wa thabatal-ajru in sha Allah.',
    english:
      'The thirst has vanished, the veins have been moistened, and the reward is assured, if Allah wills.',
    urdu: 'پیاس بجھ گئی، رگیں تر ہو گئیں اور ان شاء اللہ ثواب ثابت ہو گیا۔',
    virtue: 'Recited right after breaking fast with dates or water (Sunan Abi Dawud 2357).',
  },
  {
    id: 'dua-wearing-clothes',
    title: 'Dua When Wearing a Garment / New Clothes',
    period: 'dua',
    duaGroup: 'Food & Dress',
    targetCount: 1,
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration:
      'Alhamdulillahilladhi kasani hadha (ath-thawba) wa razaqanihi min ghayri hawlin minni wa la quwwah.',
    english:
      'All praise is for Allah who has clothed me with this garment and provided it for me without any might or power from me.',
    urdu: 'تمام تعریفیں اس اللہ کے لیے ہیں جس نے مجھے یہ لباس پہنایا اور میری کسی طاقت و قوت کے بغیر مجھے عطا فرمایا۔',
    virtue: 'Previous sins are forgiven upon thanking Allah for clothing (Abu Dawud 4023).',
  },

  // Distress, Weather & Istikhara
  {
    id: 'dua-distress',
    title: 'Dua During Grief, Anxiety or Distress',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration:
      'Allahumma inni a’udhu bika minal-hammi wal-hazan, wal-ajzi wal-kasal, wal-bukhli wal-jubn, wa dala’id-dayni wa ghalabatir-rijal.',
    english:
      'O Allah, I seek refuge in You from worry and grief, helplessness and laziness, stinginess and cowardice, and from being overwhelmed by debt and overpowered by people.',
    urdu: 'اے اللہ! میں فکر و غم، عاجزی و سستی، بخل و بزدلی، قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔',
    virtue: 'Frequently recited by the Prophet (SAW) for relief from anxiety and debt (Bukhari 6369).',
  },
  {
    id: 'dua-yunus',
    title: 'Dua of Prophet Yunus (AS) in Hardship',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 3,
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.',
    english:
      'There is no deity worthy of worship except You; exalted are You! Indeed, I have been of the wrongdoers.',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    virtue: 'No Muslim calls upon Allah with this in any distress except that Allah answers him (Tirmidhi 3505).',
  },
  {
    id: 'dua-ease-difficulty',
    title: 'Dua When Facing a Difficult Task',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allahumma la sahla illa ma ja’altahu sahla, wa Anta taj’alul-hazna idha shi’ta sahla.',
    english:
      'O Allah, there is no ease except in what You have made easy, and You make the difficulty easy whenever You will.',
    urdu: 'اے اللہ! کوئی کام آسان نہیں مگر جسے تو آسان کر دے، اور تو جب چاہے مشکل کو آسان بنا دیتا ہے۔',
    virtue: 'Authentic dua for exams, work challenges, and obstacles (Ibn Hibban 974).',
  },
  {
    id: 'dua-pay-debt',
    title: 'Dua for Lawful Provision & Paying Off Debt',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 3,
    arabic:
      'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allahummak-fini bi halalika an haramika, wa aghnini bi fadlika amman siwak.',
    english:
      'O Allah, suffice me with Your lawful provision against what You have forbidden, and enrich me by Your grace so I need none besides You.',
    urdu: 'اے اللہ! مجھے اپنے حلال رزق کے ذریعے حرام سے بے نیاز کر دے اور اپنے فضل سے اپنے سوا ہر کسی سے مستغنی کر دے۔',
    virtue: 'Even if your debt is like a mountain, Allah will settle it for you (Sunan at-Tirmidhi 3563).',
  },
  {
    id: 'dua-istikhara',
    title: 'Dua-e-Istikhara (Seeking Allah’s Guidance)',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ',
    transliteration:
      'Allahumma inni astakhiruka bi ilmika, wa astaqdiruka bi qudratika, wa as’aluka min fadlikal-azim, fa innaka taqdiru wa la aqdir, wa ta’lamu wa la a’lam, wa Anta Allamul-ghuyub...',
    english:
      'O Allah, I seek Your guidance by virtue of Your knowledge and seek ability by Your power, and I ask You of Your great bounty. For surely You have power and I do not; You know and I do not; and You are the Knower of the unseen.',
    urdu: 'اے اللہ! میں تجھ سے تیرے علم کے واسطے سے خیر طلب کرتا ہوں اور تیری قدرت سے طاقت مانگتا ہوں، بے شک تو قادر ہے اور میں عاجز ہوں، تو جانتا ہے اور میں نہیں جانتا اور تو غیبوں کا جاننے والا ہے۔',
    virtue: 'Taught by the Prophet (SAW) for every important life decision after two rakats (Bukhari 1162).',
  },
  {
    id: 'dua-rain',
    title: 'Dua When It Rains',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    transliteration: 'Allahumma sayyiban nafi’an.',
    english: 'O Allah, make it a beneficial, wholesome rain.',
    urdu: 'اے اللہ! اسے نفع بخش بارش بنا دے۔',
    virtue: 'Rain is a blessed time when duas are readily accepted (Sahih al-Bukhari 1032).',
  },
  {
    id: 'dua-crescent',
    title: 'Dua Upon Sighting the New Crescent Moon',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic:
      'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، رَبِّي وَرَبُّكَ اللَّهُ',
    transliteration:
      'Allahumma ahillahu alayna bil-amni wal-iman, was-salamati wal-Islam, Rabbi wa RabbukAllah.',
    english:
      'O Allah, bring this crescent upon us with security and faith, safety and Islam. My Lord and your Lord (O moon) is Allah.',
    urdu: 'اے اللہ! یہ نیا چاند ہم پر امن و ایمان اور سلامتی و اسلام کے ساتھ طلوع فرما، (اے چاند) میرا اور تیرا رب اللہ ہے۔',
    virtue: 'Recited at the start of every lunar month including Ramadan (Sunan at-Tirmidhi 3451).',
  },
  {
    id: 'dua-visiting-sick',
    title: 'Dua When Visiting a Sick Person',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
    transliteration: 'La ba’sa tahurun in sha Allah.',
    english: 'No harm; may it be a purification (from sins), if Allah wills.',
    urdu: 'کوئی حرج نہیں، ان شاء اللہ یہ بیماری گناہوں سے پاکی کا باعث ہوگی۔',
    virtue: 'Comforting Sunnah upon visiting anyone who is unwell (Sahih al-Bukhari 3616).',
  },
  {
    id: 'dua-calamity-loss',
    title: 'Dua Upon Receiving News of Loss or Bereavement',
    period: 'dua',
    duaGroup: 'Distress & Istikhara',
    targetCount: 1,
    arabic:
      'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
    transliteration:
      'Inna lillahi wa inna ilayhi raji’un, Allahumma-jurni fi musibati wa akhlif li khayran minha.',
    english:
      'Indeed, to Allah we belong and to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.',
    urdu: 'ہم اللہ ہی کے ہیں اور اسی کی طرف لوٹنے والے ہیں؛ اے اللہ! مجھے میری مصیبت میں اجر عطا فرما اور اس کے بدلے مجھے اس سے بہتر نعمت عطا فرما۔',
    virtue: 'Allah rewards the believer and grants something better in its place (Sahih Muslim 918).',
  },

  // Forgiveness & Guidance
  {
    id: 'dua-rabbana-atina',
    title: 'Comprehensive Dua for This World & Hereafter',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 1,
    arabic:
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar.',
    english:
      'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    urdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔',
    virtue: 'The most frequent supplication of the Prophet Muhammad (SAW) (Bukhari 6389 & Muslim 2690).',
  },
  {
    id: 'dua-steadfast-heart',
    title: 'Dua for Steadfastness of Heart on Deen',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 3,
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    transliteration: 'Ya Muqallibal-qulub, thabbit qalbi ala dinik.',
    english: 'O Turner of the hearts, keep my heart firm upon Your religion.',
    urdu: 'اے دلوں کو پھیرنے والے! میرے دل کو اپنے دین پر ثابت قدم رکھ۔',
    virtue: 'Most frequently spoken dua by the Prophet (SAW) (Sunan at-Tirmidhi 2140).',
  },
  {
    id: 'dua-laylatul-qadr',
    title: 'Dua for Allah’s Pardon (Afuwwun)',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 3,
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allahumma innaka Afuwwun tuhibbul-afwa fa’fu anni.',
    english: 'O Allah, You are Most Pardoning and You love to pardon, so pardon me.',
    urdu: 'اے اللہ! بے شک تو بہت معاف فرمانے والا ہے اور معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔',
    virtue: 'Taught by the Prophet (SAW) to Aishah (RA) for Laylatul Qadr and daily nights (Tirmidhi 3513).',
  },
  {
    id: 'dua-kaffarah-majlis',
    title: 'Dua at the End of a Gathering (Kaffarah Majlis)',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 1,
    arabic:
      'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    transliteration:
      'SubhanakAllahumma wa bihamdika, ash-hadu an la ilaha illa Anta, astaghfiruka wa atubu ilayk.',
    english:
      'Glory be to You, O Allah, and praise be to You. I bear witness that none has the right to be worshipped except You; I seek Your forgiveness and turn to You in repentance.',
    urdu: 'اے اللہ! تو اپنی حمد کے ساتھ پاک ہے، میں گواہی دیتا ہوں کہ تیرے سوا کوئی معبود نہیں، میں تجھ سے بخشش مانگتا ہوں اور تیری طرف توبہ کرتا ہوں۔',
    virtue: 'Expiates whatever slipped in a conversation or gathering (Tirmidhi 3433).',
  },
  {
    id: 'dua-knowledge',
    title: 'Dua for Increase in Sacred Knowledge',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 1,
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni ilma.',
    english: 'My Lord, increase me in knowledge.',
    urdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    virtue: 'Quranic prayer commanded directly to the Prophet (SAW) (Surah Taha 20:114).',
  },
  {
    id: 'dua-sneezing',
    title: 'Sunnah Upon Sneezing & Replying',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 1,
    arabic:
      'الْحَمْدُ لِلَّهِ ۝ يَرْحَمُكَ اللَّهُ ۝ يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ',
    transliteration:
      'Alhamdulillah (Sneezer) · YarhamukAllah (Listener) · Yahdikumullahu wa yuslihu balakum (Reply)',
    english:
      'All praise is for Allah (sneezer) · May Allah have mercy on you (listener) · May Allah guide you and rectify your affairs (reply).',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں (چھینکنے والا) · اللہ تم پر رحم فرمائے (سننے والا) · اللہ تمہیں ہدایت دے اور تمہارا حال درست فرمائے (جواب)۔',
    virtue: 'Teaches mutual love and blessing in daily Muslim interactions (Sahih al-Bukhari 6224).',
  },
  {
    id: 'dua-guidance-taqwa',
    title: 'Dua for Guidance, Piety & Self-Sufficiency',
    period: 'dua',
    duaGroup: 'Forgiveness & Guidance',
    targetCount: 1,
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allahumma inni as’alukal-huda wat-tuqa wal-afafa wal-ghina.',
    english:
      'O Allah, I ask You for guidance, God-consciousness (Taqwa), chastity/modesty, and contentment.',
    urdu: 'اے اللہ! میں تجھ سے ہدایت، تقویٰ، پاکدامنی اور دل کی غنا (بے نیازی) مانگتا ہوں۔',
    virtue: 'Comprehensive prophetic dua covering spiritual and worldly well-being (Sahih Muslim 2721).',
  },
];

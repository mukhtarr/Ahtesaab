export type AzkaarCategory = 'morning' | 'evening' | 'both' | 'salah' | 'sleep';

export interface AzkaarItem {
  id: string;
  title: string;
  period: AzkaarCategory;
  targetCount: number;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  virtue: string;
}

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
    arabic:
      'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
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
    arabic:
      'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    transliteration:
      'Allahumma a’inni ala dhikrika, wa shukrika, wa husni ibadatik.',
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
];

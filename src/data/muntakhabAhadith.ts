export interface MuntakhabHadith {
  id: string;
  chapter: string;
  chapterUrdu: string;
  hadithNumber: number;
  arabic: string;
  english: string;
  urdu: string;
  narrator: string;
  source: string;
}

export const MUNTAKHAB_CHAPTERS = [
  'All Chapters',
  'Kalimah Tayyibah',
  'Salaah',
  'Ilm & Zikr',
  'Ikram-ul-Muslim',
  'Ikhlas-e-Niyyat',
  "Da'wat & Tabligh",
  "Tark-e-La-Ya'ni",
] as const;

export const MUNTAKHAB_AHADITH: MuntakhabHadith[] = [
  // 1. Kalimah Tayyibah
  {
    id: 'kt-1',
    chapter: 'Kalimah Tayyibah',
    chapterUrdu: 'کلمہ طیبہ',
    hadithNumber: 1,
    arabic:
      'عَنْ عُثْمَانَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ مَاتَ وَهُوَ يَعْلَمُ أَنَّهُ لَا إِلَهَ إِلَّا اللَّهُ دَخَلَ الْجَنَّةَ.',
    english:
      'Uthman (RA) reported: The Messenger of Allah (SAW) said, "Whoever dies knowing that there is no deity worthy of worship except Allah will enter Paradise."',
    urdu: 'حضرت عثمانؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: جو شخص اس حال میں فوت ہو کہ وہ یقین کے ساتھ جانتا ہو کہ اللہ کے سوا کوئی معبود نہیں، وہ جنت میں داخل ہوگا۔',
    narrator: 'Uthman ibn Affan (RA)',
    source: 'Sahih Muslim 26',
  },
  {
    id: 'kt-2',
    chapter: 'Kalimah Tayyibah',
    chapterUrdu: 'کلمہ طیبہ',
    hadithNumber: 2,
    arabic:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ، وَأَفْضَلُ الدُّعَاءِ الْحَمْدُ لِلَّهِ.',
    english:
      'The Messenger of Allah (SAW) said: "The best remembrance is La ilaha illallah (there is no deity worthy of worship except Allah), and the best supplication is Alhamdulillah (all praise is due to Allah)."',
    urdu: 'رسول اللہ ﷺ نے فرمایا: سب سے افضل ذکر "لا الہ الا اللہ" ہے اور سب سے افضل دعا "الحمد للہ" ہے۔',
    narrator: 'Jabir ibn Abdullah (RA)',
    source: 'Sunan at-Tirmidhi 3383',
  },
  {
    id: 'kt-3',
    chapter: 'Kalimah Tayyibah',
    chapterUrdu: 'کلمہ طیبہ',
    hadithNumber: 3,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: جَدِّدُوا إِيمَانَكُمْ. قِيلَ: يَا رَسُولَ اللَّهِ، وَكَيْفَ نُجَدِّدُ إِيمَانَنَا؟ قَالَ: أَكْثِرُوا مِنْ قَوْلِ لَا إِلَهَ إِلَّا اللَّهُ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "Renew your faith." It was asked, "O Messenger of Allah, how do we renew our faith?" He replied, "Say frequently: La ilaha illallah."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: اپنے ایمان کو تازہ کرتے رہو۔ عرض کیا گیا: یا رسول اللہ! ہم اپنے ایمان کو کیسے تازہ کریں؟ فرمایا: کثرت سے "لا الہ الا اللہ" کہا کرو۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Musnad Ahmad 8710 · Al-Tabarani',
  },
  {
    id: 'kt-4',
    chapter: 'Kalimah Tayyibah',
    chapterUrdu: 'کلمہ طیبہ',
    hadithNumber: 4,
    arabic:
      'عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: ثَلَاثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلَاوَةَ الْإِيمَانِ: أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا، وَأَنْ يُحِبَّ الْمَرْءَ لَا يُحِبُّهُ إِلَّا لِلَّهِ.',
    english:
      'Anas (RA) narrated that the Prophet (SAW) said: "Whoever possesses three qualities will taste the sweetness of faith: that Allah and His Messenger are dearer to him than anything else, and that he loves a person solely for the sake of Allah."',
    urdu: 'حضرت انسؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: جس شخص میں تین خصلتیں ہوں وہ ایمان کی مٹھاس پا لیتا ہے: اللہ اور اس کا رسول اس کے نزدیک ہر چیز سے زیادہ محبوب ہوں، اور وہ کسی سے محبت صرف اللہ کے لیے کرے۔',
    narrator: 'Anas ibn Malik (RA)',
    source: 'Sahih al-Bukhari 16 · Sahih Muslim 43',
  },
  {
    id: 'kt-5',
    chapter: 'Kalimah Tayyibah',
    chapterUrdu: 'کلمہ طیبہ',
    hadithNumber: 5,
    arabic:
      'عَنِ الْعَبَّاسِ بْنِ عَبْدِ الْمُطَّلِبِ رَضِيَ اللَّهُ عَنْهُ أَنَّهُ سَمِعَ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: ذَاقَ طَعْمَ الْإِيمَانِ مَنْ رَضِيَ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ رَسُولًا.',
    english:
      'Al-Abbas ibn Abd al-Muttalib (RA) heard the Messenger of Allah (SAW) say: "He has tasted the flavor of faith who is pleased with Allah as Lord, with Islam as religion, and with Muhammad (SAW) as Messenger."',
    urdu: 'حضرت عباس بن عبدالمطلبؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: اس شخص نے ایمان کا ذائقہ چکھ لیا جو اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے رسول ہونے پر راضی ہو گیا۔',
    narrator: 'Al-Abbas ibn Abd al-Muttalib (RA)',
    source: 'Sahih Muslim 34',
  },

  // 2. Salaah
  {
    id: 'sl-1',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 6,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: أَرَأَيْتُمْ لَوْ أَنَّ نَهَرًا بِبَابِ أَحَدِكُمْ يَغْتَسِلُ فِيهِ كُلَّ يَوْمٍ خَمْسَ مَرَّاتٍ، هَلْ يَبْقَى مِنْ دَرَنِهِ شَيْءٌ؟ قَالُوا: لَا يَبْقَى مِنْ دَرَنِهِ شَيْءٌ. قَالَ: فَذَلِكَ مَثَلُ الصَّلَوَاتِ الْخَمْسِ، يَمْحُو اللَّهُ بِهِنَّ الْخَطَايَا.',
    english:
      'Abu Hurairah (RA) narrated: I heard the Messenger of Allah (SAW) say, "If there were a river at the door of one of you in which he bathed five times a day, would any filth remain upon him?" They replied, "Nothing of his filth would remain." He said, "That is the likeness of the five daily prayers: Allah wipes away sins through them."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: بھلا بتاؤ اگر تم میں سے کسی کے دروازے پر ایک نہر ہو جس میں وہ روزانہ پانچ مرتبہ غسل کرے تو کیا اس کے بدن پر کوئی میل باقی رہے گا؟ صحابہؓ نے عرض کیا: ہرگز نہیں۔ فرمایا: یہی مثال پانچوں نمازوں کی ہے، اللہ تعالیٰ ان کے ذریعے گناہوں کو مٹا دیتا ہے۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih al-Bukhari 528 · Sahih Muslim 667',
  },
  {
    id: 'sl-2',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 7,
    arabic:
      'عَنِ ابْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً.',
    english:
      'Ibn Umar (RA) reported that the Messenger of Allah (SAW) said: "Prayer in congregation is twenty-seven degrees superior to prayer offered alone."',
    urdu: 'حضرت عبداللہ بن عمرؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: باجماعت نماز اکیلے پڑھنے کی نماز سے ستائیس درجہ زیادہ فضیلت رکھتی ہے۔',
    narrator: 'Abdullah ibn Umar (RA)',
    source: 'Sahih al-Bukhari 645 · Sahih Muslim 650',
  },
  {
    id: 'sl-3',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 8,
    arabic:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ، فَأَكْثِرُوا الدُّعَاءَ.',
    english:
      'The Messenger of Allah (SAW) said: "The closest a servant comes to his Lord is when he is in prostration (Sajdah), so increase your supplication therein."',
    urdu: 'رسول اللہ ﷺ نے فرمایا: بندہ اپنے رب کے سب سے زیادہ قریب سجدے کی حالت میں ہوتا ہے، پس سجدے میں کثرت سے دعا کیا کرو۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih Muslim 482',
  },
  {
    id: 'sl-4',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 9,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ، فَإِنْ صَلَحَتْ فَقَدْ أَفْلَحَ وَأَنْجَحَ، وَإِنْ فَسَدَتْ فَقَدْ خَابَ وَخَسِرَ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "The first deed for which a servant will be called to account on the Day of Resurrection is his Salaah. If it is sound, he has succeeded and prospered; if it is defective, he has failed and lost."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: قیامت کے دن بندے کے اعمال میں سب سے پہلے نماز کا حساب لیا جائے گا؛ اگر نماز درست ہوئی تو وہ کامیاب و بامراد ہوا، اور اگر نماز خراب ہوئی تو وہ ناکام اور خسارے میں رہا۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sunan at-Tirmidhi 413 · Sunan Abi Dawud 864',
  },
  {
    id: 'sl-5',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 10,
    arabic:
      'عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا.',
    english:
      'Aishah (RA) narrated from the Prophet (SAW): "The two Sunnah rakats before Fajr are better than this entire world and everything within it."',
    urdu: 'حضرت عائشہؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: فجر کی دو رکعت (سنت) دنیا اور جو کچھ دنیا میں ہے ان سب سے بہتر ہیں۔',
    narrator: 'Aishah (RA)',
    source: 'Sahih Muslim 725',
  },
  {
    id: 'sl-6',
    chapter: 'Salaah',
    chapterUrdu: 'نماز',
    hadithNumber: 11,
    arabic:
      'عَنْ بِلَالٍ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: عَلَيْكُمْ بِقِيَامِ اللَّيْلِ فَإِنَّهُ دَأَبُ الصَّالِحِينَ قَبْلَكُمْ، وَقُرْبَةٌ إِلَى اللَّهِ تَعَالَى، وَمَنْهَاةٌ عَنِ الْإِثْمِ، وَتَكْفِيرٌ لِلسَّيِّئَاتِ.',
    english:
      'Bilal (RA) narrated that the Messenger of Allah (SAW) said: "Hold fast to the night prayer (Tahajjud), for it is the practice of the righteous before you, a means of closeness to Allah, a barrier against sin, and an expiation for misdeeds."',
    urdu: 'حضرت بلالؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: تہجد کی نماز کو لازم پکڑو، کیونکہ یہ تم سے پہلے نیک لوگوں کا طریقہ ہے، اللہ کے قرب کا ذریعہ، گناہوں سے روکنے والی اور برائیوں کا کفارہ ہے۔',
    narrator: 'Bilal ibn Rabah (RA)',
    source: 'Sunan at-Tirmidhi 3549',
  },

  // 3. Ilm & Zikr
  {
    id: 'iz-1',
    chapter: 'Ilm & Zikr',
    chapterUrdu: 'علم و ذکر',
    hadithNumber: 12,
    arabic:
      'عَنْ عُثْمَانَ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.',
    english:
      'Uthman (RA) narrated from the Prophet (SAW): "The best among you are those who learn the Quran and teach it."',
    urdu: 'حضرت عثمانؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: تم میں سے سب سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے۔',
    narrator: 'Uthman ibn Affan (RA)',
    source: 'Sahih al-Bukhari 5027',
  },
  {
    id: 'iz-2',
    chapter: 'Ilm & Zikr',
    chapterUrdu: 'علم و ذکر',
    hadithNumber: 13,
    arabic:
      'عَنْ أَبِي مُوسَى رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُ رَبَّهُ مَثَلُ الْحَيِّ وَالْمَيِّتِ.',
    english:
      'Abu Musa (RA) reported that the Prophet (SAW) said: "The example of the one who remembers his Lord and the one who does not remember his Lord is like that of the living and the dead."',
    urdu: 'حضرت ابوموسیٰ اشعریؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: جو شخص اپنے رب کا ذکر کرتا ہے اور جو نہیں کرتا، ان کی مثال زندہ اور مردہ کی سی ہے۔',
    narrator: 'Abu Musa al-Ashari (RA)',
    source: 'Sahih al-Bukhari 6407',
  },
  {
    id: 'iz-3',
    chapter: 'Ilm & Zikr',
    chapterUrdu: 'علم و ذکر',
    hadithNumber: 14,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "Whoever treads a path in search of sacred knowledge, Allah will make easy for him the path to Paradise."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: جو شخص علمِ دین کی تلاش میں کسی راستے پر چلتا ہے، اللہ تعالیٰ اس کے لیے جنت کا راستہ آسان فرما دیتے ہیں۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih Muslim 2699',
  },
  {
    id: 'iz-4',
    chapter: 'Ilm & Zikr',
    chapterUrdu: 'علم و ذکر',
    hadithNumber: 15,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "Two phrases are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: دو کلمے ایسے ہیں جو زبان پر ہلکے، میزان میں بھاری اور رحمان کو بہت محبوب ہیں: "سبحان اللہ وبحمدہ، سبحان اللہ العظیم"۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih al-Bukhari 6406 · Sahih Muslim 2694',
  },
  {
    id: 'iz-5',
    chapter: 'Ilm & Zikr',
    chapterUrdu: 'علم و ذکر',
    hadithNumber: 16,
    arabic:
      'عَنْ مُعَاوِيَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ.',
    english:
      'Muawiyah (RA) narrated: I heard the Prophet (SAW) say, "Whomever Allah intends good for, He grants him deep understanding of the religion."',
    urdu: 'حضرت معاویہؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: اللہ تعالیٰ جس کے ساتھ بھلائی کا ارادہ فرماتے ہیں، اسے دین کی سمجھ عطا فرما دیتے ہیں۔',
    narrator: 'Muawiyah ibn Abi Sufyan (RA)',
    source: 'Sahih al-Bukhari 71 · Sahih Muslim 1037',
  },

  // 4. Ikram-ul-Muslim
  {
    id: 'im-1',
    chapter: 'Ikram-ul-Muslim',
    chapterUrdu: 'اکرامِ مسلم',
    hadithNumber: 17,
    arabic:
      'عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    english:
      'Anas (RA) reported from the Prophet (SAW): "None of you truly believes until he loves for his brother what he loves for himself."',
    urdu: 'حضرت انسؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے بھی وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    narrator: 'Anas ibn Malik (RA)',
    source: 'Sahih al-Bukhari 13 · Sahih Muslim 45',
  },
  {
    id: 'im-2',
    chapter: 'Ikram-ul-Muslim',
    chapterUrdu: 'اکرامِ مسلم',
    hadithNumber: 18,
    arabic:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ.',
    english:
      'The Messenger of Allah (SAW) said: "Your smiling in the face of your brother is charity for you."',
    urdu: 'رسول اللہ ﷺ نے فرمایا: اپنے مسلمان بھائی کے سامنے مسکرا کر ملنا بھی تمہارے لیے صدقہ ہے۔',
    narrator: 'Abu Dharr (RA)',
    source: 'Sunan at-Tirmidhi 1956',
  },
  {
    id: 'im-3',
    chapter: 'Ikram-ul-Muslim',
    chapterUrdu: 'اکرامِ مسلم',
    hadithNumber: 19,
    arabic:
      'عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رَضِيَ اللَّهُ عَنْهُمَا قَالَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ.',
    english:
      'Abdullah ibn Amr (RA) narrated that the Prophet (SAW) said: "A true Muslim is one from whose tongue and hands other Muslims are safe."',
    urdu: 'حضرت عبداللہ بن عمروؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: کامل مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔',
    narrator: 'Abdullah ibn Amr (RA)',
    source: 'Sahih al-Bukhari 10 · Sahih Muslim 40',
  },
  {
    id: 'im-4',
    chapter: 'Ikram-ul-Muslim',
    chapterUrdu: 'اکرامِ مسلم',
    hadithNumber: 20,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ.',
    english:
      'Abu Hurairah (RA) narrated: The Messenger of Allah (SAW) said, "Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection. And Allah helps the servant so long as the servant helps his brother."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: جو شخص کسی مومن کی دنیا کی کوئی تکلیف دور کرے گا، اللہ تعالیٰ قیامت کے دن اس کی تکلیف دور فرمائیں گے؛ اور اللہ اپنے بندے کی مدد میں رہتا ہے جب تک بندہ اپنے بھائی کی مدد میں لگا رہتا ہے۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih Muslim 2699',
  },
  {
    id: 'im-5',
    chapter: 'Ikram-ul-Muslim',
    chapterUrdu: 'اکرامِ مسلم',
    hadithNumber: 21,
    arabic:
      'عَنْ جَرِيرِ بْنِ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ لَا يَرْحَمِ النَّاسَ لَا يَرْحَمْهُ اللَّهُ.',
    english:
      'Jarir ibn Abdullah (RA) reported that the Messenger of Allah (SAW) said: "He who does not show mercy to people, Allah will not show mercy to him."',
    urdu: 'حضرت جریر بن عبداللہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: جو لوگوں پر رحم نہیں کرتا، اللہ تعالیٰ اس پر رحم نہیں فرماتے۔',
    narrator: 'Jarir ibn Abdullah (RA)',
    source: 'Sahih al-Bukhari 7376 · Sahih Muslim 2319',
  },

  // 5. Ikhlas-e-Niyyat
  {
    id: 'in-1',
    chapter: 'Ikhlas-e-Niyyat',
    chapterUrdu: 'اخلاصِ نیت',
    hadithNumber: 22,
    arabic:
      'عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.',
    english:
      'Umar ibn al-Khattab (RA) narrated: I heard the Messenger of Allah (SAW) say, "Verily, deeds are judged only by intentions, and every person will have only what they intended."',
    urdu: 'حضرت عمر بن خطابؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی۔',
    narrator: 'Umar ibn al-Khattab (RA)',
    source: 'Sahih al-Bukhari 1 · Sahih Muslim 1907',
  },
  {
    id: 'in-2',
    chapter: 'Ikhlas-e-Niyyat',
    chapterUrdu: 'اخلاصِ نیت',
    hadithNumber: 23,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "Verily, Allah does not look at your appearances or your wealth, rather He looks at your hearts and your deeds."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: بے شک اللہ تمہاری صورتوں اور تمہارے مال کو نہیں دیکھتا، بلکہ وہ تمہارے دلوں اور تمہارے اعمال کو دیکھتا ہے۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih Muslim 2564',
  },
  {
    id: 'in-3',
    chapter: 'Ikhlas-e-Niyyat',
    chapterUrdu: 'اخلاصِ نیت',
    hadithNumber: 24,
    arabic:
      'عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ.',
    english:
      'Aishah (RA) narrated that the Prophet (SAW) said: "The most beloved deeds to Allah are those done consistently, even if they are small."',
    urdu: 'حضرت عائشہؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: اللہ تعالیٰ کے نزدیک سب سے محبوب عمل وہ ہے جو ہمیشہ کیا جائے، خواہ وہ تھوڑا ہی کیوں نہ ہو۔',
    narrator: 'Aishah (RA)',
    source: 'Sahih al-Bukhari 6464 · Sahih Muslim 783',
  },
  {
    id: 'in-4',
    chapter: 'Ikhlas-e-Niyyat',
    chapterUrdu: 'اخلاصِ نیت',
    hadithNumber: 25,
    arabic:
      'عَنْ أَبِي أُمَامَةَ الْبَاهِلِيِّ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: إِنَّ اللَّهَ لَا يَقْبَلُ مِنَ الْعَمَلِ إِلَّا مَا كَانَ لَهُ خَالِصًا وَابْتُغِيَ بِهِ وَجْهُهُ.',
    english:
      'Abu Umamah al-Bahili (RA) reported: The Messenger of Allah (SAW) said, "Indeed, Allah accepts no deed except that which is purely sincere for Him and by which His pleasure alone is sought."',
    urdu: 'حضرت ابوامامہ باہلیؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: اللہ تعالیٰ صرف وہی عمل قبول فرماتے ہیں جو خالصتاً ان کے لیے ہو اور جس سے صرف ان کی رضا مطلوب ہو۔',
    narrator: 'Abu Umamah (RA)',
    source: "Sunan an-Nasa'i 3140",
  },

  // 6. Da'wat & Tabligh
  {
    id: 'dt-1',
    chapter: "Da'wat & Tabligh",
    chapterUrdu: 'دعوت و تبلیغ',
    hadithNumber: 26,
    arabic:
      'عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رَضِيَ اللَّهُ عَنْهُمَا أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: بَلِّغُوا عَنِّي وَلَوْ آيَةً.',
    english:
      'Abdullah ibn Amr (RA) narrated that the Prophet (SAW) said: "Convey from me, even if it is a single verse."',
    urdu: 'حضرت عبداللہ بن عمروؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: میری طرف سے لوگوں تک پہنچاؤ، خواہ ایک ہی آیت ہو۔',
    narrator: 'Abdullah ibn Amr (RA)',
    source: 'Sahih al-Bukhari 3461',
  },
  {
    id: 'dt-2',
    chapter: "Da'wat & Tabligh",
    chapterUrdu: 'دعوت و تبلیغ',
    hadithNumber: 27,
    arabic:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ دَعَا إِلَى هُدًى كَانَ لَهُ مِنَ الْأَجْرِ مِثْلُ أُجُورِ مَنْ تَبِعَهُ لَا يَنْقُصُ ذَلِكَ مِنْ أُجُورِهِمْ شَيْئًا.',
    english:
      'The Messenger of Allah (SAW) said: "Whoever calls others to right guidance will receive a reward equal to the rewards of those who follow him, without their rewards being diminished in the least."',
    urdu: 'رسول اللہ ﷺ نے فرمایا: جو شخص کسی نیکی اور ہدایت کی طرف بلائے تو اسے بھی اس کی پیروی کرنے والوں کے برابر ثواب ملے گا اور ان کے ثواب میں کوئی کمی نہیں ہوگی۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih Muslim 2674',
  },
  {
    id: 'dt-3',
    chapter: "Da'wat & Tabligh",
    chapterUrdu: 'دعوت و تبلیغ',
    hadithNumber: 28,
    arabic:
      'عَنْ سَهْلِ بْنِ سَعْدٍ رَضِيَ اللَّهُ عَنْهُ أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ لِعَلِيٍّ: فَوَاللَّهِ لَأَنْ يَهْدِيَ اللَّهُ بِكَ رَجُلًا وَاحِدًا خَيْرٌ لَكَ مِنْ أَنْ يَكُونَ لَكَ حُمْرُ النَّعَمِ.',
    english:
      'Sahl ibn Sa\'d (RA) narrated that the Prophet (SAW) told Ali (RA): "By Allah, if Allah guides even one man through you, it is better for you than possessing the finest red camels."',
    urdu: 'حضرت سہل بن سعدؓ سے روایت ہے کہ نبی کریم ﷺ نے حضرت علیؓ سے فرمایا: اللہ کی قسم! اگر اللہ تعالیٰ تمہارے ذریعے ایک شخص کو بھی ہدایت دے دے تو یہ تمہارے لیے سرخ اونٹوں (قیمتی دولت) سے بہتر ہے۔',
    narrator: "Sahl ibn Sa'd (RA)",
    source: 'Sahih al-Bukhari 3009 · Sahih Muslim 2406',
  },
  {
    id: 'dt-4',
    chapter: "Da'wat & Tabligh",
    chapterUrdu: 'دعوت و تبلیغ',
    hadithNumber: 29,
    arabic:
      'عَنْ أَبِي مَسْعُودٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ.',
    english:
      'Abu Masud (RA) reported that the Prophet (SAW) said: "Whoever guides someone to goodness will have a reward like that of the one who does it."',
    urdu: 'حضرت ابومسعودؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: جو شخص کسی کو نیکی کا راستہ بتائے، اسے عمل کرنے والے کے برابر ثواب ملتا ہے۔',
    narrator: 'Abu Masud al-Ansari (RA)',
    source: 'Sahih Muslim 1893',
  },

  // 7. Tark-e-La-Ya'ni (Avoiding Futile Speech & Noble Character)
  {
    id: 'tl-1',
    chapter: "Tark-e-La-Ya'ni",
    chapterUrdu: 'ترکِ لایعنی',
    hadithNumber: 30,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ.',
    english:
      'Abu Hurairah (RA) reported: The Messenger of Allah (SAW) said, "Part of the perfection of a person\'s Islam is leaving alone that which does not concern him."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: آدمی کے اسلام کی خوبی یہ ہے کہ وہ بے فائدہ اور فضول باتوں اور کاموں کو چھوڑ دے۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sunan at-Tirmidhi 2317 · Sunan Ibn Majah 3976',
  },
  {
    id: 'tl-2',
    chapter: "Tark-e-La-Ya'ni",
    chapterUrdu: 'ترکِ لایعنی',
    hadithNumber: 31,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.',
    english:
      'Abu Hurairah (RA) reported that the Prophet (SAW) said: "Whoever believes in Allah and the Last Day should speak what is good or remain silent."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہو اسے چاہیے کہ بھلائی کی بات کہے یا خاموش رہے۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih al-Bukhari 6018 · Sahih Muslim 47',
  },
  {
    id: 'tl-3',
    chapter: "Tark-e-La-Ya'ni",
    chapterUrdu: 'ترکِ لایعنی',
    hadithNumber: 32,
    arabic:
      'عَنْ عَبْدِ اللَّهِ بْنِ مَسْعُودٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ.',
    english:
      'Abdullah ibn Masud (RA) reported: The Messenger of Allah (SAW) said, "You must be truthful, for truthfulness leads to righteousness, and righteousness leads to Paradise."',
    urdu: 'حضرت عبداللہ بن مسعودؓ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: سچائی کو لازم پکڑو، کیونکہ سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کی طرف رہنمائی کرتی ہے۔',
    narrator: 'Abdullah ibn Masud (RA)',
    source: 'Sahih al-Bukhari 6094 · Sahih Muslim 2607',
  },
  {
    id: 'tl-4',
    chapter: "Tark-e-La-Ya'ni",
    chapterUrdu: 'ترکِ لایعنی',
    hadithNumber: 33,
    arabic:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَجُلًا قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَوْصِنِي. قَالَ: لَا تَغْضَبْ. فَرَدَّدَ مِرَارًا، قَالَ: لَا تَغْضَبْ.',
    english:
      'Abu Hurairah (RA) narrated that a man said to the Prophet (SAW), "Advise me." He said, "Do not get angry." The man repeated his request several times, and each time the Prophet (SAW) said, "Do not get angry."',
    urdu: 'حضرت ابوہریرہؓ سے روایت ہے کہ ایک شخص نے نبی کریم ﷺ سے عرض کیا: مجھے وصیت فرمائیے۔ آپ ﷺ نے فرمایا: غصہ نہ کیا کرو۔ اس نے کئی بار پوچھا، آپ ﷺ نے ہر بار یہی فرمایا: غصہ نہ کیا کرو۔',
    narrator: 'Abu Hurairah (RA)',
    source: 'Sahih al-Bukhari 6116',
  },
  {
    id: 'tl-5',
    chapter: "Tark-e-La-Ya'ni",
    chapterUrdu: 'ترکِ لایعنی',
    hadithNumber: 34,
    arabic:
      'عَنْ أَبِي الدَّرْدَاءِ رَضِيَ اللَّهُ عَنْهُ أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: مَا مِنْ شَيْءٍ أَثْقَلُ فِي مِيزَانِ الْمُؤْمِنِ يَوْمَ الْقِيَامَةِ مِنْ خُلُقٍ حَسَنٍ.',
    english:
      'Abu Darda (RA) narrated that the Prophet (SAW) said: "Nothing will be heavier on the believer\'s Scale on the Day of Resurrection than good character."',
    urdu: 'حضرت ابودرداءؓ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: قیامت کے دن مومن کے میزانِ عمل میں اچھے اخلاق سے زیادہ بھاری کوئی چیز نہیں ہوگی۔',
    narrator: 'Abu al-Darda (RA)',
    source: 'Sunan at-Tirmidhi 2002',
  },
];

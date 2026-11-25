export const MYSQL_SCHEMA_SQL = `-- MySQL 8+ Schema for Noor Amaal (Node/Express + Flutter Backend)
CREATE DATABASE IF NOT EXISTS noor_amaal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE noor_amaal;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firebase_uid VARCHAR(128) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL DEFAULT '',
  city VARCHAR(100) NOT NULL DEFAULT 'Mecca',
  azaan_volume INT NOT NULL DEFAULT 90,
  azaan_enabled TINYINT(1) NOT NULL DEFAULT 1,
  sleep_reminder_time VARCHAR(10) NOT NULL DEFAULT '22:00',
  daily_quran_goal_pages INT NOT NULL DEFAULT 4,
  prayer_times_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE daily_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  log_date DATE NOT NULL,
  fajr ENUM('pending','jamaat','ontime','qaza','missed') DEFAULT 'pending',
  zuhr ENUM('pending','jamaat','ontime','qaza','missed') DEFAULT 'pending',
  asr ENUM('pending','jamaat','ontime','qaza','missed') DEFAULT 'pending',
  maghrib ENUM('pending','jamaat','ontime','qaza','missed') DEFAULT 'pending',
  isha ENUM('pending','jamaat','ontime','qaza','missed') DEFAULT 'pending',
  tahajjud TINYINT(1) NOT NULL DEFAULT 0,
  ishraq TINYINT(1) NOT NULL DEFAULT 0,
  chasht TINYINT(1) NOT NULL DEFAULT 0,
  awwabin TINYINT(1) NOT NULL DEFAULT 0,
  morning_azkaar TINYINT(1) NOT NULL DEFAULT 0,
  evening_azkaar TINYINT(1) NOT NULL DEFAULT 0,
  roza TINYINT(1) NOT NULL DEFAULT 0,
  roza_type VARCHAR(20) NOT NULL DEFAULT 'sunnah',
  quran_pages INT NOT NULL DEFAULT 0,
  quran_ruku INT NOT NULL DEFAULT 0,
  quran_minutes INT NOT NULL DEFAULT 0,
  quran_last_surah VARCHAR(120) DEFAULT '',
  daily_taleem TINYINT(1) NOT NULL DEFAULT 0,
  taleem_minutes INT NOT NULL DEFAULT 0,
  taleem_topic VARCHAR(140) DEFAULT '',
  quran_halqa TINYINT(1) NOT NULL DEFAULT 0,
  halqa_notes TEXT,
  nek_amaal_json JSON NOT NULL,
  reflection_note TEXT,
  honest_submitted TINYINT(1) NOT NULL DEFAULT 0,
  submitted_at TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_date (user_id, log_date),
  CONSTRAINT fk_daily_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

export const FLUTTER_PUBSPEC_YAML = `name: noor_amaal
description: Daily Islamic Routine, Loud Azaan Reminders, Quran, Muntakhab Ahaadees & Azkaar
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.4.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.2
  provider: ^6.1.2
  flutter_local_notifications: ^17.2.2
  just_audio: ^0.9.40
  timezone: ^0.9.4
  firebase_core: ^3.6.0
  firebase_auth: ^5.3.1
  google_fonts: ^6.2.1
  intl: ^0.19.0`;

export const FLUTTER_MAIN_DART = `import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:just_audio/just_audio.dart';

void main() => runApp(const NoorAmaalApp());

class NoorAmaalApp extends StatelessWidget {
  const NoorAmaalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Noor Amaal',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: const Color(0xFF0D5C46),
        scaffoldBackgroundColor: const Color(0xFFF8F7F4),
        useMaterial3: true,
      ),
      home: const DailyRoutineScreen(),
    );
  }
}

class AzaanReminderService {
  static final _notifications = FlutterLocalNotificationsPlugin();
  static final _player = AudioPlayer();

  static Future<void> triggerLoudAzaan(String prayerName) async {
    await _player.setAsset('assets/audio/azaan_makkah.mp3');
    await _player.setVolume(1.0);
    await _player.play();

    await _notifications.show(
      prayerName.hashCode,
      '$prayerName Prayer Time',
      'Allahu Akbar — Time for $prayerName Salah',
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'azaan_loud_channel',
          'Loud Azaan & Namaz Reminders',
          importance: Importance.max,
          priority: Priority.max,
          fullScreenIntent: true,
        ),
      ),
    );
  }
}

class DailyRoutineScreen extends StatefulWidget {
  const DailyRoutineScreen({super.key});
  @override
  State<DailyRoutineScreen> createState() => _DailyRoutineScreenState();
}

class _DailyRoutineScreenState extends State<DailyRoutineScreen> {
  int _tabIndex = 0;
  final Map<String, String> _farz = {
    'Fajr': 'pending',
    'Zuhr': 'pending',
    'Asr': 'pending',
    'Maghrib': 'pending',
    'Isha': 'pending',
  };

  Future<void> _submitHonestly(String token) async {
    final res = await http.put(
      Uri.parse('https://your-express-api.example.com/api/daily/today'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({'farz': _farz, 'honestSubmitted': true}),
    );
    if (res.statusCode == 200 && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Alhamdulillah! Day submitted honestly.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Noor Amaal')),
      body: Center(
        child: FilledButton(
          onPressed: () => AzaanReminderService.triggerLoudAzaan('Fajr'),
          child: const Text('Test Loud Azaan'),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tabIndex,
        onDestinationSelected: (i) => setState(() => _tabIndex = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.check_circle_outline), label: 'Today'),
          NavigationDestination(icon: Icon(Icons.menu_book_outlined), label: 'Quran'),
          NavigationDestination(icon: Icon(Icons.auto_stories_outlined), label: 'Hadees'),
          NavigationDestination(icon: Icon(Icons.wb_twilight_outlined), label: 'Azkaar'),
          NavigationDestination(icon: Icon(Icons.history), label: 'History'),
        ],
      ),
    );
  }
}`;

export const ANDROID_MANIFEST_XML = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <!-- Required for Android 13+ Loud Azaan & Namaz Reminders -->
  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
  <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
  <uses-permission android:name="android.permission.USE_EXACT_ALARM" />
  <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
  <uses-permission android:name="android.permission.WAKE_LOCK" />
  <uses-permission android:name="android.permission.VIBRATE" />
  <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
  <uses-permission android:name="android.permission.INTERNET" />

  <application
    android:label="Noor Amaal"
    android:name="\${applicationName}"
    android:icon="@mipmap/ic_launcher">
    <activity
      android:name=".MainActivity"
      android:exported="true"
      android:launchMode="singleTop"
      android:showWhenLocked="true"
      android:turnScreenOn="true"
      android:theme="@style/LaunchTheme"
      android:windowSoftInputMode="adjustResize">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
  </application>
</manifest>`;

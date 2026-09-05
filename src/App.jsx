import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Home,
  BookOpen,
  Gamepad2,
  User,
  Flame,
  Star,
  Wifi,
  WifiOff,
  Lock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Trophy,
  Sparkles,
  X,
  Check,
  Eye,
  EyeOff,
  Award,
  Settings as SettingsIcon,
  Globe,
  Bell,
  Volume2,
  LogOut,
  Crown,
  RotateCcw,
} from "lucide-react";

/* ---------------------------------------------------------------
   PIXEL — English For Tech
   Feature-complete, content-light skeleton.
   One instance of every feature; structure built to expand later.

   HOW TO ADD CONTENT LATER (read this before editing screens):
   - New lesson      -> add an entry to LESSONS + a passage renderer
                         in LESSON_PASSAGES, then reference its id
                         from a level's `items` array in LEVELS.
   - New mission     -> add an entry to MISSIONS, then reference its
                         id from a level's `items` array in LEVELS.
                         (Each mission's interactive panel is its own
                         small component — see MISSION_PANELS — since
                         the UI differs per simulated task.)
   - New level/unit  -> push a new object into LEVELS. Leave it
                         `locked: true` with no items until ready.
   - New UI text     -> add the key to both STRINGS.en and STRINGS.id.
   None of the above require touching screen components.
------------------------------------------------------------------*/

/* ---------------------- i18n ---------------------- */
const STRINGS = {
  en: {
    appName: "PIXEL",
    tagline: "English For Tech",
    heroLine: "Learn English. Understand Tech.",
    continueGuest: "Continue as guest",
    login: "Log in",
    footerNote: "Built for high school learners taking their first steps into tech English.",
    signInTitle: "Sign in",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signInDisabledNote: "Accounts aren't live yet in this preview — continue as guest for now.",
    continueAsGuestInstead: "Continue as guest instead",
    navHome: "Home",
    navLearn: "Learn",
    navMissions: "Missions",
    navRank: "Rank",
    navProfile: "Profile",
    welcomeBack: "Welcome back,",
    continueLearningChip: "Continue learning",
    continueBtn: "Continue",
    xpTotal: "XP total",
    dayStreak: "day streak",
    todaysMissionChip: "Today's mission",
    missionSubtitle: "Solve a real tech problem in English",
    startBtn: "Start",
    yourLearningPath: "Your learning path",
    learningPathTitle: "Learning path",
    percentComplete: "% complete",
    lessonLabel: "Lesson",
    missionLabel: "Tech Simulator mission",
    xpShort: "XP",
    comingSoon: "Coming soon",
    lockedLevel: "Locked · unlocks after Level 1",
    tapWordsHint: "Tap the underlined words to see what they mean.",
    startQuiz: "Start quiz",
    questionOf: "Question {n} of {total}",
    nextQuestion: "Next question",
    finish: "Finish",
    lessonComplete: "Lesson complete!",
    scoredLine: "You scored {score} out of {total} · +{xp} XP",
    backToPath: "Back to learning path",
    missionPrefix: "Mission:",
    startMission: "Start mission",
    missionComplete: "Mission complete!",
    backOnline: "You're back online",
    wordsUsed: "Words you used:",
    leaderboardTitle: "Rank",
    leaderboardNote: "Sari, Bagus, and Rian are demo accounts — beat their XP to reach #1.",
    you: "You",
    profileTitle: "Profile",
    levelLine: "Level {n} · Everyday Tech learner",
    badgesTitle: "Badges",
    settingsTitle: "Settings",
    language: "App language",
    langEnglish: "English",
    langIndonesian: "Bahasa Indonesia",
    notifications: "Daily reminder notifications",
    sound: "Sound effects",
    account: "Account",
    editProfile: "Edit profile",
    logOut: "Log out",
    resetProgress: "Reset progress",
    resetConfirm: "This clears your XP, streak, and completed lessons on this device. Continue?",
    settingsComingSoonNote: "Your XP, streak, and progress are already saved on this device.",
    // Landing page
    landingKicker: "A Tech English Literacy app",
    landingTitleA: "Learn English.",
    landingTitleB: "Understand Tech.",
    landingSub: "Practice everyday tech English — error messages, settings, AI prompts — through a playful interactive simulator built for high schoolers.",
    landingCtaStart: "Get Started",
    landingCtaLogin: "I already have an account",
    landingMissionChip: "Today's mission",
    landingFeat1Title: "5 Tech Worlds",
    landingFeat1Desc: "Computer, Internet, AI & more",
    landingFeat2Title: "Live Simulator",
    landingFeat2Desc: "Click real interfaces in English",
    landingFeat3Title: "XP & Rank",
    landingFeat3Desc: "Level up, climb the leaderboard",
    landingContinueGuest: "Continue as guest instead",
    // Auth
    usernameLabel: "Username",
    usernamePlaceholder: "e.g. raka_dev",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••",
    signUpTitle: "Create account",
    signInBtn: "Log in",
    signUpBtn: "Sign up",
    tryDemoLabel: "Or jump in with a demo account",
    authErrorMissing: "Please fill in both fields.",
    authErrorBadLogin: "Username or password is incorrect.",
    authErrorTaken: "That username is already taken.",
    authErrorShort: "Password must be at least 4 characters.",
  },
  id: {
    appName: "PIXEL",
    tagline: "English For Tech",
    heroLine: "Belajar Bahasa Inggris. Pahami Teknologi.",
    continueGuest: "Lanjut sebagai tamu",
    login: "Masuk",
    footerNote: "Dibuat untuk pelajar SMA yang baru mulai belajar bahasa Inggris teknologi.",
    signInTitle: "Masuk",
    email: "Email",
    password: "Kata sandi",
    signIn: "Masuk",
    signInDisabledNote: "Akun belum aktif di versi preview ini — lanjutkan sebagai tamu dulu ya.",
    continueAsGuestInstead: "Lanjut sebagai tamu saja",
    navHome: "Beranda",
    navLearn: "Belajar",
    navMissions: "Misi",
    navRank: "Peringkat",
    navProfile: "Profil",
    welcomeBack: "Selamat datang kembali,",
    continueLearningChip: "Lanjutkan belajar",
    continueBtn: "Lanjutkan",
    xpTotal: "Total XP",
    dayStreak: "hari beruntun",
    todaysMissionChip: "Misi hari ini",
    missionSubtitle: "Selesaikan masalah teknologi nyata pakai bahasa Inggris",
    startBtn: "Mulai",
    yourLearningPath: "Jalur belajarmu",
    learningPathTitle: "Jalur belajar",
    percentComplete: "% selesai",
    lessonLabel: "Pelajaran",
    missionLabel: "Misi Tech Simulator",
    xpShort: "XP",
    comingSoon: "Segera hadir",
    lockedLevel: "Terkunci · terbuka setelah Level 1",
    tapWordsHint: "Ketuk kata yang bergaris bawah untuk melihat artinya.",
    startQuiz: "Mulai kuis",
    questionOf: "Soal {n} dari {total}",
    nextQuestion: "Soal berikutnya",
    finish: "Selesai",
    lessonComplete: "Pelajaran selesai!",
    scoredLine: "Skormu {score} dari {total} · +{xp} XP",
    backToPath: "Kembali ke jalur belajar",
    missionPrefix: "Misi:",
    startMission: "Mulai misi",
    missionComplete: "Misi selesai!",
    backOnline: "Kamu sudah online lagi",
    wordsUsed: "Kata yang kamu pakai:",
    leaderboardTitle: "Peringkat",
    leaderboardNote: "Sari, Bagus, dan Rian adalah akun demo — kalahkan XP mereka buat jadi #1.",
    you: "Kamu",
    profileTitle: "Profil",
    levelLine: "Level {n} · Pelajar Everyday Tech",
    badgesTitle: "Lencana",
    settingsTitle: "Pengaturan",
    language: "Bahasa aplikasi",
    langEnglish: "Inggris",
    langIndonesian: "Bahasa Indonesia",
    notifications: "Notifikasi pengingat harian",
    sound: "Efek suara",
    account: "Akun",
    editProfile: "Edit profil",
    logOut: "Keluar",
    resetProgress: "Atur ulang progres",
    resetConfirm: "Ini akan menghapus XP, streak, dan pelajaran yang selesai di perangkat ini. Lanjutkan?",
    settingsComingSoonNote: "XP, streak, dan progresmu sudah tersimpan di perangkat ini.",
    // Landing page
    landingKicker: "Aplikasi Tech English Literacy",
    landingTitleA: "Belajar Bahasa Inggris.",
    landingTitleB: "Pahami Teknologi.",
    landingSub: "Latihan bahasa Inggris teknologi sehari-hari — pesan error, pengaturan, prompt AI — lewat simulator interaktif yang seru, dibuat untuk anak SMA.",
    landingCtaStart: "Mulai Sekarang",
    landingCtaLogin: "Saya sudah punya akun",
    landingMissionChip: "Misi hari ini",
    landingFeat1Title: "5 Dunia Tech",
    landingFeat1Desc: "Komputer, Internet, AI & lainnya",
    landingFeat2Title: "Simulator Hidup",
    landingFeat2Desc: "Klik antarmuka asli pakai Inggris",
    landingFeat3Title: "XP & Peringkat",
    landingFeat3Desc: "Naik level, kejar posisi teratas",
    landingContinueGuest: "Lanjut sebagai tamu saja",
    // Auth
    usernameLabel: "Username",
    usernamePlaceholder: "contoh: raka_dev",
    passwordLabel: "Kata sandi",
    passwordPlaceholder: "••••••••",
    signUpTitle: "Buat akun",
    signInBtn: "Masuk",
    signUpBtn: "Daftar",
    tryDemoLabel: "Atau langsung coba akun demo",
    authErrorMissing: "Isi username dan kata sandi dulu ya.",
    authErrorBadLogin: "Username atau kata sandi salah.",
    authErrorTaken: "Username itu sudah dipakai.",
    authErrorShort: "Kata sandi minimal 4 karakter.",
  },
};

const fmt = (str, vars = {}) =>
  Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), str);

const LangContext = createContext({ lang: "id", setLang: () => {}, t: STRINGS.id });
const useLang = () => useContext(LangContext);

/* ---------------------- Content data ---------------------- */
/* Vocab + quiz + passage for each lesson. Locked lessons only need
   a title/xp stub until they're unlocked for real. */
const LESSONS = {
  l1: {
    title: "Reading Error Messages",
    xp: 20,
    vocab: {
      connection: "the link between your device and the internet",
      failed: "did not work / was not successful",
      network: "a system of connected devices, like Wi-Fi",
    },
    quiz: [
      {
        q: 'The screen shows "Connection failed." What does this mean?',
        options: ["Everything is working fine", "The internet did not connect", "The battery is low"],
        correct: 1,
      },
      {
        q: "What should you check first when you see this message?",
        options: ["Your network", "Your screen brightness", "Your wallpaper"],
        correct: 0,
      },
      {
        q: '"Try again" means...',
        options: ["Stop and give up", "Do the same action one more time", "Turn off the device"],
        correct: 1,
      },
    ],
  },
  l2: { title: "Wi-Fi & Connection", xp: 20 },
  l3: { title: "Basic AI Prompts", xp: 20 },
};

/* Interactive reading passages, keyed the same way as LESSONS.
   Kept separate because they need the live Vocab tag component. */
const LESSON_PASSAGES = {
  l1: (Vocab) => (
    <>
      "<Vocab word="connection">Connection</Vocab> <Vocab word="failed">failed</Vocab>. Please check your{" "}
      <Vocab word="network">network</Vocab> and try again."
    </>
  ),
};

const MISSIONS = {
  m1: {
    title: "Fix My Wi-Fi",
    xp: 50,
    brief: "Your laptop can't connect to the internet. Read the English clues and click through the settings to get it back online.",
    learned: ["turn on", "network", "connect", "password"],
    panel: "wifiFix",
  },
};

/* `status` is no longer stored here — it's derived at render time from
   real saved progress (see `withStatus` below), so completing an item
   actually unlocks the next one instead of it being hardcoded. */
const LEVELS = [
  {
    id: "lvl1",
    title: "Level 1: Everyday Tech",
    description: "Vocabulary and phrases you meet on your phone and laptop every day.",
    locked: false,
    items: [
      { refId: "l1", kind: "lesson" },
      { refId: "l2", kind: "lesson" },
      { refId: "m1", kind: "mission" },
      { refId: "l3", kind: "lesson" },
    ],
  },
  {
    id: "lvl2",
    title: "Level 2: Coding Basics",
    description: "Reading simple code comments, commit messages, and dev chat.",
    locked: true,
    items: [],
  },
];

/* Each badge is computed from saved progress, so it flips on/off for
   real as the learner actually does things — nothing is hardcoded. */
const BADGES_CONFIG = [
  { label: "First lesson", check: (p) => p.completedLessons.length >= 1 },
  { label: "3-day streak", check: (p) => p.streak >= 3 },
  { label: "First mission", check: (p) => p.completedMissions.length >= 1 },
  { label: "Quiz master", check: (p) => p.perfectLessons.length >= 1 },
];

/* Three ready-made accounts so the leaderboard never looks empty and so
   the app can be demoed instantly without signing up first. They double
   as real, log-in-able accounts (see USERS persistence below) — their
   `xp` here is also what the leaderboard sorts them by. */
const MOCK_ACCOUNTS = [
  { username: "sari", password: "sari123", displayName: "Sari W.", xp: 540 },
  { username: "bagus", password: "bagus123", displayName: "Bagus P.", xp: 480 },
  { username: "rian", password: "rian123", displayName: "Rian K.", xp: 260 },
];

/* ---------------------- Persistence ---------------------- */
/* Everything a real user would expect to survive a reload lives in one
   object, saved as one blob under one key. There's no backend yet, so
   this is per-browser (per-device) — see the Settings screen note. */
const STORAGE_KEY = "pixel_app_state_v1";
const USERS_KEY = "pixel_users_v1";

const DEFAULT_STATE = {
  lang: "id",
  loggedIn: false,
  username: null,
  displayName: null,
  notifications: true,
  sound: true,
  xp: 0,
  streak: 0,
  lastOpenDate: null,
  completedLessons: [],
  completedMissions: [],
  perfectLessons: [],
};

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    // Storage unavailable (private browsing, disabled, or this preview
    // sandbox) — fall back to in-memory defaults instead of crashing.
    return null;
  }
}

function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* ignore — nothing we can do if storage is blocked */
  }
}

/* A tiny local "auth table": { [username]: { password, displayName, xp, isMock } }.
   Real accounts created via Sign up are merged in and persist across
   reloads; the three MOCK_ACCOUNTS are always available on top so there's
   always someone to log in as (and to rank against) even on a fresh browser. */
function loadUsers() {
  let stored = {};
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    stored = raw ? JSON.parse(raw) : {};
  } catch (e) {
    stored = {};
  }
  const withMocks = { ...stored };
  MOCK_ACCOUNTS.forEach((acc) => {
    if (!withMocks[acc.username]) {
      withMocks[acc.username] = {
        password: acc.password,
        displayName: acc.displayName,
        xp: acc.xp,
        isMock: true,
      };
    }
  });
  return withMocks;
}

function saveUsers(users) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    /* ignore — nothing we can do if storage is blocked */
  }
}

const ProgressContext = createContext(null);
const useProgress = () => useContext(ProgressContext);

/* Item N in a level is unlocked once item N-1 is completed (the first
   item in a level is always unlocked). Works for any level length. */
function withStatus(items, progress) {
  let previousDone = true;
  return items.map((item) => {
    const doneSet = item.kind === "mission" ? progress.completedMissions : progress.completedLessons;
    const done = doneSet.includes(item.refId);
    const unlocked = previousDone;
    previousDone = done;
    return { ...item, done, status: unlocked ? "unlocked" : "locked" };
  });
}

/* ---------------------- Design tokens (CSS) ---------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

    .pixel-root {
      --bg-base: #2C2C5F;
      --bg-mid: #34397C;
      --bg-elevated: #3E4393;
      --lavender: #919CF6;
      --periwinkle: #9DAEFD;
      --pink: #FCC3FA;
      --cyan: #B3F2FA;
      --cream: #F6E9C9;
      font-family: 'Manrope', sans-serif;
      background: var(--bg-base);
      color: var(--cream);
      min-height: 100%;
      position: relative;
      overflow-x: hidden;
    }
    .pixel-root * { box-sizing: border-box; }
    .pixel-display { font-family: 'Sora', sans-serif; }

    .pixel-card {
      background: var(--bg-mid);
      border: 1px solid rgba(145,156,246,0.18);
      border-radius: 24px;
    }
    .pixel-card-elevated {
      background: var(--bg-elevated);
      border: 1px solid rgba(157,174,253,0.28);
      border-radius: 20px;
    }
    .pixel-chip {
      background: rgba(145,156,246,0.16);
      border: 1px solid rgba(145,156,246,0.3);
      border-radius: 999px;
    }
    .pixel-btn-primary {
      background: var(--periwinkle);
      color: #201F45;
      border-radius: 16px;
      font-weight: 700;
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.15s ease, box-shadow 0.2s ease;
    }
    .pixel-btn-primary:hover { background: var(--lavender); transform: translateY(-2px) scale(1.015); box-shadow: 0 10px 24px -8px rgba(145,156,246,0.55); }
    .pixel-btn-primary:active { transform: translateY(0px) scale(0.94); box-shadow: none; }
    .pixel-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .pixel-btn-ghost {
      background: transparent;
      border: 1px solid rgba(246,233,201,0.3);
      color: var(--cream);
      border-radius: 16px;
      transition: background 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.15s ease;
    }
    .pixel-btn-ghost:hover { background: rgba(246,233,201,0.08); transform: translateY(-2px); border-color: rgba(246,233,201,0.5); }
    .pixel-btn-ghost:active { transform: translateY(0) scale(0.94); }
    .pixel-btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ---- Playful global interaction language ---------------------------
       Applied to buttons/links throughout the app so every hover feels
       like a little bounce and every click feels like a little squish. */
    @keyframes pixel-pop-in {
      0% { opacity: 0; transform: scale(0.9) translateY(8px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes pixel-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }
    @keyframes pixel-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
    .pixel-tap {
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.15s ease, background 0.15s ease;
      cursor: pointer;
    }
    .pixel-tap:hover:not(:disabled) { transform: translateY(-3px) scale(1.03); }
    .pixel-tap:active:not(:disabled) { transform: translateY(0) scale(0.93); }
    .pixel-tap:disabled { cursor: not-allowed; }
    .pixel-icon-pop { display: inline-flex; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
    .pixel-tap:hover .pixel-icon-pop { transform: scale(1.2) rotate(-8deg); }
    .pixel-anim-pop { animation: pixel-pop-in 0.35s cubic-bezier(0.16,1,0.3,1) both; }
    .pixel-anim-float { animation: pixel-float 6s ease-in-out infinite; }
    .pixel-shake { animation: pixel-shake 0.4s ease; }

    /* Bento cards that are also buttons (learning path items, settings
       rows, module cards...) get the same lift + squish as pixel-btn-*. */
    button.pixel-card, button.pixel-card-elevated {
      transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), border-color 0.15s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    button.pixel-card:hover:not(:disabled), button.pixel-card-elevated:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.012);
      border-color: rgba(157,174,253,0.55);
      box-shadow: 0 14px 28px -14px rgba(44,44,95,0.7);
    }
    button.pixel-card:active:not(:disabled), button.pixel-card-elevated:active:not(:disabled) {
      transform: translateY(0) scale(0.975);
    }
    button.pixel-card:disabled, button.pixel-card-elevated:disabled { cursor: not-allowed; }

    .pixel-input {
      background: #201F45;
      border: 1px solid rgba(145,156,246,0.3);
      border-radius: 14px;
      color: var(--cream);
      width: 100%;
    }
    .pixel-input:focus { outline: none; border-color: var(--periwinkle); }
    .pixel-input::placeholder { color: rgba(246,233,201,0.4); }

    .pixel-progress-track {
      background: rgba(44,44,95,0.6);
      border-radius: 999px;
      overflow: hidden;
    }
    .pixel-progress-fill {
      background: linear-gradient(90deg, var(--pink), var(--periwinkle));
      border-radius: 999px;
      transition: width 0.4s ease;
    }

    .pixel-navbtn {
      color: rgba(246,233,201,0.55);
      transition: color 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.15s ease;
    }
    .pixel-navbtn.active { color: var(--cream); }
    .pixel-navbtn:hover { transform: translateY(-4px) scale(1.08); }
    .pixel-navbtn:active { transform: translateY(-1px) scale(0.9); }

    .pixel-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(2px);
      opacity: 0.14;
      pointer-events: none;
    }

    .pixel-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
    .pixel-scroll::-webkit-scrollbar-thumb { background: rgba(145,156,246,0.4); border-radius: 999px; }

    .pixel-quiz-option {
      border-radius: 16px;
      border: 1px solid rgba(145,156,246,0.3);
      background: var(--bg-elevated);
      transition: border-color 0.15s ease, background 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
      text-align: left;
    }
    .pixel-quiz-option:hover { border-color: var(--periwinkle); transform: translateY(-2px) scale(1.008); }
    .pixel-quiz-option:active { transform: translateY(0) scale(0.98); }
    .pixel-quiz-option.correct { border-color: #7EE0A8; background: rgba(126,224,168,0.14); }
    .pixel-quiz-option.wrong { border-color: #F19A9A; background: rgba(241,154,154,0.14); }

    .pixel-vocab-tag {
      text-decoration-line: underline;
      text-decoration-style: dotted;
      text-decoration-color: var(--pink);
      text-underline-offset: 4px;
      cursor: help;
    }

    .pixel-segment {
      background: rgba(44,44,95,0.6);
      border-radius: 14px;
      padding: 3px;
    }
    .pixel-segment button {
      border-radius: 11px;
      transition: background 0.15s ease, color 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
      color: rgba(246,233,201,0.6);
    }
    .pixel-segment button:hover { transform: scale(1.03); }
    .pixel-segment button:active { transform: scale(0.94); }
    .pixel-segment button.active {
      background: var(--periwinkle);
      color: #201F45;
    }

    .pixel-chip.pixel-tap:hover { background: rgba(145,156,246,0.28); border-color: rgba(145,156,246,0.55); }
  `}</style>
);

/* ---------------------- Decorative shapes ---------------------- */
const Blobs = () => (
  <>
    <div className="pixel-blob" style={{ width: 220, height: 220, background: "#FCC3FA", top: -60, right: -60 }} />
    <div className="pixel-blob" style={{ width: 160, height: 160, background: "#B3F2FA", bottom: 40, left: -50 }} />
    <svg width="26" height="26" viewBox="0 0 24 24" className="pixel-blob" style={{ opacity: 0.25, top: 120, right: 40 }} fill="#FCC3FA">
      <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
    </svg>
  </>
);

/* ---------------------- Small reusable bits ---------------------- */
const Toggle = ({ on, onClick }) => (
  <button
    onClick={onClick}
    className="pixel-progress-track pixel-tap"
    style={{ width: 46, height: 26, position: "relative", padding: 2, flexShrink: 0 }}
  >
    <div
      className="pixel-progress-fill"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        transform: on ? "translateX(20px) scale(1)" : "translateX(0px) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    />
  </button>
);

/* ---------------------- Bottom nav ---------------------- */
const NAV_ITEMS = [
  { id: "dashboard", labelKey: "navHome", icon: Home },
  { id: "modules", labelKey: "navLearn", icon: BookOpen },
  { id: "simulator", labelKey: "navMissions", icon: Gamepad2 },
  { id: "leaderboard", labelKey: "navRank", icon: Award },
  { id: "profile", labelKey: "navProfile", icon: User },
];

const BottomNav = ({ screen, setScreen }) => {
  const { t } = useLang();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-3 pb-4">
      <div className="pixel-card-elevated flex items-center gap-0.5 px-1.5 py-2 shadow-2xl" style={{ backdropFilter: "blur(10px)" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            screen === item.id ||
            (screen === "lesson" && item.id === "modules") ||
            (screen === "settings" && item.id === "profile");
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`pixel-navbtn pixel-tap ${active ? "active" : ""} flex flex-col items-center gap-1 px-3 py-2 rounded-2xl`}
              style={active ? { background: "rgba(145,156,246,0.18)" } : {}}
            >
              <span className="pixel-icon-pop">
                <Icon size={19} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className="text-[10px] font-semibold pixel-display">{t[item.labelKey]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------------- Header for inner pages ---------------------- */
const PageHeader = ({ title, onBack, rightAction }) => (
  <div className="flex items-center gap-3 px-6 pt-8 pb-2">
    {onBack && (
      <button onClick={onBack} className="pixel-btn-ghost pixel-tap p-2 rounded-full">
        <ArrowLeft size={18} />
      </button>
    )}
    <h1 className="pixel-display text-2xl font-bold flex-1">{title}</h1>
    {rightAction}
  </div>
);

/* ================================================================
   SCREEN: Landing page
   The public-facing "front door" — energetic hero, killer-feature
   preview card, and a 3-up feature row, in the spirit of the
   fintech-style moodboard: bold two-line headline with one line
   picked out in an accent color, floating geometric shapes, and a
   clear primary CTA above a quieter secondary one.
================================================================= */
const LandingScreen = ({ onGetStarted, onGoToLogin, onContinueGuest }) => {
  const { t } = useLang();
  const features = [
    { icon: BookOpen, title: t.landingFeat1Title, desc: t.landingFeat1Desc, color: "#FCC3FA" },
    { icon: Gamepad2, title: t.landingFeat2Title, desc: t.landingFeat2Desc, color: "#B3F2FA" },
    { icon: Award, title: t.landingFeat3Title, desc: t.landingFeat3Desc, color: "#F6E9C9" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Blobs />
      <div
        className="pixel-blob pixel-anim-float"
        style={{ width: 100, height: 100, background: "#9DAEFD", opacity: 0.16, top: 210, left: -30 }}
      />
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        className="pixel-anim-float"
        style={{ position: "absolute", top: 160, right: 30, opacity: 0.35 }}
        fill="#B3F2FA"
      >
        <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
      </svg>

      {/* top bar */}
      <div className="flex items-center justify-between px-6 pt-7 relative z-10">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #9DAEFD, #FCC3FA)" }}
          >
            <Sparkles size={16} color="#201F45" />
          </div>
          <span className="pixel-display font-extrabold">{t.appName}</span>
        </div>
        <button onClick={onGoToLogin} className="pixel-btn-ghost pixel-tap text-xs px-4 py-2">
          {t.login}
        </button>
      </div>

      {/* hero */}
      <div className="relative z-10 px-6 pt-14 pb-8 flex flex-col items-center text-center max-w-md mx-auto">
        <span className="pixel-chip text-xs px-3.5 py-1.5 mb-5 inline-flex items-center gap-1.5">
          <Sparkles size={12} color="#F6E9C9" /> {t.landingKicker}
        </span>
        <h1 className="pixel-display text-4xl font-extrabold leading-[1.1] mb-1">
          {t.landingTitleA}
          <br />
          <span style={{ color: "var(--pink)" }}>{t.landingTitleB}</span>
        </h1>
        <p className="text-sm opacity-75 leading-relaxed mt-4 mb-8">{t.landingSub}</p>

        <div className="flex flex-col gap-3 w-full">
          <button onClick={onGetStarted} className="pixel-btn-primary pixel-tap w-full py-3.5">
            {t.landingCtaStart}
          </button>
          <button onClick={onGoToLogin} className="pixel-btn-ghost pixel-tap w-full py-3.5">
            {t.landingCtaLogin}
          </button>
        </div>
      </div>

      {/* killer-feature preview card, echoing the "balance card" from the moodboard */}
      <div className="relative z-10 px-6 max-w-md mx-auto mb-8">
        <div
          className="pixel-card pixel-tap p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(120deg, var(--bg-mid), var(--bg-elevated))" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(179,242,250,0.18)" }}
          >
            <span className="pixel-icon-pop">
              <Gamepad2 size={24} color="#B3F2FA" />
            </span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs pixel-chip inline-block px-2.5 py-1 mb-1.5">{t.landingMissionChip}</p>
            <h3 className="pixel-display font-bold leading-snug">{MISSIONS.m1.title}</h3>
            <p className="text-xs opacity-70">{t.missionSubtitle}</p>
          </div>
        </div>
      </div>

      {/* feature row */}
      <div className="relative z-10 px-6 grid grid-cols-3 gap-3 max-w-md mx-auto mb-10">
        {features.map((f) => (
          <div key={f.title} className="pixel-card-elevated pixel-tap p-3.5 flex flex-col items-center text-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(145,156,246,0.18)" }}
            >
              <span className="pixel-icon-pop">
                <f.icon size={17} color={f.color} />
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold leading-tight">{f.title}</p>
              <p className="text-[10px] opacity-60 leading-tight mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 px-6 pb-10 text-center">
        <button onClick={onContinueGuest} className="pixel-tap text-xs underline opacity-60" style={{ textUnderlineOffset: 3 }}>
          {t.landingContinueGuest}
        </button>
        <p className="text-[11px] opacity-40 mt-4 leading-relaxed max-w-xs mx-auto">{t.footerNote}</p>
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Auth — real (locally-stored) username + password
   login and sign up. No backend: credentials live in localStorage
   (see loadUsers/saveUsers), which is enough for an RPL MVP demo
   while keeping the exact same shape a future API-backed version
   would need (username, password, displayName).
================================================================= */
const AuthScreen = ({ initialMode, onBack, users, onAuthSuccess }) => {
  const { t } = useLang();
  const [mode, setMode] = useState(initialMode || "login"); // "login" | "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  };

  const fillDemo = (acc) => {
    setMode("login");
    setUsername(acc.username);
    setPassword(acc.password);
    setError("");
  };

  const submit = () => {
    const uname = username.trim().toLowerCase();
    if (!uname || !password) return triggerError(t.authErrorMissing);

    if (mode === "signup") {
      if (users[uname]) return triggerError(t.authErrorTaken);
      if (password.length < 4) return triggerError(t.authErrorShort);
      onAuthSuccess({ username: uname, displayName: username.trim(), password, isNewAccount: true });
    } else {
      const account = users[uname];
      if (!account || account.password !== password) return triggerError(t.authErrorBadLogin);
      onAuthSuccess({ username: uname, displayName: account.displayName, isNewAccount: false });
    }
  };

  return (
    <div className="pb-32">
      <PageHeader title={mode === "login" ? t.signInTitle : t.signUpTitle} onBack={onBack} />
      <div className={`px-6 mt-4 flex flex-col gap-4 max-w-sm mx-auto ${shake ? "pixel-shake" : ""}`}>
        <div className="pixel-segment flex mb-1">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 text-sm font-semibold ${mode === "login" ? "active" : ""}`}
          >
            {t.signInBtn}
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2 text-sm font-semibold ${mode === "signup" ? "active" : ""}`}
          >
            {t.signUpBtn}
          </button>
        </div>

        <div>
          <p className="text-xs opacity-60 mb-1.5">{t.usernameLabel}</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            autoCapitalize="none"
            placeholder={t.usernamePlaceholder}
            className="pixel-input px-4 py-3 text-sm"
          />
        </div>
        <div>
          <p className="text-xs opacity-60 mb-1.5">{t.passwordLabel}</p>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              type={showPw ? "text" : "password"}
              placeholder={t.passwordPlaceholder}
              className="pixel-input px-4 py-3 text-sm"
              style={{ paddingRight: 44 }}
            />
            <button onClick={() => setShowPw((s) => !s)} className="pixel-tap absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p
            className="text-xs px-4 py-3 rounded-2xl"
            style={{ background: "rgba(241,154,154,0.14)", border: "1px solid rgba(241,154,154,0.4)" }}
          >
            {error}
          </p>
        )}

        <button onClick={submit} className="pixel-btn-primary pixel-tap w-full py-3.5">
          {mode === "login" ? t.signInBtn : t.signUpBtn}
        </button>

        <div className="mt-2">
          <p className="text-[11px] opacity-50 mb-2 text-center">{t.tryDemoLabel}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {MOCK_ACCOUNTS.map((acc) => (
              <button key={acc.username} onClick={() => fillDemo(acc)} className="pixel-chip pixel-tap text-[11px] px-3 py-1.5">
                {acc.displayName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Dashboard
================================================================= */
const DashboardScreen = ({ setScreen, openLesson }) => {
  const { t } = useLang();
  const progress = useProgress();
  const lessonItems = LEVELS[0].items.filter((i) => i.kind === "lesson");
  const nextLessonId =
    lessonItems.map((i) => i.refId).find((id) => !progress.completedLessons.includes(id)) ||
    lessonItems[lessonItems.length - 1].refId;
  const lesson = LESSONS[nextLessonId];
  const levelItems = withStatus(LEVELS[0].items, progress);
  const levelPercent = Math.round((levelItems.filter((i) => i.done).length / levelItems.length) * 100);

  return (
    <div className="px-5 pt-8 pb-32 relative">
      <Blobs />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-70">{t.welcomeBack}</p>
            <h1 className="pixel-display text-2xl font-bold">{progress.displayName || "Guest"} 👋</h1>
          </div>
          <div className="pixel-chip flex items-center gap-1.5 px-3 py-1.5">
            <Flame size={16} color="#FCC3FA" />
            <span className="text-sm font-bold">{progress.streak}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* Hero card */}
          <div className="col-span-2 pixel-card p-5 flex flex-col justify-between" style={{ minHeight: 170 }}>
            <div>
              <p className="text-xs pixel-chip inline-block px-2.5 py-1 mb-3">{t.continueLearningChip}</p>
              <h2 className="pixel-display text-lg font-bold leading-snug mb-1">{lesson.title}</h2>
              <p className="text-xs opacity-70">{LEVELS[0].title}</p>
            </div>
            <div>
              <div className="pixel-progress-track h-2 mb-2">
                <div className="pixel-progress-fill h-2" style={{ width: `${levelPercent}%` }} />
              </div>
              <button
                onClick={() => openLesson(nextLessonId)}
                className="pixel-btn-primary text-sm px-4 py-2 flex items-center gap-1"
              >
                {t.continueBtn} <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Stat stack */}
          <div className="col-span-1 flex flex-col gap-3">
            <div className="pixel-card-elevated p-4 flex-1 flex flex-col justify-center items-center">
              <Star size={18} color="#F6E9C9" />
              <p className="pixel-display text-xl font-extrabold mt-1">{progress.xp}</p>
              <p className="text-[11px] opacity-70 text-center">{t.xpTotal}</p>
            </div>
            <div className="pixel-card-elevated p-4 flex-1 flex flex-col justify-center items-center">
              <Flame size={18} color="#FCC3FA" />
              <p className="pixel-display text-xl font-extrabold mt-1">{progress.streak}</p>
              <p className="text-[11px] opacity-70 text-center">{t.dayStreak}</p>
            </div>
          </div>
        </div>

        {/* Mission promo — killer feature */}
        <div
          className="pixel-card p-5 mb-4 flex items-center gap-4"
          style={{ background: "linear-gradient(120deg, var(--bg-mid), var(--bg-elevated))" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(179,242,250,0.18)" }}
          >
            <Gamepad2 size={24} color="#B3F2FA" />
          </div>
          <div className="flex-1">
            <p className="text-xs pixel-chip inline-block px-2.5 py-1 mb-1.5">{t.todaysMissionChip}</p>
            <h3 className="pixel-display font-bold leading-snug">{MISSIONS.m1.title}</h3>
            <p className="text-xs opacity-70">{t.missionSubtitle}</p>
          </div>
          <button onClick={() => setScreen("simulator")} className="pixel-btn-primary text-xs px-3.5 py-2.5 shrink-0">
            {t.startBtn}
          </button>
        </div>

        {/* Module overview */}
        <p className="pixel-display text-sm font-bold opacity-80 mb-2 px-1">{t.yourLearningPath}</p>
        <button
          onClick={() => setScreen("modules")}
          className="pixel-card w-full p-4 flex items-center gap-4 text-left"
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(145,156,246,0.2)" }}>
            <BookOpen size={20} color="#9DAEFD" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{LEVELS[0].title}</p>
            <div className="pixel-progress-track h-1.5 mt-2">
              <div className="pixel-progress-fill h-1.5" style={{ width: "40%" }} />
            </div>
          </div>
          <ChevronRight size={18} className="opacity-60" />
        </button>
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Modules (learning path — driven by LEVELS)
================================================================= */
const refFor = (item) => (item.kind === "mission" ? MISSIONS[item.refId] : LESSONS[item.refId]);

const ModulesScreen = ({ setScreen, openLesson, openMission }) => {
  const { t } = useLang();
  const progress = useProgress();
  return (
    <div className="pb-32">
      <PageHeader title={t.learningPathTitle} onBack={() => setScreen("dashboard")} />
      <div className="px-5 mt-2 flex flex-col gap-4">
        {LEVELS.map((level) => {
          const items = withStatus(level.items, progress);
          const percent = items.length ? Math.round((items.filter((i) => i.done).length / items.length) * 100) : 0;
          return (
            <div key={level.id}>
              <div className="pixel-card p-5 mb-3" style={{ opacity: level.locked ? 0.55 : 1 }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="pixel-display font-bold">{level.title}</p>
                  {level.locked && <Lock size={15} />}
                </div>
                <p className="text-xs opacity-70 mb-3 leading-relaxed">{level.description}</p>
                {level.locked ? (
                  <p className="text-[11px] pixel-chip inline-block px-2.5 py-1">{t.lockedLevel}</p>
                ) : (
                  <>
                    <div className="pixel-progress-track h-2 mb-1">
                      <div className="pixel-progress-fill h-2" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="text-[11px] opacity-60">{percent}{t.percentComplete}</p>
                  </>
                )}
              </div>

              {!level.locked && (
                <div className="flex flex-col gap-3">
                  {items.map((item) => {
                    const data = refFor(item);
                    const locked = item.status === "locked";
                    const isMission = item.kind === "mission";
                    return (
                      <button
                        key={item.refId}
                        disabled={locked}
                        onClick={() => (isMission ? openMission(item.refId) : openLesson(item.refId))}
                        className="pixel-card-elevated p-4 flex items-center gap-3 text-left"
                        style={{ opacity: locked ? 0.5 : 1 }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: isMission ? "rgba(179,242,250,0.2)" : "rgba(252,195,250,0.18)" }}
                        >
                          {locked ? (
                            <Lock size={16} />
                          ) : item.done ? (
                            <CheckCircle2 size={17} color="#7EE0A8" />
                          ) : isMission ? (
                            <Gamepad2 size={17} color="#B3F2FA" />
                          ) : (
                            <BookOpen size={17} color="#FCC3FA" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{data.title}</p>
                          <p className="text-[11px] opacity-60">
                            {isMission ? t.missionLabel : t.lessonLabel} · {data.xp} {t.xpShort}
                          </p>
                        </div>
                        {!locked && <ChevronRight size={16} className="opacity-50" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Lesson (reading + quiz) — driven by LESSONS/LESSON_PASSAGES
================================================================= */
const Vocab = ({ word, children, vocabMap }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative">
      <span className="pixel-vocab-tag" onClick={() => setShow((s) => !s)}>
        {children}
      </span>
      {show && (
        <span
          className="absolute left-0 top-6 z-20 text-xs pixel-card-elevated px-3 py-2 shadow-xl"
          style={{ width: 200 }}
        >
          {vocabMap[word]}
        </span>
      )}
    </span>
  );
};

const LessonScreen = ({ lessonId, setScreen }) => {
  const { t } = useLang();
  const progress = useProgress();
  const lesson = LESSONS[lessonId];
  const quiz = lesson.quiz || [];
  const [step, setStep] = useState("read"); // read -> quiz -> done
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const BoundVocab = (props) => <Vocab {...props} vocabMap={lesson.vocab} />;

  // Award XP exactly once per lesson; a perfect-score replay still upgrades
  // the "perfect" flag even if it was already completed.
  useEffect(() => {
    if (step === "done") {
      progress.completeLesson(lessonId, lesson.xp, score === quiz.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const submitAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === quiz[qIndex].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIndex < quiz.length - 1) {
      setQIndex((q) => q + 1);
      setSelected(null);
    } else {
      setStep("done");
    }
  };

  // Stub lessons (title + xp only, content not written yet) shouldn't be
  // openable even if progression unlocks them — show a friendly hold state.
  if (!lesson.quiz) {
    return (
      <div className="pb-32">
        <PageHeader title={lesson.title} onBack={() => setScreen("modules")} />
        <div className="px-5 mt-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(145,156,246,0.18)" }}>
            <BookOpen size={22} color="#9DAEFD" />
          </div>
          <p className="pixel-chip text-xs px-4 py-2 mb-4">{t.comingSoon}</p>
          <p className="text-sm opacity-70 max-w-xs leading-relaxed">{lesson.title}</p>
          <button onClick={() => setScreen("modules")} className="pixel-btn-primary mt-8 px-6 py-3">
            {t.backToPath}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <PageHeader title={lesson.title} onBack={() => setScreen("modules")} />

      {step === "read" && (
        <div className="px-5 mt-2">
          <div className="pixel-card-elevated p-4 mb-5">
            <p className="text-[11px] opacity-60 mb-2">A message on your laptop screen:</p>
            <div className="pixel-card p-4" style={{ background: "#201F45" }}>
              <p className="text-sm leading-relaxed">{LESSON_PASSAGES[lessonId]?.(BoundVocab)}</p>
            </div>
          </div>
          <p className="text-xs opacity-60 mb-6 px-1">{t.tapWordsHint}</p>
          <button onClick={() => setStep("quiz")} className="pixel-btn-primary w-full py-3.5">
            {t.startQuiz}
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div className="px-5 mt-2">
          <p className="text-xs opacity-60 mb-2">{fmt(t.questionOf, { n: qIndex + 1, total: quiz.length })}</p>
          <div className="pixel-progress-track h-1.5 mb-5">
            <div
              className="pixel-progress-fill h-1.5"
              style={{ width: `${((qIndex + (selected !== null ? 1 : 0)) / quiz.length) * 100}%` }}
            />
          </div>
          <p className="pixel-display font-bold mb-4 leading-snug">{quiz[qIndex].q}</p>
          <div className="flex flex-col gap-2.5 mb-6">
            {quiz[qIndex].options.map((opt, i) => {
              let cls = "pixel-quiz-option";
              if (selected !== null) {
                if (i === quiz[qIndex].correct) cls += " correct";
                else if (i === selected) cls += " wrong";
              }
              return (
                <button key={i} onClick={() => submitAnswer(i)} className={`${cls} px-4 py-3 text-sm flex items-center justify-between`}>
                  {opt}
                  {selected !== null && i === quiz[qIndex].correct && <Check size={16} color="#7EE0A8" />}
                  {selected !== null && i === selected && i !== quiz[qIndex].correct && <X size={16} color="#F19A9A" />}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <button onClick={next} className="pixel-btn-primary w-full py-3.5">
              {qIndex < quiz.length - 1 ? t.nextQuestion : t.finish}
            </button>
          )}
        </div>
      )}

      {step === "done" && (
        <div className="px-5 mt-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(126,224,168,0.18)" }}>
            <Trophy size={28} color="#7EE0A8" />
          </div>
          <h2 className="pixel-display text-xl font-bold mb-1">{t.lessonComplete}</h2>
          <p className="text-sm opacity-70 mb-6">{fmt(t.scoredLine, { score, total: quiz.length, xp: lesson.xp })}</p>
          <button onClick={() => setScreen("modules")} className="pixel-btn-primary w-full py-3.5">
            {t.backToPath}
          </button>
        </div>
      )}
    </div>
  );
};

/* ================================================================
   SCREEN: Interactive Tech Simulator — driven by MISSIONS
   Each mission's `panel` field picks which interactive panel to
   render below. "wifiFix" is the only one implemented so far —
   register new ones here as new mission types are added.
================================================================= */
const WifiFixPanel = ({ onDone }) => {
  const [stage, setStage] = useState("off"); // off -> list -> connecting -> done
  const [wifiOn, setWifiOn] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const clue = {
    off: "Turn on the Wi-Fi switch to see nearby networks.",
    list: 'Tap on "Home_Network_5G" to connect.',
    connecting: "Type the password, then tap Connect.",
    done: null,
  }[stage];

  if (stage === "done") {
    onDone();
    return null;
  }

  return (
    <div className="px-5 mt-2">
      <div className="pixel-chip px-4 py-3 mb-4 text-sm leading-relaxed">💡 {clue}</div>

      <div className="pixel-card-elevated p-4" style={{ background: "#201F45" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {wifiOn ? <Wifi size={16} color="#B3F2FA" /> : <WifiOff size={16} color="#F19A9A" />}
            <span className="text-sm font-semibold">Wi-Fi</span>
          </div>
          <Toggle
            on={wifiOn}
            onClick={() => {
              if (stage === "off") {
                setWifiOn(true);
                setStage("list");
              }
            }}
          />
        </div>

        {(stage === "list" || stage === "connecting") && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => stage === "list" && setStage("connecting")}
              className="pixel-card flex items-center justify-between px-3 py-2.5"
              style={{ borderColor: stage === "connecting" ? "var(--periwinkle)" : undefined }}
            >
              <span className="text-sm flex items-center gap-2">
                <Wifi size={14} /> Home_Network_5G
              </span>
              {stage === "connecting" && <span className="text-[11px] opacity-60">selected</span>}
            </button>
            <div className="pixel-card flex items-center justify-between px-3 py-2.5 opacity-40">
              <span className="text-sm flex items-center gap-2">
                <Lock size={13} /> Neighbor_WiFi
              </span>
            </div>
          </div>
        )}

        {stage === "connecting" && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="pixel-card flex items-center justify-between px-3 py-2.5">
              <span className="text-sm tracking-widest">{showPw ? "wifipass1" : "•••••••••"}</span>
              <button onClick={() => setShowPw((s) => !s)} className="opacity-60">
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button onClick={() => setStage("done")} className="pixel-btn-primary py-2.5 text-sm">
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MISSION_PANELS = { wifiFix: WifiFixPanel };

const SimulatorScreen = ({ missionId, setScreen }) => {
  const { t } = useLang();
  const progress = useProgress();
  const mission = MISSIONS[missionId];
  const [phase, setPhase] = useState("brief"); // brief -> active -> done
  const Panel = MISSION_PANELS[mission.panel];

  useEffect(() => {
    if (phase === "done") {
      progress.completeMission(missionId, mission.xp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!Panel) {
    return (
      <div className="pb-32">
        <PageHeader title={mission.title} onBack={() => setScreen("modules")} />
        <div className="px-5 mt-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(179,242,250,0.18)" }}>
            <Gamepad2 size={22} color="#B3F2FA" />
          </div>
          <p className="pixel-chip text-xs px-4 py-2">{t.comingSoon}</p>
          <button onClick={() => setScreen("modules")} className="pixel-btn-primary mt-8 px-6 py-3">
            {t.backToPath}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <PageHeader title={mission.title} onBack={() => setScreen("modules")} />

      {phase === "brief" && (
        <div className="px-5 mt-2 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(179,242,250,0.18)" }}>
            <WifiOff size={26} color="#B3F2FA" />
          </div>
          <h2 className="pixel-display text-xl font-bold mb-2">{t.missionPrefix} {mission.title}</h2>
          <p className="text-sm opacity-75 leading-relaxed mb-6 max-w-xs">{mission.brief}</p>
          <button onClick={() => setPhase("active")} className="pixel-btn-primary w-full py-3.5 max-w-xs">
            {t.startMission}
          </button>
        </div>
      )}

      {phase === "active" && <Panel onDone={() => setPhase("done")} />}

      {phase === "done" && (
        <div className="px-5 mt-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(126,224,168,0.18)" }}>
            <CheckCircle2 size={28} color="#7EE0A8" />
          </div>
          <h2 className="pixel-display text-xl font-bold mb-1">{t.missionComplete}</h2>
          <p className="text-sm opacity-70 mb-5">{t.backOnline} · +{mission.xp} XP</p>

          <div className="w-full max-w-xs mb-6">
            <p className="text-xs opacity-60 mb-2 text-left">{t.wordsUsed}</p>
            <div className="flex flex-wrap gap-2">
              {mission.learned.map((w) => (
                <span key={w} className="pixel-chip text-xs px-3 py-1.5">{w}</span>
              ))}
            </div>
          </div>

          <button onClick={() => setScreen("modules")} className="pixel-btn-primary w-full py-3.5 max-w-xs">
            {t.backToPath}
          </button>
        </div>
      )}
    </div>
  );
};

/* ================================================================
   SCREEN: Leaderboard (sample data — goes live post-launch)
================================================================= */
const LeaderboardScreen = ({ setScreen }) => {
  const { t } = useLang();
  const progress = useProgress();
  const medalColor = { 1: "#F6E9C9", 2: "#B3F2FA", 3: "#FCC3FA" };

  // The 3 mock accounts + whoever is actually logged in, always
  // re-ranked live off real XP — so the player's own progress genuinely
  // moves them up and down the list instead of sitting in a fixed slot.
  const rows = [
    ...MOCK_ACCOUNTS.map((acc) => ({ name: acc.displayName, xp: acc.xp, isMe: false })),
    { name: progress.displayName || t.you, xp: progress.xp, isMe: true },
  ]
    .sort((a, b) => b.xp - a.xp)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  return (
    <div className="pb-32">
      <PageHeader title={t.leaderboardTitle} onBack={() => setScreen("dashboard")} />
      <div className="px-5 mt-2">
        <p className="pixel-chip text-xs px-4 py-3 mb-5 leading-relaxed">{t.leaderboardNote}</p>
        <div className="flex flex-col gap-2.5">
          {rows.map((row, i) => (
            <div
              key={row.name}
              className="pixel-card-elevated pixel-tap p-4 flex items-center gap-3 pixel-anim-pop"
              style={{ ...(row.isMe ? { borderColor: "var(--periwinkle)" } : {}), animationDelay: `${i * 70}ms` }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(145,156,246,0.2)" }}>
                {row.rank <= 3 ? <Crown size={15} color={medalColor[row.rank]} /> : <span className="text-xs font-bold">{row.rank}</span>}
              </div>
              <p className="flex-1 text-sm font-semibold">{row.isMe ? t.you : row.name}</p>
              <div className="flex items-center gap-1.5">
                <Star size={13} color="#F6E9C9" />
                <span className="text-sm font-bold">{row.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Profile / Progress
================================================================= */
const ProfileScreen = ({ setScreen }) => {
  const { t } = useLang();
  const progress = useProgress();
  const level = Math.floor(progress.xp / 100) + 1;
  const badges = BADGES_CONFIG.map((b) => ({ label: b.label, earned: b.check(progress) }));
  const earnedCount = badges.filter((b) => b.earned).length;
  const name = progress.displayName || "Guest";

  return (
    <div className="pb-32">
      <PageHeader
        title={t.profileTitle}
        onBack={() => setScreen("dashboard")}
        rightAction={
          <button onClick={() => setScreen("settings")} className="pixel-btn-ghost p-2 rounded-full">
            <SettingsIcon size={18} />
          </button>
        }
      />
      <div className="px-5 mt-2">
        <div className="pixel-card p-5 flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold pixel-display shrink-0"
            style={{ background: "linear-gradient(135deg, #9DAEFD, #FCC3FA)", color: "#201F45" }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="pixel-display font-bold text-lg">{name}</p>
            <p className="text-xs opacity-70">{fmt(t.levelLine, { n: level })}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="pixel-card-elevated p-4 flex flex-col items-center">
            <Star size={16} />
            <p className="pixel-display font-extrabold mt-1">{progress.xp}</p>
            <p className="text-[10px] opacity-60">{t.xpShort}</p>
          </div>
          <div className="pixel-card-elevated p-4 flex flex-col items-center">
            <Flame size={16} color="#FCC3FA" />
            <p className="pixel-display font-extrabold mt-1">{progress.streak}</p>
            <p className="text-[10px] opacity-60">{t.dayStreak}</p>
          </div>
          <div className="pixel-card-elevated p-4 flex flex-col items-center">
            <Trophy size={16} color="#B3F2FA" />
            <p className="pixel-display font-extrabold mt-1">{earnedCount}</p>
            <p className="text-[10px] opacity-60">{t.badgesTitle}</p>
          </div>
        </div>

        <p className="pixel-display text-sm font-bold opacity-80 mb-2 px-1">{t.badgesTitle}</p>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b) => (
            <div key={b.label} className="pixel-card p-4 flex items-center gap-3" style={{ opacity: b.earned ? 1 : 0.4 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(145,156,246,0.2)" }}>
                {b.earned ? <Trophy size={16} color="#F6E9C9" /> : <Lock size={14} />}
              </div>
              <p className="text-xs font-semibold leading-snug">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   SCREEN: Settings (language toggle lives here)
================================================================= */
const SettingsScreen = ({ setScreen, onLogOut }) => {
  const { lang, setLang, t } = useLang();
  const progress = useProgress();

  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) progress.resetProgress();
  };

  return (
    <div className="pb-32">
      <PageHeader title={t.settingsTitle} onBack={() => setScreen("profile")} />
      <div className="px-5 mt-2 flex flex-col gap-5">
        <div className="pixel-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={16} color="#9DAEFD" />
            <p className="text-sm font-semibold">{t.language}</p>
          </div>
          <div className="pixel-segment flex">
            <button
              onClick={() => setLang("en")}
              className={`flex-1 py-2 text-sm font-semibold ${lang === "en" ? "active" : ""}`}
            >
              {t.langEnglish}
            </button>
            <button
              onClick={() => setLang("id")}
              className={`flex-1 py-2 text-sm font-semibold ${lang === "id" ? "active" : ""}`}
            >
              {t.langIndonesian}
            </button>
          </div>
        </div>

        <div className="pixel-card p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Bell size={16} color="#FCC3FA" />
            <p className="text-sm font-semibold flex-1">{t.notifications}</p>
            <Toggle on={progress.notifications} onClick={progress.toggleNotifications} />
          </div>
          <div className="flex items-center gap-3">
            <Volume2 size={16} color="#B3F2FA" />
            <p className="text-sm font-semibold flex-1">{t.sound}</p>
            <Toggle on={progress.sound} onClick={progress.toggleSound} />
          </div>
        </div>

        <div>
          <p className="pixel-display text-sm font-bold opacity-80 mb-2 px-1">{t.account}</p>
          <div className="flex flex-col gap-2.5">
            <button disabled className="pixel-card p-4 flex items-center gap-3 text-left opacity-50">
              <User size={16} />
              <span className="text-sm font-semibold flex-1">{t.editProfile}</span>
              <span className="text-[10px] pixel-chip px-2 py-1">{t.comingSoon}</span>
            </button>
            <button onClick={handleReset} className="pixel-card p-4 flex items-center gap-3 text-left" style={{ color: "#F6E9C9" }}>
              <RotateCcw size={16} />
              <span className="text-sm font-semibold">{t.resetProgress}</span>
            </button>
            <button onClick={onLogOut} className="pixel-card p-4 flex items-center gap-3 text-left" style={{ color: "#F19A9A" }}>
              <LogOut size={16} />
              <span className="text-sm font-semibold">{t.logOut}</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] opacity-50 px-1 leading-relaxed">{t.settingsComingSoonNote}</p>
      </div>
    </div>
  );
};

/* ================================================================
   ROOT APP
================================================================= */
export default function App() {
  // Everything durable (lang, login, xp, streak, completed items, settings)
  // lives in one saved object. Pure navigation state (which screen is open)
  // is deliberately NOT persisted — the app should always open on the
  // dashboard, not wherever the user last happened to be.
  const [appState, setAppState] = useState(() => loadState() || DEFAULT_STATE);
  const [users, setUsers] = useState(() => loadUsers());
  // "landing" -> "login" | "signup" -> (logged in)
  const [authScreen, setAuthScreen] = useState("landing");
  const [screen, setScreen] = useState("dashboard");
  const [currentLessonId, setCurrentLessonId] = useState("l1");
  const [currentMissionId, setCurrentMissionId] = useState("m1");

  // Persist on every change.
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const handleAuthSuccess = ({ username, displayName, password, isNewAccount }) => {
    if (isNewAccount) {
      setUsers((u) => ({ ...u, [username]: { password, displayName, xp: 0, isMock: false } }));
    }
    setAppState((s) => ({ ...s, loggedIn: true, username, displayName }));
  };

  // Count a daily streak once per calendar day the app is opened.
  useEffect(() => {
    const today = new Date().toDateString();
    setAppState((s) => {
      if (s.lastOpenDate === today) return s;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const streak = s.lastOpenDate === yesterday ? s.streak + 1 : s.lastOpenDate ? 1 : s.streak || 1;
      return { ...s, streak, lastOpenDate: today };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openLesson = (id) => {
    setCurrentLessonId(id);
    setScreen("lesson");
  };
  const openMission = (id) => {
    setCurrentMissionId(id);
    setScreen("simulator");
  };

  const langCtx = {
    lang: appState.lang,
    setLang: (lang) => setAppState((s) => ({ ...s, lang })),
    t: STRINGS[appState.lang],
  };

  const progressCtx = {
    xp: appState.xp,
    streak: appState.streak,
    displayName: appState.displayName,
    username: appState.username,
    notifications: appState.notifications,
    sound: appState.sound,
    completedLessons: appState.completedLessons,
    completedMissions: appState.completedMissions,
    perfectLessons: appState.perfectLessons,
    completeLesson: (id, xpAmt, perfect) =>
      setAppState((s) => {
        const already = s.completedLessons.includes(id);
        return {
          ...s,
          xp: already ? s.xp : s.xp + xpAmt,
          completedLessons: already ? s.completedLessons : [...s.completedLessons, id],
          perfectLessons: perfect && !s.perfectLessons.includes(id) ? [...s.perfectLessons, id] : s.perfectLessons,
        };
      }),
    completeMission: (id, xpAmt) =>
      setAppState((s) => {
        const already = s.completedMissions.includes(id);
        return {
          ...s,
          xp: already ? s.xp : s.xp + xpAmt,
          completedMissions: already ? s.completedMissions : [...s.completedMissions, id],
        };
      }),
    toggleNotifications: () => setAppState((s) => ({ ...s, notifications: !s.notifications })),
    toggleSound: () => setAppState((s) => ({ ...s, sound: !s.sound })),
    resetProgress: () =>
      setAppState((s) => ({
        ...s,
        xp: 0,
        streak: 0,
        lastOpenDate: null,
        completedLessons: [],
        completedMissions: [],
        perfectLessons: [],
      })),
  };

  if (!appState.loggedIn) {
    return (
      <LangContext.Provider value={langCtx}>
        <div className="pixel-root">
          <GlobalStyle />
          {authScreen === "landing" && (
            <LandingScreen
              onGetStarted={() => setAuthScreen("signup")}
              onGoToLogin={() => setAuthScreen("login")}
              onContinueGuest={() => setAppState((s) => ({ ...s, loggedIn: true, username: null, displayName: "Guest" }))}
            />
          )}
          {(authScreen === "login" || authScreen === "signup") && (
            <AuthScreen
              initialMode={authScreen}
              onBack={() => setAuthScreen("landing")}
              users={users}
              onAuthSuccess={handleAuthSuccess}
            />
          )}
        </div>
      </LangContext.Provider>
    );
  }

  return (
    <LangContext.Provider value={langCtx}>
      <ProgressContext.Provider value={progressCtx}>
        <div className="pixel-root">
          <GlobalStyle />
          {screen === "dashboard" && <DashboardScreen setScreen={setScreen} openLesson={openLesson} />}
          {screen === "modules" && <ModulesScreen setScreen={setScreen} openLesson={openLesson} openMission={openMission} />}
          {screen === "lesson" && <LessonScreen lessonId={currentLessonId} setScreen={setScreen} />}
          {screen === "simulator" && <SimulatorScreen missionId={currentMissionId} setScreen={setScreen} />}
          {screen === "leaderboard" && <LeaderboardScreen setScreen={setScreen} />}
          {screen === "profile" && <ProfileScreen setScreen={setScreen} />}
          {screen === "settings" && (
            <SettingsScreen
              setScreen={setScreen}
              onLogOut={() => {
                setAppState((s) => ({ ...s, loggedIn: false, username: null, displayName: null }));
                setAuthScreen("landing");
                setScreen("dashboard");
              }}
            />
          )}
          <BottomNav screen={screen} setScreen={setScreen} />
        </div>
      </ProgressContext.Provider>
    </LangContext.Provider>
  );
}

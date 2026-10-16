import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import type { Language } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface PhilosophySlide {
  category: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

interface PhilosophyCopy {
  label: string;
  carouselLabel: string;
  pause: string;
  play: string;
  previous: string;
  next: string;
  showSlide: (number: number, title: string) => string;
  slideCount: (current: number, total: number) => string;
  instructorsEyebrow: string;
  instructorsTitle: string;
  instructorsIntro: string;
  lighthouseTitle: string;
  lighthouseBody: string;
  blueHoleTitle: string;
  blueHoleBody: string;
  slides: PhilosophySlide[];
}

const PHILOSOPHY_COPY: Record<Language, PhilosophyCopy> = {
  en: {
    label: 'School, team, sites & training',
    carouselLabel: 'Freedive Dahab school and training photographs',
    pause: 'Pause image rotation',
    play: 'Play image rotation',
    previous: 'Previous school photo',
    next: 'Next school photo',
    showSlide: (number, title) => `Show photo ${number}: ${title}`,
    slideCount: (current, total) => `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    instructorsEyebrow: 'Instructor perspectives from Dahab',
    instructorsTitle: 'Two dive sites. One thoughtful approach.',
    instructorsIntro:
      'Drawing on experience across the international freediving community, our instructors shape each session around the diver, the buddy team and the day’s conditions—not a promised depth.',
    lighthouseTitle: 'Lighthouse Bay',
    lighthouseBody:
      'A shore-based setting for focused practice. Instructors can build the fundamentals—relaxation, equalisation, technique and buddy checks—at a measured pace.',
    blueHoleTitle: 'The Blue Hole',
    blueHoleBody:
      'A world-famous site with a dramatic setting. Local knowledge, a clear briefing and a plan suited to conditions and experience come before the dive.',
    slides: [
      {
        category: 'The school',
        title: 'A home base beside the sea',
        subtitle: 'A welcoming place in Dahab to meet, prepare and return to between sessions.',
        image: '/images/philosophy/school.jpg',
        alt: 'Freedive Dahab school entrance in Lighthouse Bay, Dahab',
      },
      {
        category: 'The team',
        title: 'A legacy built by people',
        subtitle: 'Generations of instructors and divers have shaped the school since 2003.',
        image: '/images/philosophy/team.jpg',
        alt: 'Freediving instructors and team members gathered outside the school',
      },
      {
        category: 'The dive sites',
        title: 'The Blue Hole, approached with care',
        subtitle: 'A remarkable setting where local knowledge and a thoughtful dive plan matter.',
        image: '/images/philosophy/blue-hole.jpg',
        alt: 'The Blue Hole coastline and clear water near Dahab',
      },
      {
        category: 'Lighthouse Bay',
        title: 'Training close to shore',
        subtitle: 'Guided line sessions give divers room to practise with instructor support.',
        image: '/images/philosophy/lighthouse-bay.jpg',
        alt: 'Freediver practising on a training line in Lighthouse Bay',
      },
      {
        category: 'Programs & training weeks',
        title: 'A path for every next step',
        subtitle: 'From first courses to focused training weeks and professional development.',
        image: '/images/philosophy/training.jpg',
        alt: 'Freediver training with a buddy on an underwater line',
      },
    ],
  },
  ar: {
    label: 'المدرسة والفريق والمواقع والتدريب',
    carouselLabel: 'صور مدرسة فري دايف دهب وبرامج التدريب',
    pause: 'إيقاف تبديل الصور',
    play: 'تشغيل تبديل الصور',
    previous: 'الصورة السابقة',
    next: 'الصورة التالية',
    showSlide: (number, title) => `عرض الصورة ${number}: ${title}`,
    slideCount: (current, total) => `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    instructorsEyebrow: 'رؤية المدربين في دهب',
    instructorsTitle: 'موقعان للغوص ونهج واحد مدروس',
    instructorsIntro:
      'انطلاقاً من خبرات مجتمع الغوص الحر الدولي، يصمم مدربونا كل جلسة بما يناسب الغواص وفريق الزمالة وظروف اليوم، دون وعود بأعماق محددة.',
    lighthouseTitle: 'خليج اللايتهاوس',
    lighthouseBody:
      'موقع ساحلي للتدريب المركّز. يبني المدربون الأساسيات مثل الاسترخاء وموازنة الضغط والتقنية وفحوصات الزمالة بوتيرة مناسبة.',
    blueHoleTitle: 'الثقب الأزرق',
    blueHoleBody:
      'موقع عالمي شهير بطبيعته المهيبة. تسبق الغوص معرفة المكان والإحاطة الواضحة وخطة تناسب الظروف وخبرة الغواص.',
    slides: [
      { category: 'المدرسة', title: 'مقرّنا بجوار البحر', subtitle: 'مكان مرحّب في دهب للقاء والاستعداد والعودة إليه بين الجلسات.', image: '/images/philosophy/school.jpg', alt: 'مدخل مدرسة فري دايف دهب في خليج اللايتهاوس' },
      { category: 'الفريق', title: 'إرث يصنعه الناس', subtitle: 'أسهمت أجيال من المدربين والغواصين في بناء المدرسة منذ 2003.', image: '/images/philosophy/team.jpg', alt: 'مدربو الغوص الحر وأعضاء الفريق مجتمعون خارج المدرسة' },
      { category: 'مواقع الغوص', title: 'الثقب الأزرق، باحترام وحذر', subtitle: 'موقع استثنائي تبرز فيه أهمية معرفة المكان والتخطيط المدروس.', image: '/images/philosophy/blue-hole.jpg', alt: 'ساحل الثقب الأزرق ومياهه الصافية قرب دهب' },
      { category: 'خليج اللايتهاوس', title: 'تدريب قريب من الشاطئ', subtitle: 'تتيح جلسات الحبل الإرشادي مساحة للتدرب بدعم المدرب.', image: '/images/philosophy/lighthouse-bay.jpg', alt: 'غواص حر يتدرب على حبل في خليج اللايتهاوس' },
      { category: 'البرامج وأسابيع التدريب', title: 'خطوة تالية لكل غواص', subtitle: 'من الدورات الأولى إلى أسابيع التدريب والتطوير المهني.', image: '/images/philosophy/training.jpg', alt: 'غواص حر يتدرب مع زميل على حبل تحت الماء' },
    ],
  },
  es: {
    label: 'Escuela, equipo, lugares y entrenamiento',
    carouselLabel: 'Fotografías de la escuela y los entrenamientos de Freedive Dahab',
    pause: 'Pausar rotación de imágenes',
    play: 'Reanudar rotación de imágenes',
    previous: 'Foto anterior de la escuela',
    next: 'Siguiente foto de la escuela',
    showSlide: (number, title) => `Mostrar foto ${number}: ${title}`,
    slideCount: (current, total) => `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    instructorsEyebrow: 'La perspectiva de los instructores en Dahab',
    instructorsTitle: 'Dos lugares de buceo. Un enfoque responsable.',
    instructorsIntro:
      'Con experiencia de la comunidad internacional de apnea, nuestros instructores adaptan cada sesión al buceador, al compañero y a las condiciones del día, sin prometer profundidades.',
    lighthouseTitle: 'Lighthouse Bay',
    lighthouseBody:
      'Un entorno desde la orilla para practicar con atención. Los instructores trabajan relajación, compensación, técnica y seguridad entre compañeros a un ritmo adecuado.',
    blueHoleTitle: 'Blue Hole',
    blueHoleBody:
      'Un lugar célebre con un entorno impresionante. El conocimiento local, una explicación clara y un plan adaptado a las condiciones preceden a cada inmersión.',
    slides: [
      { category: 'La escuela', title: 'Un punto de encuentro junto al mar', subtitle: 'Un lugar acogedor en Dahab para reunirse, prepararse y descansar entre sesiones.', image: '/images/philosophy/school.jpg', alt: 'Entrada de la escuela Freedive Dahab en Lighthouse Bay' },
      { category: 'El equipo', title: 'Un legado construido en comunidad', subtitle: 'Generaciones de instructores y buceadores dan forma a la escuela desde 2003.', image: '/images/philosophy/team.jpg', alt: 'Instructores de apnea y miembros del equipo reunidos frente a la escuela' },
      { category: 'Lugares de buceo', title: 'Blue Hole, con respeto y cuidado', subtitle: 'Un entorno extraordinario donde importan el conocimiento local y la planificación.', image: '/images/philosophy/blue-hole.jpg', alt: 'Costa del Blue Hole y aguas claras cerca de Dahab' },
      { category: 'Lighthouse Bay', title: 'Entrenamiento cerca de la costa', subtitle: 'Las sesiones con línea permiten practicar con apoyo del instructor.', image: '/images/philosophy/lighthouse-bay.jpg', alt: 'Apneísta practicando en una línea de entrenamiento en Lighthouse Bay' },
      { category: 'Programas y semanas de entrenamiento', title: 'Un siguiente paso para cada persona', subtitle: 'Desde cursos iniciales hasta semanas de entrenamiento y desarrollo profesional.', image: '/images/philosophy/training.jpg', alt: 'Apneísta entrenando con su compañero en una línea submarina' },
    ],
  },
  de: {
    label: 'Schule, Team, Tauchplätze & Training',
    carouselLabel: 'Fotos der Freedive-Dahab-Schule und des Trainings',
    pause: 'Bildwechsel pausieren',
    play: 'Bildwechsel starten',
    previous: 'Vorheriges Schulfoto',
    next: 'Nächstes Schulfoto',
    showSlide: (number, title) => `Foto ${number} zeigen: ${title}`,
    slideCount: (current, total) => `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    instructorsEyebrow: 'Perspektiven unserer Tauchlehrer in Dahab',
    instructorsTitle: 'Zwei Tauchplätze. Ein durchdachter Ansatz.',
    instructorsIntro:
      'Mit Erfahrung aus der internationalen Freediving-Community richten unsere Tauchlehrer jede Einheit nach den Tauchenden, dem Buddy-Team und den Bedingungen des Tages aus – nicht nach einer versprochenen Tiefe.',
    lighthouseTitle: 'Lighthouse Bay',
    lighthouseBody:
      'Ein Trainingsgebiet vom Ufer aus. Hier können Tauchlehrer Grundlagen wie Entspannung, Druckausgleich, Technik und Buddy-Checks in passendem Tempo vermitteln.',
    blueHoleTitle: 'Blue Hole',
    blueHoleBody:
      'Ein weltbekannter Tauchplatz mit eindrucksvoller Kulisse. Ortskenntnis, ein klares Briefing und ein an Bedingungen und Erfahrung angepasster Plan stehen vor jedem Tauchgang.',
    slides: [
      { category: 'Die Schule', title: 'Ein Zuhause direkt am Meer', subtitle: 'Ein einladender Ort in Dahab zum Treffen, Vorbereiten und Erholen zwischen den Einheiten.', image: '/images/philosophy/school.jpg', alt: 'Eingang der Freedive-Dahab-Schule an der Lighthouse Bay' },
      { category: 'Das Team', title: 'Ein gemeinsames Vermächtnis', subtitle: 'Generationen von Tauchlehrern und Tauchenden prägen die Schule seit 2003.', image: '/images/philosophy/team.jpg', alt: 'Freediving-Tauchlehrer und Teammitglieder vor der Schule' },
      { category: 'Tauchplätze', title: 'Das Blue Hole mit Respekt erleben', subtitle: 'Ein außergewöhnlicher Ort, an dem Ortskenntnis und Planung wichtig sind.', image: '/images/philosophy/blue-hole.jpg', alt: 'Küste und klares Wasser am Blue Hole bei Dahab' },
      { category: 'Lighthouse Bay', title: 'Training nah am Ufer', subtitle: 'Geführte Leineneinheiten geben Raum zum Üben mit Unterstützung der Tauchlehrer.', image: '/images/philosophy/lighthouse-bay.jpg', alt: 'Freediver beim Training an einer Leine in der Lighthouse Bay' },
      { category: 'Programme & Trainingswochen', title: 'Der nächste Schritt für alle', subtitle: 'Von den ersten Kursen bis zu Trainingswochen und beruflicher Weiterbildung.', image: '/images/philosophy/training.jpg', alt: 'Freediver trainiert gemeinsam mit einem Buddy an einer Unterwasserleine' },
    ],
  },
};

export function PhilosophyCarousel() {
  const { language } = useLanguage();
  const copy = PHILOSOPHY_COPY[language];
  const prefersReducedMotion = useReducedMotion() === true;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [motionRequested, setMotionRequested] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const total = copy.slides.length;
  const activeSlide = copy.slides[activeIndex];
  const motionPaused = isPaused || (prefersReducedMotion && !motionRequested);

  useEffect(() => {
    if (motionPaused || isHovered || isFocused || total < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isFocused, isHovered, motionPaused, total]);

  const move = (offset: number) => {
    setActiveIndex((index) => (index + offset + total) % total);
  };

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label={copy.carouselLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#081F35] shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeSlide.image}
            src={activeSlide.image}
            alt={activeSlide.alt}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#061a2b]/95 via-[#061a2b]/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 pb-24 text-left sm:p-7 sm:pb-28">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 sm:text-xs">
            {activeSlide.category}
          </p>
          <h3 className="max-w-xl font-bebas text-3xl leading-tight tracking-wide text-white sm:text-4xl">
            {activeSlide.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-100 sm:text-base">
            {activeSlide.subtitle}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex min-h-16 items-center justify-between gap-2 border-t border-white/15 bg-[#061a2b]/70 px-3 backdrop-blur-md sm:px-5">
          <span className="min-w-12 font-mono text-xs tracking-wider text-white" aria-hidden="true">
            {copy.slideCount(activeIndex + 1, total)}
          </span>
          <div className="flex items-center gap-1">
            {copy.slides.map((slide, index) => (
              <button
                key={slide.category}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={copy.showSlide(index + 1, slide.title)}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="grid size-9 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white sm:size-10"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                    index === activeIndex ? 'w-5 bg-cyan-200' : 'w-1.5 bg-white/55'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (motionPaused) {
                  setMotionRequested(true);
                  setIsPaused(false);
                } else {
                  setIsPaused(true);
                }
              }}
              aria-label={motionPaused ? copy.play : copy.pause}
              aria-pressed={motionPaused}
              className="grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {motionPaused ? (
                <Play className="size-4" aria-hidden="true" />
              ) : (
                <Pause className="size-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={copy.previous}
              className="grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={copy.next}
              className="grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-4 -z-10 hidden rounded-3xl border border-cyan-500/20 sm:block" />
    </div>
  );
}

export function InstructorSitePerspectives() {
  const { language } = useLanguage();
  const copy = PHILOSOPHY_COPY[language];

  return (
    <section aria-labelledby="instructor-perspectives-title" className="mt-24 border-t border-white/10 pt-12 sm:mt-32 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-alata text-[10px] uppercase tracking-[0.26em] text-cyan-300 sm:text-xs">
          {copy.instructorsEyebrow}
        </p>
        <h3 id="instructor-perspectives-title" className="mt-3 font-bebas text-4xl tracking-wide text-white sm:text-5xl">
          {copy.instructorsTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {copy.instructorsIntro}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#0A2943]/75 p-6 sm:p-8">
          <p className="font-alata text-[10px] uppercase tracking-[0.2em] text-cyan-200">01 / DAHAB</p>
          <h4 className="mt-3 font-bebas text-3xl text-white">{copy.lighthouseTitle}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{copy.lighthouseBody}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#0A2943]/75 p-6 sm:p-8">
          <p className="font-alata text-[10px] uppercase tracking-[0.2em] text-cyan-200">02 / DAHAB</p>
          <h4 className="mt-3 font-bebas text-3xl text-white">{copy.blueHoleTitle}</h4>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{copy.blueHoleBody}</p>
        </article>
      </div>
    </section>
  );
}

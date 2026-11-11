import { LandingCopy, Locale } from "./types";

/** Every "Start a project" lands on the form in the closing section. */
export const START_PROJECT_HREF = "#contact";

/** Window event a service row fires to start the form with that service picked. */
export const START_PROJECT_EVENT = "thera:start-project";

export const LANDING_COPY: Record<Locale, LandingCopy> = {
  en: {
    meta: {
      title: "Thera — Purpose-driven software for meaningful growth",
      description:
        "Thera is Matías Santillan’s software studio for growing businesses. I design and build every project myself, step by step, directly with you.",
    },
    nav: {
      label: "Main",
      skipLink: "Skip to content",
      services: "Services",
      process: "Process",
      faq: "FAQ",
      workWithMe: "Work with me",
      switchHref: "/es",
      switchShort: "ES",
      switchLabel: "Ver en español",
    },
    hero: {
      title: ["Plant the right idea.", "Harvest real growth."],
      lead: "I’m Matías, and Thera is my software studio for growing businesses. I design and build every project myself — directly with you, step by step — so what we ship keeps paying off long after launch.",
      availability: "Up to three projects at a time",
      primary: "Start a project",
      secondary: "See how I work",
    },
    seasons: {
      label: "How I work",
      items: [
        {
          name: "Sow",
          title: "Listen before I build.",
          meta: "Free · A written analysis in 24 hours",
          body: "We start with your business, not a backlog: the goal, the people who will use it, the constraints. Send me your site or your idea, and within a day you get a written analysis of what I would do.",
        },
        {
          name: "Tend",
          title: "Prove the idea first.",
          meta: "A proof of concept in up to 72 hours",
          body: "Before the heavy investment, I build a working proof of concept that tests your idea with something real — while changing course is still cheap.",
        },
        {
          name: "Grow",
          title: "Build step by step.",
          meta: "A release every week",
          body: "Small, reviewed releases every week. You see progress in production, not in status reports, and quality and infrastructure grow at the same pace as the product.",
        },
        {
          name: "Harvest",
          title: "Measure, then scale what works.",
          meta: "30 days of support included",
          body: "After launch, a month of support and metrics comes with the project. If you want to keep going, we choose the next path together.",
        },
      ],
    },
    services: {
      title: "What I do",
      lead: "I design and build every project myself, together with specialists I trust when the work calls for them. Either way, you only ever talk to me.",
      items: [
        {
          key: "sd",
          name: "Software Development",
          body: "Web platforms, internal tools and APIs, built to last and built to change.",
          hint: "Let’s build it",
        },
        {
          key: "ai",
          name: "AI for Your Business",
          body: "Custom agents and integrated workflows that take repetitive work off your team’s plate, built around how your business actually runs.",
          hint: "Put AI to work",
        },
        {
          key: "ux",
          name: "Product Design",
          body: "Research-led interfaces that make complex work feel simple.",
          hint: "Design what people love",
        },
        {
          key: "ps",
          name: "Business Strategy",
          body: "Discovery, roadmaps and metrics tied to real business outcomes.",
          hint: "Find the next move",
        },
        {
          key: "dv",
          name: "Cloud & DevOps",
          body: "Reliable, observable infrastructure that scales without drama.",
          hint: "Scale with calm",
        },
      ],
    },
    principles: {
      title: "Directly with me",
      name: "Matías Santillan",
      role: "Founder of Thera · Full-stack developer",
      bio: "Seven years building products end to end — writing them, and leading the teams behind them. Full-stack with a front-end heart, which is why design and product sit at the center of how I work. But code is the means, not the goal: I’m here to understand your problem and find the solution that truly fits it.",
      items: [
        {
          title: "You talk to the person building it.",
          body: "No account managers, no handoffs. From the first call to launch, your contact is me.",
        },
        {
          title: "Three projects at a time, at most.",
          body: "So yours gets real attention. If I’m full, I’ll tell you when I can start.",
        },
        {
          title: "Honest from the first call.",
          body: "If I’m not the right fit, or your idea needs something else first, I’ll tell you before you spend anything.",
        },
      ],
      origin:
        "Thera comes from the Greek therízō, “to harvest”, and from the terabyte, the unit that stores what matters most.",
    },
    faq: {
      title: "Good to know",
      items: [
        {
          question: "What kind of projects do you take on?",
          answer:
            "Web platforms, internal tools, MVPs that need to prove an idea fast, and AI agents and workflows for day-to-day operations. If it’s software that should move your business forward, let’s talk.",
        },
        {
          question: "How much does a project cost?",
          answer:
            "Every project is scoped on its own, so there are no fixed packages. Give me a rough budget when you start a project and I’ll shape the scope to fit it.",
        },
        {
          question: "How long does it take?",
          answer:
            "You see value in the first 24 to 72 hours: a written analysis, a proof of concept that tests your idea, or both. The full project depends on its complexity — I aim to scope most between 4 and 8 weeks, but every one is its own.",
        },
        {
          question: "What do you build with?",
          answer:
            "Mostly Next.js and Node.js with TypeScript and PostgreSQL, on AWS or Google Cloud — or Supabase and Firebase when speed matters most. I also work with Angular and Python. Still, the stack follows the problem, never the other way around.",
        },
        {
          question: "Can you work on an existing product, or with my team?",
          answer:
            "Yes. I can pick up a product already in motion, or join your team as a hands-on partner. I’ve also spent years making teams work better — smoother reviews, saner tooling, a calmer way to ship — so I can help there too.",
        },
        {
          question: "Do you use AI?",
          answer:
            "Every day, where it actually helps: exploring, prototyping and moving faster. Decisions, architecture and code review stay with me. And if your business could use it, bringing AI into your operations is one of the things I build.",
        },
        {
          question: "What happens after launch?",
          answer:
            "30 days of support are included, with metrics to see what’s working. After that, if you want, we keep going on whatever path makes sense.",
        },
      ],
    },
    contact: {
      title: "Let’s plant something.",
      body: "Tell me just enough to understand what you’re building. I’ll read it myself and reply personally.",
      cta: "Start a project",
      kicker: "New project",
      close: "Close",
      back: "Back",
      need: { title: "What are we making?", unsure: "Not sure yet" },
      budget: {
        title: "What budget are we working with?",
        hint: "A rough range is enough. I’ll shape the scope to it.",
        options: [
          "USD 2K–5K",
          "USD 5K–10K",
          "USD 10K–20K",
          "USD 20K+",
          "Not sure yet",
        ],
      },
      details: {
        title: "Give me the short version.",
        name: "Your name",
        email: "Email",
        message: "What are you trying to build?",
        placeholders: {
          name: "Your first and last name",
          email: "you@company.com",
          message:
            "A few lines about the idea, the problem it solves and any deadline you have in mind. Include your website URL if you have one.",
        },
        submit: "Send",
        sending: "Sending…",
      },
      sent: {
        title: "Thank you.",
        body: "Your request is in. I’ll read it myself and get back to you within the next 24 hours.",
        close: "Back to the site",
      },
      invalid: "Check your name, email and message, then send it again.",
      error: "It didn’t go through. Please try again in a moment.",
      location: "thera LLC",
      rights: "All rights reserved.",
    },
  },
  es: {
    meta: {
      title: "Thera — Software con propósito para un crecimiento real",
      description:
        "Thera es el estudio de software de Matías Santillan para negocios en crecimiento. Diseño y construyo cada proyecto yo mismo, paso a paso, directo con vos.",
    },
    nav: {
      label: "Principal",
      skipLink: "Saltar al contenido",
      services: "Servicios",
      process: "Proceso",
      faq: "Preguntas",
      workWithMe: "Trabajemos juntos",
      switchHref: "/",
      switchShort: "EN",
      switchLabel: "View in English",
    },
    hero: {
      title: ["Sembrá la idea correcta.", "Cosechá crecimiento real."],
      lead: "Soy Matías, y Thera es mi estudio de software para negocios en crecimiento. Diseño y construyo cada proyecto yo mismo — directo con vos, paso a paso — para que lo que lanzamos siga rindiendo mucho después del lanzamiento.",
      availability: "Hasta tres proyectos a la vez",
      primary: "Empezar un proyecto",
      secondary: "Ver cómo trabajo",
    },
    seasons: {
      label: "Cómo trabajo",
      items: [
        {
          name: "Sembrar",
          title: "Escuchar antes de construir.",
          meta: "Gratis · Un análisis escrito en 24 horas",
          body: "Empezamos por tu negocio, no por un backlog: el objetivo, las personas que lo van a usar, las restricciones. Mandame tu sitio o tu idea y en un día tenés un análisis escrito de lo que yo haría.",
        },
        {
          name: "Cuidar",
          title: "Probar la idea primero.",
          meta: "Una prueba de concepto en hasta 72 horas",
          body: "Antes de la gran inversión, armo una prueba de concepto funcional que pone tu idea a prueba con algo real — mientras cambiar de rumbo todavía es barato.",
        },
        {
          name: "Crecer",
          title: "Construir paso a paso.",
          meta: "Una entrega cada semana",
          body: "Entregas chicas y revisadas cada semana. Ves el avance en producción, no en reportes, y la calidad y la infraestructura crecen al mismo ritmo que el producto.",
        },
        {
          name: "Cosechar",
          title: "Medir, y escalar lo que funciona.",
          meta: "30 días de soporte incluidos",
          body: "Después del lanzamiento, un mes de soporte y métricas viene con el proyecto. Si querés seguir, elegimos juntos el próximo camino.",
        },
      ],
    },
    services: {
      title: "Qué hago",
      lead: "Diseño y construyo cada proyecto yo mismo, junto a especialistas de confianza cuando el trabajo lo pide. Siempre hablás solo conmigo.",
      items: [
        {
          key: "sd",
          name: "Desarrollo de Software",
          body: "Plataformas web, herramientas internas y APIs, hechas para durar y para cambiar.",
          hint: "Construyámoslo",
        },
        {
          key: "ai",
          name: "IA para tu Negocio",
          body: "Agentes a medida y flujos integrados que le sacan a tu equipo el trabajo repetitivo, diseñados alrededor de cómo funciona tu negocio de verdad.",
          hint: "Sumá IA a tu negocio",
        },
        {
          key: "ux",
          name: "Diseño de Producto",
          body: "Interfaces basadas en investigación que hacen simple el trabajo complejo.",
          hint: "Diseñemos lo que la gente usa",
        },
        {
          key: "ps",
          name: "Estrategia de Negocio",
          body: "Discovery, roadmaps y métricas atadas a resultados reales del negocio.",
          hint: "Encontremos el próximo paso",
        },
        {
          key: "dv",
          name: "Cloud y DevOps",
          body: "Infraestructura confiable y observable que escala sin sobresaltos.",
          hint: "Escalá tranquilo",
        },
      ],
    },
    principles: {
      title: "Directo conmigo",
      name: "Matías Santillan",
      role: "Fundador de Thera · Desarrollador full-stack",
      bio: "Siete años construyendo productos de punta a punta — escribiéndolos y liderando los equipos detrás de ellos. Full-stack con corazón frontend, por eso el diseño y el producto están en el centro de cómo trabajo. Pero el código es el medio, no el fin: estoy para entender tu problema y encontrar la solución que de verdad le sirva.",
      items: [
        {
          title: "Hablás con quien lo construye.",
          body: "Sin intermediarios ni traspasos. De la primera llamada al lanzamiento, tu contacto soy yo.",
        },
        {
          title: "Tres proyectos a la vez, como máximo.",
          body: "Para que el tuyo tenga atención real. Si estoy completo, te digo cuándo puedo empezar.",
        },
        {
          title: "Honesto desde la primera llamada.",
          body: "Si no soy la persona indicada, o tu idea necesita otra cosa primero, te lo digo antes de que gastes nada.",
        },
      ],
      origin:
        "Thera viene del griego therízō, “cosechar”, y del terabyte, la unidad que guarda lo que más importa.",
    },
    faq: {
      title: "Algunas preguntas que podés tener",
      items: [
        {
          question: "¿Qué tipo de proyectos tomás?",
          answer:
            "Plataformas web, herramientas internas, MVPs que necesitan probar una idea rápido, y agentes y flujos de IA para la operación del día a día. Si es software que tiene que hacer avanzar tu negocio, hablemos.",
        },
        {
          question: "¿Cuánto cuesta un proyecto?",
          answer:
            "Cada proyecto se arma a medida, así que no hay paquetes fijos. Contame un presupuesto aproximado cuando empieces un proyecto y ajusto el alcance a eso.",
        },
        {
          question: "¿Cuánto tarda?",
          answer:
            "Ves valor en las primeras 24 a 72 horas: un análisis escrito, una prueba de concepto que pone tu idea a prueba, o ambos. El proyecto completo depende de su complejidad — busco acotar la mayoría entre 4 y 8 semanas, pero cada uno es distinto.",
        },
        {
          question: "¿Con qué tecnologías trabajás?",
          answer:
            "Principalmente Next.js y Node.js con TypeScript y PostgreSQL, sobre AWS o Google Cloud — o Supabase y Firebase cuando la velocidad manda. También trabajo con Angular y Python. Igual, la tecnología sigue al problema, nunca al revés.",
        },
        {
          question:
            "¿Podés sumarte a un producto que ya existe, o a mi equipo?",
          answer:
            "Sí. Puedo tomar un producto que ya está en marcha, o sumarme a tu equipo como un socio que pone las manos. También pasé años haciendo que los equipos trabajen mejor — reviews más fluidas, herramientas más sanas, una forma más tranquila de entregar — así que ahí también puedo ayudar.",
        },
        {
          question: "¿Usás IA?",
          answer:
            "Todos los días, donde de verdad ayuda: para explorar, prototipar y avanzar más rápido. Las decisiones, la arquitectura y la revisión del código quedan en mis manos. Y si a tu negocio le sirve, llevar la IA a tu operación es una de las cosas que construyo.",
        },
        {
          question: "¿Qué pasa después del lanzamiento?",
          answer:
            "Incluye 30 días de soporte, con métricas para ver qué está funcionando. Después, si querés, seguimos por el camino que tenga sentido.",
        },
      ],
    },
    contact: {
      title: "Sembremos algo.",
      body: "Contame lo justo para entender qué querés construir. Lo leo yo y te respondo personalmente.",
      cta: "Empezar un proyecto",
      kicker: "Nuevo proyecto",
      close: "Cerrar",
      back: "Volver",
      need: { title: "¿Qué vamos a hacer?", unsure: "Todavía no sé" },
      budget: {
        title: "¿Con qué presupuesto trabajamos?",
        hint: "Un rango aproximado alcanza. Ajusto el alcance a eso.",
        options: [
          "USD 2K–5K",
          "USD 5K–10K",
          "USD 10K–20K",
          "USD 20K+",
          "Todavía no sé",
        ],
      },
      details: {
        title: "Contame la versión corta.",
        name: "Tu nombre",
        email: "Email",
        message: "¿Qué querés construir?",
        placeholders: {
          name: "Tu nombre y apellido",
          email: "vos@empresa.com",
          message:
            "Unas líneas sobre la idea, qué problema resuelve y si tenés alguna fecha en mente. Si tenés sitio web, sumá la URL.",
        },
        submit: "Enviar",
        sending: "Enviando…",
      },
      sent: {
        title: "¡Gracias!",
        body: "Tu solicitud ya llegó. La leo yo y te respondo dentro de las próximas 24 horas.",
        close: "Volver al sitio",
      },
      invalid: "Revisá tu nombre, email y mensaje, y volvé a enviarlo.",
      error: "No se pudo enviar. Probá de nuevo en un momento.",
      location: "thera LLC",
      rights: "Todos los derechos reservados.",
    },
  },
};
/** The lime the page selects text with: every "start a project" call to action wears it. */
export const LIME_BUTTON =
  "rounded-full bg-success-500 font-semibold text-gray-900 shadow-[0_8px_32px_-6px_var(--color-success-500)] hover:bg-success-400";

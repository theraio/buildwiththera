import { LandingCopy, Locale } from "./types";

// shortcut: no booking link exists yet, so every "Book a call" scrolls to the
// closing section; swap in the real Cal.com/Calendly URL when it exists.
export const BOOK_CALL_HREF = "#contact";

export const LANDING_COPY: Record<Locale, LandingCopy> = {
  en: {
    meta: {
      title: "Thera — Purpose-driven software for meaningful growth",
      description:
        "Thera is a software partner for growing businesses. We design, build and scale software with intention, step by step, alongside you.",
    },
    nav: {
      label: "Main",
      skipLink: "Skip to content",
      services: "Services",
      process: "Process",
      principles: "Principles",
      bookCall: "Book a call",
      switchHref: "/es",
      switchShort: "ES",
      switchLabel: "Ver en español",
    },
    hero: {
      title: ["Plant the right idea.", "Harvest real growth."],
      lead: "Thera is a software partner for growing businesses. We design, build and scale software with intention — step by step, alongside you — so what we ship keeps paying off long after launch.",
      primary: "Book a 30-minute call",
      secondary: "See how we work",
    },
    seasons: {
      label: "How we work",
      items: [
        {
          name: "Sow",
          title: "Listen before we build.",
          body: "We start with your business, not a backlog: the goal, the people who will use what we make, the constraints, and the one outcome that matters most. You leave with a clear plan and an honest estimate.",
        },
        {
          name: "Tend",
          title: "Shape the smallest useful thing.",
          body: "Strategy and design turn the plan into something real people can use and test early — before the heavy investment, while changing course is still cheap.",
        },
        {
          name: "Grow",
          title: "Build step by step.",
          body: "Small, reviewed releases every week. You see progress in production, not in status reports, and quality and infrastructure grow at the same pace as the product.",
        },
        {
          name: "Harvest",
          title: "Measure, then scale what works.",
          body: "We track the outcome we agreed on, double down on what moves it, and hand over software your team understands and can own.",
        },
      ],
    },
    services: {
      title: "Five disciplines. One connected team.",
      lead: "Each project draws on the disciplines it needs, working as one system rather than a relay of handoffs.",
      items: [
        {
          key: "sd",
          name: "Software Development",
          body: "Web platforms, internal tools and APIs, built to last and built to change.",
        },
        {
          key: "ux",
          name: "UX/UI Design",
          body: "Research-led interfaces that make complex work feel simple.",
        },
        {
          key: "ps",
          name: "Product Strategy & Growth",
          body: "Discovery, roadmaps and metrics tied to real business outcomes.",
        },
        {
          key: "dv",
          name: "DevOps & Cloud Architecture",
          body: "Reliable, observable infrastructure that scales without drama.",
        },
        {
          key: "qa",
          name: "Quality Assurance & Testing",
          body: "Automated and hands-on testing, so every release ships with confidence.",
        },
      ],
    },
    principles: {
      title: "What we hold to",
      items: [
        {
          title: "We grow together.",
          body: "We work alongside each client: listening, analyzing and building tailored solutions one step at a time.",
        },
        {
          title: "We earn trust.",
          body: "Closeness, commitment and clarity at every decision, so the process always feels human and never opaque.",
        },
        {
          title: "We harvest what we sow.",
          body: "Seeing the ideas we plant together grow is the reward. We stay through to the results.",
        },
      ],
      origin:
        "Thera comes from the Greek therízō, “to harvest”, and from the terabyte, the unit that stores what matters most.",
    },
    closing: {
      title: "Let’s plant something.",
      body: "Tell us where your business wants to grow. In thirty minutes we’ll tell you, honestly, whether and how we can help.",
      cta: "Book a call",
      location: "Buenos Aires · thera LLC",
      rights: "All rights reserved.",
    },
  },
  es: {
    meta: {
      title: "Thera — Software con propósito para un crecimiento real",
      description:
        "Thera es un socio de software para negocios en crecimiento. Diseñamos, construimos y escalamos software con intención, paso a paso, junto a vos.",
    },
    nav: {
      label: "Principal",
      skipLink: "Saltar al contenido",
      services: "Servicios",
      process: "Proceso",
      principles: "Principios",
      bookCall: "Agendar una llamada",
      switchHref: "/",
      switchShort: "EN",
      switchLabel: "View in English",
    },
    hero: {
      title: ["Sembrá la idea correcta.", "Cosechá crecimiento real."],
      lead: "Thera es un socio de software para negocios en crecimiento. Diseñamos, construimos y escalamos software con intención — paso a paso, junto a vos — para que lo que lanzamos siga rindiendo mucho después del lanzamiento.",
      primary: "Agendar una llamada de 30 minutos",
      secondary: "Ver cómo trabajamos",
    },
    seasons: {
      label: "Cómo trabajamos",
      items: [
        {
          name: "Sembrar",
          title: "Escuchar antes de construir.",
          body: "Empezamos por tu negocio, no por un backlog: el objetivo, las personas que van a usar lo que hagamos, las restricciones y el resultado que más importa. Te llevás un plan claro y una estimación honesta.",
        },
        {
          name: "Cuidar",
          title: "Darle forma a lo mínimo útil.",
          body: "La estrategia y el diseño convierten el plan en algo que personas reales pueden usar y probar temprano — antes de la gran inversión, mientras cambiar de rumbo todavía es barato.",
        },
        {
          name: "Crecer",
          title: "Construir paso a paso.",
          body: "Entregas chicas y revisadas cada semana. Ves el avance en producción, no en reportes, y la calidad y la infraestructura crecen al mismo ritmo que el producto.",
        },
        {
          name: "Cosechar",
          title: "Medir, y escalar lo que funciona.",
          body: "Medimos el resultado que acordamos, redoblamos lo que lo mueve y entregamos software que tu equipo entiende y puede hacer propio.",
        },
      ],
    },
    services: {
      title: "Cinco disciplinas. Un solo equipo conectado.",
      lead: "Cada proyecto suma las disciplinas que necesita, trabajando como un sistema y no como una cadena de traspasos.",
      items: [
        {
          key: "sd",
          name: "Desarrollo de Software",
          body: "Plataformas web, herramientas internas y APIs, hechas para durar y para cambiar.",
        },
        {
          key: "ux",
          name: "Diseño UX/UI",
          body: "Interfaces basadas en investigación que hacen simple el trabajo complejo.",
        },
        {
          key: "ps",
          name: "Estrategia de Producto y Crecimiento",
          body: "Discovery, roadmaps y métricas atadas a resultados reales del negocio.",
        },
        {
          key: "dv",
          name: "DevOps y Arquitectura Cloud",
          body: "Infraestructura confiable y observable que escala sin sobresaltos.",
        },
        {
          key: "qa",
          name: "Quality Assurance y Testing",
          body: "Testing automatizado y manual, para que cada entrega salga con confianza.",
        },
      ],
    },
    principles: {
      title: "Lo que sostenemos",
      items: [
        {
          title: "Crecemos juntos.",
          body: "Trabajamos al lado de cada cliente: escuchando, analizando y construyendo soluciones a medida, paso a paso.",
        },
        {
          title: "Nos ganamos la confianza.",
          body: "Cercanía, compromiso y claridad en cada decisión, para que el proceso se sienta humano y nunca opaco.",
        },
        {
          title: "Cosechamos lo que sembramos.",
          body: "Ver crecer las ideas que sembramos juntos es la recompensa. Nos quedamos hasta ver los resultados.",
        },
      ],
      origin:
        "Thera viene del griego therízō, “cosechar”, y del terabyte, la unidad que guarda lo que más importa.",
    },
    closing: {
      title: "Sembremos algo.",
      body: "Contanos hacia dónde quiere crecer tu negocio. En treinta minutos te decimos, con honestidad, si podemos ayudarte y cómo.",
      cta: "Agendar una llamada",
      location: "Buenos Aires · thera LLC",
      rights: "Todos los derechos reservados.",
    },
  },
};

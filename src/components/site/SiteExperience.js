"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BadgeCheck, Boxes, Check, ChevronRight, Globe2, Mail, MapPin, Menu, MessageCircle, Package, Phone, ShieldCheck, Truck, X } from "lucide-react";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { devices } from "@/data/devices";
import { grades } from "@/data/grades";
import { isValidEmail } from "@/lib/validation";

const ease = [0.16, 1, 0.3, 1];

function AssetImage({ src, fallback, alt, priority = false, loading = "lazy", sizes = "(max-width: 768px) 90vw, 50vw", className = "" }) {
  const [current, setCurrent] = useState(src);
  return <Image src={current} alt={alt} fill priority={priority} loading={priority ? undefined : loading} sizes={sizes} unoptimized={current.endsWith(".webp")} className={className} onError={() => setCurrent(fallback)} />;
}

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.75, delay, ease }}>{children}</motion.div>;
}

function SectionIntro({ eyebrow, title, copy, dark = false }) {
  return <div className={`section-intro ${dark ? "section-intro--dark" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-intro__copy">{copy}</p>}</div>;
}

function BrandLockup({ dark = false }) {
  return (
    <div className={`brand-lockup ${dark ? "brand-lockup--on-dark" : ""}`}>
      <Image
        src={dark ? "/brand/vnm-telecommunications-lockup-light.svg" : "/brand/vnm-telecommunications-lockup-dark.svg"}
        alt={site.name}
        width={240}
        height={40}
        className="brand-lockup__wide"
      />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);
  const links = [{ label: "Categories", href: "#categories" }, { label: "Grading", href: "#grading" }, { label: "Logistics", href: "#logistics" }, { label: "Business", href: "#company" }];
  return <>
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <a className="site-nav__brand" href="#top" aria-label="VNM Telecommunications home"><Image src="/brand/vnm-telecommunications-mark.png" alt="" width={29} height={29} /><span>VNM <b>TELECOMMUNICATIONS</b></span></a>
      <nav className="site-nav__links" aria-label="Primary navigation">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a className="button button--nav" href="#contact">Request stock list <ArrowUpRight size={15} /></a>
      <button ref={triggerRef} className="menu-trigger" type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open}><Menu size={21} /></button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><div className="mobile-menu__top"><a className="site-nav__brand" href="#top" onClick={() => setOpen(false)}><Image src="/brand/vnm-telecommunications-mark.png" alt="" width={29} height={29} /><span>VNM <b>TELECOMMUNICATIONS</b></span></a><button className="menu-trigger menu-trigger--close" type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} aria-label="Close navigation menu"><X size={24} /></button></div><nav aria-label="Mobile navigation">{links.map((link, index) => <motion.a key={link.href} href={link.href} onClick={() => setOpen(false)} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05, ease }}>{link.label}<ChevronRight size={20} /></motion.a>)}</nav><div className="mobile-menu__bars" aria-hidden="true"><i /><i /><i /><i /></div></motion.div>}</AnimatePresence>
  </>;
}

function Hero() {
  const { scrollY } = useScroll();
  const reduceMotion = usePrefersReducedMotion();
  const visualScale = useTransform(scrollY, [0, 680], [1, .84]);
  const visualY = useTransform(scrollY, [0, 680], [0, 90]);
  const copyOpacity = useTransform(scrollY, [0, 440], [1, .1]);
  const copyY = useTransform(scrollY, [0, 440], [0, -24]);
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 24, mass: .25 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 24, mass: .25 });
  const movePointer = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left - bounds.width / 2) * .018);
    pointerY.set((event.clientY - bounds.top - bounds.height / 2) * .018);
  };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
  return <section className="hero" id="top" onPointerMove={movePointer} onPointerLeave={resetPointer}><div className="hero__grid" aria-hidden="true" /><div className="hero__halo" aria-hidden="true" /><div className="wrap hero__inner"><motion.div className="hero__copy" style={{ opacity: copyOpacity, y: copyY }}><p className="eyebrow">INDIAN MERCHANT EXPORTER · PUNE</p><h1><span className="hero__line hero__line--one">SMARTPHONES</span><span className="hero__line hero__line--two">&amp;</span><span className="hero__line hero__line--three">ELECTRONICS.</span><span className="hero__line hero__line--four">BUILT FOR</span><span className="hero__line hero__line--five">TRADE.</span></h1><p className="hero__body">New and certified refurbished smartphones, tablets, wearables and accessories—sourced for distributors, wholesalers and bulk traders across India and export markets.</p><div className="hero__actions"><a className="button button--dark" href="#categories">Browse stock categories <ArrowUpRight size={16} /></a><a className="text-link" href="#contact">Request a quote <ArrowUpRight size={16} /></a></div></motion.div><motion.div className="hero__visual" style={{ scale: visualScale, y: visualY }}><span className="hero__serial">VNM / PUNE · INDIA / 001</span><motion.div className="hero__device" style={{ x: pointerX, y: pointerY }}><AssetImage src="/images/devices/hero-device-stack.webp" fallback="/generated/devices/hero-device-stack.svg" alt="Fictional stack of smartphones, tablet, laptop and wearable devices" priority sizes="(max-width: 768px) 95vw, 58vw" /></motion.div><div className="hero__measure"><span>01</span><i /><span>04</span></div><span className="hero__orbit hero__orbit--one" /><span className="hero__orbit hero__orbit--two" /></motion.div><div className="hero__summary"><span className="eyebrow">INVENTORY SNAPSHOT</span><strong>{site.annualUnits}</strong><small>units shipped / year</small></div><div className="hero__scroll"><span>Scroll to explore</span><i /></div></div></section>;
}

function TrustMarquee() {
  const rows = [{ label: "SUPPLYING ALL MAJOR DEVICE ECOSYSTEMS", items: "APPLE · SAMSUNG · XIAOMI · VIVO · OPPO · REALME · ONEPLUS · MOTOROLA" }, { label: "DOMESTIC & EXPORT LOGISTICS", items: "DHL · FEDEX · UPS · BLUE DART · DELHIVERY · INDIA POST" }];
  return <section className="marquee-band" aria-label="Supply and delivery network"><div className="wrap">{rows.map((row, index) => <div className="marquee-row" key={row.label}><span className="eyebrow">{row.label}</span><div className={`marquee-track ${index ? "marquee-track--reverse" : ""}`}><span>{row.items}</span><span aria-hidden="true">{row.items}</span></div></div>)}</div></section>;
}

function Stats() {
  const stats = [[site.countriesServed, "Countries doing business in"], [site.productCategories, "Product categories"], [site.annualUnits, "Units shipped / year"], [site.dispatchTime, "Average dispatch"]];
  return <section className="stats"><div className="wrap stats__grid">{stats.map(([value, label], index) => <Reveal className="stat" key={label} delay={index * 0.06}><span className="stat__index">0{index + 1}</span><strong>{value}</strong><span>{label}</span></Reveal>)}</div></section>;
}

function CategoryCard({ category, index }) {
  const reduceMotion = usePrefersReducedMotion();
  return <motion.a className={`category-card category-card--${category.id}`} href="#story" style={{ "--card-color": category.color, "--card-text": category.textColor }} whileHover={{ y: -5 }} transition={{ duration: 0.35, ease }}><div className="category-card__texture" style={{ backgroundImage: `url(${category.texture})` }} /><div className="category-card__meta"><span>0{index + 1} / {category.code}</span><ArrowUpRight size={18} /></div><div className="category-card__copy"><p className="eyebrow">{category.shortName}</p><h3>{category.name}</h3><p>{category.statement}</p></div><motion.div className="category-card__visual" whileHover={{ scale: 1.045 }} animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1.2, -.7, 0] }} transition={reduceMotion ? { duration: .5, ease } : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * .35 }}><AssetImage src={category.image} fallback={category.fallback} alt={`${category.name} product assortment`} sizes="(max-width: 768px) 90vw, 45vw" /></motion.div><div className="category-card__bottom"><div><strong>{category.metric}</strong><span>{category.metricLabel}</span></div><span>Explore category <ArrowUpRight size={15} /></span></div></motion.a>;
}

function CategoryGrid() {
  return <section className="section section--light categories" id="categories"><div className="wrap"><SectionIntro eyebrow="PRODUCT CATEGORIES" title="Inventory for distribution and export." copy="Smartphones and consumer electronics prepared for distributors, wholesalers, retailers and bulk traders—with clear grades and documentation." /><div className="categories__grid">{categories.map((category, index) => <Reveal key={category.id} className={`category-card-wrap category-card-wrap--${category.id}`} delay={index * 0.06}><CategoryCard category={category} index={index} /></Reveal>)}</div></div></section>;
}

function VaultStageImage({ device, index, progress, reduceMotion, activeStage }) {
  const rotate = useTransform(progress, [index / 4, (index + 1) / 4], index === 0 ? [-8, -2] : index === 1 ? [-2, 5] : index === 2 ? [5, -4] : [-4, 0]);
  const x = useTransform(progress, [index / 4, (index + 1) / 4], index === 0 ? [9, 2] : index === 1 ? [2, -2] : index === 2 ? [-2, 4] : [4, 0]);
  const y = useTransform(progress, [index / 4, (index + 1) / 4], index === 0 ? [8, 0] : index === 1 ? [0, -2] : index === 2 ? [-2, 2] : [2, 0]);
  const scale = useTransform(progress, [index / 4, (index + 1) / 4], index === 0 ? [.88, 1.04] : index === 1 ? [1.04, .96] : index === 2 ? [.96, 1.04] : [1.04, .94]);
  const xVw = useTransform(x, (value) => `${value}vw`);
  const yVh = useTransform(y, (value) => `${value}vh`);
  const isActive = index === activeStage;
  return <motion.div className="story__device" aria-hidden={!isActive} style={{ visibility: isActive ? "visible" : "hidden", opacity: isActive ? 1 : 0, rotate: reduceMotion ? 0 : rotate, x: reduceMotion ? 0 : xVw, y: reduceMotion ? 0 : yVh, scale: reduceMotion ? 1 : scale }}><AssetImage src={device.image} fallback={device.fallbackImage} alt={`${device.name} fictional ${device.category} device artwork`} loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 768px) 86vw, 42vw" /></motion.div>;
}

function ScrollDeviceStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const backgroundOne = useTransform(scrollYProgress, [0, .08, .25], [1, 1, 0]);
  const backgroundTwo = useTransform(scrollYProgress, [.17, .25, .5], [0, 1, 0]);
  const backgroundThree = useTransform(scrollYProgress, [.42, .5, .75], [0, 1, 0]);
  const backgroundFour = useTransform(scrollYProgress, [.67, .75, 1], [0, 1, 1]);
  const backgrounds = [backgroundOne, backgroundTwo, backgroundThree, backgroundFour];
  useMotionValueEvent(scrollYProgress, "change", (value) => setStage((current) => { const next = Math.min(3, Math.floor(value * 4)); return current === next ? current : next; }));
  const active = categories[stage];
  const stageCopy = ["Fast-moving phone inventory, prepared across the grades your channels actually sell.", "Large-screen devices for business, education and premium retail programs.", "Compact technology with clear functional checks and retail-ready presentation.", "High-turn accessories that keep the basket moving after the device sale."];
  const jumpToStage = (index) => { const section = ref.current; if (!section) return; const distance = section.offsetHeight - window.innerHeight; window.scrollTo({ top: section.offsetTop + Math.max(0, distance) * (index / 3), behavior: "smooth" }); };
  return (
    <section className="story" id="story" ref={ref} style={{ "--story-color": active.color }}>
      <div className="story__sticky">
        <div className="story__backgrounds" aria-hidden="true">
          {categories.map((category, index) => <motion.div key={category.id} style={{ background: category.color, opacity: backgrounds[index] }} />)}
        </div>
        <div className="story__texture" style={{ backgroundImage: `url(${active.texture})` }} />
        <div className="wrap story__inner">
          <div className="story__copy">
            <p className="eyebrow eyebrow--light">THE INVENTORY VAULT · SCROLL TO CHANGE</p>
            <div className="story__stage-label">0{stage + 1} / 04</div>
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(8px)" }} transition={{ duration: reduceMotion ? 0 : .5, ease }}>
                <h2>{active.name}</h2>
                <p>{stageCopy[stage]}</p>
                <div className="story__metric"><strong>{active.metric}</strong><span>{active.metricLabel}</span></div>
                <span className="story__code">INVENTORY CODE / {active.code}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="story__visual">
            {devices.map((device, index) => <VaultStageImage key={device.id} device={device} index={index} progress={scrollYProgress} reduceMotion={reduceMotion} activeStage={stage} />)}
            <div className="story__shadow" />
          </div>
          <div className="story__nav" aria-label="Inventory story stages">
            {categories.map((item, index) => <button key={item.id} type="button" className={stage === index ? "is-active" : ""} onClick={() => jumpToStage(index)} aria-label={`Show ${item.name}`} aria-pressed={stage === index}><span>0{index + 1}</span><i style={{ background: item.color }} /></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReduced(query.matches); update(); query.addEventListener?.("change", update); return () => query.removeEventListener?.("change", update); }, []);
  return reduced;
}

function GradingSection() {
  const [active, setActive] = useState(0);
  const grade = grades[active];
  return <section className="section grading" id="grading" style={{ "--grade-bg": grade.color }}><div className="wrap"><SectionIntro eyebrow="DEVICE GRADING" title="Know the condition before it arrives." copy="Every refurbished unit is functionally tested and assigned a clear cosmetic grade before dispatch." /><div className="grading__layout"><div className="grade-tabs" role="tablist" aria-label="Device grades">{grades.map((item, index) => <button key={item.id} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={active === index} style={{ "--tab-color": item.color }}><strong>{item.label}</strong><span>{item.battery}</span><small>{item.cosmetic}</small></button>)}</div><div className="grading__phone"><AnimatePresence mode="wait"><motion.div key={grade.id} className="grading__phone-art" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease }}><AssetImage src={grade.image} fallback="/generated/devices/nova-x1.svg" alt={`Representative ${grade.label} device grade`} sizes="(max-width: 768px) 72vw, 28vw" /></motion.div></AnimatePresence><span className="callout callout--screen">Screen <i /></span><span className="callout callout--frame">Frame <i /></span><span className="callout callout--rear">Rear housing <i /></span></div><div className="grading__details"><span className="eyebrow">ACTIVE GRADE / {grade.label}</span><h3>{grade.condition}</h3><dl><div><dt>Cosmetic condition</dt><dd>{grade.cosmetic}</dd></div><div><dt>Battery health threshold</dt><dd>{grade.battery}</dd></div><div><dt>Functional testing</dt><dd>30+ standard checks</dd></div><div><dt>Packaging</dt><dd>{grade.packaging}</dd></div><div><dt>Return window</dt><dd>14 days from receipt</dd></div></dl><p className="grading__disclaimer">Illustrations show representative grading differences. Exact cosmetic wear varies by unit and shipment.</p></div></div></div></section>;
}

function Services() {
  const services = [
    { icon: Boxes, title: "International trade", copy: "Merchant export of smartphones and consumer electronics for partners across emerging and established markets.", color: "#3d63ff" },
    { icon: Truck, title: "India distribution", copy: "B2B supply from our Pune hub to distributors, wholesalers and bulk buyers across Indian markets.", color: "#b8f36a" },
    { icon: BadgeCheck, title: "Testing & grading", copy: "Functional checks, battery thresholds and transparent cosmetic grades for confident purchasing.", color: "#f2c84b" },
    { icon: Globe2, title: "Export logistics", copy: "Packing, documentation and insured dispatch through trusted domestic and international carriers.", color: "#8ce3c4" },
  ];
  return <section className="section services" id="company"><div className="wrap"><SectionIntro eyebrow="WHAT WE DO" title="Trade, distribution and dependable supply." copy="VNM Telecommunications LLP is a Pune-based partner for smartphones and electronics—connecting inventory with distributors, wholesalers and export buyers who need volume, clarity and reliable dispatch." /><div className="services__grid">{services.map(({ icon: Icon, ...service }, index) => <Reveal key={service.title} delay={index * 0.08}><article className="service-card" style={{ "--service-color": service.color }}><div className="service-card__icon"><Icon size={22} /></div><p className="eyebrow">0{index + 1}</p><h3>{service.title}</h3><p>{service.copy}</p><span className="service-card__line" /></article></Reveal>)}</div></div></section>;
}

function Process() {
  const steps = [["Request", "Share models, grades and quantities for India or export."], ["Quote", "Receive clear per-unit pricing and stock conditions."], ["Confirm", "Approve order terms, GST/export docs and payment."], ["Dispatch", "Get insured tracking from our Pune distribution hub."]];
  return <section className="section process"><div className="wrap"><SectionIntro eyebrow="PROCESS" title="From stock request to tracked shipment." /><div className="process__rail">{steps.map(([title, copy], index) => <Reveal className="process-step" key={title} delay={index * 0.08}><span className="process-step__number">0{index + 1}</span><div className="process-step__dot" /><h3>{title}</h3><p>{copy}</p>{index < steps.length - 1 && <i className="process-step__connector" />}</Reveal>)}</div><div className="process__stamp"><Package size={17} /> ORDER FLOW / 01—04 / PUNE HUB</div></div></section>;
}

function QualityControl() {
  const checks = ["Power and charging", "Display and touch response", "Cameras and microphones", "Connectivity", "Buttons and biometrics", "Battery-health threshold", "Cosmetic grading", "Data-wipe verification"];
  return <section className="quality section section--dark"><div className="wrap quality__grid"><Reveal className="quality__visual"><AssetImage src="/images/devices/quality-inspection.webp" fallback="/generated/devices/quality-inspection.svg" alt="Technician inspecting a fictional device in a quality control lab" sizes="(max-width: 768px) 90vw, 50vw" /><span className="quality__scan" /></Reveal><Reveal className="quality__copy" delay={0.1}><SectionIntro dark eyebrow="QUALITY CONTROL" title="Tested beyond the surface." /><div className="check-grid">{checks.map((check) => <span key={check}><Check size={14} /> {check}</span>)}</div><div className="quality__stat"><strong>30+</strong><span>standard functional checks</span></div></Reveal></div></section>;
}

function Logistics() {
  const facts = ["Pune hub / Maharashtra", "Dispatch to every Indian state & UT", "Consolidated B2B shipments", "GST-ready documentation", "Outside India on request"];
  // Coordinates mapped to india-states.svg (612×696) from real lat/lon.
  const hub = { x: 122, y: 426 };
  const routes = [
    { id: "delhi", label: "Delhi NCR", x: 191, y: 198, labelX: 201, labelY: 194, path: `M${hub.x} ${hub.y} C140 340 160 250 191 198`, delay: 0 },
    { id: "ahmedabad", label: "Ahmedabad", x: 95, y: 322, labelX: 105, labelY: 318, path: `M${hub.x} ${hub.y} C110 390 100 350 95 322`, delay: 0.2 },
    { id: "hyderabad", label: "Hyderabad", x: 218, y: 452, labelX: 228, labelY: 448, path: `M${hub.x} ${hub.y} C160 440 190 448 218 452`, delay: 0.4 },
    { id: "bengaluru", label: "Bengaluru", x: 199, y: 551, labelX: 209, labelY: 547, path: `M${hub.x} ${hub.y} C150 480 175 520 199 551`, delay: 0.6 },
    { id: "chennai", label: "Chennai", x: 255, y: 548, labelX: 265, labelY: 544, path: `M${hub.x} ${hub.y} C170 470 220 520 255 548`, delay: 0.8 },
    { id: "kolkata", label: "Kolkata", x: 422, y: 335, labelX: 432, labelY: 331, path: `M${hub.x} ${hub.y} C220 400 330 360 422 335`, delay: 1 },
    { id: "guwahati", label: "Guwahati", x: 492, y: 255, labelX: 502, labelY: 251, path: `M${hub.x} ${hub.y} C260 360 390 290 492 255`, delay: 1.2 },
  ];
  return (
    <section className="section section--dark logistics" id="logistics">
      <div className="wrap">
        <SectionIntro dark eyebrow="INDIA DISTRIBUTION & EXPORT" title="Stock moves. Visibility stays." copy="From our Pune hub across India for domestic B2B supply—with packing, shipping and documentation support when orders move into export markets." />
        <div className="logistics__grid">
          <div className="route-map">
            <div className="india-map">
              <svg viewBox="-60 -20 820 740" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animated routes from Pune to Indian regional hubs">
                <image className="india-map__land" href="/maps/india-states.svg" x="0" y="0" width="612" height="696" preserveAspectRatio="xMidYMid meet" />
                {routes.map((route) => <path key={route.id} className={`india-map__route india-map__route--${route.id}`} d={route.path} style={{ animationDelay: `${route.delay}s` }} />)}
                <circle className="india-map__hub-pulse" cx={hub.x} cy={hub.y} r="13" />
                <circle className="india-map__hub" cx={hub.x} cy={hub.y} r="6" />
                {routes.map((route) => (
                  <g key={route.id} className="india-map__node">
                    <circle cx={route.x} cy={route.y} r="5" />
                    <text x={route.labelX} y={route.labelY}>{route.label}</text>
                  </g>
                ))}
                <text className="india-map__pune" x={hub.x + 14} y={hub.y - 8}>PUNE HUB</text>
                <path className="india-map__outside-route" d="M492 255 C560 210 640 150 720 100" />
                <text className="india-map__outside" x="580" y="90">OUTSIDE INDIA</text>
              </svg>
            </div>
            <div className="route-map__status"><span className="route-map__status-dot" /> LIVE ROUTE STUDY / PUNE → INDIA</div>
          </div>
          <div className="logistics__facts">
            <p className="eyebrow eyebrow--light">PUNE DISTRIBUTION HUB</p>
            {facts.map((fact) => <div key={fact}><ShieldCheck size={17} /><span>{fact}</span></div>)}
            <p className="logistics__carriers">NORTH · SOUTH · EAST · WEST · EXPORT</p>
          </div>
          <div className="shipment-card">
            <AssetImage src="/images/devices/packed-shipment.webp" fallback="/generated/devices/packed-shipment.svg" alt="Unbranded mobile devices packed for wholesale dispatch" sizes="(max-width: 768px) 90vw, 36vw" />
            <span>DISPATCH UNIT / PUNE—048</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BigReveal() {
  return <section className="big-reveal"><div className="big-reveal__image"><AssetImage src="/images/devices/warehouse-device-wall.webp" fallback="/generated/devices/warehouse-device-wall.svg" alt="Fictional organized wholesale device warehouse" sizes="100vw" /></div><div className="big-reveal__overlay" /><div className="wrap big-reveal__content"><p className="eyebrow eyebrow--light">SERVING TRADE PARTNERS IN {site.countriesServed} COUNTRIES</p><h2>EXPANDING<br />HORIZONS.<br /><span>STEADY SUPPLY.</span></h2><p>Clear grades. Competitive volumes. Tracked dispatch from Pune.</p></div></section>;
}

function QuoteForm() {
  const empty = { company: "", email: "", state: "", category: "", quantity: "", requirements: "" };
  const [values, setValues] = useState(() => ({ ...empty }));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const statusRef = useRef(null);

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!values.company.trim()) next.company = "Add your company name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid business email.";
    if (!values.state.trim()) next.state = "Add your state.";
    if (!values.category) next.category = "Choose a product category.";
    if (!values.quantity.trim()) next.quantity = "Add an estimated quantity.";
    if (Object.keys(next).length) {
      setErrors(next);
      document.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Unable to send your request. Please try again or email us directly.");
      }

      const subject = encodeURIComponent(`Stock request — ${values.company.trim()}`);
      const body = encodeURIComponent(
        [
          `Company: ${values.company.trim()}`,
          `Email: ${values.email.trim()}`,
          `State: ${values.state.trim()}`,
          `Category: ${values.category}`,
          `Quantity: ${values.quantity.trim()}`,
          "",
          "Requirements:",
          values.requirements.trim() || "—",
        ].join("\n"),
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

      setSubmitted(true);
      window.setTimeout(() => statusRef.current?.focus(), 30);
    } catch (error) {
      setSubmitError(error.message || "Unable to send your request right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section quote" id="contact">
      <div className="wrap quote__grid">
        <div className="quote__intro">
          <p className="eyebrow">REQUEST STOCK</p>
          <h2>Tell us what your market needs.</h2>
          <p>Share categories, models and quantities for India distribution or export. Our sales team will respond within one business day.</p>
          <div className="contact-details">
            <a href={`mailto:${site.email}`}><Mail size={17} />{site.email}</a>
            <a href={`tel:+91${site.phone}`}><Phone size={17} />+91 {site.phone}</a>
            <a href={`https://wa.me/91${site.whatsapp.replace(/\D/g, "")}`}><MessageCircle size={17} />WhatsApp</a>
            <span><MapPin size={17} />{site.address}</span>
          </div>
        </div>
        <div className="quote__form-wrap">
          {submitted ? (
            <div className="success-state" ref={statusRef} tabIndex={-1} role="status">
              <span><Check size={24} /></span>
              <p className="eyebrow">REQUEST SENT</p>
              <h3>Thank you. We have received your enquiry.</h3>
              <p>A sales representative will respond within one business day. You can also reach us directly at {site.email}.</p>
              <button className="button button--dark" type="button" onClick={() => { setSubmitted(false); setValues({ ...empty }); }}>
                Send another request <ArrowUpRight size={15} />
              </button>
            </div>
          ) : (
            <form className="quote-form" onSubmit={submit} noValidate>
              <div className="form-heading">
                <p className="eyebrow">STOCK ENQUIRY</p>
                <span>All fields marked * are required.</span>
              </div>
              <div className="form-grid">
                <label>Company name *<input name="company" value={values.company} onChange={update} autoComplete="organization" aria-invalid={Boolean(errors.company)} />{errors.company && <small>{errors.company}</small>}</label>
                <label>Business email *<input name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
                <label>State *<input name="state" value={values.state} onChange={update} placeholder="e.g. Maharashtra" autoComplete="address-level1" aria-invalid={Boolean(errors.state)} />{errors.state && <small>{errors.state}</small>}</label>
                <label>Product category *<select name="category" value={values.category} onChange={update} aria-invalid={Boolean(errors.category)}><option value="">Select a category</option>{categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select>{errors.category && <small>{errors.category}</small>}</label>
                <label>Estimated quantity *<input name="quantity" value={values.quantity} onChange={update} placeholder="e.g. 1,000 units" aria-invalid={Boolean(errors.quantity)} />{errors.quantity && <small>{errors.quantity}</small>}</label>
                <label className="form-grid__wide">Requirements<textarea name="requirements" rows="4" value={values.requirements} onChange={update} placeholder="Models, timing, documentation…" /></label>
              </div>
              {submitError && <p className="form-error" role="alert">{submitError}</p>}
              <button className="button button--dark" type="submit" disabled={submitting}>
                {submitting ? "Sending request…" : <>Send stock request <ArrowUpRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer__top"><div><BrandLockup dark /><p>{site.tagline}</p></div><div><p className="eyebrow eyebrow--light">CATEGORIES</p><a href="#categories">Smartphones</a><a href="#categories">Tablets & laptops</a><a href="#categories">Wearables</a><a href="#categories">Accessories</a></div><div><p className="eyebrow eyebrow--light">BUSINESS</p><a href="#company">Trade & distribution</a><a href="#logistics">Logistics</a><a href="#contact">Request stock</a><a href={`mailto:${site.email}`}>Contact sales</a></div><div><p className="eyebrow eyebrow--light">INDIA HQ · PUNE</p><a href={`mailto:${site.email}`}>{site.email}</a><a href={`tel:+91${site.phone}`}>+91 {site.phone}</a><span>{site.address}</span></div></div><div className="footer__line">SMARTPHONES / CONSUMER ELECTRONICS / ACCESSORIES / EXPORT</div><div className="footer__bottom"><span>© 2026 {site.legalName}. All rights reserved.</span><span><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Accessibility</a></span></div></div></footer>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const onScroll = () => setProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))); window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

export default function SiteExperience() {
  return <><div className="site-noise" aria-hidden="true" /><ScrollProgress /><Navbar /><main><Hero /><TrustMarquee /><Stats /><CategoryGrid /><ScrollDeviceStory /><GradingSection /><Services /><Process /><QualityControl /><Logistics /><BigReveal /><QuoteForm /></main><Footer /></>;
}

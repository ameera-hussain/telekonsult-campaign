import { useEffect, useState } from 'preact/hooks'
import airFryerImage from './assets/airfryer.png'
import heroBannerImage from './assets/prizehero.png'
import nadiLogo from './assets/NadiWellbeing.png'
import tabletImage from './assets/tablet.png'
import tngImage from './assets/tng.png'
import tvImage from './assets/tv.png'
import './app.css'

const nesUrl = 'https://nes.nadi.my'
const whatsappUrl = 'https://wa.me/60174943997'

const assets = {
  tv: tvImage,
  tablet: tabletImage,
  fryer: airFryerImage,
  tng: tngImage,
}

const steps = [
  {
    title: 'Tempah di Sistem NADI Kesejahteraan Kendiri',
    eyebrow: 'Langkah pertama',
    icon: 'event_available',
    description: <>Petugas log masuk dan membuat tempahan sesi telekonsultasi untuk Ahli NADI melalui portal rasmi <a href={'https://hati.mrichealthcare.com/'} target="_blank" rel="noopener noreferrer" style="text-decoration: underline;"><strong>NADI Kesejahteraan Kendiri</strong></a>.</>,
    note: 'Akses melalui browser desktop atau tablet pusat',
  },
  {
    title: 'Ahli NADI Hadir Sesi',
    eyebrow: 'Langkah kedua',
    icon: 'video_chat',
    description: 'Pastikan Ahli NADI hadir ke sesi konsultasi dan melengkapkan sesi interaksi bersama pegawai perubatan atau pakar secara dalam talian sehingga tamat.',
    note: 'Sesi interaktif mengikut piawaian',
  },
  {
    title: 'Kumpul 1 Tiket Cabutan!',
    eyebrow: 'Langkah ketiga',
    icon: 'confirmation_number',
    description: <>Setiap telekonsultasi yang selesai dan disahkan secara automatik menjana <strong>1 tiket penyertaan cabutan</strong> ke atas ID petugas anda. Tiada had maksimum!</>,
    note: 'Kumpul seberapa banyak tiket yang boleh',
  },
]

const prizes = [
  {
    place: 'Tempat Kedua',
    category: 'Produktiviti pintar',
    title: 'Xiaomi Pad 8 11.2"',
    description: 'Tablet berkuasa tinggi dengan paparan 11.2 inci ultra lancar untuk produktiviti kerja petugas, urusan pelaporan pantas, dan hiburan tanpa batas.',
    image: assets.tablet,
    alt: 'Tablet Xiaomi Pad',
    className: 'prize-card-second',
    icon: 'looks_two',
  },
  {
    place: 'Hadiah utama / juara',
    category: 'Grand prize',
    title: 'Xiaomi TV S Pro Mini LED 55"',
    description: 'Skrin 55 inci Mini LED berkualiti pawagam 4K dengan paparan ultra-terang, refresh rate tinggi, dan visual warna memukau untuk kediaman anda.',
    image: assets.tv,
    alt: 'Televisyen Xiaomi Mini LED',
    className: 'prize-card-first',
    icon: 'workspace_premium',
  },
  {
    place: 'Tempat ketiga',
    category: 'Keluarga sihat',
    title: 'Xiaomi Dual Zone Air Fryer',
    description: 'Penggoreng udara dwi-zon pintar berkapasiti besar untuk penyediaan sajian sihat sekeluarga secara serentak tanpa minyak berlebihan.',
    image: assets.fryer,
    alt: 'Penggoreng udara Xiaomi dwi-zon',
    className: 'prize-card-third',
    icon: 'looks_3',
  },
]

const terms = [
  {
    title: 'Kelayakan Peserta',
    icon: 'badge',
    text: <>Kempen ini terbuka secara eksklusif kepada semua Pengurus (Manager) dan Penolong Pengurus (Assistant Manager) Pusat NADI di seluruh Malaysia.</>,
  },
  {
    title: 'Pengesahan Status "Completed"',
    icon: 'task_alt',
    text: <>Hanya sesi telekonsultasi yang ditempah melalui sistem NES dan tamat dengan status <strong>Completed (Selesai sepenuhnya oleh doktor &amp; pesakit)</strong> sahaja diambil kira bagi penjanaan nombor tiket cabutan bertuah.</>,
  },
  {
    title: 'Formula Tiket Berganda',
    icon: 'confirmation_number',
    text: 'Setiap 1 sesi telekonsultasi yang berjaya = 1 entri tiket unik cabutan bertuah. Tiada sebarang had maksimum dikenakan — lagi banyak anda bantu ahli, lagi tinggi peluang anda terpilih!',
  },
  {
    title: 'Pengumuman & Sesi Cabutan Langsung',
    icon: 'live_tv',
    text: 'Tarikh cabutan bertuah rasmi akan disiarkan secara langsung (Live Draw) melalui saluran komunikasi NADI. Setiap pemenang akan disahkan identiti dan dihubungi oleh pihak NADI Wellbeing.',
  },
]

function Icon({ children, className = '' }) {
  return <span aria-hidden="true" class={`material-symbols-outlined ${className}`}>{children}</span>
}

function Brand({ showLogo = false }) {
  return (
    <a class="brand" href="#utama" aria-label="NADI Telekonsultasi — laman utama">
      {showLogo ? (
        <img class="brand-logo" src={nadiLogo} alt="NADI Kesejahteraan Kendiri" />
      ) : (
        <>
          <span class="brand-name">NADI <span>TELEKONSULTASI</span></span>
          <span class="brand-campaign">Kempen Ganjaran Hebat</span>
        </>
      )}
    </a>
  )
}

function NavLinks({ mobile = false, open = false, onNavigate }) {
  return (
    <nav
      id={mobile ? 'mobile-menu' : undefined}
      class={mobile ? `mobile-nav${open ? ' is-open' : ''}` : 'desktop-nav'}
      aria-label={mobile ? 'Navigasi mudah alih' : 'Navigasi utama'}
    >
      <a class={mobile ? '' : 'nav-active'} href="#utama" onClick={onNavigate}>Utama</a>
      <a href="#cara-sertai" onClick={onNavigate}>Cara Sertai</a>
      <a href="#hadiah" onClick={onNavigate}>Senarai Hadiah</a>
      <a href="#syarat" onClick={onNavigate}>Terma &amp; FAQ</a>
    </nav>
  )
}

function SectionHeading({ badge, icon, title, description, id }) {
  return (
    <div class="section-heading">
      <span class="badge section-badge"><Icon>{icon}</Icon>{badge}</span>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function PrizeCard({ prize }) {
  const handleImageError = (event) => {
    const image = event.currentTarget
    image.hidden = true
    image.parentElement.classList.add('image-fallback')
    image.parentElement.dataset.icon = 'devices'
    image.parentElement.dataset.label = prize.title
  }

  return (
    <article class={`card prize-card ${prize.className}`}>
      <div class="prize-card-top">
        <span class="badge place-badge"><Icon>{prize.icon}</Icon>{prize.place}</span>
        <span class="prize-category">{prize.category}</span>
      </div>
      <div class="prize-image-wrap">
        <img src={prize.image} alt={prize.alt} loading="lazy" onError={handleImageError} />
      </div>
      <div class="prize-copy">
        {/* {prize.className === 'prize-card-first' && <span class="badge mini-led-badge">Mini LED 4K <span>Pawagam rumah</span></span>} */}
        <h3>{prize.title}</h3>
        <p>{prize.description}</p>
      </div>
      <div class="prize-card-bottom">
        {/* <span>{prize.className === 'prize-card-first' ? 'Hiburan Bersama Keluarga' : prize.className === 'prize-card-third' ? 'Pintar & Jimat Tenaga' : 'Unit Baharu • Rasmi'}</span> */}
        <strong>1x Pemenang</strong>
      </div>
    </article>
  )
}

export function App() {
  const [headerHidden, setHeaderHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    const handleKey = (event) => event.key === 'Escape' && close()
    const media = window.matchMedia('(min-width: 768px)')
    media.addEventListener('change', close)
    window.addEventListener('keydown', handleKey)
    return () => {
      media.removeEventListener('change', close)
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const header = document.querySelector('.site-header')
    if (!header) return

    let revealTimeout

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`)
    }

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setHeaderHidden(false)
        return
      }

      setHeaderHidden(true)
      window.clearTimeout(revealTimeout)
      revealTimeout = window.setTimeout(() => setHeaderHidden(false), 350)
    }

    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(header)
    updateHeaderHeight()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(revealTimeout)
      document.documentElement.style.removeProperty('--site-header-height')
    }
  }, [])

  return (
    <div class="site-shell" data-theme="nadi">
      <header class={`site-header${headerHidden && !menuOpen ? ' is-hidden' : ''}`}>
        <div class="navbar header-inner">
          <Brand showLogo />
          <NavLinks />
          <button
            type="button"
            class="menu-toggle"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon>{menuOpen ? 'close' : 'menu'}</Icon>
          </button>
        </div>
        <NavLinks mobile open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      </header>

      <main>
        <section class="hero-section" id="utama" style={{ '--hero-background': `url("${heroBannerImage}")` }}>
          <div class="page-container hero-grid">
            <div class="hero-copy">
              <div class="hero-badges">
                <span class="badge campaign-badge"><Icon>stars</Icon>Khas untuk Pengurus dan Penolong Pengurus NADI</span>
              </div>
              <h1>Rebut Peluang Memenangi Ganjaran Hebat!</h1>
              <p class="hero-description">Setiap telekonsultasi yang berjaya memberi anda <strong>1 tiket penyertaan cabutan bertuah</strong>. Lebih banyak ahli yang anda bantu lengkapkan sesi telekonsultasi, lebih besar peluang anda untuk menang!*</p>
              <div class="stats hero-stats">
                <div class="stat">
                  <span class="stat-title">Formula menang</span>
                  <strong class="stat-value">1 Sesi = 1 Tiket</strong>
                  <span class="stat-desc">Disahkan di Sistem NADI</span>
                </div>
                <div class="stat">
                  <span class="stat-title">Hadiah utama</span>
                  <strong class="stat-value">55" Mini LED</strong>
                  <span class="stat-desc">Xiaomi TV S Pro</span>
                </div>
                <div class="stat">
                  <span class="stat-title">Saguhati</span>
                  <strong class="stat-value">100 Pemenang</strong>
                  <span class="stat-desc">RM100 Kad TnG</span>
                </div>
              </div>
              <div class="hero-actions">
                <a class="btn btn-primary" href="#cara-sertai"><Icon>how_to_reg</Icon>Ketahui Cara Menang</a>
                <a class="btn btn-secondary" href="#hadiah"><Icon>emoji_events</Icon>Lihat Senarai Hadiah</a>
              </div>
              <div>
                <p class="terms-note text-xs">*Tertakluk kepada terma dan syarat di bawah.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="steps-section" id="cara-sertai">
          <div class="page-container">
            <SectionHeading
              badge="Panduan langkah mudah"
              icon="flag"
              title="3 Langkah Mudah Kumpul Tiket Cabutan"
              description="Bantu Ahli NADI mendapatkan khidmat nasihat kesihatan berkualiti secara telekonsultasi dan kumpul tiket cabutan bertuah anda hari ini!"
            />
            <div class="steps-grid">
              {steps.map((step, index) => (
                <article class="card step-card" key={step.title}>
                  <div class="step-top">
                    <span class="step-number">{index + 1}</span>
                    <Icon className="step-icon">{step.icon}</Icon>
                  </div>
                  <div class="step-copy">
                    <span class="step-eyebrow">{step.eyebrow}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div class="step-note"><Icon>devices</Icon>{step.note}</div>
                </article>
              ))}
            </div>
            <div class="alert ticket-alert" role="note">
              <span class="alert-icon"><Icon>warning</Icon></span>
              <div>
                <h3>Syarat Wajib Pengiraan Tiket Sah</h3>
                <p>Sesi MESTI berstatus <strong>"Completed" / Selesai Sepenuhnya</strong> dalam sistem telekonsultasi untuk melayakkan anda menerima 1 tiket. Sesi yang dibatalkan, dijadualkan semula tanpa selesai, atau "No Show" (tidak hadir) tidak akan dikira.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="prizes-section" id="hadiah">
          <div class="prizes-glow" />
          <div class="page-container">
            <SectionHeading
              badge="Ganjaran Menarik!"
              icon="military_tech"
              title="Senarai Hadiah Lumayan Menanti Anda"
              description="Menangi barangan teknologi pintar terkini dan ganjaran tunai Touch 'n Go khas untuk petugas paling berdedikasi!"
            />
            <div class="prizes-grid">
              {prizes.map((prize) => <PrizeCard prize={prize} key={prize.title} />)}
            </div>
            <article class="card tng-card">
              <div class="tng-art">
                <img
                  src={assets.tng}
                  alt="Kad Touch 'n Go dengan nilai RM100"
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget
                    image.hidden = true
                    image.parentElement.classList.add('tng-image-fallback')
                    image.parentElement.dataset.icon = 'credit_card'
                    image.parentElement.dataset.label = "Touch 'n Go • RM100"
                  }}
                />
              </div>
              <div class="tng-copy">
                <div class="tng-badges">
                  <span class="badge tng-winners">Pemenang Saguhati</span>
                </div>
                <h3>100x Kad Touch 'n Go (Preloaded RM100)</h3>
                <p>Banyak lagi hadiah menanti anda! Sebanyak 100 keping Kad Touch 'n Go edisi khas dengan baki kredit pramuat RM100 setiap satu disediakan untuk kegunaan harian, tol, dan pengangkutan awam.</p>
                <div class="tng-facts">
                  <div><span>Baki pramuat</span><strong>RM100</strong></div>
                  <div><span>Jumlah penerima</span><strong>100 Staf</strong></div>
                  <div><span>Pengaktifan</span><strong>Serta-merta</strong></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="terms-section" id="syarat">
          <div class="page-container terms-grid">
            <div class="terms-intro">
              <span class="badge section-badge"><Icon>policy</Icon>Ketelusan kempen</span>
              <h2>Terma &amp; Syarat Utama Pertandingan</h2>
              <p>Keputusan cabutan bertuah adalah muktamad dan tertakluk kepada terma dan syarat.</p>
              <p>Sila fahami panduan kelayakan dan pengiraan tiket di bawah untuk memastikan setiap sesi telekonsultasi yang anda bantu direkodkan secara sah dalam cabutan bertuah NADI.</p>
              <div class="terms-help">
                <h3><Icon>help</Icon>Ada Persoalan Mengenai Data Sesi?</h3>
                <p>Semua kiraan tiket dijana secara langsung menerusi rekod NADI Wellbeing. Jika terdapat keraguan tentang status sesi pesakit, hubungi Admin NADI Wellbeing.</p>
              </div>
            </div>
            <div class="terms-list">
              {terms.map((term) => (
                <article class="card term-card" key={term.title}>
                  <span class="term-icon"><Icon>{term.icon}</Icon></span>
                  <div><h3>{term.title}</h3><p>{term.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section class="cta-section">
          <div class="cta-glow" />
          <div class="page-container">
            <div class="card cta-card">
              <span class="badge cta-badge"><Icon>bolt</Icon>Tingkatkan Sesi Sekarang</span>
              <h2>Mula Bantu Ahli NADI Hari Ini &amp; Gandakan Tiket Kemenangan Anda!</h2>
              <p>Setiap bantuan anda mengubah tahap kesihatan komuniti setempat sambil membuka peluang membawa pulang hadiah-hadiah menarik.</p>
              <div class="cta-actions">
                <a class="btn btn-primary" href={'https://hati.mrichealthcare.com/'} target="_blank" rel="noopener noreferrer"><Icon>open_in_new</Icon>Buat tempahan sekarang!</a>
                <a class="btn btn-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Icon>chat</Icon>Hubungi NADI Wellbeing</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="page-container">
          <div class="footer-columns">
            <div class="footer-about">
              <Brand showLogo />
              <p>Kempen khas inisiatif kesihatan digital memperkasakan petugas NADI di seluruh Malaysia melalui perkhidmatan telekonsultasi berkualiti tinggi dan ganjaran pencapaian eksklusif.</p>
              <span class="footer-status"><i />Penyertaan terbuka • Petugas sah NADI</span>
            </div>
            <div>
              <h2>Pautan pantas</h2>
              <a href="#utama">Laman Utama</a>
              <a href="#cara-sertai">Panduan Tiket &amp; Sesi</a>
              <a href="#hadiah">Ganjaran &amp; Hadiah Utama</a>
              <a href="#syarat">Soalan Lazim (FAQ)</a>
            </div>
            <div>
              <h2>Bantuan &amp; Sokongan</h2>
              <p>Pertanyaan teknikal atau semakan kelayakan sesi:</p>
              <a class="footer-email" href={whatsappUrl} target="_blank" rel="noopener noreferrer">+60 17-494 3997</a>
              <span>Isnin – Jumaat (8:30 PG – 5:30 PTG)</span>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 NADI Wellbeing. Hak cipta terpelihara.</span>
            <div><a href="#syarat">Tertakluk kepada Terma &amp; Syarat Pertandingan</a></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

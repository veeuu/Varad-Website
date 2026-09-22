import { footerLinks } from '../data'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          {/* brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-mark">
                <div className="c1" />
                <div className="c2" />
              </div>
              <span className="footer-wordmark">PixelBloom</span>
            </div>
            <p className="footer-desc">A full-service creative studio building visual stories for creators, brands, and people in love.</p>
            <div className="footer-tagline">Elevating with Digital Buzz</div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {footerLinks.Services.map(l => <li key={l}><a href="#services">{l}</a></li>)}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              {footerLinks.Studio.map((l, i) => {
                const hrefs = ['#about', '#work', '#process', '#testimonials', '#contact']
                return <li key={l}><a href={hrefs[i]}>{l}</a></li>
              })}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="footer-col-title">Connect</div>
            <div className="footer-socials">
              <div className="soc">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </div>
              <div className="soc">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
              </div>
              <div className="soc">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} <span>PixelBloom</span>. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

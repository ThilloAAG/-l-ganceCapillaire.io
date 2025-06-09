const { useState, useEffect } = React;

function App() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const services = [
    { name: "Coupe Classique", icon: "✂️", duration: "30min", price: "45$ CAD" },
    { name: "Coloration", icon: "🎨", duration: "2h", price: "85$ CAD" },
    { name: "Balayage", icon: "👩‍🎤", duration: "3h", price: "120$ CAD" },
    { name: "Soin Capillaire", icon: "💆‍♀️", duration: "45min", price: "60$ CAD" }
  ];

  const stylists = [
    { name: "Sophie", specialty: "Couleurs", emoji: "👩‍🦰" },
    { name: "Julien", specialty: "Coupes Hommes", emoji: "👨‍🦱" },
    { name: "Amélie", specialty: "Brushing", emoji: "👩‍🦳" }
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleSubmit = () => {
    if (!service || !date || !clientInfo.name || (!clientInfo.phone && !clientInfo.email)) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setStep(4);
  };

  const resetForm = () => {
    setStep(0);
    setService("");
    setStylist("");
    setDate("");
    setClientInfo({
      name: "",
      phone: "",
      email: ""
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={isAnimating ? "page-transition" : ""}>
      <header>
        <div className="header-content">
          <h1><i className="fas fa-scissors"></i> Élégance Capillaire</h1>
          <p>L'art de la coiffure sur mesure</p>
        </div>
      </header>

      <main>
        <div className="progress-steps">
          <div className="progress-bar" style={{ 
            width: step === 0 ? '0%' : 
                  step === 1 ? '33%' : 
                  step === 2 ? '66%' : '100%' 
          }}></div>
          
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`step ${step >= num-1 ? 'active' : ''} ${step > num-1 ? 'completed' : ''}`}>
              <div className="step-number">
                {step > num-1 ? <i className="fas fa-check"></i> : num}
              </div>
              <div className="step-label">
                {num === 1 ? 'Service' : 
                 num === 2 ? 'Coiffeur' : 
                 num === 3 ? 'Infos' : 'Confirmation'}
              </div>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="card welcome-card">
            <h2>Bienvenue chez Élégance Capillaire</h2>
            <p>Prenez rendez-vous avec nos experts pour une expérience capillaire personnalisée.</p>
            
            <div className="service-highlights">
              <div className="highlight">
                <i className="fas fa-award"></i>
                <p>Produits naturels</p>
              </div>
              <div className="highlight">
                <i className="fas fa-star"></i>
                <p>Experts certifiés</p>
              </div>
              <div className="highlight">
                <i className="fas fa-spa"></i>
                <p>Ambiance détente</p>
              </div>
            </div>
            
            <button onClick={() => setStep(1)} className="cta-button">
              Prendre rendez-vous <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card">
            <h2>Choisissez votre service</h2>
            <p>Sélectionnez le soin ou la coupe qui vous correspond</p>
            
            <div className="service-grid">
              {services.map((s) => (
                <div 
                  key={s.name}
                  className={`service-card ${service === s.name ? 'selected' : ''}`}
                  onClick={() => {
                    setService(s.name);
                    setStep(2);
                  }}
                >
                  <div className="service-icon">
                    <span className="emoji">{s.icon}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <div className="service-details">
                    <span>{s.duration}</span>
                    <span>{s.price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={() => setStep(0)} className="back-button">
              <i className="fas fa-arrow-left"></i> Retour
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2>Sélectionnez votre coiffeur</h2>
            <p>Nos experts sont spécialisés dans différents domaines</p>
            
            <div className="stylist-grid">
              {stylists.map((s) => (
                <div
                  key={s.name}
                  className={`stylist-card ${stylist === s.name ? 'selected' : ''}`}
                  onClick={() => setStylist(s.name)}
                >
                  <div className="stylist-emoji">
                    {s.emoji}
                  </div>
                  <h3>{s.name}</h3>
                  <p>Spécialité: {s.specialty}</p>
                </div>
              ))}
            </div>
            
            <div className="navigation-buttons">
              <button onClick={() => setStep(1)} className="back-button">
                <i className="fas fa-arrow-left"></i> Retour
              </button>
              <button 
                onClick={() => setStep(3)} 
                className="cta-button"
                disabled={!stylist}
              >
                Continuer <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h2>Vos informations</h2>
            <p>Nous aurons besoin de quelques détails pour confirmer votre rendez-vous</p>
            
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                id="name"
                type="text"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone *</label>
              <input
                id="phone"
                type="tel"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date et heure *</label>
              <input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>
            
            <div className="navigation-buttons">
              <button onClick={() => setStep(2)} className="back-button">
                <i className="fas fa-arrow-left"></i> Retour
              </button>
              <button onClick={handleSubmit} className="cta-button">
                Confirmer <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="card confirmation-card">
            <div className="confirmation-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Rendez-vous confirmé !</h2>
            
            <div className="confirmation-details">
              <p><strong>Service:</strong> {service}</p>
              <p><strong>Avec:</strong> {stylist}</p>
              <p><strong>Date:</strong> {formatDate(date)}</p>
              <p><strong>Client:</strong> {clientInfo.name}</p>
            </div>
            
            <p className="confirmation-message">
              {clientInfo.phone 
                ? `Un SMS de confirmation a été envoyé au ${clientInfo.phone}.`
                : `Un email de confirmation a été envoyé à ${clientInfo.email}.`}
            </p>
            
            <button onClick={resetForm} className="cta-button">
              <i className="fas fa-home"></i> Retour à l'accueil
            </button>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="contact-info">
            <p><i className="fas fa-map-marker-alt"></i> 12 Rue des Coiffeurs, Montréal</p>
            <p><i className="fas fa-phone"></i> (514) 123-4567</p>
            <p><i className="fas fa-envelope"></i> contact@elegance-capillaire.ca</p>
          </div>
          
          <div className="social-links">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
          
          <div className="copyright">
            © {new Date().getFullYear()} Élégance Capillaire. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
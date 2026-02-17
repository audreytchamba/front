// Création du bouton hamburger et gestion de l'affichage du menu

const nav = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar .nav-container');

// Ajouter un bouton hamburger si on est en mobile
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
navbar.appendChild(hamburger);

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
  // changement d'icône
  const icon = hamburger.querySelector('i');
  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Fermer le menu quand on clique sur un lien (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    const icon = hamburger.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// SMOOTH SCROLL pour tous les liens internes (ancre)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ANIMATION DES STATISTIQUES AU SCROLL (compteurs)
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
  statNumbers.forEach(el => {
    const target = parseInt(el.innerText);
    if (isNaN(target)) return;
    let current = 0;
    const increment = target / 50; // 50 étapes
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + (el.innerText.includes('+') ? '+' : '');
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current) + (el.innerText.includes('+') ? '+' : '');
      }
    }, 20);
  });
}

// Observer pour déclencher l'animation quand la section hero est visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(heroSection);
}

// BOUTON "RETOUR EN HAUT"
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(backToTop);

// Style du bouton (ajouté dynamiquement)
const style = document.createElement('style');
style.textContent = `
  .hamburger {
    display: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #0b2b40;
  }
  @media (max-width: 900px) {
    .hamburger {
      display: block;
    }
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      background: white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      padding: 20px 0;
      text-align: center;
      gap: 20px;
      z-index: 99;
    }
    .nav-links.active {
      display: flex;
    }
  }
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #c79a4b;
    color: #0b2b40;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 100;
  }
  .back-to-top.show {
    opacity: 1;
    visibility: visible;
  }
  .back-to-top:hover {
    background: #d9ae62;
    transform: translateY(-3px);
  }
`;
document.head.appendChild(style);

// Afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// AJOUT SIMPLE D'UN FORMULAIRE DE CONTACT DANS LE FOOTER (optionnel)
// Vous pouvez décommenter les lignes ci-dessous pour ajouter un formulaire de contact basique

const footerCol = document.querySelector('.footer-grid');
if (footerCol) {
  const contactForm = document.createElement('div');
  contactForm.classList.add('footer-links');
  contactForm.innerHTML = `
    <h4>Contact rapide</h4>
    <form id="quick-contact">
      <input type="email" placeholder="Votre email" required style="width:100%; padding:8px; margin-bottom:8px; border-radius:5px; border:1px solid #ccc;">
      <textarea placeholder="Message" rows="2" required style="width:100%; padding:8px; margin-bottom:8px; border-radius:5px; border:1px solid #ccc;"></textarea>
      <button type="submit" style="background:#c79a4b; color:#0b2b40; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Envoyer</button>
    </form>
  `;
  footerCol.appendChild(contactForm);

  // Validation simple
  document.getElementById('quick-contact').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci ! Votre message a été envoyé (simulation).');
    e.target.reset();
  });
}



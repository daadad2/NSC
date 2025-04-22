// Optimized Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-progress');
    
    // Fast loading animation (completes in ~1 second)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      loadingBar.style.width = Math.min(progress, 100) + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.remove();
          initPage(); // Initialize the rest of the page
        }, 300);
      }
    }, 30);
  });
  
  function initPage() {
    // Page navigation
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    const pageSound = document.getElementById('pageSound');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Play page transition sound
        pageSound.currentTime = 0;
        pageSound.play().catch(e => console.log('Sound play prevented:', e));
  
        // Update active page
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.getAttribute('data-page')).classList.add('active');
        
        // Update background
        const bgOverlay = document.querySelector('.page-bg-overlay');
        bgOverlay.style.opacity = '0';
        setTimeout(() => {
          bgOverlay.style.opacity = this.getAttribute('data-page') === 'members' ? '0.15' : '0.1';
        }, 300);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  
    // Era buttons on home page
    const eraButtons = document.querySelectorAll('.btn-gem');
    eraButtons.forEach(button => {
      button.addEventListener('click', function() {
        const era = this.getAttribute('data-era');
        
        // Update navigation
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Find and activate corresponding nav link
        const eraLink = document.querySelector(`nav a[data-page="${era}"]`);
        if (eraLink) {
          eraLink.classList.add('active');
        }
        
        // Show era page
        document.getElementById(era).classList.add('active');
        
        // Update background
        const bgOverlay = document.querySelector('.page-bg-overlay');
        setTimeout(() => {
          bgOverlay.style.opacity = '0';
          setTimeout(() => {
            bgOverlay.style.opacity = '0.1';
          }, 300);
        }, 100);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    
    // Timeline era click
    const timelineEras = document.querySelectorAll('.era');
    timelineEras.forEach(era => {
      era.addEventListener('click', function() {
        const eraId = this.classList[1];
        
        // Update navigation
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Find and activate corresponding nav link
        const eraLink = document.querySelector(`nav a[data-page="${eraId}"]`);
        if (eraLink) {
          eraLink.classList.add('active');
        }
        
        // Show era page
        document.getElementById(eraId).classList.add('active');
        
        // Update background
        const bgOverlay = document.querySelector('.page-bg-overlay');
        setTimeout(() => {
          bgOverlay.style.opacity = '0';
          setTimeout(() => {
            bgOverlay.style.opacity = '0.1';
          }, 300);
        }, 100);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    
    // Period cards modal
    const periodCards = document.querySelectorAll('.period-card');
    const modal = document.getElementById('period-modal');
    const closeModal = document.querySelector('.close-modal');
    
    const periodData = {
      'cambrian': {
          title: 'Cambrian Period',
          lifeForms: 'The Cambrian explosion brought an incredible diversity of life! Trilobites, anomalocaris, and other strange creatures filled the oceans. It was like a big party where everyone was invited!',
          geoFeatures: 'The supercontinent Rodinia had broken apart, and the continents were scattered. The climate was generally warm, with no ice at the poles. Shallow seas covered much of the land.',
          funFact: 'Did you know? Almost all major animal groups first appeared during the Cambrian explosion! It\'s like when Steven first met all the different gems!'
      },
      'ordovician': {
          title: 'Ordovician Period',
          lifeForms: 'Life continued to diversify in the oceans. Graptolites, brachiopods, and cephalopods became common. The first primitive plants appeared on land.',
          geoFeatures: 'The continents were moving toward the south pole. There were extensive shallow seas, and the climate was warm and tropical.',
          funFact: 'The Ordovician ended with one of the five great mass extinctions in Earth\'s history!'
      },
      'silurian': {
          title: 'Silurian Period',
          lifeForms: 'Coral reefs became more common. The first jawed fish appeared. Plants and arthropods began to colonize the land more extensively.',
          geoFeatures: 'The climate stabilized after the Ordovician extinction. Sea levels were high, flooding many continental areas.',
          funFact: 'The first definite fossils of terrestrial animals (millipedes) appear in the Silurian!'
      },
      'devonian': {
          title: 'Devonian Period',
          lifeForms: 'Often called the "Age of Fishes." Sharks and bony fish diversified. The first amphibians evolved to live on land. Forests of primitive plants appeared.',
          geoFeatures: 'The supercontinent Gondwana covered the southern hemisphere. The climate was warm with no polar ice.',
          funFact: 'The Devonian extinction was one of the "Big Five" mass extinctions!'
      },
      'carboniferous': {
          title: 'Carboniferous Period',
          lifeForms: 'Giant insects and amphibians thrived in the swampy forests. The first reptiles appeared. Vast coal-forming forests covered the land.',
          geoFeatures: 'The continents were coming together to form Pangaea. The climate was warm and humid with extensive wetlands.',
          funFact: 'The oxygen levels were so high that insects could grow to enormous sizes!'
      },
      'permian': {
          title: 'Permian Period',
          lifeForms: 'Reptiles diversified and became dominant. The ancestors of mammals appeared. Conifers became common.',
          geoFeatures: 'Pangaea was fully formed. The climate was generally hot and dry inland.',
          funFact: 'The Permian ended with the largest mass extinction in Earth\'s history - about 90% of marine species and 70% of terrestrial species went extinct!'
      },
      'triassic': {
          title: 'Triassic Period',
          lifeForms: 'The first dinosaurs appeared. Mammal-like reptiles were common. The first true mammals appeared late in the period.',
          geoFeatures: 'Pangaea began to break apart. The climate was generally hot and dry.',
          funFact: 'The Triassic-Jurassic extinction paved the way for dinosaurs to dominate!'
      },
      'jurassic': {
          title: 'Jurassic Period',
          lifeForms: 'Dinosaurs became the dominant land animals. The first birds appeared. Giant marine reptiles ruled the seas.',
          geoFeatures: 'Pangaea continued to break apart. The climate was warm with no polar ice.',
          funFact: 'The Jurassic is when some of the most famous dinosaurs like Stegosaurus and Brachiosaurus lived!'
      },
      'cretaceous': {
          title: 'Cretaceous Period',
          lifeForms: 'Dinosaurs reached their peak diversity. Flowering plants appeared. The period ended with the famous asteroid impact.',
          geoFeatures: 'Continents were approaching their modern positions. Sea levels were very high.',
          funFact: 'The Cretaceous-Paleogene extinction wiped out all non-avian dinosaurs!'
      },
      'paleogene': {
          title: 'Paleogene Period',
          lifeForms: 'Mammals diversified and became dominant. Birds also flourished. Primates appeared.',
          geoFeatures: 'Continents continued to drift toward their current positions. The climate cooled toward the end.',
          funFact: 'This is when many modern mammal groups first appeared!'
      },
      'neogene': {
          title: 'Neogene Period',
          lifeForms: 'Grasslands expanded. Many modern mammal families appeared. Hominids (human ancestors) evolved.',
          geoFeatures: 'Continents were close to their current positions. The climate cooled, leading to ice ages.',
          funFact: 'The first humans (Homo) appeared in the late Neogene!'
      },
      'quaternary': {
          title: 'Quaternary Period',
          lifeForms: 'Modern humans evolved and spread across the globe. Many large mammals went extinct.',
          geoFeatures: 'Repeated glacial cycles (ice ages) occurred. Sea levels rose and fell dramatically.',
          funFact: 'We are currently living in the Quaternary Period!'
      }
    };
    
    periodCards.forEach(card => {
      card.addEventListener('click', function() {
        const period = this.getAttribute('data-period');
        const data = periodData[period];
        
        // Update modal content
        document.querySelector('.modal-title').textContent = data.title;
        document.querySelector('.modal-info h3:nth-of-type(1)').nextSibling.textContent = data.lifeForms;
        document.querySelector('.modal-info h3:nth-of-type(2)').nextSibling.textContent = data.geoFeatures;
        document.querySelector('.modal-info .fun-fact p').textContent = data.funFact;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.period-card, .team-member, .gallery-item, .member-card, .reference-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.period-card, .team-member, .gallery-item, .member-card, .reference-card').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Easter egg - Steven Universe theme song
    const logo = document.querySelector('.logo');
    let audioPlayed = false;
    
    logo.addEventListener('click', function() {
      if (!audioPlayed) {
        console.log('🎵 We... are the Crystal Gems! 🎵');
        audioPlayed = true;
        
        // Create a visual effect
        const sparkles = document.createElement('div');
        sparkles.className = 'sparkles';
        document.body.appendChild(sparkles);
        
        setTimeout(() => {
          sparkles.remove();
          audioPlayed = false;
        }, 3000);
      }
    });
  
    // Initialize first background
    document.querySelector('.page-bg-overlay').style.opacity = '0.1';
    
    // Team member image upload functionality
    const uploadButtons = document.querySelectorAll('.upload-btn');
    uploadButtons.forEach(button => {
        button.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatar = this.parentElement.querySelector('.member-avatar');
                    const img = avatar.querySelector('.team-member-img');
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
  };
  
  // Gem click effects
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gem-logo') || 
        e.target.classList.contains('card-gem') || 
        e.target.classList.contains('member-avatar') ||
        e.target.closest('.gem-logo') || 
        e.target.closest('.card-gem') || 
        e.target.closest('.member-avatar')) {
      
      const bubble = document.createElement('div');
      bubble.className = 'click-bubble';
      bubble.style.left = (e.pageX - 10) + 'px';
      bubble.style.top = (e.pageY - 10) + 'px';
      document.body.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, 500);
    }
  });
  
  // Enhanced gem click effects
  const gems = document.querySelectorAll('.gem-logo, .card-gem, .member-avatar');
  gems.forEach(gem => {
    gem.addEventListener('click', function() {
      const sound = new Audio('sounds/gem-click.mp3');
      sound.volume = 0.3;
      sound.play().catch(e => console.log('Auto-play prevented:', e));
      
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (Math.random() * 40 - 20) + 'px';
        sparkle.style.top = (Math.random() * 40 - 20) + 'px';
        sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
        this.appendChild(sparkle);
        
        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }
    });
  });
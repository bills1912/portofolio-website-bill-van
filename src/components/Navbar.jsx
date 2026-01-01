/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";


const Navbar = ({ navOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const activeBox = useRef();
  const navRef = useRef();

  const navItems = [
    {
      label: 'Home',
      link: '#home',
      id: 'home'
    },
    {
      label: 'About',
      link: '#about',
      id: 'about'
    },
    {
      label: 'Work',
      link: '#work',
      id: 'work'
    },
    {
      label: 'Testimonials',
      link: '#testimonials',
      id: 'testimonials'
    },
    {
      label: 'Achievements',
      link: '#achievements',
      id: 'achievements'
    },
    {
      label: 'Contact',
      link: '#contact',
      id: 'contact',
      mobileOnly: true
    }
  ];

  /**
   * Update active box position based on active link
   */
  const updateActiveBox = useCallback(() => {
    if (!navRef.current || !activeBox.current) return;
    
    const activeLink = navRef.current.querySelector('.nav-link.active');
    if (activeLink) {
      activeBox.current.style.top = activeLink.offsetTop + 'px';
      activeBox.current.style.left = activeLink.offsetLeft + 'px';
      activeBox.current.style.width = activeLink.offsetWidth + 'px';
      activeBox.current.style.height = activeLink.offsetHeight + 'px';
    }
  }, []);

  /**
   * Setup Intersection Observer for scroll-based active state
   */
  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Triggers when section is in the middle-ish of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  /**
   * Update active box when activeSection changes
   */
  useEffect(() => {
    updateActiveBox();
  }, [activeSection, updateActiveBox]);

  /**
   * Update active box on resize
   */
  useEffect(() => {
    window.addEventListener('resize', updateActiveBox);
    
    // Initial update after a small delay to ensure DOM is ready
    const timeout = setTimeout(updateActiveBox, 100);
    
    return () => {
      window.removeEventListener('resize', updateActiveBox);
      clearTimeout(timeout);
    };
  }, [updateActiveBox]);

  /**
   * Handle manual click on nav link
   */
  const handleNavClick = (e, id) => {
    setActiveSection(id);
  };

  return (
    <nav ref={navRef} className={'navbar ' + (navOpen ? 'active' : '')}>
      {
        navItems.map(({ label, link, id, mobileOnly }, key) => (
          <a
            href={link}
            key={key}
            className={`nav-link ${activeSection === id ? 'active' : ''} ${mobileOnly ? 'md:hidden' : ''}`}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))
      }
      <div
        className="active-box"
        ref={activeBox}
      ></div>
    </nav>
  )
}

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired
}

export default Navbar
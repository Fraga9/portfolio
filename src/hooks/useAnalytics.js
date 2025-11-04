// src/hooks/useAnalytics.js
import { useEffect } from 'react';

/**
 * Hook personalizado para Google Analytics 4
 *
 * FUNCIONALIDAD:
 * - Proporciona funciones helper para trackear eventos
 * - Integración limpia con React components
 * - Compatible con Vercel Analytics
 *
 * IMPORTANCIA:
 * - Centraliza toda la lógica de tracking
 * - Facilita el mantenimiento
 * - Permite trackear eventos personalizados fácilmente
 */

// Helper function para enviar eventos a GA4
export const trackGA4Event = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Eventos predefinidos comunes
export const Analytics = {
  // Navegación
  trackPageView: (pageName) => {
    trackGA4Event('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  },

  // Interacciones sociales
  trackSocialClick: (platform) => {
    trackGA4Event('social_click', {
      platform: platform,
      timestamp: new Date().toISOString()
    });
  },

  // Proyectos
  trackProjectView: (projectName) => {
    trackGA4Event('project_view', {
      project_name: projectName,
      engagement_type: 'view'
    });
  },

  trackProjectClick: (projectName, projectUrl) => {
    trackGA4Event('project_click', {
      project_name: projectName,
      project_url: projectUrl,
      engagement_type: 'click'
    });
  },

  // Terminal
  trackTerminalToggle: (isOpen) => {
    trackGA4Event('terminal_toggle', {
      action: isOpen ? 'open' : 'close',
      feature: 'terminal'
    });
  },

  trackTerminalCommand: (command) => {
    trackGA4Event('terminal_command', {
      command: command,
      feature: 'terminal'
    });
  },

  // Idioma
  trackLanguageChange: (fromLang, toLang) => {
    trackGA4Event('language_change', {
      from_language: fromLang,
      to_language: toLang
    });
  },

  // Scroll profundidad
  trackScrollDepth: (percentage) => {
    trackGA4Event('scroll_depth', {
      percent_scrolled: percentage,
      engagement_type: 'scroll'
    });
  },

  // Sección visible
  trackSectionView: (sectionName) => {
    trackGA4Event('section_view', {
      section_name: sectionName,
      timestamp: new Date().toISOString()
    });
  },

  // Last.fm
  trackMusicInteraction: (action, trackName = null) => {
    trackGA4Event('music_interaction', {
      action: action, // 'view', 'click', 'expand'
      track_name: trackName,
      feature: 'lastfm'
    });
  },

  // Tiempo en página
  trackTimeOnPage: (duration) => {
    trackGA4Event('time_on_page', {
      duration_seconds: duration,
      engagement_type: 'time'
    });
  },

  // Contacto
  trackContactClick: (method) => {
    trackGA4Event('contact_click', {
      contact_method: method, // 'email', 'linkedin', 'github'
    });
  },

  // CV Download (si lo agregas)
  trackCVDownload: () => {
    trackGA4Event('cv_download', {
      file_type: 'pdf',
      engagement_type: 'download'
    });
  },

  // Error tracking
  trackError: (errorMessage, errorLocation) => {
    trackGA4Event('error_occurred', {
      error_message: errorMessage,
      error_location: errorLocation,
      severity: 'error'
    });
  }
};

/**
 * Hook para trackear scroll depth automáticamente
 */
export const useScrollTracking = () => {
  useEffect(() => {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      );

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        // Track milestones
        milestones.forEach(milestone => {
          if (scrollPercentage >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            Analytics.trackScrollDepth(milestone);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

/**
 * Hook para trackear tiempo en página
 */
export const useTimeTracking = () => {
  useEffect(() => {
    const startTime = Date.now();

    // Track time on unmount o cuando el usuario sale
    const trackTime = () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      if (duration > 5) { // Solo trackear si estuvo más de 5 segundos
        Analytics.trackTimeOnPage(duration);
      }
    };

    // Track cuando el usuario sale de la página
    window.addEventListener('beforeunload', trackTime);

    // Track cada 30 segundos (para sesiones largas)
    const interval = setInterval(() => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      if (duration % 30 === 0) {
        Analytics.trackTimeOnPage(duration);
      }
    }, 30000);

    return () => {
      trackTime();
      window.removeEventListener('beforeunload', trackTime);
      clearInterval(interval);
    };
  }, []);
};

/**
 * Hook principal de Analytics
 * Combina tracking de scroll y tiempo
 */
export const useAnalytics = () => {
  useScrollTracking();
  useTimeTracking();

  return Analytics;
};

export default useAnalytics;

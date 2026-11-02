// TEXTES D'ATTENTE : À CONFIRMER AVEC LE CLIENT
import { SITE_CONFIG } from '../config/site.js';

export const contact = {
  phone: '+241 01 00 00 00', // À CONFIRMER : numéro officiel du standard téléphonique
  email: SITE_CONFIG.contactEmail, // À CONFIRMER : validation de contact@gabonfintech-hub.com
  address: 'Libreville, Gabon', // À CONFIRMER : adresse physique exacte du siège
  website: SITE_CONFIG.baseUrl,
};

export const social = [
  { name: 'LinkedIn', url: SITE_CONFIG.linkedInUrl, icon: 'linkedin' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/19ycmQr9fP/?mibextid=wwXIfr', icon: 'facebook' },
  { name: 'YouTube', url: 'https://youtube.com/@financialinclusiontv7635', icon: 'youtube' },
];

/**
 * Calendrier de l'Elite FinTech Competition (heure de Libreville, UTC+1).
 * - Jusqu'au 12 novembre 2026 inclus : candidatures des fintechs ouvertes.
 * - À partir du 13 novembre 2026 : candidatures closes, demandes d'invitation ouvertes.
 *
 * Aperçu avant l'heure : ajouter ?apercu=invitation à n'importe quelle URL du site
 * (mémorisé pour l'onglet). ?apercu=0 pour revenir à l'affichage normal.
 */
export const APPLICATIONS_DEADLINE_LABEL = '12 novembre 2026';
export const INVITATIONS_OPEN_LABEL = '13 novembre 2026';
export const INVITATIONS_OPEN_AT = new Date('2026-11-13T00:00:00+01:00');
export const APPLICATION_URL = 'https://postuler.gabonfintech-hub.com';

const PREVIEW_KEY = 'gfh_apercu_invitation';

function previewEnabled() {
  try {
    const param = new URLSearchParams(window.location.search).get('apercu');
    if (param === 'invitation') sessionStorage.setItem(PREVIEW_KEY, '1');
    if (param === '0') sessionStorage.removeItem(PREVIEW_KEY);
    return sessionStorage.getItem(PREVIEW_KEY) === '1';
  } catch {
    return false;
  }
}

/** true à partir du 13 novembre 2026 (ou en mode aperçu). */
export function isInvitationPhase() {
  if (typeof window === 'undefined') return false;
  return Date.now() >= INVITATIONS_OPEN_AT.getTime() || previewEnabled();
}

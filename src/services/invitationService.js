/**
 * Demandes d'invitation à la finale de l'Elite FinTech Competition (5 décembre 2026).
 * Envoi en parallèle vers l'email de l'équipe et l'onglet « Invitations » du Google Sheet.
 */
import { dispatchFormSubmission } from './formDispatcher';

export async function submitInvitationRequest(data) {
  if (!data.name || !data.email || !data.organization) {
    throw new Error('Votre nom, votre organisation et votre adresse e-mail sont requis.');
  }

  const result = await dispatchFormSubmission('invitation', {
    name: (data.name || '').trim(),
    organization: (data.organization || '').trim(),
    role: (data.role || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    phone: (data.phone || '').trim(),
    profile: data.profile || '',
    message: (data.message || '').trim(),
    eventName: 'Elite FinTech Competition · Finale du 5 décembre 2026',
    consent: Boolean(data.consent),
  });

  return { success: true, id: result.id };
}

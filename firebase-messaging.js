import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase';

const messaging = getMessaging(app);

export const requestToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;

  return await getToken(messaging, {
    vapidKey: 'ISI_VAPID_KEY'
  });
};

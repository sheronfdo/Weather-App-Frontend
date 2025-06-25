export const getPhaseFromLocalTime = (localtime) => {
  if (!localtime) return 'night';
  const [hours, minutes] = localtime.split(' ')[1].split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes >= 1080 || totalMinutes < 330) return 'night';
  if (totalMinutes >= 330 && totalMinutes < 420) return 'sunrise';
  if (totalMinutes >= 420 && totalMinutes < 1020) return 'day';
  if (totalMinutes >= 1020 && totalMinutes < 1080) return 'sunset';
  return 'night';
};
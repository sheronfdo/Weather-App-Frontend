export const getPhaseFromLocalTime = (localtime) => {
  if (!localtime) return 'night';
  const [hours, minutes] = localtime.split(' ')[1].split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes >= 1080 || totalMinutes < 300) return 'night';
  if (totalMinutes >= 300 && totalMinutes < 360) return 'sunrise';
  if (totalMinutes >= 360 && totalMinutes < 1080) return 'day';
  if (totalMinutes >= 1080 && totalMinutes < 1140) return 'sunset';
  return 'night';
};
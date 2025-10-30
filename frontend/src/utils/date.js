// utils/date.js
export function getLocalYYYYMMDD(date = new Date()) {
  const tzOffsetMs = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - tzOffsetMs);
  return local.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

// normalize incoming appointment date to YYYY-MM-DD
export function normalizeAppointmentDate(a) {
  if (!a) return a;
  // possible fields: a.date, a.appointmentDate, a.startTime
  const raw = a.date || a.appointmentDate || a.startTime || "";
  if (!raw) return { ...a, date: "" };
  // if it's already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return { ...a, date: raw };
  // try to parse ISO and convert to local YYYY-MM-DD
  const parsed = new Date(raw);
  if (!isNaN(parsed)) {
    return { ...a, date: getLocalYYYYMMDD(parsed) };
  }
  // fallback: keep original
  return { ...a, date: raw };
}

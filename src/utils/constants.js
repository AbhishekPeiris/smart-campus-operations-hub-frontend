export const INCIDENT_CATEGORIES = [
  { value: 'HARDWARE_ISSUE', label: 'Hardware Issue' },
  { value: 'SOFTWARE_ISSUE', label: 'Software Issue' },
  { value: 'NETWORK_ISSUE', label: 'Network Issue' },
  { value: 'ELECTRICAL_ISSUE', label: 'Electrical Issue' },
  { value: 'FACILITY_DAMAGE', label: 'Facility Damage' },
  { value: 'SAFETY_CONCERN', label: 'Safety Concern' },
  { value: 'CLEANLINESS_ISSUE', label: 'Cleanliness Issue' },
  { value: 'OTHER', label: 'Other' },
];

export const PRIORITY_LEVELS = [
  { value: 'LOW', label: 'Low', color: 'bg-slate-100 text-slate-700' },
  { value: 'MEDIUM', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { value: 'HIGH', label: 'High', color: 'bg-amber-100 text-amber-700' },
  { value: 'CRITICAL', label: 'Critical', color: 'bg-red-100 text-red-700' },
];

export const TICKET_STATUSES = [
  { value: 'OPEN', label: 'Open', color: 'bg-blue-100 text-blue-700' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
  { value: 'RESOLVED', label: 'Resolved', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'CLOSED', label: 'Closed', color: 'bg-slate-100 text-slate-600' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-700' },
];

export const RESOURCE_TYPES = [
  { value: 'LECTURE_HALL', label: 'Lecture Hall' },
  { value: 'LABORATORY', label: 'Laboratory' },
  { value: 'MEETING_ROOM', label: 'Meeting Room' },
  { value: 'EQUIPMENT', label: 'Equipment' },
  { value: 'OFFICE_SPACE', label: 'Office Space' },
  { value: 'COMMON_AREA', label: 'Common Area' },
  { value: 'LIBRARY', label: 'Library' },
  { value: 'OTHER', label: 'Other' },
];

export const USER_ROLES = [
  { value: 'USER', label: 'User' },
  { value: 'TECHNICIAN', label: 'Technician' },
  { value: 'ADMIN', label: 'Admin' },
];

export function getStatusBadge(status) {
  return TICKET_STATUSES.find(s => s.value === status) || TICKET_STATUSES[0];
}

export function getPriorityBadge(priority) {
  return PRIORITY_LEVELS.find(p => p.value === priority) || PRIORITY_LEVELS[0];
}

export function getCategoryLabel(cat) {
  return INCIDENT_CATEGORIES.find(c => c.value === cat)?.label || cat;
}

export function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

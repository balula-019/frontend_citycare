import {
  Construction,
  Waves,
  Droplets,
  Lightbulb,
  Trash2,
  Route,
  Footprints,
  Landmark,
  Car,
  Droplet,
  AlertOctagon,
  Building2,
  MoreHorizontal,
} from 'lucide-react';

/*
  Mirrors UrbanProblemType on the backend. `value` is sent as-is in the
  report payload and is also the topic the image verification service
  receives, so these strings must not drift.
*/
export const PROBLEM_TYPES = [
  { value: 'ROAD_POTHOLE', icon: Construction, label: 'Pothole' },
  { value: 'FLOODING', icon: Waves, label: 'Flooding' },
  { value: 'BLOCKED_DRAIN', icon: Droplets, label: 'Blocked drain' },
  { value: 'BROKEN_STREETLIGHT', icon: Lightbulb, label: 'Broken streetlight' },
  { value: 'WASTE_DUMPING', icon: Trash2, label: 'Waste dumping' },
  { value: 'DAMAGED_ROAD', icon: Route, label: 'Damaged road' },
  { value: 'DAMAGED_SIDEWALK', icon: Footprints, label: 'Damaged sidewalk' },
  { value: 'DAMAGED_BRIDGE', icon: Landmark, label: 'Damaged bridge' },
  { value: 'TRAFFIC_PROBLEM', icon: Car, label: 'Traffic problem' },
  { value: 'WATER_LEAKAGE', icon: Droplet, label: 'Water leakage' },
  { value: 'SEWER_PROBLEM', icon: AlertOctagon, label: 'Sewer problem' },
  { value: 'PUBLIC_INFRASTRUCTURE', icon: Building2, label: 'Public infrastructure' },
  { value: 'OTHER', icon: MoreHorizontal, label: 'Something else' },
];

/* Mirrors UrbanProblemSeverity. */
export const SEVERITIES = [
  { value: 'LOW', label: 'Low', className: 'text-severity-low' },
  { value: 'MEDIUM', label: 'Medium', className: 'text-severity-medium' },
  { value: 'HIGH', label: 'High', className: 'text-severity-high' },
  { value: 'CRITICAL', label: 'Critical', className: 'text-severity-critical' },
];

/* Mirrors UrbanProblemStatus. */
export const STATUS_STYLES = {
  SUBMITTED: { label: 'Submitted', badge: 'bg-status-submitted/10 text-status-submitted' },
  VERIFIED: { label: 'Verified', badge: 'bg-status-verified/10 text-status-verified' },
  ASSIGNED: { label: 'Assigned', badge: 'bg-status-assigned/10 text-status-assigned' },
  IN_PROGRESS: { label: 'In progress', badge: 'bg-status-progress/10 text-status-progress' },
  RESOLVED: { label: 'Resolved', badge: 'bg-status-resolved/10 text-status-resolved' },
  REJECTED: { label: 'Rejected', badge: 'bg-status-rejected/10 text-status-rejected' },
};

/* Statuses the backend still accepts an edit on. */
export const EDITABLE_STATUSES = ['SUBMITTED', 'VERIFIED', 'ASSIGNED'];

export const problemTypeLabelKey = (value) => `cc.problemTypes.${value}`;

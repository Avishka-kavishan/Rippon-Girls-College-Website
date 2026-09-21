import React from "react";

export function LearningSpaceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="Learning Space"
    >
      {/* Roof pediments */}
      <polygon points="32,8 10,22 54,22" fill="#e05344" />
      <polygon points="32,10 14,21 50,21" fill="#ea6153" />
      <rect x="29" y="3" width="6" height="5" fill="#f4a261" />
      <polygon points="35,3 41,5 35,7" fill="#3b82f6" />
      
      {/* Architrave */}
      <rect x="12" y="22" width="40" height="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Columns */}
      <rect x="15" y="26" width="5" height="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="24" y="26" width="5" height="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="35" y="26" width="5" height="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="44" y="26" width="5" height="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Background Wall & Door */}
      <rect x="13" y="26" width="38" height="24" fill="#f8f1e5" opacity="0.6" />
      <rect x="29" y="36" width="6" height="14" rx="3" fill="#3b82f6" />
      <circle cx="33.5" cy="43" r="0.8" fill="#facc15" />
      
      {/* Windows */}
      <rect x="17" y="30" width="4" height="6" rx="1" fill="#60a5fa" />
      <rect x="43" y="30" width="4" height="6" rx="1" fill="#60a5fa" />

      {/* Base Steps */}
      <rect x="9" y="50" width="46" height="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.8" />
      <rect x="6" y="54" width="52" height="4" fill="#cbd5e1" />
    </svg>
  );
}

export function ScienceLabsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="Science Labs"
    >
      {/* Base */}
      <path d="M16 56C16 53 22 51 32 51C42 51 48 53 48 56L46 59H18L16 56Z" fill="#64748b" />
      <rect x="20" y="55" width="24" height="4" rx="2" fill="#475569" />

      {/* Stage */}
      <rect x="22" y="38" width="22" height="4" rx="1" fill="#334155" />
      <rect x="28" y="36" width="10" height="2" fill="#38bdf8" />

      {/* Curved Arm */}
      <path
        d="M38 51C43 47 45 40 45 31C45 23 41 18 36 17"
        stroke="#0284c7"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Coarse Adjustment Knob */}
      <circle cx="43" cy="35" r="4.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="43" cy="35" r="2" fill="#ffffff" />

      {/* Tube & Eyepiece */}
      <g transform="rotate(-20 28 26)">
        {/* Eyepiece */}
        <rect x="25" y="6" width="8" height="5" rx="1" fill="#0f172a" />
        <rect x="26.5" y="11" width="5" height="8" fill="#38bdf8" />
        
        {/* Body Tube */}
        <rect x="24" y="18" width="10" height="15" rx="1.5" fill="#0ea5e9" />
        
        {/* Revolving Nosepiece & Objectives */}
        <path d="M23 33H35L33 37H25L23 33Z" fill="#0284c7" />
        <rect x="25" y="37" width="3" height="6" fill="#334155" />
        <rect x="30" y="37" width="3" height="7" fill="#f43f5e" />
      </g>
      
      {/* Light Source / Mirror */}
      <circle cx="32" cy="46" r="3" fill="#38bdf8" opacity="0.8" />
    </svg>
  );
}

export function ICTFacilitiesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="ICT Facilities"
    >
      {/* Screen Frame */}
      <rect x="14" y="14" width="36" height="25" rx="3" fill="#1e293b" />
      {/* Screen Display */}
      <rect x="16" y="16" width="32" height="21" rx="1.5" fill="#38bdf8" />
      {/* Window Controls / Content */}
      <rect x="19" y="19" width="14" height="2" rx="1" fill="#ffffff" opacity="0.8" />
      <rect x="19" y="24" width="22" height="2" rx="1" fill="#ffffff" opacity="0.6" />
      <rect x="19" y="28" width="18" height="2" rx="1" fill="#ffffff" opacity="0.6" />
      <circle cx="32" cy="15" r="0.8" fill="#94a3b8" />

      {/* Laptop Base */}
      <path d="M8 43H56L51 48H13L8 43Z" fill="#cbd5e1" />
      <path d="M12 43H52L49 47H15L12 43Z" fill="#94a3b8" />
      {/* Notch */}
      <rect x="28" y="43" width="8" height="1.5" rx="0.75" fill="#64748b" />
      {/* Shadow */}
      <ellipse cx="32" cy="51" rx="24" ry="2" fill="#0f172a" opacity="0.15" />
    </svg>
  );
}

export function ClubsSocietiesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="Clubs & Societies"
    >
      {/* Cap Skull */}
      <path d="M22 23V30C22 35.5 32 37 32 37C32 37 42 35.5 42 30V23" fill="#0f172a" />

      {/* Mortarboard Diamond Top */}
      <polygon points="32,13 54,22 32,31 10,22" fill="#1e293b" />
      <polygon points="32,15 51,22 32,29 13,22" fill="#0f172a" />

      {/* Center Button */}
      <circle cx="32" cy="22" r="2" fill="#facc15" />

      {/* Tassel */}
      <path d="M32 22C36 23 44 26 44 32V38" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      <rect x="42.5" y="37" width="3" height="6" rx="1.5" fill="#eab308" />

      {/* Head silhouette / Shoulders */}
      <circle cx="32" cy="38" r="6" fill="#0f172a" />
      <path d="M18 54C18 47 24 45 32 45C40 45 46 47 46 54V56H18V54Z" fill="#0f172a" />
      {/* White Collar */}
      <polygon points="32,49 28,45 36,45" fill="#f8fafc" />
    </svg>
  );
}

export function SportsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="Sports"
    >
      {/* Ribbons */}
      {/* Left Ribbon */}
      <polygon points="26,12 21,30 28,30 33,12" fill="#3b82f6" />
      <polygon points="21,12 16,30 21,30 26,12" fill="#ef4444" />
      <polygon points="27,12 25,30 28,30 30,12" fill="#ffffff" />

      {/* Right Ribbon */}
      <polygon points="38,12 43,30 36,30 31,12" fill="#3b82f6" />
      <polygon points="43,12 48,30 43,30 38,12" fill="#ef4444" />
      <polygon points="37,12 39,30 36,30 34,12" fill="#ffffff" />

      {/* Medal Body */}
      <circle cx="32" cy="40" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <circle cx="32" cy="40" r="11" fill="#f59e0b" />
      <circle cx="32" cy="40" r="9.5" fill="#fbbf24" />

      {/* Star / Number 1 Emblem */}
      <polygon
        points="32,33 34.5,38 40,38.5 36,42.5 37,48 32,45 27,48 28,42.5 24,38.5 29.5,38"
        fill="#ffffff"
        opacity="0.95"
      />
    </svg>
  );
}

export function ArtsCultureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="facility-icon-svg"
      aria-label="Arts & Culture"
    >
      {/* Comedy Mask (Happy - Cyan/Blue) */}
      <g transform="translate(4, 8) rotate(-8 20 22)">
        <path
          d="M10 14C10 24 14 34 24 34C34 34 38 24 38 14C38 8 32 6 24 6C16 6 10 8 10 14Z"
          fill="#38bdf8"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        {/* Smiling Eyes */}
        <path d="M15 17C17 14 20 14 21 17" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <path d="M27 17C29 14 32 14 33 17" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        {/* Smile */}
        <path d="M17 23C21 28 27 28 31 23" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 23C21 28 27 28 31 23Z" fill="#0f172a" />
      </g>

      {/* Tragedy Mask (Sad - Amber/Orange) */}
      <g transform="translate(18, 14) rotate(12 24 22)">
        <path
          d="M10 14C10 24 14 34 24 34C34 34 38 24 38 14C38 8 32 6 24 6C16 6 10 8 10 14Z"
          fill="#fb923c"
          stroke="#ea580c"
          strokeWidth="1.5"
        />
        {/* Sad Eyes */}
        <circle cx="18" cy="16" r="2" fill="#0f172a" />
        <circle cx="30" cy="16" r="2" fill="#0f172a" />
        {/* Frown */}
        <path d="M18 26C22 22 26 22 30 26" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

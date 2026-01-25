'use client';

import { 
  Mail, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin,
  Phone,
  User
} from 'lucide-react';
import { cvData } from '@/data/cv-data';
import Image from 'next/image';

export default function Header() {
  const { personal } = cvData;

  return (
    <header className="cv-header">
      {/* Photo */}
      {personal.avatar ? (
        <Image 
          src={personal.avatar} 
          alt={personal.name}
          width={120}
          height={120}
          className="cv-photo"
        />
      ) : (
        <div className="cv-photo-placeholder">
          <User size={48} color="white" />
        </div>
      )}
      
      {/* Header Content */}
      <div className="cv-header-content">
        <h1>{personal.name}</h1>
        <div className="cv-header-title">{personal.title}</div>
        
        {/* Contact Info */}
        <div className="cv-header-contact" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            <a href={`mailto:${personal.email}`}>
              <Mail size={14} />
              {personal.email}
            </a>
            {personal.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone size={14} />
                {personal.phone}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} />
              {personal.location}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginTop: '0.5rem' }}>
            {personal.website && (
              <a href={personal.website} target="_blank" rel="noopener noreferrer">
                <Globe size={14} />
                nathan-ferre.fr
              </a>
            )}
            {personal.github && (
              <a href={`https://github.com/${personal.github}`} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                GitHub
              </a>
            )}
            {personal.linkedin && (
              <a href="https://www.linkedin.com/in/nathan-ferre-0ba3a438a/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

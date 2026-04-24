'use client';

import { Mail, MapPin, Globe, Phone, User } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cvData } from '../data/cv-data';
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
          width={105}
          height={130}
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
        {personal.subtitle && <div className="cv-header-subtitle">{personal.subtitle}</div>}
        <div className="cv-header-divider" />

        {/* Contact Info */}
        <div className="cv-header-contact">
          <a href={`mailto:${personal.email}`}>
            <Mail size={13} />
            {personal.email}
          </a>
          {personal.phone && (
            <span className="cv-contact-chip">
              <Phone size={13} />
              {personal.phone}
            </span>
          )}
          <span className="cv-contact-chip">
            <MapPin size={13} />
            {personal.location}
          </span>
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noopener noreferrer">
              <Globe size={13} />
              nathan-ferre.fr
            </a>
          )}
          {personal.github && (
            <a href={`https://github.com/${personal.github}`} target="_blank" rel="noopener noreferrer">
              <FaGithub size={13} />
              {personal.github}
            </a>
          )}
          {personal.linkedin && (
            <a href={`https://www.linkedin.com/in/${personal.linkedin}`} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={13} />
              {personal.linkedin}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

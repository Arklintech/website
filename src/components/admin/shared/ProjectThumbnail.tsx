'use client';

import React, { useEffect, useState } from 'react';
import { KeystoneMark } from '@/components/brand/KeystoneLogo';
import { fetchAdmin } from '@/lib/admin-client';
import { projectImageSrc } from '@/lib/project-image';

interface ProjectThumbnailProps {
  project: { id: string; name?: string; thumbnailUrl?: string | null };
  className?: string;
}

/**
 * A project's persisted image, resolved the same way everywhere it appears. Drive images come
 * from an admin-only route, so they are fetched with the admin token and shown via an object URL.
 * Projects without an image show the brand mark rather than another project's picture.
 */
export default function ProjectThumbnail({ project, className = '' }: ProjectThumbnailProps) {
  const image = projectImageSrc(project);
  const [src, setSrc] = useState<string | null>(image && !image.authenticated ? image.src : null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    if (!image) {
      setSrc(null);
      return;
    }
    if (!image.authenticated) {
      setSrc(image.src);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;
    setSrc(null);
    fetchAdmin(image.src)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    // Re-resolve only when the persisted reference changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image?.src]);

  return (
    <div className={`overflow-hidden bg-[#0B132B] flex items-center justify-center ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={project.name ? `${project.name} image` : 'Project image'}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : image && !failed ? (
        <div className="w-full h-full animate-pulse bg-[#1B2A4A]" aria-label="Loading project image" />
      ) : (
        <KeystoneMark className="w-1/2 h-1/2 opacity-80" />
      )}
    </div>
  );
}

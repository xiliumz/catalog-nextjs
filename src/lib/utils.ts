import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addCustomListener(eventName: string, listener: EventListenerOrEventListenerObject) {
  document.addEventListener(eventName, listener);
}

export function removeCustomListener(eventName: string, listener: EventListenerOrEventListenerObject) {
  document.removeEventListener(eventName, listener);
}

export function emitEvent<T>(eventName: string, data?: T) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export function renameFile(originalFile: File, newName: string) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

export function getFileExt(filename: string) {
  return filename.split('.').pop();
}

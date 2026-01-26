import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractFileUrls(blocks: any[]): string[] {
  const urls: string[] = [];
  if (!Array.isArray(blocks)) return [];

  function traverse(items: any[]) {
    for (const item of items) {
      if ((item.type === "image" || item.type === "video" || item.type === "file") && item.props?.url) {
        urls.push(item.props.url);
      }
      if (item.children) traverse(item.children);
      if (item.content && Array.isArray(item.content)) traverse(item.content);
    }
  }

  traverse(blocks);
  return urls;
}
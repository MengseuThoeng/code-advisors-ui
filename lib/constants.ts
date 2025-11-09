// App-wide constants
export const API_BASE_URL = 'http://159.65.8.211:8080/api';
export const MINIO_BASE_URL = 'http://159.65.8.211:9000';
export const MINIO_BUCKET = 'somrosly-media';

// Default images
export const DEFAULT_AVATAR = `${MINIO_BASE_URL}/${MINIO_BUCKET}/5581dc67-8bb5-4548-b8be-2761a29fe156-Portrait_Placeholder.png`;
export const DEFAULT_COVER = `${MINIO_BASE_URL}/${MINIO_BUCKET}/default-cover.jpg`; // Add your default cover if you have one

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 0;

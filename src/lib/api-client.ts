/**
 * API client with authentication headers
 */

/**
 * Get authentication headers from localStorage
 */
function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') {
    return {};
  }

  const adminAuth = localStorage.getItem('adminAuth');
  const adminEmail = localStorage.getItem('adminEmail');

  if (adminAuth === 'true' && adminEmail) {
    return {
      'x-admin-auth': 'true',
      'x-admin-email': adminEmail,
    };
  }

  return {};
}

/**
 * Make authenticated API request
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || data.message || 'Request failed',
      };
    }

    return { data };
  } catch (error: any) {
    console.error('API request error:', error);
    return {
      error: error.message || 'Network error',
    };
  }
}

/**
 * GET request
 */
export async function apiGet<T = any>(url: string): Promise<{ data?: T; error?: string }> {
  return apiRequest<T>(url, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost<T = any>(
  url: string,
  body: any
): Promise<{ data?: T; error?: string }> {
  return apiRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request
 */
export async function apiPut<T = any>(
  url: string,
  body: any
): Promise<{ data?: T; error?: string }> {
  return apiRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T = any>(url: string): Promise<{ data?: T; error?: string }> {
  return apiRequest<T>(url, { method: 'DELETE' });
}

/**
 * Upload file with authentication
 */
export async function apiUploadFile(
  url: string,
  file: File,
  additionalData?: Record<string, any>
): Promise<{ data?: any; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
      });
    }

    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || data.message || 'Upload failed',
      };
    }

    return { data };
  } catch (error: any) {
    console.error('File upload error:', error);
    return {
      error: error.message || 'Upload error',
    };
  }
}

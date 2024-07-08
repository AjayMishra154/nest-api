export function validateCreateItemDto(dto: any): any[] {
    const errors: any[] = [];
    if (typeof dto.name !== 'string' || /\d/.test(dto.name)) {
      errors.push({
        field: 'name',
        type: 'validation',
        error: 'invalid_format',
        message: 'Name should contain only alphabets',
      });
    }
    if (dto.name.length < 6 || dto.name.length > 12) {
      errors.push({
        field: 'name',
        type: 'validation',
        error: 'invalid_length',
        message: 'Name must be between 6 and 12 characters',
      });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) {
      errors.push({
        field: 'email',
        type: 'validation',
        error: 'invalid_format',
        message: 'Invalid email format',
      });
    }
  
    // Validate password
    if (typeof dto.password !== 'string' || dto.password.length < 6 || dto.password.length > 12) {
      errors.push({
        field: 'password',
        type: 'validation',
        error: 'invalid_length',
        message: 'Password must be between 6 and 12 characters',
      });
    }
    if (!/[A-Z]/.test(dto.password) || !/[a-z]/.test(dto.password) || !/[0-9]/.test(dto.password)) {
      errors.push({
        field: 'password',
        type: 'validation',
        error: 'invalid_format',
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      });
    }
  
    return errors;
  }
  
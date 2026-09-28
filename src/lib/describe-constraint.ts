// Turns a template constraint like "(lyrics)::includes[default]&&[feature-1]"
// into a readable label like "Default + Feature 1".
export const describeConstraint = (constraint: string): string => {
  const rule = constraint.split('::').pop() ?? constraint;
  const tokens = [...rule.matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);

  const labels = tokens.map((token) => {
    if (token === 'default') return 'Default';
    if (token.startsWith('feature-')) return `Feature ${token.replace('feature-', '')}`;
    if (token.includes('tiktok')) return 'TikTok';
    return token;
  });

  return labels.length ? labels.join(' + ') : constraint;
};

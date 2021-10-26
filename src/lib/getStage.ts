export function getStage(): 'remote' | 'local' {
  return process.env.NODE_ENV === 'production' ? 'remote' : 'local';
}

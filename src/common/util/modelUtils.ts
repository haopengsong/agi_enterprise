function getModelFromFile(filePath: string): string {
  const normalizedPath = filePath.replace(/\\/g, '/');
  return normalizedPath.split('/').pop() || '';
}


export function prettyBaseModel(model: string | undefined): string {
  if (!model) return '';
  if (model.includes('gpt-4-vision-preview')) return 'GLM4';
  if (model.includes('gpt-4-1106-preview')) return 'GLM4';
  if (model.includes('gpt-4-32k')) return 'GLM4';
  if (model.includes('gpt-4')) return 'GLM4';
  if (model.includes('gpt-3.5-turbo-instruct')) return 'GLM3';
  if (model.includes('gpt-3.5-turbo-1106')) return 'GLM3';
  if (model.includes('gpt-3.5-turbo-16k')) return 'GLM3';
  if (model.includes('gpt-3.5-turbo')) return 'GLM3';
  if (model.endsWith('.bin')) return model.slice(0, -4);
  // [LM Studio]
  if (model.startsWith('C:\\') || model.startsWith('D:\\'))
    return getModelFromFile(model).replace('.gguf', '');
  // [Ollama]
  if (model.includes(':'))
    return model.replace(':latest', '').replaceAll(':', ' ');
  return model;
}
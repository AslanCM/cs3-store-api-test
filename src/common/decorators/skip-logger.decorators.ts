import { SetMetadata } from '@nestjs/common';

export const SKIP_LOGGER_KEY = 'skip-logger';
export const SkipLogger = () => SetMetadata(SKIP_LOGGER_KEY, true);

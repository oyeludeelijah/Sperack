import type { Plugin } from 'vite';
import path from 'node:path';
import fs from 'node:fs';

function readViteVars(file: string): string {
  try {
    return fs.readFileSync(file, 'utf-8')
      .split('\n')
      .filter((line) => line.startsWith('VITE_'))
      .sort()
      .join('\n');
  } catch {
    return '';
  }
}

export function restartEnvFileChange(): Plugin {
  return {
    name: 'watch-env-and-exit',
    config(config, env) {
      const root = config.root || process.cwd();
      const mode = env.mode || 'development';

      const filesToWatch = [
        '.env',
        '.env.local',
        `.env.${mode}`,
        `.env.${mode}.local`,
      ]
        .map((f) => path.resolve(root, f))
        .filter((file) => fs.existsSync(file));

      for (const file of filesToWatch) {
        let snapshot = readViteVars(file);
        fs.watch(file, { persistent: false }, () => {
          const current = readViteVars(file);
          if (current !== snapshot) {
            console.log(`[vite] VITE_ vars changed in ${path.basename(file)}. Exiting for restart...`);
            process.exit(0);
          }
          snapshot = current;
        });
      }
    },
  };
}

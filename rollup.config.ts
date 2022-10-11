import typescript from '@rollup/plugin-typescript';
import addCliEntry from './build-plugins/add-cli-entry';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    addCliEntry(),
  ]
}

import 'styled-components';
import { Theme } from './shared/types/theme';

// Extend styled-components DefaultTheme with our Theme interface
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

import { InsiderSentiment } from './insider-sentiment';
import { Quote } from './quote';

export interface Company {
  description?: string;
  displaySymbol?: string;
  symbol?: string;
  type?: string;
  quote?: Quote;
  insiderSentiment?: InsiderSentiment[];
}

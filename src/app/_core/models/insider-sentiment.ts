export interface InsiderSentiment {
  symbol?: string; // Symbol
  year?: number; // Year
  month?: number; // Month
  change?: number; // Net buying/selling from all insiders' transactions.
  mspr?: number; // Monthly share purchase ratio.
}

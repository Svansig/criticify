interface review {
  songID: string;
  reviewer: string;
  timestamp: Date;
  review: {
    score: number;
    text: string;
  };
}

export type { review };

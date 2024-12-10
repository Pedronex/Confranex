interface IParticipant {
  id: number;
  numberTicket: number;
  isWinner: boolean;
  lot: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IAward {
  id: number;
  sequence: string;
  name: string;
  createdAt: Date;
}

// model Participant {
//   id           Int      @id @default(autoincrement())
//   numberTicket Int      @unique
//   isWinner     Boolean  @default(false)
//   lot          Int      @default(0)
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
// }

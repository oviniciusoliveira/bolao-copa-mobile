export type PollDetailsParams = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      createPoll: undefined;
      polls: undefined;
      findPoll: undefined;
      pollDetails: PollDetailsParams;
    }
  }
}

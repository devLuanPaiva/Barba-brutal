export type SummaryParams = {
  update: boolean;
  idAppointment: string;
};

export type StackParamList = {
  EditAppointment: undefined;
  Summary: SummaryParams;
};

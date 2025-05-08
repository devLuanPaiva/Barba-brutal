export type SummaryParams = {
  update: boolean;
  idAppointment: string | number | null;
};

export type StackParamList = {
  EditAppointment: undefined;
  Summary: SummaryParams;
};

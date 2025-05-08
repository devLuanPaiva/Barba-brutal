export interface StepsProps {
  labels: string[];
  children: any;
  allowsNextStep: boolean;
  changeNextStep(value: boolean): void;
}

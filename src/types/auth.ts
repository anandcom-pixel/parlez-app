export type UserRole = 'admin' | 'tester';

export interface AuthUser {
  username: 'admin' | 'sreegovind' | 'gayathri';
  displayName: string;
  role: UserRole;
  avatar: string;
}

export type EvaluationCategory =
  | 'bug'
  | 'audio'
  | 'translation'
  | 'grammar'
  | 'ui'
  | 'suggestion';

export type EvaluationSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface EvaluationReport {
  id: string;
  timestamp: string;
  testerUsername: string;
  testerDisplayName: string;
  routeDestination: 'anand.com@gmail.com';
  category: EvaluationCategory;
  activeModule: string;
  severity: EvaluationSeverity;
  title: string;
  description: string;
  stepsToReproduce?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  systemInfo: string;
}
